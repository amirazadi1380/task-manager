<?php
require '../config.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');

$token = $_POST['token'];
global $conn;
$sql = "SELECT * FROM users WHERE token = '$token' ";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    $reponse = array("status" => 200, "data" => $user);
} else {
    $reponse = array("status" => 400, "error" => "user not found");
}
echo json_encode($reponse);
