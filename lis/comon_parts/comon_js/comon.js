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
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ログイン時にユーザー情報を取得
auth.onAuthStateChanged((user) => {
  if (user) {
    // ログイン済みの場合、ユーザー情報を取得
    const userDisplayName = user.displayName;
    const userProfilePicture = user.photoURL;

    // プロフィール画像を表示
    if (userProfilePicture) {
      const profilePictureElement = document.getElementById("profilePicture");
      profilePictureElement.src = userProfilePicture;
    } else {
      // デフォルトのプロフィール画像を表示
      const defaultProfilePictureElement = document.getElementById("defaultProfilePicture");
      defaultProfilePictureElement.style.display = "block";
    }

    // ユーザー名を表示
    if (userDisplayName) {
      const userNameElement = document.getElementById("userName");
      userNameElement.textContent = userDisplayName;
    }
  }
});


// Googleからサインアウトするメソッドを追加
const signOut = () => {
  auth.signOut().then(() => {
    // サインアウト成功
    console.log("サインアウトしました");
    // ここで適切なリダイレクションまたは処理を行うことができます
  }).catch((error) => {
    // エラー処理
    console.error(error);
  });
};

// 一つ前のページに戻る
function goBack() {
  window.history.back();
}