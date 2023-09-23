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
  const savaData = () => {
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
  
  // FireStoreのデータを表示するメソッド
  const readData = () => {
    db.collection('users')
    .get()
    .then((data) => {
      /** mapで新しい配列を生成する。スプレッド演算子で(...)で配列のようなオブジェクトを配列に変換する。
      配列.map(コールバック関する) コールバック関数によって新しい配列を生成する
      [...変換対象] 配列に変化する **/
      console.log(data.docs.map((item) => {
        // uuidを取得できるように修正
        return {...item.data(), id: item.id}
      }))
    })
  }
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
  const deleteData = () => {
    db.collection('users').doc('IgJ0kFoXCGH7RMUeeFRl').delete()
    .then(() => {
      alert('Data Deleted')
    })
  }