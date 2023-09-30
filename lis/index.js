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

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
let selectedDataId = null; // 現在選択中のデータのID


const register = () => {
  // input要素のtype属性を取得
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  // Promiseで、メールとパスワードを渡す必要がある👇
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err) => {
      // ダイアログが表示されるようにする
      alert(err.message);
      console.log(err.code);
      console.log(err.user);
    });
};
// ログインするメソッド
const login = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res.user);
    })
    .catch((err) => {
      // ダイアログが表示されるようにする
      alert(err.message);
      console.log(err.code);
      console.log(err.user);
    });
};
// データをFireStoreに保存するメソッド
const saveData = () => {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  console.log(email, password);
  // dbという変数にフォームのデータを入れる👆
  db.collection("users")
    .add({
      email: email,
      password: password
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// データをFireStoreに保存するメソッド
// note: 以下の書き方だとdbの更新みたいになる
// const saveData = () => {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   console.log(email, password);

//   // ユーザーの認証状態を確認
//   auth.onAuthStateChanged((user) => {
//     if (user) {
//       // ユーザーがログインしている場合
//       const userId = user.uid; // ユーザーのUIDを取得

//       db.collection("users")
//         .doc(userId) // ユーザーのUIDをドキュメントIDとして使用
//         .set({
//           email: email,
//           password: password,
//         })
//         .then(() => {
//           console.log("Document written for user with ID: ", userId);
//           readData(); // データを再読み込み
//         })
//         .catch((error) => {
//           console.error("Error adding document: ", error);
//         });
//     } else {
//       // ユーザーがログインしていない場合、ログインを促すメッセージを表示
//       alert("ログインしてください。");
//     }
//   });
// };


// Firestoreのデータを読み込むメソッド
const readData = () => {
  const dataList = document.getElementById("data-list");

  db.collection("users")
    .get()
    .then((querySnapshot) => {
      dataList.innerHTML = "";

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dataId = doc.id;
        const dataElement = document.createElement("div");
        dataElement.innerHTML = `<strong>Email:</strong> ${data.email}, <strong>Password:</strong> ${data.password} <button onclick="editData('${dataId}', '${data.email}', '${data.password}')">Edit</button> <button onclick="deleteData('${dataId}')">Delete</button>`;
        dataList.appendChild(dataElement);
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
};

// 更新ボタン押下時のメソッド
const editData = (id, email, password) => {
  selectedDataId = id;
  document.getElementById("email").value = email;
  document.getElementById("password").value = password;
};

// 更新した内容を更新するメソッド
const saveEditedData = () => {
  const editedEmail = document.getElementById("email").value;
  const editedPassword = document.getElementById("password").value;

  if (selectedDataId) {
    db.collection("users")
      .doc(selectedDataId)
      .update({
        email: editedEmail,
        password: editedPassword,
      })
      .then(() => {
        console.log("Document successfully updated!");
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        selectedDataId = null;
        readData(); // データを再読み込み
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }
};

// FireStoreのデータを更新するメソッド
const updateData = () => {
  db.collection('users').doc('IgJ0kFoXCGH7RMUeeFRl')
    .update({
      email: 'JboySan@gamil.com',
      password: '123456789'
    })
    .then(() => {
      alert('Data Updated')
    })
}
// FireStoreのデータを削除するメソッド
const deleteData = (id) => {
  db.collection("users")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      readData(); // データを再読み込み
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
    });
};