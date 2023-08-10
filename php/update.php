<?php
// update.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // フォームデータの取得
    $teamId = $_POST['teamId'];
    $updatedTeamName = $_POST['team_name'];
    $updatedImage1 = $_POST['image1'];
    $updatedImage2 = $_POST['image2'];
    $updatedImage3 = $_POST['image3'];
    $updatedKillPoint = $_POST['kill_point'];
    $updatedTotalPoint = $_POST['total_point'];

    // データベースの更新処理を実行
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=apex', "root", "root");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $updateSql = "UPDATE results_table SET team_name = :team_name, image1 = :image1, image2 = :image2, image3 = :image3, kill_point = :kill_point, total_point = :total_point WHERE teamId = :teamId";
        $stmt = $pdo->prepare($updateSql);
        $stmt->bindValue(':team_name', $updatedTeamName);
        $stmt->bindValue(':image1', $updatedImage1);
        $stmt->bindValue(':image2', $updatedImage2);
        $stmt->bindValue(':image3', $updatedImage3);
        $stmt->bindValue(':kill_point', $updatedKillPoint);
        $stmt->bindValue(':total_point', $updatedTotalPoint);
        $stmt->bindValue(':teamId', $teamId);
        $stmt->execute();

        // データベース接続を閉じる
        $pdo = null;

        // 更新結果をJSON形式で返す
        $response = [
            "success" => true, // 更新が成功したかどうか
            // 他の更新後のデータを含む（必要に応じて追加）
        ];
        echo json_encode($response);
    } catch (PDOException $e) {
        // エラーハンドリング
        $response = [
            "success" => false, // 更新が失敗したことを示す
            "error" => $e->getMessage() // エラーメッセージを含む
        ];
        echo json_encode($response);
    }
}
?>
