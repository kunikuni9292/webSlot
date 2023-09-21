var btn = document.getElementById('btn1');

btn.addEventListener('click', function () {
    var result = window.confirm('本当にリセットしますか？');

    if (result) {
        window.location.href = './update/reset1.php';
    }
    else {
        console.log('キャンセルがクリックされました');
    }
})

var btn2 = document.getElementById('btn2');

btn2.addEventListener('click', function () {
    var result2 = window.confirm('本当にリセットしますか？');

    if (result2) {
        window.location.href = './update/reset2.php';
    }
    else {
        console.log('キャンセルがクリックされました');
    }
})

var btn3 = document.getElementById('btn3');

btn3.addEventListener('click', function () {
    var result3 = window.confirm('本当にリセットしますか？');

    if (result3) {
        window.location.href = './update/reset3.php';
    }
    else {
        console.log('キャンセルがクリックされました');
    }
})

var btn4 = document.getElementById('btn4');

btn4.addEventListener('click', function () {
    var result4 = window.confirm('本当にリセットしますか？');

    if (result4) {
        window.location.href = './update/reset4.php';
    }
    else {
        console.log('キャンセルがクリックされました');
    }
})

var btn5 = document.getElementById('btn5');

btn5.addEventListener('click', function () {
    var result5 = window.confirm('本当にリセットしますか？');

    if (result5) {
        window.location.href = './update/reset5.php';
    }
    else {
        console.log('キャンセルがクリックされました');
    }
})