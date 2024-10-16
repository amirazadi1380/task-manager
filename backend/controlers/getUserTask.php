<?php
require '../models/auth.php';
require '../models/task.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');

$token = $_POST['token'];

$user_id = getUser($token);

getTask($user_id);
