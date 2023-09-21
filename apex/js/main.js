document.addEventListener("DOMContentLoaded", function() {
    // ページが読み込まれたらアニメーションを開始
    animateTeams();
});

function animateTeams() {
    // チームの要素を取得
    const miniBox = document.querySelectorAll(".mini-box");

    // チームを逆順で処理
    for (let i = miniBox.length - 1; i >= 0; i--) {
        const team = miniBox[i];
        setTimeout(() => {
            team.classList.add("animate");
            // 最終試合は1000ミリ秒にする
            if (i === 0) {
                // mini-boxのアニメーションがすべて完了したら、big-boxのアニメーションをトリガー
                setTimeout(() => {
                    animateBigBox();
                }, 100);
            }
        }, (miniBox.length - i) * 400); // アニメーションの遅延時間を調整
    }
}

function animateBigBox() {
    // チームの要素を取得
    const bigBox = document.querySelectorAll(".big-box");

    // チームを逆順で処理
    for (let i = bigBox.length - 1; i >= 0; i--) {
        const team = bigBox[i];
        setTimeout(() => {
            team.classList.add("animate");
        }, (bigBox.length - i) * 1000); // アニメーションの遅延時間を調整
    }
}