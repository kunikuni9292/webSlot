
// ユーザー情報を取得し、存在する場合はデータを取得する処理
const checkUserData = () => {
  const auth = firebaseApp.auth();
  const db = firebaseApp.firestore();

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userSubCollection = db.collection("users").doc(user.uid).collection("user_data");

      // ユーザーデータがあるか確認
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
  });
};

// 画面読み込み時に実行
window.onload = () => {
  checkUserData(); // ユーザーデータの取得
};

// 登録関数内でユーザー情報を取得してサブコレクションを作成する
const register = () => {
  // firebaseの初期化インスタンス使用
  const auth = window.auth;
  const db = window.db;

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

    // サブコレクションにデフォルトデータを追加
    userSubCollection.add({
      name: userName,
      email: userEmail,
      sex: sex,
      dateBirth: dateBirth,
      height: height,
      weight: bodyWeight
    }).then(() => {
      console.log("Default data added to user's subcollection");
    }).catch((error) => {
      console.error("Error adding data to subcollection:", error);
    });
  } else {
    console.error("ユーザーがログインしていません");
  }
};


// 一つ前のページに戻る
function goBack() {
  window.history.back();
}