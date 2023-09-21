<?php
require_once __DIR__ . '../../db.php';
?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/header.css?ver=1.006">
    <link rel="stylesheet" href="../css/result.css?ver=1.005">
</head>

<body>
    <div class="wrap">
        <?php
        $page = 3;
        $game = 1;
        $theme = 3;
        require_once __DIR__ . '../../header.php';
        ?>
        <main>
            <?php
            $teamname = 'teamname_';
            $kill = 'kill_';
            $i = 1;
            $j = 6;
            $k = 11;
            $l = 16;
            ?>
            <?php
            $pdo_result = new PDO($dbh, $user, $password);
            ?>
            <div class="main-flex">
                <div class="left-box">
                    <div class="box box-index">
                        <div class="rank-index">
                            <p>順位</p>
                        </div>
                        <div class="team-index">
                            <p>チーム名</p>
                        </div>
                        <div class="kill-index">
                            <p>キル数</p>
                        </div>
                    </div>
                    <hr class="index-bottom">
                    <?php
                    $sql_result = "SELECT * FROM `results_table` ORDER BY 1st_rank ASC LIMIT 0,5";
                    $result_array = $pdo_result->query($sql_result);

                    foreach ($result_array as $results) :
                    ?>

                        <div class="box">
                            <div class="rank">
                                <p><?php echo $i ?>位</p>
                            </div>
                            <div class="team-name">
                                <p><?php echo 'チーム' . $results['id'] ?></p>
                            </div>
                            <div class="kill-area">
                                <p><?php echo $results['1st_kill'] ?></p>
                            </div>
                        </div>
                        <?php
                        if ($i <= 5) {
                        ?>
                            <hr>
                    <?php
                        }
                        $i++;
                    endforeach;
                    ?>
                </div>
                <div class="right-box">
                    <div class="box box-index">
                        <div class="rank-index">
                            <p>順位</p>
                        </div>
                        <div class="team-index">
                            <p>チーム名</p>
                        </div>
                        <div class="kill-index">
                            <p>キル数</p>
                        </div>
                    </div>
                    <hr class="index-bottom">
                    <?php
                    $sql_result = "SELECT * FROM `results_table` ORDER BY 1st_rank ASC LIMIT 5,5";
                    $result_array = $pdo_result->query($sql_result);

                    foreach ($result_array as $results) :
                    ?>

                        <div class="box">
                            <div class="rank">
                                <p><?php echo $j ?>位</p>
                            </div>
                            <div class="team-name">
                                <p><?php echo 'チーム' . $results['id'] ?></p>
                            </div>
                            <div class="kill-area">
                                <p><?php echo $results['1st_kill'] ?></p>
                            </div>
                        </div>
                        <?php
                        if ($j <= 10) {
                        ?>
                            <hr>
                    <?php
                        }
                        $j++;
                    endforeach;
                    ?>
                </div>
                <div class="right-box">
                    <div class="box box-index">
                        <div class="rank-index">
                            <p>順位</p>
                        </div>
                        <div class="team-index">
                            <p>チーム名</p>
                        </div>
                        <div class="kill-index">
                            <p>キル数</p>
                        </div>
                    </div>
                    <hr class="index-bottom">
                    <?php
                    $sql_result = "SELECT * FROM `results_table` ORDER BY 1st_rank ASC LIMIT 10,4";
                    $result_array = $pdo_result->query($sql_result);

                    foreach ($result_array as $results) :
                    ?>

                        <div class="box">
                            <div class="rank">
                                <p><?php echo $k ?>位</p>
                            </div>
                            <div class="team-name">
                                <p><?php echo 'チーム' . $results['id'] ?></p>
                            </div>
                            <div class="kill-area">
                                <p><?php echo $results['1st_kill'] ?></p>
                            </div>
                        </div>
                        <?php
                        if ($k <= 15) {
                        ?>
                            <hr>
                    <?php
                        }
                        $k++;
                    endforeach;
                    ?>
                </div>
            </div>
        </main>
    </div>
</body>

</html>