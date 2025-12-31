<?php

declare(strict_types=1);

echo "Testing database connection...\n";

try {
    $pdo = require __DIR__ . '/../config/database.php';

    // Test simple
    $stmt = $pdo->query('SELECT 1');
    $result = $stmt->fetchColumn();

    echo "✅ Database connected successfully!\n";
    echo "Test query result: " . $result . "\n";
} catch (PDOException $e) {
    echo "❌ Database connection failed\n";
    echo "Error message: " . $e->getMessage() . "\n";
    exit(1);
}
