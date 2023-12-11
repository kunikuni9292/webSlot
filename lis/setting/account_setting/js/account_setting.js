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

  // ユーザーデータがあるか確認
  if (auth.currentUser) {
    userSubCollection.get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // データが存在する場合、それをテキストフィールドに設定
          const userData = querySnapshot.docs[0].data();
          document.getElementById("personalSex").value = userData.sex || '';
          document.getElementById("dateBirth").value = userData.dateBirth || '';
          document.getElementById("height").value = userData.height || '';
          document.getElementById("bodyWeight").value = userData.weight || '';
        } else {
          console.log("ユーザーデータはありません");
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  } else {
    console.log("ユーザーはログインしていません");
  }
};


// 画面読み込み時に実行
window.onload = () => {
  checkUserData(); // ユーザーデータの取得
};

// 登録関数内でユーザー情報を取得してサブコレクションを作成する
const register = () => {
  // firebaseの初期化インスタンス使用
  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();
  // ユーザーがログインしていることを確認
  const user = auth.currentUser;

  if (user) {
    // ユーザー情報を取得
    const userEmail = user.email;
    const userName = user.displayName;

    // ここでフォームからのデータを取得
    const sex = document.getElementById("personalSex").value;
    const dateBirth = document.getElementById("dateBirth").value;
    const height = document.getElementById("height").value;
    const bodyWeight = document.getElementById("bodyWeight").value;

    // ユーザーのUIDを使用してサブコレクションを作成
    const userSubCollection = db.collection("users").doc(user.uid).collection("user_data");

    // ユーザーデータの取得
    userSubCollection.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        // 新しいデータと既存データを比較
        if (
          userData.sex === sex &&
          userData.dateBirth === dateBirth &&
          userData.height === height &&
          userData.weight === bodyWeight
        ) {
          console.log("データが同じです。更新はありません");
        } else {
          // データを更新
          userSubCollection.doc(querySnapshot.docs[0].id).update({
            sex: sex,
            dateBirth: dateBirth,
            height: height,
            weight: bodyWeight
          }).then(() => {
            console.log("データが更新されました");
          }).catch((error) => {
            console.error("データの更新中にエラーが発生しました:", error);
          });
        }
      } else {
        // データが存在しない場合は新しいデータを追加
        userSubCollection.add({
          name: userName,
          email: userEmail,
          sex: sex,
          dateBirth: dateBirth,
          height: height,
          weight: bodyWeight
        }).then(() => {
          console.log("新しいデータが追加されました");
        }).catch((error) => {
          console.error("新しいデータの追加中にエラーが発生しました:", error);
        });
      }
    }).catch((error) => {
      console.error("ユーザーデータの取得中にエラーが発生しました:", error);
    });
  };

  // 一つ前のページに戻る
  function goBack() {
    window.history.back();
  }
}