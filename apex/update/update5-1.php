<?php

// DB接続
$recode = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
$pdo2 = new PDO($dbh, $user, $password, $recode);
$pdo_total = new PDO($dbh, $user, $password);

$j = 1;
// SQL文をセット
for ($num = 1; $num <= 14; $num++) {

    //？順位のチーム名
    $team_rank_index = 'team_rank_' . $j;
    $team_rank_string = $$team_rank_index;
    $team_rank = (int) $team_rank_string;
    //？位のキル数
    $team_kill_index = 'team_kill_' . $j;
    $team_kill_string = $$team_kill_index;
    $team_kill = (int) $team_kill_string;

    $stmt = $pdo2->prepare('UPDATE results_table SET 5th_rank = :5th_rank , 5th_kill = :5th_kill , 5th_total = :5th_total  WHERE id = :id');

    // 順位ポイント計算 
    switch ($j) {
        case 0:
            $rank = 0;
            break;
        case 1:
            $rank = 12;
            break;
        case 2:
            $rank = 9;
            break;
        case 3:
            $rank = 7;
            break;
        case 4:
            $rank = 5;
            break;
        case 5:
            $rank = 4;
            break;
        case 6:
        case 7:
            $rank = 3;
            break;
        case 8:
        case 9:
        case 10:
            $rank = 2;
            break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            $rank = 1;
            break;
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
            $rank = 0;
            break;
    }
    $team_total = $rank + $team_kill;

    $stmt->bindValue(':id', $team_rank);
    $stmt->bindValue(':5th_rank', $j);
    $stmt->bindValue(':5th_kill', $team_kill);
    $stmt->bindValue(':5th_total', $team_total);

    // SQL実行
    $stmt->execute();

    //最高順位
    $sql_total = "SELECT * FROM `results_table` WHERE id = $team_rank ";
    $total_array = $pdo_total->query($sql_total);

    foreach ($total_array as $total) {

        $best_rank = $total['best_rank'];
        $rank_5th = $total['5th_rank'];

        if ($rank_5th < $best_rank) {
            $stmt_total = $pdo_total->prepare('UPDATE results_table SET best_rank = :best_rank WHERE id = :id');

            $stmt_total->bindValue(':id', $team_rank);
            $stmt_total->bindValue(':best_rank', $rank_5th);
            // SQL実行
            $stmt_total->execute();
        }
    }

    $j++;
}
