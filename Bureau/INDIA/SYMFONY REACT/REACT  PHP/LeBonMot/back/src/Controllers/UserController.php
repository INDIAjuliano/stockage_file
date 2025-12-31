<?php

declare(strict_types=1);

namespace App\Controllers;

use PDO;
use Throwable;
use App\Core\Response;

final class UserController
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    // GET /api/users
    public function index(): void
    {
        $stmt = $this->pdo->query("
            SELECT 
                u.id, 
                u.email, 
                u.status,
                u.is_verified,
                u.created_at,
                u.last_login_at,
                p.first_name, 
                p.last_name,
                p.date_of_birth,
                p.country,
                p.city,
                p.photo_url,
                ARRAY_AGG(DISTINCT r.name) as roles,
                JSON_AGG(
                    DISTINCT JSONB_BUILD_OBJECT(
                        'id', ph.id,
                        'number', ph.number,
                        'type', ph.type,
                        'is_primary', ph.is_primary,
                        'is_verified', ph.is_verified
                    )
                ) FILTER (WHERE ph.id IS NOT NULL) as phones
            FROM users u
            LEFT JOIN user_profiles p ON p.user_id = u.id
            LEFT JOIN user_roles ur ON ur.user_id = u.id
            LEFT JOIN roles r ON r.id = ur.role_id
            LEFT JOIN phone_numbers ph ON ph.user_id = u.id
            GROUP BY u.id, p.id
            ORDER BY u.created_at DESC
        ");

        $users = $stmt->fetchAll();

        // Décoder le JSON des téléphones
        foreach ($users as &$user) {
            if ($user['phones']) {
                $user['phones'] = json_decode($user['phones'], true);
            } else {
                $user['phones'] = [];
            }
        }

        Response::json($users, 200);
    }

    // GET /api/users/{id}
    public function show(array $params): void
    {
        $id = $params[0] ?? null;
        if (!$id) Response::json(['error' => 'Missing id'], 400);

        $stmt = $this->pdo->prepare("
            SELECT 
                u.id, 
                u.email, 
                u.status,
                u.is_verified,
                u.created_at,
                u.last_login_at,
                p.first_name, 
                p.last_name,
                p.date_of_birth,
                p.country,
                p.city,
                p.photo_url,
                ARRAY_AGG(DISTINCT r.name) as roles,
                JSON_AGG(
                    DISTINCT JSONB_BUILD_OBJECT(
                        'id', ph.id,
                        'number', ph.number,
                        'type', ph.type,
                        'is_primary', ph.is_primary,
                        'is_verified', ph.is_verified,
                        'created_at', ph.created_at
                    )
                ) FILTER (WHERE ph.id IS NOT NULL) as phones
            FROM users u
            LEFT JOIN user_profiles p ON p.user_id = u.id
            LEFT JOIN user_roles ur ON ur.user_id = u.id
            LEFT JOIN roles r ON r.id = ur.role_id
            LEFT JOIN phone_numbers ph ON ph.user_id = u.id
            WHERE u.id = :id
            GROUP BY u.id, p.id
            LIMIT 1
        ");
        $stmt->execute([':id' => $id]);

        $user = $stmt->fetch();
        if (!$user) Response::json(['error' => 'User not found'], 404);

        // Décoder le JSON des téléphones
        if ($user['phones']) {
            $user['phones'] = json_decode($user['phones'], true);
        } else {
            $user['phones'] = [];
        }

        Response::json($user, 200);
    }

    // POST /api/users (création avec téléphone optionnel)
    public function store(): void
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['email'], $data['password'], $data['firstName'], $data['lastName'])) {
            Response::json(['error' => 'Missing required fields'], 422);
        }

        try {
            $this->pdo->beginTransaction();

            // 1) Insert dans users
            $stmt = $this->pdo->prepare("
                INSERT INTO users (email, password_hash, status, is_verified)
                VALUES (:email, :password, 'PENDING_VERIFICATION', FALSE)
                RETURNING id
            ");
            $stmt->execute([
                ':email' => $data['email'],
                ':password' => password_hash($data['password'], PASSWORD_BCRYPT),
            ]);

            $userId = (string)$stmt->fetchColumn();

            // 2) Insert dans user_profiles
            $stmt = $this->pdo->prepare("
                INSERT INTO user_profiles (user_id, first_name, last_name, date_of_birth, country, city)
                VALUES (:id, :first, :last, :dob, :country, :city)
            ");
            $stmt->execute([
                ':id' => $userId,
                ':first' => $data['firstName'],
                ':last' => $data['lastName'],
                ':dob' => $data['dateOfBirth'] ?? null,
                ':country' => $data['country'] ?? null,
                ':city' => $data['city'] ?? null,
            ]);

            // 3) Insert numéro de téléphone si fourni
            if (!empty($data['phoneNumber'])) {
                error_log("Adding phone: " . $data['phoneNumber']);

                $stmt = $this->pdo->prepare("
                    INSERT INTO phone_numbers (user_id, number, type, is_primary, is_verified)
                    VALUES (:user_id, :number, :type, TRUE, FALSE)
                    RETURNING id
                ");
                $stmt->execute([
                    ':user_id' => $userId,
                    ':number' => $data['phoneNumber'],
                    ':type' => $data['phoneType'] ?? 'MOBILE',
                ]);

                $phoneId = $stmt->fetchColumn();
                error_log("Phone created with ID: " . $phoneId);
            }

            // 4) Assignez le rôle USER par défaut
            $stmt = $this->pdo->prepare("
                INSERT INTO user_roles (user_id, role_id)
                VALUES (:user_id, (SELECT id FROM roles WHERE name = 'USER'))
                ON CONFLICT DO NOTHING
            ");
            $stmt->execute([':user_id' => $userId]);

            $this->pdo->commit();

            // Retourne l'utilisateur créé
            $this->show([$userId]);
        } catch (Throwable $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }

            if (strpos($e->getMessage(), 'unique constraint') !== false) {
                Response::json(['error' => 'Email already exists'], 409);
            }

            Response::json(['error' => $e->getMessage()], 500);
        }
    }

    // PATCH /api/users/{id} - Mise à jour complète
    public function update(array $params): void
    {
        $id = $params[0] ?? null;
        if (!$id) Response::json(['error' => 'Missing id'], 400);

        $data = json_decode(file_get_contents('php://input'), true);

        try {
            $this->pdo->beginTransaction();

            // Mise à jour du profil
            $stmt = $this->pdo->prepare("
                UPDATE user_profiles
                SET 
                    first_name = COALESCE(:first_name, first_name),
                    last_name = COALESCE(:last_name, last_name),
                    date_of_birth = COALESCE(:dob, date_of_birth),
                    country = COALESCE(:country, country),
                    city = COALESCE(:city, city),
                    photo_url = COALESCE(:photo_url, photo_url),
                    updated_at = NOW()
                WHERE user_id = :id
                RETURNING user_id
            ");
            $stmt->execute([
                ':first_name' => $data['firstName'] ?? null,
                ':last_name' => $data['lastName'] ?? null,
                ':dob' => $data['dateOfBirth'] ?? null,
                ':country' => $data['country'] ?? null,
                ':city' => $data['city'] ?? null,
                ':photo_url' => $data['photoUrl'] ?? null,
                ':id' => $id,
            ]);

            if ($stmt->rowCount() === 0) {
                Response::json(['error' => 'User profile not found'], 404);
            }

            // Gestion des téléphones
            if (isset($data['phones']) && is_array($data['phones'])) {
                // Supprimer les anciens numéros
                $stmt = $this->pdo->prepare("DELETE FROM phone_numbers WHERE user_id = :id");
                $stmt->execute([':id' => $id]);

                // Insérer les nouveaux numéros
                foreach ($data['phones'] as $phone) {
                    if (!empty($phone['number'])) {
                        $stmt = $this->pdo->prepare("
                            INSERT INTO phone_numbers (user_id, number, type, is_primary, is_verified)
                            VALUES (:user_id, :number, :type, :is_primary, :is_verified)
                        ");
                        $stmt->execute([
                            ':user_id' => $id,
                            ':number' => $phone['number'],
                            ':type' => $phone['type'] ?? 'MOBILE',
                            ':is_primary' => $phone['isPrimary'] ?? false,
                            ':is_verified' => $phone['isVerified'] ?? false,
                        ]);
                    }
                }
            }

            $this->pdo->commit();

            // Retourne l'utilisateur mis à jour
            $this->show([$id]);
        } catch (Throwable $e) {
            if ($this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }

            Response::json(['error' => $e->getMessage()], 500);
        }
    }

    // DELETE /api/users/{id}
    public function destroy(array $params): void
    {
        $id = $params[0] ?? null;
        if (!$id) Response::json(['error' => 'Missing id'], 400);

        $stmt = $this->pdo->prepare("DELETE FROM users WHERE id = :id");
        $stmt->execute([':id' => $id]);

        if ($stmt->rowCount() === 0) {
            Response::json(['error' => 'User not found'], 404);
        }

        Response::json(['message' => 'User deleted successfully'], 200);
    }

    // POST /api/users/{id}/phones - Ajouter un téléphone
    public function addPhone(array $params): void
    {
        $userId = $params[0] ?? null;
        if (!$userId) Response::json(['error' => 'Missing user id'], 400);

        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['number'])) {
            Response::json(['error' => 'Phone number is required'], 422);
        }

        try {
            // Vérifiez si l'utilisateur existe
            $stmt = $this->pdo->prepare("SELECT id FROM users WHERE id = :id");
            $stmt->execute([':id' => $userId]);
            if (!$stmt->fetch()) {
                Response::json(['error' => 'User not found'], 404);
            }

            $stmt = $this->pdo->prepare("
                INSERT INTO phone_numbers (user_id, number, type, is_primary, is_verified)
                VALUES (:user_id, :number, :type, :is_primary, :is_verified)
                RETURNING id
            ");
            $stmt->execute([
                ':user_id' => $userId,
                ':number' => $data['number'],
                ':type' => $data['type'] ?? 'MOBILE',
                ':is_primary' => $data['isPrimary'] ?? false,
                ':is_verified' => $data['isVerified'] ?? false,
            ]);

            $phoneId = $stmt->fetchColumn();

            // Si c'est le téléphone principal, mettre à jour les autres
            if ($data['isPrimary'] ?? false) {
                $stmt = $this->pdo->prepare("
                    UPDATE phone_numbers 
                    SET is_primary = FALSE 
                    WHERE user_id = :user_id AND id != :phone_id
                ");
                $stmt->execute([
                    ':user_id' => $userId,
                    ':phone_id' => $phoneId,
                ]);
            }

            Response::json([
                'message' => 'Phone added successfully',
                'phoneId' => $phoneId
            ], 201);
        } catch (Throwable $e) {
            if (strpos($e->getMessage(), 'unique constraint') !== false) {
                Response::json(['error' => 'Phone number already exists for this user'], 409);
            }

            Response::json(['error' => $e->getMessage()], 500);
        }
    }
}
