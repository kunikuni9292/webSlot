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

        .Character3 {
            width: 40px;
            height: 20px;
            background-color: rgb(210, 18, 18);
            margin-right: 3px;
            text-align: center;
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

</head>

<body>
    <?php
    // require_once __DIR__ . '/db.php';
    function h($data)
    {return htmlspecialchars($data, ENT_QUOTES, "UTF-8");}
    $comment_array = array();
    $pdo = null;
    $stmt = null;

    //DB接続
    try {
        $pdo = new PDO('mysql:host=localhost;dbname=apex', "root", "root");
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

    //DBからコメントデータお取得する
    /* $sql = "SELECT * FROM `results_table` WHERE prefectures = '兵庫県' ORDER BY money DESC ";*/
    $sql = "SELECT * FROM `results_table` ORDER BY total_point DESC ";
    $results_array = $pdo->query($sql);

    //DBを閉じる
    $pdo = null;
    ?>

    <?php
    foreach ($results_array as $results) : ?>
        <div class="team-container">
            <div class="firstBox"><?php echo $index + 1 ?></div>
            <div class="verticalBorder"></div>
            <div class="Character3"><?php echo $results['Character3'] ?></div>
            <div class="team-name"><?php echo h($results['team_name']) ?></div>
            <div class="team-images">
                <img src="/img/<?php echo $results['image1'] ?>.png" alt="画像1">
                <img src="/img/<?php echo $results['image2'] ?>.png" alt="画像2">
                <img src="/img/<?php echo $results['image3'] ?>.png" alt="画像3">
            </div>
            <div class="kills"><?php echo $results['kill_point'] ?></div>
            <div class="totalNumber"><?php echo $results['total_point'] ?></div>
        </div>    <?php endforeach; ?>

</body>

</html>