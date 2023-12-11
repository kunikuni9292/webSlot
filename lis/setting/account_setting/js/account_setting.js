
// ユーザー情報を取得し、存在する場合はデータを取得する処理
const checkUserData = () => {
  const auth = window.auth;
  const db = window.db;

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
  } else {
    console.error("ユーザーがログインしていません");
  }
};

// 一つ前のページに戻る
function goBack() {
  window.history.back();
}
