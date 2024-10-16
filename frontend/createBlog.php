<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST');

require_once '../models/auth.php';
require_once '../models/blog.php';

$title = $_POST['title'];
$content = $_POST['content'];
$image = $_FILES['image'];
$category_id = $_POST['category_id'];
$token = $_POST['token'];
$user_id = getUser($token);

if ($image && $image['error'] === UPLOAD_ERR_OK) {
    $uploadDir = '../uploads/';
    
    $fileName = uniqid() . "_" . basename($image['name']);
    $uploadFile = $uploadDir . $fileName;

    if (move_uploaded_file($image['tmp_name'], $uploadFile)) {
        $fileUrl = 'http://localhost/blog/uploads/' . $fileName;

        createBlog($title, $content, $fileUrl, $category_id, $user_id);

        $response = array("status" => 200, "message" => "Blog created successfully", "image_url" => $fileUrl);
    } else {
        $response = array("status" => 500, "message" => "Failed to upload image");
    }
} else {
    $response = array("status" => 400, "message" => "No image uploaded or upload error");
}

echo json_encode($response);
