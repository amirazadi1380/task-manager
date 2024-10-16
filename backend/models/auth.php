<?php
require_once '../config.php';

function createUser($username, $password, $uploadFile)
{
    global $conn;
    $sql = "INSERT INTO users (username,password,img_src) VALUES ('$username','$password','$uploadFile')";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        $reponse = array("status" => 200, "message" => "user created succesfully");
        echo json_encode($reponse);
    } else {
        $reponse = array("status" => 400, "message" => "user not created...");
        echo json_encode($reponse);
    }
}

function loginUser($username, $password)
{
    global $conn;
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password' ";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $token = base64_encode(random_bytes(32));
        mysqli_query($conn, "UPDATE users SET token='$token' WHERE username='$username' AND password='$password'");
        $reponse = array("status" => 200, "message" => "user created succesfully", "token" => $token);
    } else {
        $reponse = array("status" => 400, "error" => "login failed");
    }
    echo json_encode($reponse);
}

function getUser($token)
{
    global $conn;
    $sql = "SELECT * FROM users WHERE token = '$token' ";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $user_id = mysqli_fetch_assoc($result)['id'];
        return $user_id;
    } else {
        return false;
    }
}
