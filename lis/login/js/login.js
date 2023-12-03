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

const auth = firebase.auth(firebaseApp);
const provider = new firebase.auth.GoogleAuthProvider(firebaseApp);

// Googleログインメソッド
const loginWithGoogle = () => {
  // window.location.href = "../menu/menu_top/menu.html";

  auth.signInWithPopup(provider)
    .then((result) => {
      // Googleログイン成功
      const user = result.user;
      console.log(user);
      window.location.href = "../menu/menu_top/menu.html";
    })
    .catch((error) => {
      // エラー処理
      alert(error.message);
      console.error(error.code);
      console.error(error.message);
    });
};

// 一つ前のページに戻る
function goBack() {
  window.history.back();
}