// Googleログインメソッド
const loginWithGoogle = () => {
  fetch('https://us-central1-lis-web-app-116aa.cloudfunctions.net/getFirebaseConfig')
    .then(response => response.json())
    .then(data => {
      // NOTE:　エンドポイントの中身見るために用意
      console.log("data=", data);

      // dataにFirebaseの設定情報が含まれる
      const firebaseApp = firebase.initializeApp(data);
      // authとproviderを使用して認証システムを使用する
      const auth = firebase.auth();
      const provider = new firebase.auth.GoogleAuthProvider();

      // Googleログイン処理
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
    })
    .catch(error => {
      // エラー処理
      console.error('Error fetching Firebase config:', error);
    });
};

// 一つ前のページに戻る
function goBack() {
  window.history.back();
}