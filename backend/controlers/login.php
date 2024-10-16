<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');

require_once '../models/auth.php';

$username = $_POST['username'];
$password = $_POST['password'];

loginUser($username, $password);
