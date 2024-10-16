<?php
require_once '../config.php';


function createTask($title, $description, $user_id, $deadline, $source_img)
{
    global $conn;
    $sql = "INSERT INTO tasks (title, description, user_id, deadline, source_img) VALUES ('$title', '$description', $user_id, '$deadline', '$source_img')";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        $reponse = array("status" => 200, "message" => "task created succesfully");
        echo json_encode($reponse);
    } else {
        $reponse = array("status" => 400, "message" => "task not created...");
        echo json_encode($reponse);
    }
}

function getTask($user_id)
{
    global $conn;
    $sql = "SELECT * FROM tasks WHERE user_id = $user_id";
    $result = mysqli_query($conn, $sql);
    $tasks = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $tasks[] = $row;
    }
    $response = array("status" => 200, "data" => $tasks);
    echo json_encode($response);
}
