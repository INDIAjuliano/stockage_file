<?php

declare(strict_types=1);

namespace App\Core;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class Auth
{
    private static string $secretKey;
    private static string $algorithm = 'HS256';
    private static int $expiration = 86400; // 24 heures en secondes

    public static function init(string $secretKey): void
    {
        self::$secretKey = $secretKey;
    }

    public static function generateToken(array $payload): string
    {
        $issuedAt = time();
        $expire = $issuedAt + self::$expiration;

        $tokenPayload = [
            'iss' => $_SERVER['SERVER_NAME'] ?? 'localhost', // Émetteur
            'aud' => $_SERVER['HTTP_ORIGIN'] ?? 'localhost', // Audience
            'iat' => $issuedAt, // Heure d'émission
            'exp' => $expire, // Heure d'expiration
            'data' => $payload // Données utilisateur
        ];

        return JWT::encode($tokenPayload, self::$secretKey, self::$algorithm);
    }

    public static function validateToken(string $token): array
    {
        try {
            $decoded = JWT::decode($token, new Key(self::$secretKey, self::$algorithm));
            return (array) $decoded->data;
        } catch (Exception $e) {
            throw new Exception('Token invalide: ' . $e->getMessage());
        }
    }

    public static function getCurrentUserId(): ?string
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return null;
        }

        try {
            $payload = self::validateToken($matches[1]);
            return $payload['id'] ?? null;
        } catch (Exception $e) {
            return null;
        }
    }

    public static function hasRole(string $role): bool
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return false;
        }

        try {
            $payload = self::validateToken($matches[1]);
            $roles = $payload['roles'] ?? [];
            return in_array($role, $roles);
        } catch (Exception $e) {
            return false;
        }
    }

    public static function getCurrentUser(): ?array
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            return null;
        }

        try {
            return self::validateToken($matches[1]);
        } catch (Exception $e) {
            return null;
        }
    }

    public static function isAuthenticated(): bool
    {
        return self::getCurrentUserId() !== null;
    }
}
