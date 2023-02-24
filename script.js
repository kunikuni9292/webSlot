
// スロット画像配列
// var slotImg = ['slot1.jpg', 'slot2.jpg', 'slot3.jpg', 'slot4.jpg', 'slot5.jpg', 'slot6.jpg', 'slot7.jpg'];
var slotImg = ['bell.png', 'cherry.png', 'gorilla.png', 'palm.png', 'seven.png', 'watermelon.png'];
// 縦に並べるスロット画像の数
var slotNum = 500;
// スロット画像のスタート位置
var startPos = -30 * (slotNum - 3);
// スロット画像の停止位置
var stopPos = 0;
// 最後に真ん中（２行目）にくるスロット画像の番号
var middleNum = 2;
// 回転エフェクト配列（jQuery easing）
// var slotEasing = ['swing', 'easeOutQuart', 'easeOutBack', 'easeOutBounce'];
// 回転秒数
var slotDuration = 5;
// リーチ時の回転秒数
var reachDuration = 20;
// 動画の再生時間(秒)
var movieDuration = 10;
// 当たり目確率（1=100%、0.5=50%）
var kakuritu = 0.9;
// リーチの当たり目確率（1=100%、0.5=50%）
var reachKakuritu = 1;
/*---------------------
 Definitions
-----------------------*/
var atariIdx;
var easingIdx;
var hantei;
var reachHantei;
var time;
var result1 = new Array();
var result2 = new Array();
var result3 = new Array();


/*---------------------
 Functions
-----------------------*/
/* 初期処理 */
$(document).ready(function () {
    // 動画初期非表示
    $('#movie', parent.document).hide();

    // 当たり判定
    atariHantei();
    // A枠にスロット画像を生成
    slotCreate($("#slots_a .wrapper"), 1, false);
    // B枠にスロット画像を生成
    slotCreate($("#slots_b .wrapper"), 2, true);
    // C枠にスロット画像を生成
    slotCreate($("#slots_c .wrapper"), 3, false);

    // 1秒後に自動でdram回転する
    setTimeout(function () {
        slotStart()
    }, 1000);

});

/* 当たり判定 */
function atariHantei() {
    atariIdx = Math.floor(Math.random() * slotImg.length);
    hantei = Math.random() < kakuritu;
    reachHantei = Math.random() < reachKakuritu;
};

/* スロット画像生成 isMidslot=真ん中のスロットかどうか */
function slotCreate(obj, slotno, isMidslot) {

    // アニメーションをストップ（アニメーション処理中の場合の対応）
    obj.stop(true, true);
    // 枠内の要素をクリア
    obj.children().remove();

    // 前回結果を退避
    // 1行目の画像INDEXをセーブ
    var save_result1 = result1[slotno];
    // 2行目の画像INDEXをセーブ
    var save_result2 = result2[slotno];
    // 3行目の画像INDEXをセーブ
    var save_result3 = result3[slotno];

    // スロット画像のタグ生成
    for (var i = 1; i <= slotNum; i++) {
        // 画像ファイルは配列からランダムに取得
        var idx = Math.floor(Math.random() * slotImg.length);

        // 画像ファイルの調整
        if (i == middleNum - 1) {
            // 最後に1行目にくる画像
            result1[slotno] = idx;
        } else if (i == middleNum) {
            // 真ん中のスロットじゃない時かつリーチ判定がtrueの時atariIdxが入る
            if (!isMidslot && reachHantei) {
                // スロット1,3のインデックスを揃える
                idx = atariIdx;
                // 真ん中のスロットの時かつ当たり判定がtrueの時atariIdxが入る
            } else if (isMidslot && hantei) {
                idx = atariIdx;
            }
            result2[slotno] = idx;
        } else if (i == middleNum + 1) {
            // 最後に3行目にくる画像
            result3[slotno] = idx;
        } else if (i == slotNum - 2) {
            // 最初に1行目にくる画像
            if (save_result1 != undefined) {
                // 前回結果の1行目の画像INDEXを設定
                idx = save_result1;
            }
        } else if (i == slotNum - 1) {
            // 最初に2行目にくる画像
            if (save_result2 != undefined) {
                // 前回結果の2行目の画像INDEXを設定
                idx = save_result2;
            }
        } else if (i == slotNum) {
            // 最初に3行目にくる画像
            if (save_result3 != undefined) {
                // 前回結果の3行目の画像INDEXを設定
                idx = save_result3;
            }
        }

        obj.append("<div class='slot'>" +
            "<img border='0'" +
            " src='img/" + slotImg[idx] + "'" +
            // 画像の大きさ
            " width='100' height='60' />" +
            "</div>");
    }

    // スロット画像のスタート位置を設定
    obj.css({
        "margin-top": startPos + "px"
    });
}

/* スロットスタート */
function slotStart() {

    // スタートボタンの無効化
    $("#startBtn").prop('disabled', true);


    if ($("#slots_a .wrapper").css("margin-top") != startPos + "px") {
        // スロットが動いた後であれば、当たり判定を再度行なう
        atariHantei();
    }

    // スロットの回転秒数の取得
    time = slotDuration * 1000;
    reachTime = reachDuration * 1000;
    // 動画の再生時間
    movieTime = movieDuration * 1000;
 
    // A枠のスロット画像移動
    slotMove($("#slots_a .wrapper"), 1);
    // 少し遅れてC枠のスロット画像移動
    setTimeout(function () {
        slotMove($("#slots_c .wrapper"), 3);
    }, 1000);
    // さらに少し遅れてB枠のスロット画像移動
    setTimeout(function () {
        slotMove($("#slots_b .wrapper"), 2, reachHantei);
    }, 2000);

    // リーチの時
    if (reachHantei) {
        setTimeout(function () {
            $('#slot', parent.document).hide();
            $('#movie', parent.document).show();
        }, time + 1250);
        // 動画再生後
        setTimeout(function () {
            $('#slot', parent.document).show();
            $('#movie', parent.document).hide();
        }, time + 1250 + movieTime);
        // ビンゴの時
    }else if (reachHantei&&hantei){

    }

    // スロット停止後の処理（jQueryキューで回転秒数後に実行）
    // TODO: 回転中に判定可能にする
    $(this).delay(time + 500).queue(function () {
        // // リーチ判定
        // if (result2[1] == result2[3]) {
        //     //　リーチの時の真ん中の長尺(秒)
        //     reachNum = 3;
        //     // スロットの回転秒数の取得
        //     reachtime = reachNum * 1000;

        //     // アニメーションを10回繰り返すように指示する
        //     var count = 0;
        //     var intervalId = setInterval(function () {
        //         slotMove($("#slots_b .wrapper"), 2, true);
        //         count++;
        //         if (count === reachNum) {
        //             clearInterval(intervalId);
        //         }
        //     }, 1000);
        //     // 10秒後に自動でアニメーションを停止する
        //     setTimeout(function () {
        //         clearInterval(intervalId);
        //     }, reachtime);
        // }




        // 結果判定
        if (result2[1] == result2[2] && result2[1] == result2[3]) {

            // TODO: スロットを非表示動画を表示
            // $('#slot', parent.document).hide();
            // $('#movie', parent.document).show();

        } else {
            // ビンゴ揃わなかったら真ん中だけ走る
            // slotMove($("#slots_b .wrapper"), 2);

            // 親ページの「id=”slot”」の透明度を0にする動作が実行
            // $('#slot', parent.document).stop().animate({ opacity: '0' });
            // 親ページの「id=”movie”」をゆっくり表示させる
            // $('#movie', parent.document).fadeIn(1000);
            // 表示非表示
            // $('#slot', parent.document).hide();
            // $('#movie', parent.document).show();

            console.log("saga")
        }

        // スタートボタンの有効化
        $("#startBtn").prop('disabled', false);

        // キュー削除
        $(this).dequeue();
    });
}

/* スロット画像移動 */
function slotMove(obj, slotno, reach) {
    var slotEasing = ['swing', 'easeOutQuart', 'easeOutBack', 'easeOutBounce', 'easeOutCubic', 'easeOutQuad'];

    if (obj.css("margin-top") != startPos + "px") {
        // スロットが動いた後であれば、スロット画像を再作成
        slotCreate(obj, slotno);
    }

    // スロット画像の移動アニメーション
    obj.animate({
        "margin-top": stopPos + "px"
    }, {
        'duration': reach ? reachTime : time,
        'easing': slotEasing[5]
    });
};