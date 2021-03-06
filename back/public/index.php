<?php

use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';

$app = AppFactory::create();

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();

$routes = require __DIR__ . '/../router.php';
$routes($app);

// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => $_ENV["JWT_SECRET"],
    "path" => ["/user", "/products"],
    "ignore" => ["/user/ping", "/user/login", "/user/register"],
    "error" => function ($response, $arguments) {
        $response = $response
            ->withHeader('Access-Control-Allow-Origin', 'https://cnam-marionl-projet-front.herokuapp.com')
            ->withHeader('Access-Control-Allow-Headers', '*')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true')
            ->withHeader('Access-Control-Expose-Headers', '*');
            
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

// Chargement du Middleware
$app->add(new Tuupola\Middleware\JwtAuthentication($options));

// Chargement du Middleware
$app->run();