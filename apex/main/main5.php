<?php
require_once __DIR__ . '../../db.php';
$pdo_result = new PDO($dbh, $user, $password);
$teamname = 'teamname_';
$kill = 'kill_';
$i = 1;
$j = 4;
$k = 10;
$l = 16;
?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>5試合目総合結果</title>
    <link rel="stylesheet" href="../css/style.css?ver=1.01">
    <script src="../js/main.js"></script>
</head>

<body>
    <div class="header">
        <div class="logo">
            <a href="../index.html"><img src="../img/logo.PNG" class="icon"></a>
            <!-- <h1>Blur&nbsp;Brah&nbsp;Cup</h1>
            <p>-&nbsp;Apex&nbsp;Legends&nbsp;Season1&nbsp;-</p> -->
        </div>
        <div class="title">
            <h1>▶最終総合結果◀</h1>
        </div>
        <div class="ab">
            <p>match1-match5<br>■■■■■</p>
        </div>
    </div>
    <div class="main">
        <div class="left-box">
            <div class="left-wrap">
                <div class="index">
                    <div class="rank-index">
                        <p>PLACE</p>
                    </div>
                    <div class="team-index">
                        <p>TEAM</p>
                    </div>
                    <div class="img-index"></div>
                    <div class="kill-index">
                        <p>KILL</p>
                    </div>
                    <div class="total-index">
                        <p>TOTAL</p>
                    </div>
                </div>
                <?php
                $sql_result = "SELECT * FROM `results_table` ORDER BY 1st_total + 2nd_total + 3rd_total + 4th_total + 5th_total DESC , best_rank ASC , 1st_kill + 2nd_kill + 3rd_kill + 4th_kill + 5th_kill  DESC LIMIT 0,3";
                $result_array = $pdo_result->query($sql_result);

                foreach ($result_array as $results) :
                ?>
                    <div class="big-box">
                        <div class="rank-area">
                            <div class="rank-box">
                                <p class="abc"><?php echo $i ?></p>
                            </div>
                        </div>
                        <div class="team-area">
                            <p><?php echo 'チーム' . $results['id'] ?></p>
                        </div>
                        <div class="img-area">
                            <!-- <p>アイコン画像×３</p> -->
                            <div class="img-box"><img src="../img/icon/<?php echo $results['img1'] ?>" class="big-img"></div>
                            <div class="img-box"><img src="../img/icon/<?php echo $results['img2'] ?>" class="big-img"></div>
                            <div class="img-box"><img src="../img/icon/<?php echo $results['img3'] ?>" class="big-img"></div>
                        </div>
                        <div class="kill-area">
                            <p><?php
                                $kill = $results['1st_kill'] + $results['2nd_kill'] + $results['3rd_kill'] + $results['4th_kill'] + $results['5th_kill'];
                                echo $kill;
                                ?></p>
                        </div>
                        <div class="total-area">
                            <p><?php
                                $total = $results['1st_total'] + $results['2nd_total'] + $results['3rd_total'] + $results['4th_total'] + $results['5th_total'];
                                echo $total;
                                ?></p>
                        </div>
                    </div>
                <?php
                    $i++;
                endforeach;
                ?>

                <?php
                $sql_result = "SELECT * FROM `results_table` ORDER BY 1st_total + 2nd_total + 3rd_total + 4th_total + 5th_total DESC , best_rank ASC , 1st_kill + 2nd_kill + 3rd_kill + 4th_kill + 5th_kill  DESC LIMIT 3,3";
                $result_array = $pdo_result->query($sql_result); //total_point DESC

                foreach ($result_array as $results) :
                ?>
                    <div class="mini-box">

                        <div class="mini-rank-area">
                            <div class="mini-rank-box">
                                <p class="mini-abc"><?php echo $i ?></p>
                            </div>
                        </div>
                        <div class="mini-team-area">
                            <p><?php echo 'チーム' . $results['id'] ?></p>
                        </div>
                        <div class="mini-img-area">
                            <div class="mini-img-box"><img src="../img/icon/<?php echo $results['img1'] ?>" class="big-img"></div>
                            <div class="mini-img-box"><img src="../img/icon/<?php echo $results['img2'] ?>" class="big-img"></div>
                            <div class="mini-img-box"><img src="../img/icon/<?php echo $results['img3'] ?>" class="big-img"></div>
                        </div>
                        <div class="mini-kill-area">
                            <p><?php
                                $kill = $results['1st_kill'] + $results['2nd_kill'] + $results['3rd_kill'] + $results['4th_kill'] + $results['5th_kill'];
                                echo $kill;
                                ?></p>
                        </div>
                        <div class="mini-total-area">
                            <p><?php
                                $total = $results['1st_total'] + $results['2nd_total'] + $results['3rd_total'] + $results['4th_total'] + $results['5th_total'];
                                echo $total;
                                ?></p>
                        </div>
                    </div>
                <?php
                    $i++;
                endforeach;
                ?>

            </div>
        </div>
        <div class="middle-box"></div>
        <div class="right-box">
            <div class="right-wrap">
                <div class="index">
                    <div class="rank-index">
                        <p>PLACE</p>
                    </div>
                    <div class="team-index">
                        <p>TEAM</p>
                    </div>
                    <div class="img-index"></div>
                    <div class="kill-index">
                        <p>KILL</p>
                    </div>
                    <div class="total-index">
                        <p>TOTAL</p>
                    </div>
                </div>

                <?php
                $sql_result = "SELECT * FROM `results_table` ORDER BY 1st_total + 2nd_total + 3rd_total + 4th_total + 5th_total DESC , best_rank ASC , 1st_kill + 2nd_kill + 3rd_kill + 4th_kill + 5th_kill  DESC LIMIT 6,8";
                $result_array = $pdo_result->query($sql_result);

                foreach ($result_array as $results) :
                ?>
                    <div class="mini-box">

                        <div class="mini-rank-area">
                            <div class="mini-rank-box">
                                <p class="mini-abc"><?php echo $i ?></p>
                            </div>
                        </div>
                        <div class="mini-team-area">
                            <p><?php echo 'チーム' . $results['id'] ?></p>
                        </div>
                        <div class="mini-img-area">
                            <div class="mini-img-box"><img src="../img/icon/<?php echo $results['img1'] ?>" class="big-img"></div>
                            <div class="mini-img-box"><img src="../img/icon/<?php echo $results['img2'] ?>" class="big-img"></div>
                            <div class="mini-img-box"><img src="../img/icon/<?php echo $results['img3'] ?>" class="big-img"></div>
                        </div>
                        <div class="mini-kill-area">
                            <p><?php
                                $kill = $results['1st_kill'] + $results['2nd_kill'] + $results['3rd_kill'] + $results['4th_kill'] + $results['5th_kill'];
                                echo $kill;
                                ?></p>
                        </div>
                        <div class="mini-total-area">
                            <p><?php
                                $total = $results['1st_total'] + $results['2nd_total'] + $results['3rd_total'] + $results['4th_total'] + $results['5th_total'];
                                echo $total;
                                ?></p>
                        </div>
                    </div>
                <?php
                    $i++;
                endforeach;
                ?>

            </div>
        </div>
    </div>

</body>

</html>