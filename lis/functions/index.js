const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: 'http://127.0.0.1:5500' });

// 初期化を1度だけ行うように変更
if (!admin.apps.length) {
    const serviceAccountKey = functions.config().serviceaccountkey;

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
        databaseURL: 'https://lis-web-app-116aa.firebaseio.com'
    });
}

exports.getFirebaseConfig = functions.https.onRequest((req, res) => {
    const firebaseConfig = {
        apiKey: functions.config().api.key,
        authDomain: functions.config().auth.domain,
        projectId: functions.config().project.id,
        storageBucket: functions.config().storage.bucket,
        messagingSenderId: functions.config().messaging.sender.id,
        appId: functions.config().app.id,
        measurementId: functions.config().measurement.id
    };

    cors(req, res, () => {
        res.json(firebaseConfig);
    });
});

// サロンオーナーにオーナーの権限を付与
const uid = 'oe3gJY5yn8ZMgK37ssTZjXbliCB3'; // くにのユーザーのUID
const customClaims = { role: 'salon_owner' }; // カスタムクレーム

admin.auth().setCustomUserClaims(uid, customClaims)
    .then(() => {
        console.log('カスタムクレームを設定しました');
        // デプロイする前にFirebase Admin SDKが重複して初期化されないことを確認してください
        return admin.app().delete();
    })
    .catch((error) => {
        console.error('カスタムクレームの設定中にエラーが発生しました:', error);
    });
