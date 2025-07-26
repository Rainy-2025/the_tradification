<?php
include 'db_connection.php';

header('Content-Type: application/json');

$sql = "SELECT w.*, c.name AS category_name
        FROM webinars w
        JOIN webinar_categories c ON w.category_id = c.id
        WHERE w.banner_active = 1
        ORDER BY w.created_at DESC";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['error' => $conn->error]);
    exit;
}

$stmt->execute();
$result = $stmt->get_result();

echo json_encode($result->fetch_all(MYSQLI_ASSOC));
