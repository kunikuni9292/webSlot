const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: 'http://127.0.0.1:5500' });

admin.initializeApp();

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
