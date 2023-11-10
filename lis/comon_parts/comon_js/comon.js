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
        const navProfilePictureElement = document.getElementById("nav-profilePicture");
        const profilePictureElement = document.getElementById("profilePicture");
        navProfilePictureElement.src = userProfilePicture;
        profilePictureElement.src = userProfilePicture;
      }

      // ユーザー名を表示
      if (userDisplayName) {
        const userNameElement = document.getElementById("userName");
        userNameElement.textContent = userDisplayName;
      }
    }
  });

  function toggleProfilePanel() {
  const profilePanelElement = document.getElementById("profilePanel");
  console.log("プロフィール画像クリックされた！！");
  console.log("profilePanelElement", profilePanelElement);

  if (profilePanelElement) {
    if (profilePanelElement.style.display === "none") {
      // プロフィールパネルが非表示の場合は表示する
      profilePanelElement.style.display = "block";
    } else {
      // プロフィールパネルが表示されている場合は非表示にする
      profilePanelElement.style.display = "none";
    }
  }
}

  // Googleからサインアウトするメソッドを追加
  function signOut() {
    auth.signOut().then(() => {
      // サインアウト成功
      console.log("サインアウトしました");
      window.location.href = "../../login/login.html";

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

