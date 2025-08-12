<?php
try {
    $bdd = new PDO(
        'pgsql:host=localhost;port=5432;dbname=stockage',
        'postgres',
        'root',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    die('Erreur de connexion : ' . $e->getMessage());
}
