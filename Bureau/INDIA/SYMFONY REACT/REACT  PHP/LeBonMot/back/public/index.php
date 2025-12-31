<?php

declare(strict_types=1);

// Autoload Composer (OBLIGATOIRE)
require __DIR__ . '/../vendor/autoload.php';

use App\Core\Router;

// Headers API
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Connexion DB
$pdo = require __DIR__ . '/../config/database.php';

// Router - AJOUTEZ CETTE LIGNE
$router = new Router($pdo);

// Charger les routes
require __DIR__ . '/../routes/api.php';

// Dispatcher
$router->dispatch();
