<?php
require_once __DIR__ . '../../db.php';
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../css/up.css?ver=1.007">
    <link rel="stylesheet" href="../css/header.css?ver=1.002">
</head>

<body>
    <div class="title"><h2>5試合目ー1チームごと入力</h2></div>
    <header>
        <?php
        $page = 2;
        require_once __DIR__ . '../../header.php';
        ?>
        <?php
    require_once __DIR__  . '../../data/form_index.php';
    require_once __DIR__  . '../../update/update5-1.php';
    ?>
    </header>
    <main>
        <form action="up5-2.php" method="POST" name="test">
            <?php
            $teamname = 'teamname_';
            $kill = 'kill_';
            $j = 1;
            $z = 6;
            $x = 11;
            $y = 16;
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
                    for ($i = 1; $i <= 5; $i++) {
                    ?>
                        <div class="box">
                            <div class="rank">
                                <p><?php echo $j ?>位</p>
                            </div>
                            <div class="team-name">
                                <label class="selectbox-002">
                                    <select name="<?php echo $teamname . $j ?>" id="">
                                        <option value="0">チーム名を選択</option>
                                        <option value="1">チーム1</option>
                                        <option value="2">チーム2</option>
                                        <option value="3">チーム3</option>
                                        <option value="4">チーム4</option>
                                        <option value="5">チーム5</option>
                                        <option value="6">チーム6</option>
                                        <option value="7">チーム7</option>
                                        <option value="8">チーム8</option>
                                        <option value="9">チーム9</option>
                                        <option value="10">チーム10</option>
                                        <option value="11">チーム11</option>
                                        <option value="12">チーム12</option>
                                        <option value="13">チーム13</option>
                                        <option value="14">チーム14</option>
                                        
                                    </select>
                                </label>
                            </div>
                            <div>
                                <input type="number" class="kill-point" name="<?php echo $kill . $j; ?>">
                            </div>
                        </div>
                        <?php
                        if ($i <= 5) {
                        ?>
                            <hr>
                        <?php
                        }
                        ?>
                    <?php
                        $j++;
                    }
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
                    for ($k = 1; $k <= 5; $k++) {
                    ?>
                        <div class="box">
                            <div class="rank">
                                <p><?php echo $z ?>位</p>
                            </div>
                            <div class="team-name">
                                <label class="selectbox-002">
                                    <select name="<?php echo $teamname . $z ?>" id="">
                                        <option value="0">チーム名を選択</option>
                                        <option value="1">チーム1</option>
                                        <option value="2">チーム2</option>
                                        <option value="3">チーム3</option>
                                        <option value="4">チーム4</option>
                                        <option value="5">チーム5</option>
                                        <option value="6">チーム6</option>
                                        <option value="7">チーム7</option>
                                        <option value="8">チーム8</option>
                                        <option value="9">チーム9</option>
                                        <option value="10">チーム10</option>
                                        <option value="11">チーム11</option>
                                        <option value="12">チーム12</option>
                                        <option value="13">チーム13</option>
                                        <option value="14">チーム14</option>
                                        
                                    </select>
                                </label>
                            </div>

                            <div>
                                <input type="number" class="kill-point" name="<?php echo $kill . $z; ?>">
                            </div>
                        </div>
                        <?php
                        if ($k <= 5) {
                        ?>
                            <hr>
                        <?php
                        }
                        ?>
                    <?php
                        $z++;
                    }
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
                    for ($l = 1; $l <= 5; $l++) {
                    ?>
                        <div class="box">
                            <div class="rank">
                                <p><?php echo $x ?>位</p>
                            </div>
                            <div class="team-name">
                                <label class="selectbox-002">
                                    <select name="<?php echo $teamname . $x ?>" id="">
                                        <option value="0">チーム名を選択</option>
                                        <option value="1">チーム1</option>
                                        <option value="2">チーム2</option>
                                        <option value="3">チーム3</option>
                                        <option value="4">チーム4</option>
                                        <option value="5">チーム5</option>
                                        <option value="6">チーム6</option>
                                        <option value="7">チーム7</option>
                                        <option value="8">チーム8</option>
                                        <option value="9">チーム9</option>
                                        <option value="10">チーム10</option>
                                        <option value="11">チーム11</option>
                                        <option value="12">チーム12</option>
                                        <option value="13">チーム13</option>
                                        <option value="14">チーム14</option>
                                        
                                    </select>
                                </label>
                            </div>

                            <div>
                                <input type="number" class="kill-point" name="<?php echo $kill . $x; ?>">
                            </div>
                        </div>
                        <?php
                        if ($l <= 5) {
                        ?>
                            <hr>
                        <?php
                        }
                        ?>
                    <?php
                        $x++;
                    }
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
                    for ($m = 1; $m <= 5; $m++) {
                    ?>
                        <div class="box">
                            <div class="rank">
                                <p><?php echo $y ?>位</p>
                            </div>
                            <div class="team-name">
                                <label class="selectbox-002">
                                    <select name="<?php echo $teamname . $y ?>" id="">
                                        <option value="0">チーム名を選択</option>
                                        <option value="1">チーム1</option>
                                        <option value="2">チーム2</option>
                                        <option value="3">チーム3</option>
                                        <option value="4">チーム4</option>
                                        <option value="5">チーム5</option>
                                        <option value="6">チーム6</option>
                                        <option value="7">チーム7</option>
                                        <option value="8">チーム8</option>
                                        <option value="9">チーム9</option>
                                        <option value="10">チーム10</option>
                                        <option value="11">チーム11</option>
                                        <option value="12">チーム12</option>
                                        <option value="13">チーム13</option>
                                        <option value="14">チーム14</option>
                                        
                                    </select>
                                </label>
                            </div>

                            <div>
                                <input type="number" class="kill-point" name="<?php echo $kill . $y; ?>">
                            </div>
                        </div>
                        <?php
                        if ($m <= 5) {
                        ?>
                            <hr>
                        <?php
                        }
                        ?>
                    <?php
                        $y++;
                    }
                    ?>
                </div>
            </div>
            <button class="button-029" type="submit" hr>入力する</button>
        </form>
    </main>
</body>

</html>