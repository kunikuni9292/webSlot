<?php
require_once __DIR__ . '../../db.php';

// DB接続
$recode = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
$pdo2 = new PDO($dbh, $user, $password, $recode);
$pdo_best = new PDO($dbh, $user, $password);

$j = 1;
// SQL文をセット

//最高順位
$sql_best = "SELECT * FROM `results_table` WHERE id = id ";
$best_array = $pdo_best->query($sql_best);

$j = 1;
foreach ($best_array as $best) {

    if ($best['1st_rank'] == 0) {
        $rank_1st = 1000;
    } else {
        $rank_1st = $best['1st_rank'];
    }
    if ($best['2nd_rank'] == 0) {
        $rank_2nd = 1000;
    } else {
        $rank_2nd = $best['2nd_rank'];
    }
    if ($best['3rd_rank'] == 0) {
        $rank_3rd = 1000;
    } else {
        $rank_3rd = $best['3rd_rank'];
    }
    if ($best['4th_rank'] == 0) {
        $rank_4th = 1000;
    } else {
        $rank_4th = $best['4th_rank'];
    }
    if ($best['5th_rank'] == 0) {
        $rank_5th = 1000;
    } else {
        $rank_5th = $best['5th_rank'];
    }

    $best_rank_1st = min($rank_1st, 1000);
    $best_rank_2nd = min($rank_1st, $rank_2nd);
    $best_rank_3rd = min($rank_1st, $rank_2nd, $rank_3rd);
    $best_rank_4th = min($rank_1st, $rank_2nd, $rank_3rd, $rank_4th,);
    $best_rank_5th = min($rank_1st, $rank_2nd, $rank_3rd, $rank_5th);

    //past_bestを書き換える
    $stmt_best = $pdo_best->prepare('UPDATE results_table SET best_rank = :best_rank WHERE id = :id');

    $stmt_best->bindValue(':id', $j);
    switch ($past) {
        case 1:
            $stmt_best->bindValue(':best_rank', $best_rank_1st);
            break;
        case 2:
            $stmt_best->bindValue(':best_rank', $best_rank_2nd);
            break;
        case 3:
            $stmt_best->bindValue(':best_rank', $best_rank_3rd);
            break;
        case 4:
            $stmt_best->bindValue(':best_rank', $best_rank_4th);
            break;
        case 5:
            $stmt_best->bindValue(':best_rank', $best_rank_4th);
            break;
    }
    

    $stmt_best->execute();
    $j++;
}
?>
