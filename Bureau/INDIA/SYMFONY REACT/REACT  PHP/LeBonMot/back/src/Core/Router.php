<?php

declare(strict_types=1);

namespace App\Core;

use PDO;

final class Router
{
    private array $routes = [];
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function get(string $path, callable|array $handler): void
    {
        $this->routes['GET'][$path] = $handler;
    }

    public function post(string $path, callable|array $handler): void
    {
        $this->routes['POST'][$path] = $handler;
    }

    public function put(string $path, callable|array $handler): void
    {
        $this->routes['PUT'][$path] = $handler;
    }

    public function patch(string $path, callable|array $handler): void
    {
        $this->routes['PATCH'][$path] = $handler;
    }

    public function delete(string $path, callable|array $handler): void
    {
        $this->routes['DELETE'][$path] = $handler;
    }

    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

        foreach ($this->routes[$method] ?? [] as $route => $handler) {
            // Support des paramètres: /api/users/{id}
            $pattern = preg_replace('#\{[a-zA-Z_]+\}#', '([^/]+)', $route);

            if (preg_match('#^' . $pattern . '$#', $uri, $matches)) {
                array_shift($matches); // retire la correspondance complète

                if (is_array($handler)) {
                    // Handler sous forme [Controller::class, 'method']
                    [$class, $action] = $handler;
                    $controller = new $class($this->pdo);
                    $controller->$action($matches);
                } else {
                    // Handler sous forme de fonction anonyme
                    $handler($matches);
                }

                return;
            }
        }

        http_response_code(404);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['error' => 'Route not found', 'path' => $uri]);
    }
}
