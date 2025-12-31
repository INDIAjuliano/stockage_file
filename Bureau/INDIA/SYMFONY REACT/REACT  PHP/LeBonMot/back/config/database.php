<?php

declare(strict_types=1);

// REMPLACEZ: use PDO; (incorrect)
// PAR: (rien - pas besoin de use car PDO est dans l'espace global)
// OU: (si vous voulez garder la déclaration):
// use PDO; // C'est correct

return (function (): PDO {
    $host = $_ENV['DB_HOST'] ?? '127.0.0.1';
    $port = $_ENV['DB_PORT'] ?? '5432';
    $db   = $_ENV['DB_NAME'] ?? 'my_db_school';
    $user = $_ENV['DB_USER'] ?? 'userphp';
    $pass = $_ENV['DB_PASS'] ?? 'admin';

    $dsn = "pgsql:host={$host};port={$port};dbname={$db}";

    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
})();
