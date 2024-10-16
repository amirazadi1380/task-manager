<?php
require '../config.php';
$sql = "SELECT * FROM users";
$users = [];
$result = mysqli_query($conn, $sql);
while ($row =  mysqli_fetch_assoc($result)) {
    $users[] = $row;
}
$response = array("message" => "ok", "data" => $users);
echo json_encode($response);
