// 画面読み込み時に実行
window.onload = () => {
  checkStoreIdShow(); // 店舗IDの取得
};

// Firebaseの設定情報を取得する関数
const fetchFirebaseConfig = async () => {
  try {
    const response = await fetch('https://us-central1-lis-web-app-116aa.cloudfunctions.net/getFirebaseConfig');
    if (!response.ok) {
      throw new Error('Failed to fetch Firebase config');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch Firebase config:', error);
  }
};

// 保存済みの店舗IDを格納する配列
const existingStoreIDs = [];

// 画面読み込み時にfirebaseのインスタンスを渡すメソッド
const checkStoreIdShow = () => {
  fetchFirebaseConfig()
    .then(data => {
      const firebaseApp = firebase.initializeApp(data);
      checkStoreId(firebaseApp);
    })
    .catch(error => {
      console.error('Error fetching Firebase config:', error);
    });
};

// 更新ボタン押下時にfirebaseのインスタンスを渡すメソッド
const onTapaddStoreID = () => {
  fetchFirebaseConfig()
    .then(firebase => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // ユーザーがログインしている場合
          addStoreID();
        } else {
          // ユーザーがログインしていない場合
          console.error('ユーザーがログインしていません');
        }
      })
    })
    .catch(error => {
      console.error('Error fetching Firebase config:', error);
    });
};


// Firestoreへの店舗ID追加関数
function addStoreID() {
  const newStoreID = document.getElementById('newStoreID').value;
  const storeIDsCollection = firebase.firestore().collection('storeIDs');

  // 既存の店舗IDを取得して比較
  storeIDsCollection.get()
    .then((querySnapshot) => {
      existingStoreIDs.length = 0;

      querySnapshot.forEach((doc) => {
        const storeID = doc.data().storeID;
        existingStoreIDs.push(storeID);
      });

      // 新しい店舗IDが既存のIDと重複しているかチェック
      if (existingStoreIDs.includes(newStoreID)) {
        alert("この店舗IDは既に存在します。");
      } else {
        // 重複がなければ追加
        storeIDsCollection.add({
          storeID: newStoreID
        })
          .then(() => {
            console.log("店舗IDが追加されました");
            // 追加後に再度一覧を取得して表示
            checkStoreIdShow();

          })
          .catch((error) => {
            console.error("店舗IDの追加中にエラーが発生しました:", error);
            // エラー時の処理（例: エラーメッセージ表示など）
          });
      }
      // 登録済みの店舗IDを表示
      checkStoreIdShow();
    })
    .catch((error) => {
      console.error("店舗IDの取得中にエラーが発生しました:", error);
    });
}


// 店舗IDが既に存在する場合画面に表示する
const checkStoreId = (firebaseApp) => {
  const storeIDsCollection = firebase.firestore(firebaseApp).collection('storeIDs'); // Firestoreのコレクションを参照

  // ログイン状態の変更を監視
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // ユーザーがログインしています
      console.log('ユーザーがログインしています:', user.uid);
      // ここでFirestoreへのアクセスや処理を行います
    } else {
      // ユーザーがログアウトしています
      console.log('ユーザーはログアウトしています');
    }
  });


  storeIDsCollection.get()
    .then((querySnapshot) => {
      existingStoreIDs.length = 0; // 配列をクリア

      querySnapshot.forEach((doc) => {
        const storeID = doc.data().storeID;
        console.log("店舗ID:", storeID);
        existingStoreIDs.push(storeID);
      });
      // 登録済みの店舗IDを表示
      showExistingStoreIDs();
    })
    .catch((error) => {
      console.error("店舗IDの取得中にエラーが発生しました:", error);
    });
};

// 店舗ID削除関数
function deleteStoreID(firebaseApp, storeID) {
  const db = firebase.firestore(firebaseApp);
  const storeIDsCollection = db.collection('storeIDs');

  // アラートを表示して確認
  const isConfirmed = showCustomConfirmationDialog(`店舗ID: ${storeID} を削除しますか？`);
  if (isConfirmed) {
    // Firestoreから削除
    storeIDsCollection.where('storeID', '==', storeID).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log("店舗IDが削除されました");
            // 削除後に再度一覧を取得して表示
            checkStoreIdShow();
          }).catch((error) => {
            console.error("店舗IDの削除中にエラーが発生しました:", error);
          });
        });
      })
      .catch((error) => {
        console.error("店舗IDの検索中にエラーが発生しました:", error);
      });
  }
}
// カスタムの確認ダイアログを表示
function showCustomConfirmationDialog(message) {
  const userInput = window.confirm(message);
  return userInput;
}

// 登録済みの店舗IDを表示
const showExistingStoreIDs = () => {
  const existingStoreIDsDiv = document.getElementById('existingStoreIDs');
  existingStoreIDsDiv.innerHTML = "";

  existingStoreIDs.forEach((storeID) => {
    const storeIDDiv = document.createElement('div');
    storeIDDiv.innerHTML = `登録済みの店舗ID: : ${storeID}`;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '削除';
    deleteButton.addEventListener('click', () => {
      // 削除ボタンがクリックされたときの処理
      onDeleteButtonClick(storeID);
    });

    storeIDDiv.appendChild(deleteButton);
    existingStoreIDsDiv.appendChild(storeIDDiv);
  });
};

// 削除ボタンがクリックされたときの処理
const onDeleteButtonClick = (storeID) => {
  fetchFirebaseConfig()
    .then(data => {
      const firebaseApp = firebase.initializeApp(data);
      deleteStoreID(firebaseApp, storeID);
    })
    .catch(error => {
      console.error('Error fetching Firebase config:', error);
    });
};