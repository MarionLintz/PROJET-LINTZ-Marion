<?php
// bootstrap.php
require_once "vendor/autoload.php";

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$paths = array(__DIR__ . "/config/yaml");
$isDevMode = false;

$dbParams = array(
    'driver'   => $_ENV["DB_DRIVER"],
    'host'     => $_ENV["DB_HOST"],
    'user'     => $_ENV["DB_USER"],
    'password' => $_ENV["DB_PASSWORD"],
    'dbname'   => $_ENV["DB_NAME"],
    'port'     => $_ENV["DB_PORT"]
);

$config = Setup::createYAMLMetadataConfiguration($paths, $isDevMode);
$entityManager = EntityManager::create($dbParams, $config);