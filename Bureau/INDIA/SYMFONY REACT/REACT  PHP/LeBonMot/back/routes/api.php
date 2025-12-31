<?php

declare(strict_types=1);

// Définition des routes
$router->get('/api/users', [App\Controllers\UserController::class, 'index']);
$router->get('/api/users/{id}', [App\Controllers\UserController::class, 'show']);
$router->post('/api/users', [App\Controllers\UserController::class, 'store']);
$router->patch('/api/users/{id}', [App\Controllers\UserController::class, 'update']);
$router->delete('/api/users/{id}', [App\Controllers\UserController::class, 'destroy']);


// Route racine temporaire
$router->get('/', [App\Controllers\UserController::class, 'index']); // Temporaire