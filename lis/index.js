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

// ユーザーが登録されるたびにサブコレクションを作成
const createSubCollection = (user) => {
  const userSubCollection = db.collection("users").doc(user.uid).collection("user_data");

  // サブコレクションにデフォルトデータを追加
  userSubCollection.add({
    date: new Date(), // 日付
    height: 0, // 身長
    weight: 0, // 体重
    bodyFatPercentage: 0, // 体脂肪率
    bodyFatMass: 0, // 体脂肪量
    bmi: 0, // BMI
    basalMetabolism: 0, // 基礎代謝
    temperature: 0, // 体温
    hydration: 0, // 水分量
    sleepHours: 0, // 睡眠時間
    mealPhoto1: "", // 食事の写真１（初期値は空文字列）
    mealPhoto2: "", // 食事の写真２
    mealPhoto3: "", // 食事の写真３
    mealPhoto4: "", // 食事の写真４
  }).then(() => {
    console.log("Default data added to user's subcollection");
  }).catch((error) => {
    console.error("Error adding data to subcollection:", error);
  });
};

// ユーザー登録
const register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("personalName").value;
  const sex = document.getElementById("personalSex").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const dateBirth = document.getElementById("dateBirth").value;
  const height = document.getElementById("height").value;
  const bodyWeight = document.getElementById("bodyWeight").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Registered user:", user.email);

      // ユーザーのUIDを使用してサブコレクションを作成
      const userSubCollection = db.collection("users").doc(user.uid).collection("user_data");

      // サブコレクションにデフォルトデータを追加
      userSubCollection.add({
        name: name,
        sex: sex,
        phoneNumber: phoneNumber,
        dateBirth: dateBirth,
        height: height,
        bodyWeight: bodyWeight
        // 他のデータも追加できる
      }).then(() => {
        console.log("Default data added to user's subcollection");
      }).catch((error) => {
        console.error("Error adding data to subcollection:", error);
      });
    })
    .catch((error) => {
      console.error("Registration error:", error);
    });
};

// データをFirestoreのサブコレクションに追加
const addData = (data) => {
  const user = auth.currentUser;
  if (user) {
    const userSubCollection = db.collection("users").doc(user.uid).collection("user_data");

    userSubCollection.add(data)
      .then(() => {
        console.log("Data added to user's subcollection");
      })
      .catch((error) => {
        console.error("Error adding data to subcollection:", error);
      });
  }
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


// データをFirestoreのサブコレクションから取得して表示
const readData = () => {
  const user = auth.currentUser;
  if (user) {
    const userSubCollection = db.collection("users").doc(user.uid).collection("user_data");

    userSubCollection.get()
      .then((querySnapshot) => {
        const dataList = document.getElementById("data-list");
        dataList.innerHTML = ""; // 既存のデータをクリア

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const dataId = doc.id;
          const dataElement = document.createElement("div");
          dataElement.innerHTML = `<strong>Email:</strong> ${user.email}, <strong>Password:</strong> ${data.password} <button onclick="editData('${dataId}', '${user.email}', '${data.password}')">Edit</button> <button onclick="deleteData('${dataId}')">Delete</button>`;
          dataList.appendChild(dataElement);
        });
      })
      .catch((error) => {
        console.error("Error getting data from subcollection:", error);
      });
  }
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

// データをFirestoreのサブコレクションで更新
const updateData = (dataId, newData) => {
  const user = auth.currentUser;
  if (user) {
    const userSubCollection = db.collection("users").doc(user.uid).collection("user_data");

    userSubCollection.doc(dataId).update(newData)
      .then(() => {
        console.log("Data updated in user's subcollection");
      })
      .catch((error) => {
        console.error("Error updating data in subcollection:", error);
      });
  }
};


// データをFirestoreのサブコレクションから削除
const deleteData = (dataId) => {
  const user = auth.currentUser;
  if (user) {
    const userSubCollection = db.collection("users").doc(user.uid).collection("user_data");

    userSubCollection.doc(dataId).delete()
      .then(() => {
        console.log("Data deleted from user's subcollection");
      })
      .catch((error) => {
        console.error("Error deleting data from subcollection:", error);
      });
  }
};