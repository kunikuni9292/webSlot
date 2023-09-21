<?php

// DB接続
$recode = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
$pdo2 = new PDO($dbh, $user, $password, $recode);
$pdo_total = new PDO($dbh, $user, $password);

$j = 1;
// SQL文をセット
for ($num = 1; $num <= 20; $num++) {

    //？順位のチーム名
    $team_rank_index = 'team_rank_' . $j;
    $team_rank_string = $$team_rank_index;
    $team_rank = (int) $team_rank_string;
    //？位のキル数
    $team_kill_index = 'team_kill_' . $j;
    $team_kill_string = $$team_kill_index;
    $team_kill = (int) $team_kill_string;

    $stmt = $pdo2->prepare('UPDATE results_table SET 1st_rank = :1st_rank , 1st_kill = :1st_kill  WHERE id = :id');

    // 順位ポイント計算 
    /* switch ($j) {
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
    } */
    
    //キルポイント計算(上限：1試合目6pt、2,3試合目9pt、4,5試合目なし)
    /* if($team_kill > 6){
        $team_kill = 6;
    } */

    $stmt->bindValue(':id', $team_rank);
    $stmt->bindValue(':1st_rank', $j);
    $stmt->bindValue(':1st_kill', $team_kill);

    // SQL実行
    $stmt->execute();


    //総合ポイント
    $sql_total = "SELECT * FROM `results_table` WHERE id = $team_rank ";
    $total_array = $pdo_total->query($sql_total);

    foreach ($total_array as $total) {
        $rank_1st = $total['1st_rank'];
        $kill_1st = $total['1st_kill'];

        $rank_2nd = $total['2nd_rank'];
        $kill_2nd = $total['2nd_kill'];

        $rank_3rd = $total['3rd_rank'];
        $kill_3rd = $total['3rd_kill'];

        $rank_4th = $total['4th_rank'];
        $kill_4th = $total['4th_kill'];

        $rank_5th = $total['5th_rank'];
        $kill_5th = $total['5th_kill'];

        $total_rank = $rank_1st + $rank_2nd + $rank_3rd + $rank_4th + $rank_5th;
        $total_kill = $kill_1st + $kill_2nd + $kill_3rd + $kill_4th + $kill_5th;
        $total_point = $total_rank + $total_kill;
    }

    $stmt_total = $pdo_total->prepare('UPDATE results_table SET total_point = :total_point , total_rank = :total_rank , total_kill = :total_kill  WHERE id = :id');

    $stmt_total->bindValue(':id', $team_rank);
    $stmt_total->bindValue(':total_point', $total_point);
    $stmt_total->bindValue(':total_rank', $total_rank);
    $stmt_total->bindValue(':total_kill', $total_kill);

    // SQL実行
    $stmt_total->execute();

    $j++;
}
?>