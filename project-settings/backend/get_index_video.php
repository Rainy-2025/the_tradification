<?php
header('Content-Type: application/json');

$jsonFile = __DIR__ . '/index_video.json';

if (!file_exists($jsonFile)) {
    // If file doesn't exist, create with default empty URL
    file_put_contents($jsonFile, json_encode(['video_url' => '']));
}

$data = json_decode(file_get_contents($jsonFile), true);

echo json_encode(['video_url' => $data['video_url'] ?? '']);
?>
