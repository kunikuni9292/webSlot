import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebaseを初期化
const firebaseConfig = {
  apiKey: "AIzaSyArCsB4IjxAyz50mPUU302pI3GRyfQerMY",
  authDomain: "lis-web-app-116aa.firebaseapp.com",
  projectId: "lis-web-app-116aa",
  storageBucket: "lis-web-app-116aa.appspot.com",
  messagingSenderId: "969669079165",
  appId: "1:969669079165:web:84c42c31eba902de074114",
  measurementId: "G-D9B3HTKLC6"
};

const firebaseApp = initializeApp(firebaseConfig); // ここでinitializeAppを使用
const db = getFirestore(firebaseApp); // getFirestoreを使用
const auth = getAuth(firebaseApp); // getAuthを使用

export { db, auth };