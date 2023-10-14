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

// ユーザー登録
const register = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("personalName").value;
  const sex = document.getElementById("personalSex").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const dateBirth = document.getElementById("dateBirth").value;
  const height = parseFloat(document.getElementById("height").value);
  const bodyWeight = parseFloat(document.getElementById("bodyWeight").value);

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Registered user:", user.email);

      // ユーザーのUIDを使用して新しいデータ構造にデータを保存
      db.collection("users").doc(user.uid).set({
        email: email,
        password: password,
        name: name,
        sex: sex,
        phoneNumber: phoneNumber,
        dateBirth: dateBirth,
        height: height,
        bodyWeight: bodyWeight
      }).then(() => {
        console.log("User data added to Firestore");
        window.location.href = "../login/login.html";
      }).catch((error) => {
        console.error("Error adding user data to Firestore:", error);
      });
    })
    .catch((error) => {
      console.error("Registration error:", error);
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
      window.location.href = "../menu/menu_top/menu.html";
    })
    .catch((err) => {
      // ダイアログが表示されるようにする
      alert(err.message);
      console.log(err.code);
      console.log(err.user);
    });
};

// データをFirestoreのサブコレクションに追加
const addData = (data) => {
  const user = auth.currentUser;
  if (user) {
    const userSubCollection = db.collection("users").doc(user.uid).collection("daily_records");

    userSubCollection.add(data)
      .then(() => {
        console.log("Data added to user's daily_records subcollection");
      })
      .catch((error) => {
        console.error("Error adding data to daily_records subcollection:", error);
      });
  }
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

// データをFirestoreのサブコレクションに追加
const saveDataToFirestore = () => {
  const user = auth.currentUser;
  if (user) {
    const userSubCollection = db.collection("users").doc(user.uid).collection("daily_records");

    const dateInput = document.getElementById("date");
    const breakfastInput = document.getElementById("breakfast");
    const lunchInput = document.getElementById("lunch");
    const dinnerInput = document.getElementById("dinner");
    const snackInput = document.getElementById("snack");
    const weightAfterWakeUpInput = document.getElementById("weightAfterWakeUp");
    const weightBeforeSleepingInput = document.getElementById("weightBeforeSleeping");
    const wakeUpTimeInput = document.getElementById("wakeUpTime");
    const bedtimeInput = document.getElementById("bedtime");
    const evacuationTimesInput = document.getElementById("evacuationTimes");
    const urineTimesInput = document.getElementById("urineTimes");
    const ingestionMoistureQuantityInput = document.getElementById("ingestionMoistureQuantity");
    const bodyFatPercentageInput = document.getElementById("bodyFatPercentage");
    const bodyFatQuantityInput = document.getElementById("bodyFatQuantity");
    const bmiInput = document.getElementById("bmi");
    const basalMetabolismInput = document.getElementById("basalMetabolism");
    const bodyTemperatureInput = document.getElementById("bodyTemperature");

    const data = {
      date: dateInput.value,
      breakfast: breakfastInput.value,
      lunch: lunchInput.value,
      dinner: dinnerInput.value,
      snack: snackInput.value,
      weightAfterWakeUp: parseFloat(weightAfterWakeUpInput.value),
      weightBeforeSleeping: parseFloat(weightBeforeSleepingInput.value),
      wakeUpTime: wakeUpTimeInput.value,
      bedtime: bedtimeInput.value,
      evacuationTimes: parseInt(evacuationTimesInput.value),
      urineTimes: parseInt(urineTimesInput.value),
      ingestionMoistureQuantity: parseFloat(ingestionMoistureQuantityInput.value),
      bodyFatPercentage: parseFloat(bodyFatPercentageInput.value),
      bodyFatQuantity: parseFloat(bodyFatQuantityInput.value),
      bmi: parseFloat(bmiInput.value),
      basalMetabolism: parseFloat(basalMetabolismInput.value),
      bodyTemperature: parseFloat(bodyTemperatureInput.value),
    };

    userSubCollection.add(data)
      .then(() => {
        console.log("Data added to user's subcollection");
      })
      .catch((error) => {
        console.error("Error adding data to subcollection:", error);
      });
  } else {
    console.log("ユーザーがログインしていません。データは保存されません。");
    // ユーザーがログインしていない場合、エラーメッセージを表示するか、適切な処理を行ってください。
  }
};

// 一つ前のページに戻る
function goBack() {
  window.history.back();
}
// 確認画面にデータを渡す処理
let inputData = {}; // 入力データを一時的に保存するオブジェクト
function prepareDataForCheck() {
  // ユーザーが入力したデータを inputData オブジェクトに保存
  inputData.date = document.getElementById("date").value;
  inputData.breakfast = document.getElementById("breakfast").value;
  inputData.lunch = document.getElementById("lunch").value;
  inputData.dinner = document.getElementById("dinner").value;
  inputData.snack = document.getElementById("snack").value;
  inputData.weightAfterWakeUp = parseFloat(document.getElementById("weightAfterWakeUp").value);
  inputData.weightBeforeSleeping = parseFloat(document.getElementById("weightBeforeSleeping").value);
  inputData.wakeUpTime = document.getElementById("wakeUpTime").value;
  inputData.bedtime = document.getElementById("bedtime").value;
  inputData.evacuationTimes = parseInt(document.getElementById("evacuationTimes").value);
  inputData.urineTimes = parseInt(document.getElementById("urineTimes").value);
  inputData.ingestionMoistureQuantity = parseFloat(document.getElementById("ingestionMoistureQuantity").value);
  inputData.bodyFatPercentage = parseFloat(document.getElementById("bodyFatPercentage").value);
  inputData.bodyFatQuantity = parseFloat(document.getElementById("bodyFatQuantity").value);
  inputData.bmi = parseFloat(document.getElementById("bmi").value);
  inputData.basalMetabolism = parseFloat(document.getElementById("basalMetabolism").value);
  inputData.bodyTemperature = parseFloat(document.getElementById("bodyTemperature").value);

  // customer_record_input_check.html にデータを渡す
  localStorage.setItem('inputData', JSON.stringify(inputData));
  window.location.href = "customer_record_input_check.html";
}
