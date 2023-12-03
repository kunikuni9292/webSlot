// require('dotenv').config();

// console.log("Firebase API Key:", process.env.FIREBASE_API_KEY);
// console.log("Firebase Auth Domain:", process.env.FIREBASE_AUTH_DOMAIN);
// console.log("Firebase Project ID:", process.env.FIREBASE_PROJECT_ID);
// console.log("Firebase Storage Bucket:", process.env.FIREBASE_STORAGE_BUCKET);
// console.log("Firebase Messaging Sender ID:", process.env.FIREBASE_MESSAGING_SENDER_ID);
// console.log("Firebase App ID:", process.env.FIREBASE_APP_ID);
// console.log("Firebase Measurement ID:", process.env.FIREBASE_MEASUREMENT_ID);

import express from 'express';
const app = express();
const port = 3000;

// サーバーサイドで環境変数を読み込む
const apiKey = process.env.FIREBASE_API_KEY;
const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
const projectId = process.env.FIREBASE_PROJECT_ID;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.FIREBASE_APP_ID;
const measurementId = process.env.FIREBASE_MEASUREMENT_ID;

// APIエンドポイントを作成
app.get('/api/env', (req, res) => {
  const envData = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
  };
  res.json(envData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
