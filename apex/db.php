<?php

function h($data)
{
    return htmlspecialchars($data, ENT_QUOTES, "UTF-8");
}

$comment_array = array();
$pdo = null;
$stmt = null;

//DB接続
try {
    $dbh = 'mysql:host=localhost;dbname=apex';
    $user = "tester";
    $password = "apex0930";
    $pdo = new PDO($dbh,$user,$password);
} catch (PDOException $e) {
    echo $e->getMessage();
}



//DBからコメントデータお取得する


//DBを閉じる
$pdo = null;
?>