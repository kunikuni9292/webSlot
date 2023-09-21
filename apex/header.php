<header>
    <div class="logo-area">
        <div class="logo">
            <a href=".././index.html"><img src="../img/logo3.png" class="icon"></a>
        </div>
        <div class="title">
            <h2><?php echo $game ?>試合目ー<?php if ($theme == 1) {
                                            echo 'まとめて入力';
                                        } elseif ($theme == 2) {
                                            echo 'まとめて入力';
                                        } elseif ($theme == 3) {
                                            echo '確認画面';
                                        } ?></h2>
        </div>
    </div>
    <div class="tab-001">
        <label>
            <input type="radio" name="tab-001" <?php if ($page == 1) {
                                                    echo 'checked';
                                                } ?>>
            まとめて入力
        </label>
        <div>
            <div class="btn-flex">
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-1/up1-1.php'">1試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-1/up2-1.php'">2試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-1/up3-1.php'">3試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-1/up4-1.php'">4試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-1/up5-1.php'">5試合目</button>
                </div>
            </div>
        </div>

        <!--  <label>
            <input type="radio" name="tab-001"<?php if ($page == 2) {
                                                    echo 'checked';
                                                } ?>>
            １チームごと入力
        </label>
        <div>
            <div class="btn-flex">
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-2/up1-2.php'">1試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-2/up2-2.php'">2試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-2/up3-2.php'">3試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-2/up4-2.php'">4試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../up-2/up5-2.php'">5試合目</button>
                </div>
            </div>
        </div> -->

        <label>
            <input type="radio" name="tab-001" <?php if ($page == 3) {
                                                    echo 'checked';
                                                } ?>>
            確認画面
        </label>
        <div>
            <div class="btn-flex">
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../check/check1.php'">1試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../check/check2.php'">2試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../check/check3.php'">3試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../check/check4.php'">4試合目</button>
                </div>
                <div class="btn-box">
                    <button class="button-051" onclick="location.href='../check/check5.php'">5試合目</button>
                </div>
            </div>
        </div>
    </div>
</header>