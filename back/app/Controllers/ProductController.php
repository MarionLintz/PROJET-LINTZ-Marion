<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Firebase\JWT\JWT;
use App\Models\Produits;

class ProductController
{
    public function getAll(Request $request, Response $response, array $args): Response
    {
        global $entityManager;

        $productRepository = $entityManager->getRepository(Produits::class);
        $allProductDocEntities = $productRepository->findAll();

        $products = array();

        foreach($allProductDocEntities as $key => $value){
            $product = array(
                'Id' => $value->getId(), 
                'Name' => $value->getName(), 
                'Gender' => $value->getGender(), 
                'Breed' => $value->getBreed(), 
                'Birth' => $value->getBirth(), 
            );

            array_push($products, $product);
        }
    
        $response->getBody()->write(
            json_encode([
                "success" => true,
                "products" => $products
            ]));

        return $response
            ->withHeader("Content-Type", "application/json");
    }

    public function getProductFromId(Request $request, Response $response, array $args): Response
    {
        global $entityManager;
        $data = $request->getParsedBody();   

        $idProduct = $data["id"] ?? "";
        if(!preg_match("/[0-9]*/",$idProduct)){
            $response->getBody()->write(json_encode([
                "success" => false
            ]));
        }
        else{
            $productRepository = $entityManager->getRepository(Produits::class);
            $value = $productRepository->findOneBy(array('id' => $idProduct));

            $productObject = array(
                    'Id' => $value->getId(), 
                    'Name' => $value->getName(), 
                    'Gender' => $value->getGender(), 
                    'Breed' => $value->getBreed(), 
                    'Birth' => $value->getBirth(), 
                    'Color' => utf8_encode($value->getColor()), 
                    'Height' => $value->getHeight(), 
                    'Weight' => $value->getWeight(), 
                    'Description' => $value->getDescription()
                );

            $response->getBody()->write(json_encode([
                        "success" => true,
                        "product" => $productObject
                    ]));
        }
        
        return $response
            ->withHeader("Content-Type", "application/json");
    }
}