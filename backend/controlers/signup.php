<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');

require_once '../models/auth.php';

$username = $_POST['username'];
$password = $_POST['password'];
$profile = $_FILES['profile'];
$uploadDir = './profiles/';

$fileName = uniqid() . "_" . basename($profile['name']);
$uploadFile = '../profiles/' . $fileName;

move_uploaded_file($profile['tmp_name'], $uploadFile);

$fileUrl = 'http://localhost/task/profiles/' . $fileName;

createUser($username, $password, $fileUrl);
