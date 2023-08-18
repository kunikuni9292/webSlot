<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>テストリザルト</title>
    <style>
        body {
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .teamRow {
            display: flex;
            flex-direction: column;
            /* 縦方向に要素を並べる */
        }

        .team-container {
            display: flex;
            align-items: center;
        }

        /* インプットフィールドのスタイル */
        .team-container input[type="text"] {
            width: 100%;
            padding: 5px;
        }

        .firstBox {
            width: 30px;
            height: 20px;
            background-color: rgba(0, 255, 183, 0.795);
            margin-right: 3px;
            text-align: center;
        }

        .verticalBorder {
            width: 2px;
            height: 20px;
            background-color: rgb(246, 98, 0);
            margin-right: 5px;
        }

        .team-name {
            width: 150px;
            margin-right: 10px;
        }

        .team-images {
            display: flex;
            margin-right: 10px;
        }

        .team-images img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
        }

        .totalNumber {
            width: 30px;
            margin-right: 10px;
        }

        .kills {
            width: 30px;
            margin-right: 10px;
        }
    </style>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const updateButtons = document.querySelectorAll(".update-button");
            const teamContainers = document.querySelectorAll(".team-container");
            const teamNameSelect = document.querySelector("[name='new_team_name']");
            const imageContainers = document.querySelectorAll(".image-container");
            const matchCountFilter = document.getElementById("matchCountFilter");

            updateButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const teamId = this.getAttribute("data-team-id");
                    const updatedTeamName = document.querySelector(`#team_name_${teamId}`).value;
                    const updatedImage1 = document.querySelector(`#image1_${teamId}`).value;
                    const updatedImage2 = document.querySelector(`#image2_${teamId}`).value;
                    const updatedImage3 = document.querySelector(`#image3_${teamId}`).value;
                    const updatedKillPoint = document.querySelector(`#kill_point_${teamId}`).value;
                    const updatedTotalPoint = document.querySelector(`#total_point_${teamId}`).value;
                    const updatedmatchCount = document.querySelector(`#match_count_${teamId}`).value;

                    const xhr = new XMLHttpRequest();

                    xhr.open("POST", "./update.php"); // サーバーサイドのPHPファイルへのパス
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);
                            // サーバーからのレスポンスを使って画面内のデータを更新
                        }
                    };
                    const data = `teamId=${teamId}&team_name=${updatedTeamName}&image1=${updatedImage1}&image2=${updatedImage2}&image3=${updatedImage3}&kill_point=${updatedKillPoint}&total_point=${updatedTotalPoint}&match_count=${updatedmatchCount}`; // フォームデータ
                    xhr.send(data);
                });
            });

            teamNameSelect.addEventListener("change", function() {
                const selectedTeamName = this.value;
                imageContainers.forEach(container => {
                    if (container.id === selectedTeamName + "_images") {
                        container.style.display = "block";
                    } else {
                        container.style.display = "none";
                    }
                });
            });
            teamNameSelect.dispatchEvent(new Event("change"));

            matchCountFilter.addEventListener("change", function() {
                const selectedMatchCount = this.value;

                
                teamContainers.forEach(container => {
                    const matchCountCell = container.querySelector(".totalNumber");
                    if (selectedMatchCount === "" || matchCountCell.textContent === selectedMatchCount) {
                        container.style.display = "flex";
                    } else {
                        container.style.display = "none";
                    }
                });
            });
        });
    </script>

    <!-- <script>
        document.addEventListener("DOMContentLoaded", function() {
            const updateButtons = document.querySelectorAll(".update-button");

            updateButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const teamId = this.getAttribute("data-team-id");
                    const updatedTeamName = document.querySelector(`#team_name_${teamId}`).value;
                    const updatedImage1 = document.querySelector(`#image1_${teamId}`).value;
                    const updatedImage2 = document.querySelector(`#image2_${teamId}`).value;
                    const updatedImage3 = document.querySelector(`#image3_${teamId}`).value;
                    const updatedKillPoint = document.querySelector(`#kill_point_${teamId}`).value;
                    const updatedTotalPoint = document.querySelector(`#total_point_${teamId}`).value;
                    const updatedmatchCount = document.querySelector(`#match_count_${teamId}`).value;

                    const xhr = new XMLHttpRequest();

                    xhr.open("POST", "./update.php"); // サーバーサイドのPHPファイルへのパス
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);
                            // サーバーからのレスポンスを使って画面内のデータを更新
                        }
                    };
                    const data = `teamId=${teamId}&team_name=${updatedTeamName}&image1=${updatedImage1}&image2=${updatedImage2}&image3=${updatedImage3}&kill_point=${updatedKillPoint}&total_point=${updatedTotalPoint}&match_count=${updatedmatchCount}`; // フォームデータ
                    xhr.send(data);
                });
            });
            // チーム名をプルダウンで絞り込む機能
            const teamNameSelect = document.querySelector("[name='new_team_name']");
            const imageContainers = document.querySelectorAll(".image-container");

            teamNameSelect.addEventListener("change", function() {
                const selectedTeamName = this.value;
                imageContainers.forEach(container => {
                    if (container.id === selectedTeamName + "_images") {
                        container.style.display = "block";
                    } else {
                        container.style.display = "none";
                    }
                });
            });
            teamNameSelect.dispatchEvent(new Event("change"));

            // 試合数で表示を絞り込む
            const matchCountFilter = document.getElementById("matchCountFilter");
            // const teamContainers = document.querySelectorAll(".team-container");

            matchCountFilter.addEventListener("change", function() {
                const selectedMatchCount = this.value;

                teamContainers.forEach(container => {
                    const matchCountCell = container.querySelector(".totalNumber");
                    if (selectedMatchCount === "" || matchCountCell.textContent === selectedMatchCount) {
                        container.style.display = "flex";
                    } else {
                        container.style.display = "none";
                    }
                });
            });
        });
    </script> -->
</head>

<body>
    <?php
    // require_once __DIR__ . '/db.php';
    function h($data)
    {
        return htmlspecialchars($data, ENT_QUOTES, "UTF-8");
    }

    //DB接続
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=apex', "root", "root");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // DBからコメントデータを取得する
        $sql = "SELECT * FROM `results_table` ORDER BY total_point DESC";
        $results_array = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

    //DBを閉じる
    $pdo = null;
    ?>

    <!-- プルダウン選択肢を設置 -->
    <select id="matchCountFilter" class="team-name" name="match_count_filter">
        <option value="">すべての試合数</option>
        <?php
        $uniqueMatchCounts = array_unique(array_column($results_array, 'match_count'));
        foreach ($uniqueMatchCounts as $matchCount) {
            echo "<option value=\"$matchCount\">$matchCount</option>";
        }
        ?>
    </select>

    <?php
    foreach ($results_array as $results) : ?>
        <div class="team-container">
            <div class="firstBox"><?php echo $results['teamId'] ?></div>
            <div class="verticalBorder"></div>
            <div class="team-name"><?php echo h($results['team_name']) ?></div>
            <div class="team-images">
                <img src="/img/<?php echo $results['image1'] ?>.png" alt="画像1">
                <img src="/img/<?php echo $results['image2'] ?>.png" alt="画像2">
                <img src="/img/<?php echo $results['image3'] ?>.png" alt="画像3">
            </div>
            <div class="kills"><?php echo $results['kill_point'] ?></div>
            <div class="totalNumber"><?php echo $results['total_point'] ?></div>
            <div class="totalNumber"><?php echo $results['match_count'] ?></div>
        </div>

        <!-- 更新フォームを作成 -->
        <form method="post">
            <div class="team-container">
                <input type="hidden" name="teamId" value="<?php echo $results['teamId']; ?>">
                <div class="team-name"><input type="text" name="team_name" value="<?php echo $results['team_name']; ?>"></div>
                <div class="team-images">
                    <input type="text" name="image1" value="<?php echo $results['image1']; ?>">
                    <input type="text" name="image2" value="<?php echo $results['image2']; ?>">
                    <input type="text" name="image3" value="<?php echo $results['image3']; ?>">
                </div>
                <div class="kills"><input type="text" name="kill_point" value="<?php echo $results['kill_point']; ?>"></div>
                <div class="totalNumber"><input type="text" name="total_point" value="<?php echo $results['total_point']; ?>"></div>
                <div class="totalNumber"><input type="text" name="match_count" value="<?php echo $results['match_count']; ?>"></div>
                <button type="submit">更新</button>
            </div>
        </form>

    <?php endforeach; ?>
    <form method="post">
        <div class="team-container">
            <!-- チーム名のプルダウン選択肢 -->
            <select class="team-name" name="new_team_name">
                <?php foreach ($results_array as $results) : ?>
                    <option value="<?php echo h($results['team_name']); ?>"><?php echo h($results['team_name']); ?></option>
                <?php endforeach; ?>
            </select>

            <!-- 関連する画像名の表示 -->
            <div class="team-images">
                <?php foreach ($results_array as $results) : ?>
                    <div class="image-container" id="<?php echo h($results['team_name']); ?>_images" style="display: none;">
                        <input type="text" name="<?php echo h($results['team_name']); ?>_image1" value="<?php echo h($results['image1']); ?>">
                        <input type="text" name="<?php echo h($results['team_name']); ?>_image2" value="<?php echo h($results['image2']); ?>">
                        <input type="text" name="<?php echo h($results['team_name']); ?>_image3" value="<?php echo h($results['image3']); ?>">
                    </div>
                <?php endforeach; ?>
            </div>

            <div class="kills"><input type="text" name="new_kill_point" placeholder="新しいキルポイント"></div>
            <div class="totalNumber"><input type="text" name="new_total_point" placeholder="新しい合計ポイント"></div>
            <div class="totalNumber"><input type="text" name="new_match_count" placeholder="新しいマッチ数"></div>
            <button type="submit" name="add_data">データ追加</button>
        </div>
    </form>
    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {
            // 更新ボタンが押された場合の処理
            if (isset($_POST['teamId'])) {
                $teamId = $_POST['teamId'];
                $updatedTeamName = $_POST['team_name'];
                $updatedImage1 = $_POST['image1'];
                $updatedImage2 = $_POST['image2'];
                $updatedImage3 = $_POST['image3'];
                $updatedKillPoint = $_POST['kill_point'];
                $updatedTotalPoint = $_POST['total_point'];
                $updatedmatchCount = $_POST['match_count'];

                // DB接続と更新処理を行う
                $pdo = new PDO('mysql:host=localhost;dbname=apex', "root", "root");
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $updateSql = "UPDATE results_table SET team_name = :team_name, image1 = :image1, image2 = :image2, image3 = :image3, kill_point = :kill_point, total_point = :total_point, match_count = :match_count WHERE teamId = :teamId";
                $stmt = $pdo->prepare($updateSql);
                $stmt->bindValue(':team_name', $updatedTeamName);
                $stmt->bindValue(':image1', $updatedImage1);
                $stmt->bindValue(':image2', $updatedImage2);
                $stmt->bindValue(':image3', $updatedImage3);
                $stmt->bindValue(':kill_point', $updatedKillPoint);
                $stmt->bindValue(':total_point', $updatedTotalPoint);
                $stmt->bindValue(':match_count', $updatedmatchCount);
                $stmt->bindValue(':teamId', $teamId);
                $stmt->execute();

                // データベース接続を閉じる
                $pdo = null;
            }

            // 新しいデータの追加処理
            if (isset($_POST['add_data'])) {
                $newTeamName = $_POST['new_team_name'];
                $newImage1 = $_POST[$newTeamName . '_image1'];
                $newImage2 = $_POST[$newTeamName . '_image2'];
                $newImage3 = $_POST[$newTeamName . '_image3'];
                $newKillPoint = $_POST['new_kill_point'];
                $newTotalPoint = $_POST['new_total_point'];
                $newMatchCount = $_POST['new_match_count'];

                // DB接続とINSERT処理を行う
                $pdo = new PDO('mysql:host=localhost;dbname=apex', "root", "root");
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $insertSql = "INSERT INTO results_table (team_name, image1, image2, image3, kill_point, total_point, match_count) VALUES (:team_name, :image1, :image2, :image3, :kill_point, :total_point, :match_count)";
                $insertStmt = $pdo->prepare($insertSql);
                $insertStmt->bindValue(':team_name', $newTeamName);
                $insertStmt->bindValue(':image1', $newImage1);
                $insertStmt->bindValue(':image2', $newImage2);
                $insertStmt->bindValue(':image3', $newImage3);
                $insertStmt->bindValue(':kill_point', $newKillPoint);
                $insertStmt->bindValue(':total_point', $newTotalPoint);
                $insertStmt->bindValue(':match_count', $newMatchCount);
                $insertStmt->execute();

                // データベース接続を閉じる
                $pdo = null;

                // ページをリロードして新しいデータが表示されるようにする
                header('Location: ' . $_SERVER['PHP_SELF']);
                exit();
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    ?>

</body>

</html>