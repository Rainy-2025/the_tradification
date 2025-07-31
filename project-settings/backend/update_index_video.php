<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['video_url'])) {
    echo json_encode(['error' => 'Missing video_url parameter']);
    exit;
}

$videoUrl = trim($input['video_url']);
$jsonFile = __DIR__ . '/index_video.json';

$data = ['video_url' => $videoUrl];

if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => 'Video URL updated successfully']);
} else {
    echo json_encode(['error' => 'Failed to update video URL']);
}
?>
