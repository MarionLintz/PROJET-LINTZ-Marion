<?php

use App\Middlewares\CorsMiddleware;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function (App $app){
    $app->add(CorsMiddleware::class);
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });
    
    $app->group('/user', function (Group $group) {
        $group->get('/ping', "App\Controllers\UserController:ping");
        $group->get('/logout', "App\Controllers\UserController:logout");
        $group->post('/login', "App\Controllers\UserController:login");
        $group->post('/register', "App\Controllers\UserController:register");
    });
    
    $app->group('/products', function (Group $group) {
        $group->get('/getAll', "App\Controllers\ProductController:getAll");
        $group->post('/getProductFromId', "App\Controllers\ProductController:getProductFromId");
    });

};


