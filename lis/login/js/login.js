// Firebaseを初期化
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyArCsB4IjxAyz50mPUU302pI3GRyfQerMY",
  authDomain: "lis-web-app-116aa.firebaseapp.com",
  projectId: "lis-web-app-116aa",
  storageBucket: "lis-web-app-116aa.appspot.com",
  messagingSenderId: "969669079165",
  appId: "1:969669079165:web:84c42c31eba902de074114",
  measurementId: "G-D9B3HTKLC6"
});

const auth = firebaseApp.auth();
let selectedDataId = null; // 現在選択中のデータのID

// ログインするメソッド
const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  window.location.href = "../menu/menu_top/menu.html";

  auth
  .signInWithEmailAndPassword(email, password)
  .then((res) => {
    console.log(res.user);
    window.location.href = "../menu/menu_top/menu.html";
  })
  .catch((err) => {
    // ダイアログが表示されるようにする
    alert(err.message);
    console.log(err.code);
    console.log(err.user);
  });
};

// 一つ前のページに戻る
function goBack() {
  window.history.back();
}