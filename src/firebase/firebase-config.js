import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //v9
import 'firebase/compat/firestore'; //v9

const firebaseConfig = {
    apiKey: "AIzaSyACuTEwASr7ftOGctzRpmVtHx7z6P-9QSo",
    authDomain: "react-703c7.firebaseapp.com",
    projectId: "react-703c7",
    storageBucket: "react-703c7.appspot.com",
    messagingSenderId: "1073935958362",
    appId: "1:1073935958362:web:787bcd95d296aac289f363"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    firebase,
    db,
    googleAuthProvider
}