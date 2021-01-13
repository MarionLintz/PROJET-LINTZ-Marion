<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Firebase\JWT\JWT;
use App\Models\Utilisateur;

class UserController
{
    public function ping(Request $request, Response $response, array $args): Response
    {
        $response->getBody()->write(json_encode([
                "value" => "pong"
            ]));
            return $response->withHeader("Content-Type", "application/json");
    }
    
    public function login(Request $request, Response $response, array $args): Response
    {
        global $entityManager;
        $data = $request->getParsedBody();   

        $login = $data["login"] ?? ""; 
        $password = $data["password"] ?? ""; 

        $err = false;
        if(!preg_match("/[a-zA-Z0-9]{1,20}/",$login)){
            $err = true;
        }

        $utilisateurRepository = $entityManager->getRepository(Utilisateur::class);
        $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login));
        
        // define('DEBUG_LOG_FILE', 'D:\Dossiers\temp\debug.log');
        // error_log(password_verify($password,$utilisateur->getPassword()), 3, DEBUG_LOG_FILE);
        
        if (!$err && $utilisateur and $login == $utilisateur->getLogin() and password_verify($password,$utilisateur->getPassword())) {
            $user = array('Nom' => $utilisateur->getNom(), 'Prenom' => $utilisateur->getPrenom());
            $dateNow = time();

            $payload = [
                "iat" => $dateNow,
                "exp" => $dateNow + 100,
                "user" => $user
            ];

            $token_jwt = JWT::encode($payload, $_ENV["JWT_SECRET"], "HS256");

            $response->getBody()->write(json_encode([
                    "success" => true,
                    "user" => $user
                ]));

            return $response
                ->withHeader("Authorization", "Bearer $token_jwt")
                ->withHeader("Content-Type", "application/json");
        }
        else{
            $response->getBody()->write(json_encode([
                "success" => false
            ]));
            return $response->withHeader("Content-Type", "application/json");
        }
    }

    public function logout(Request $request, Response $response, array $args): Response
    {
        return $response
                ->withHeader("Authorization", "Bearer ")
                ->withHeader("Content-Type", "application/json");
    }

    public function register(Request $request, Response $response, array $args): Response
    {
        global $entityManager;
        $data = $request->getParsedBody();

        $result = [
            "success" => true,
            "data" => $data
        ];

        $errorResult = [
            "success" => false
        ];

        $entityManager->getConnection()->beginTransaction();

        if(!preg_match("/[A-Za-z]*/",$data["login"]) ||
           !preg_match("/[A-zÀ-ú]*/",$data["nom"]) ||
           !preg_match("/[A-zÀ-ú]*/",$data["prenom"]) ||
           !preg_match("/[A-Za-z0-9]*/",$data["adresse_num"]) ||
           !preg_match("/[A-zÀ-ú ]*/",$data["adresse_rue"]) ||
           !preg_match("/[0-9]{5}/",$data["adresse_cp"]) ||
           !preg_match("/[A-zÀ-ú]*/",$data["adresse_ville"]) ||
           !preg_match("/[0-9 ]{15}/",$data["tel"])
        ){
            $response->getBody()->write(json_encode($errorResult));
        }
        else{
            $encryptPassword = password_hash($data["password"], PASSWORD_DEFAULT);
            
            try{
                $client = new Utilisateur;
                $client->setLogin($data["login"]);
                $client->setPassword($encryptPassword);
                $client->setNom($data["nom"]);
                $client->setPrenom($data["prenom"]);
                $client->setCivilite($data["civilite"]);
                $client->setAdresse($data["adresse_num"].' '.$data["adresse_rue"].' '.$data["adresse_cp"].' '.$data["adresse_ville"]);
                $client->setPays($data["adresse_pays"]);
                $client->setTelephone($data["tel"]);
                $client->setMail($data["email"]);

                $entityManager->persist($client);
                $entityManager->flush();
                $entityManager->getConnection()->commit();
            }
            catch(Exception $e){
                $entityManager->getConnection()->rollback();
                $response->getBody()->write(json_encode($errorResult));
                throw $e;
            }
        }

        $response->getBody()->write(json_encode($result));
        return $response->withHeader("Content-Type", "application/json");
    }

}