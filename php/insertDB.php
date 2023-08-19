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

        .rankPosition {
            width: 40px;
            margin-right: 10px;
        }

        .matchCount {
            width: 40px;
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
            const matchCountFilter = document.getElementById("matchCountFilter");
            console.log("matchCountFilter", matchCountFilter ?? "aaa");

            updateButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const updateButton = this; // ボタン要素を変数に格納
                    updateButton.disabled = true; // ボタンを非活性化 
                    const teamId = this.getAttribute("data-team-id");
                    const updatedTeamName = document.querySelector(`#team_name_${teamId}`).value;
                    const updatedImage1 = document.querySelector(`#image1_${teamId}`).value;
                    const updatedImage2 = document.querySelector(`#image2_${teamId}`).value;
                    const updatedImage3 = document.querySelector(`#image3_${teamId}`).value;
                    const updatedRankPosition = document.querySelector(`#rank_position_${teamId}`).value;
                    const updatedKillPoint = document.querySelector(`#kill_point_${teamId}`).value;
                    const updatedTotalPoint = document.querySelector(`#total_point_${teamId}`).value;
                    const updatedmatchCount = document.querySelector(`#match_count_${teamId}`).value;

                    const xhr = new XMLHttpRequest();

                    xhr.open("POST", "./update.php"); // サーバーサイドのPHPファイルへのパス
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            const response = JSON.parse(xhr.responseText);
                            if (response.success) {
                                const message = document.createElement('div');
                                message.textContent = 'DB更新が完了しました。';
                                document.body.appendChild(message);
                                // 2秒後にメッセージが非表示になる
                                setTimeout(() => {
                                    document.body.removeChild(message);
                                }, 2000); // 2秒後にメッセージを非表示にする
                            } else {
                                // エラー処理をここに追加
                                console.log("更新に失敗しました。。。", xhr.status);
                            }
                            updateButton.disabled = false;
                        }
                    };
                    const data = `teamId=${teamId}&team_name=${updatedTeamName}&image1=${updatedImage1}&image2=${updatedImage2}&image3=${updatedImage3}&rank_position=${updatedRankPosition}&kill_point=${updatedKillPoint}&total_point=${updatedTotalPoint}&match_count=${updatedmatchCount}`; // フォームデータ
                    xhr.send(data);
                });
            });

            matchCountFilter.addEventListener("change", function() {
                const selectedMatchCount = this.value;

                teamContainers.forEach(container => {
                    const matchCountCell = container.querySelector(".matchCount");
                    if (selectedMatchCount === "" || matchCountCell.textContent === selectedMatchCount) {
                        container.style.display = "flex";
                    } else {
                        container.style.display = "none";
                    }
                });
            });
        });
    </script>

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
        // 新しい試合数がDBに存在しない場合、プルダウンに追加
        $newMatchCount = max($uniqueMatchCounts) + 1; // 新しい試合数の値
        if (!in_array($newMatchCount, $uniqueMatchCounts)) {
            echo "<option value=\"$newMatchCount\">新しい試合</option>";
        }
        ?>
    </select>

    <?php
    foreach ($results_array as $results) : ?>
        <!-- 更新フォームを作成 -->
        <form method="post">
            <div class="team-container">
                <input type="hidden" name="teamId" value="<?php echo $results['teamId']; ?>">
                <div class="team-name"><input type="text" id="team_name_<?php echo $results['teamId']; ?>" name="team_name" value="<?php echo $results['team_name']; ?>"></div>
                <div class="team-images">
                    <input type="text" id="image1_<?php echo $results['teamId']; ?>" name="image1" value="<?php echo $results['image1']; ?>">
                    <img src="/img/<?php echo $results['image1'] ?>.png" alt="画像1">
                    <input type="text" id="image2_<?php echo $results['teamId']; ?>" name="image2" value="<?php echo $results['image2']; ?>">
                    <img src="/img/<?php echo $results['image2'] ?>.png" alt="画像2">
                    <input type="text" id="image3_<?php echo $results['teamId']; ?>" name="image3" value="<?php echo $results['image3']; ?>">
                    <img src="/img/<?php echo $results['image3'] ?>.png" alt="画像3">
                </div>
                <div class="rankPosition"><input type="text" id="rank_position_<?php echo $results['teamId']; ?>" name="rank_position" value="<?php echo $results['rank_position']; ?>">位</div>
                <div class="kills"><input type="text" id="kill_point_<?php echo $results['teamId']; ?>" name="kill_point" value="<?php echo $results['kill_point']; ?>">kill</div>
                <div class="totalNumber"><input type="text" id="total_point_<?php echo $results['teamId']; ?>" name="total_point" value="<?php echo $results['total_point']; ?>">point</div>
                <div class="matchCount"><input type="text" id="match_count_<?php echo $results['teamId']; ?>" name="match_count" value="<?php echo $results['match_count']; ?>">Battle</div>
                <button type="submit" class="update-button" data-team-id="<?php echo $results['teamId']; ?>">更新</button>
            </div>
        </form>


    <?php endforeach; ?>

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
                $updatedRankPosition = $_POST['rank_position'];
                $updatedKillPoint = $_POST['kill_point'];
                $updatedTotalPoint = $_POST['total_point'];
                $updatedmatchCount = $_POST['match_count'];

                // DB接続と更新処理を行う
                $pdo = new PDO('mysql:host=localhost;dbname=apex', "root", "root");
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $updateSql = "UPDATE results_table SET team_name = :team_name, image1 = :image1, image2 = :image2, image3 = :image3, rank_position = :rank_position, kill_point = :kill_point, total_point = :total_point, match_count = :match_count WHERE teamId = :teamId";
                $stmt = $pdo->prepare($updateSql);
                $stmt->bindValue(':team_name', $updatedTeamName);
                $stmt->bindValue(':image1', $updatedImage1);
                $stmt->bindValue(':image2', $updatedImage2);
                $stmt->bindValue(':image3', $updatedImage3);
                $stmt->bindValue(':rank_position', $updatedRankPosition);
                $stmt->bindValue(':kill_point', $updatedKillPoint);
                $stmt->bindValue(':total_point', $updatedTotalPoint);
                $stmt->bindValue(':match_count', $updatedmatchCount);
                $stmt->bindValue(':teamId', $teamId);
                $stmt->execute();

                // データベース接続を閉じる
                $pdo = null;
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
    ?>
</body>

</html>