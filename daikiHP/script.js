$(".openbtn1").mouseenter(function() { //ボタンがクリックされたら
    $(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
    $("#menu").toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
});
// 画像orメニューからマウスが離れるとナビが閉じる
$(".openbtn1, #menu").mouseleave(function() { // 画像またはメニューからマウスが離れたら
    $(".openbtn1").removeClass('active'); // 画像の active クラスを除去
    $("#menu").removeClass('panelactive'); // メニューの panelactive クラスを除去
});

$("#menu a").click(function() { //ナビゲーションのリンクがクリックされたら
    $(".openbtn1").removeClass('active'); //ボタンの activeクラスを除去し
    $("#menu").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
});