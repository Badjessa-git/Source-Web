const functions = require('firebase-functions');
const express = require('express');
const firebase = require("firebase");
const config = require('./config/config');
const admin = require("firebase-admin");
const cors = require('cors');
const fileMiddleware = require('express-multipart-file-parser')
global.XMLHttpRequest = require("xhr2");

const serviceAccount = require("./serviceAccountKey.json");
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');
// Initialize Firebase for the application
var firebaseConfig = {
    apiKey: config.firebaseConfig.apiKey,
    authDomain: config.firebaseConfig.authDomain,
    databaseURL: config.firebaseConfig.databaseURL,
    projectId: config.firebaseConfig.projectId,
    storageBucket: config.firebaseConfig.storageBucket,
    messagingSenderId: config.firebaseConfig.messagingSenderId,
    appId: config.firebaseConfig.appId,
};

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileMiddleware);

firebase.initializeApp(firebaseConfig)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.databaseURL,
});

const db = admin.firestore();

app.post('/login', (req, res) => {
    let id_token = req.body.id_token;
    let unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
        unsubscribe();
        //////Figure out how to check that user has not been signed in already
        let credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        firebase.auth().signInWithCredential(credential).then((user) => {
            let userInfo = user.user;
            res.set({ 'Content-Type': 'application/json' });
            const response = JSON.stringify(userInfo);
            res.send(response);
            return;
        }).catch((error) => {
            res.status(204).send("Error Logging user in");
            throw new Error("Error Loggin user in");
        });
    });
});

app.post('/logout', (req, res) => {
    firebase.auth().signOut().then(() => {
        res.send();
        return;
    }).catch((err) => { //eslint-disable-line handle-callback-err
        res.status(204).send('Error Logging Out');
        throw new Error("Error Loggin user out");
    });
});


app.post('/upload', (req, res) => {
    const {
        originalname,
        buffer,
    } = req.files[0];
    let storageRef = firebase.storage().ref();
    storageRef.child(`request_images/${originalname}`).put(buffer).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
            console.log(downloadUrl);
            res.set({ 'Content-Type': 'application/json' });
            res.send({ downloadUrl: downloadUrl });
            return;
        }).catch(err => { throw new Error("upload issues") });  //eslint-disable-line handle-callback-err  
        return;
    }).catch(err => {
        res.status(205).send()
        throw new Error(err);
    });
});

app.post('/request/:requestType', (req, res) => {
    let formData = req.body;
    let requestType = req.params.requestType;
    let data = JSON.parse(formData);
    db.collection(requestType).doc().set(data).then(() => {
        res.sendStatus(200);
        return;
    }).catch((err) => {
        res.sendStatus(500);
        throw new Error(err);
    });
});

app.get('/getAllRequest/:requestType', (req, res) => {
    let requestType = req.params.requestType;
    db.collection(requestType).get().then((firebaseResponse) => {
        let response = [];
        firebaseResponse.forEach((snapshot) => {
            let data = snapshot.data();
            data['id'] = snapshot.id;
            response.push({
                data: data
            });
        });
        res.set({ 'Content-Type': 'application/json' });
        res.status(200).send(JSON.stringify(response));
    }).catch((err) => {
        res.sendStatus(500);
        throw new Error(err);
    })
});

exports.app = functions.https.onRequest(app);
