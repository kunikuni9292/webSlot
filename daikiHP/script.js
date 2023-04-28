$(".openbtn1").mouseenter(function() { //ボタンがクリックされたら
    $(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
    $("#menu").toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
});

$("#menu a").click(function() { //ナビゲーションのリンクがクリックされたら
    $(".openbtn1").removeClass('active'); //ボタンの activeクラスを除去し
    $("#menu").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
});