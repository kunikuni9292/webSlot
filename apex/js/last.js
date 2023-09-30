var btn = document.getElementById('exe_botan');

// Enterキー押下時、送信処理が実行する
window.document.onkeydown = function (event) {
    if (event.key === 'Enter') {
        animateTeams();
    }
};

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
                var btn2 = document.getElementById('exe_botan');

                window.document.onkeydown = function (event) {
                    if (event.key === 'Enter') {
                        animateBigBox();
                    }
                };

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
            }, (bigBox.length - i) * 0); // アニメーションの遅延時間を調整
    }
}