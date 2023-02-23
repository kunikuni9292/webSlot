// Debug用に用意　のちに削除するもの
// 起動時どうがを非表示にする
document.getElementById("movie").style.display = "none";
function test() {
    var change = document.getElementById("movie");
    change.style.display = change.style.display == "block" ? "none" : "block";
}
