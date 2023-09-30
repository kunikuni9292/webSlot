var btn = document.getElementById('exe_botan');

    // Enterキー押下時、送信処理が実行する
    window.document.onkeydown = function(event){
        if (event.key === 'Enter') {
            var elem = document.getElementById("elem01");
            elem.style.backgroundColor = "#c3ebff";
        }
    }