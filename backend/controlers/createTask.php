<?php
require '../config.php';
require '../models/task.php';
require '../models/auth.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');

$title = $_POST['title'];
$description = $_POST['description'];
$deadline = $_POST['deadline'];
// $token = $_POST['token'];
// $user_id = getUser($token);
$user_id = $_POST['userID'];
$profile = $_FILES['source'];
$uploadDir = './profiles/';

$fileName = uniqid() . "_" . basename($profile['name']);
$uploadFile = '../sources/' . $fileName;

move_uploaded_file($profile['tmp_name'], $uploadFile);

$source_img = 'http://localhost/task/sources/' . $fileName;

createTask($title, $description, $user_id, $deadline, $source_img);
