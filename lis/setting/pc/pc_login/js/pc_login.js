// Firebaseの設定情報を取得し、Firebase Authenticationを使ってGoogleログインするメソッド
const loginWithGoogle = () => {
  fetchFirebaseConfig()
    .then(data => {
      const firebaseApp = firebase.initializeApp(data);
      performGoogleLogin(firebaseApp);
    })
    .catch(error => {
      console.error('Error fetching Firebase config:', error);
    });
};

// Firebaseの設定情報を取得する関数
const fetchFirebaseConfig = () => {
  return fetch('https://us-central1-lis-web-app-116aa.cloudfunctions.net/getFirebaseConfig')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch Firebase config');
      }
      return response.json();
    });
};


// Googleログインを行う関数
const performGoogleLogin = (firebaseApp) => {
  const auth = firebase.auth(firebaseApp);
  const provider = new firebase.auth.GoogleAuthProvider(firebaseApp);

  auth.signInWithPopup(provider)
    .then((result) => {
      // Googleログイン成功
      const user = result.user;
      console.log(user);
      window.location.href = "../../addstoreid/addstoreid.html";
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