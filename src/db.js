import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage'
var firebaseConfig = {
    apiKey: "AIzaSyCMSzq_c04Qon9J-smjRxx5heBnyrhITWM",
    authDomain: "paginawebarmando.firebaseapp.com",
    databaseURL: "https://paginawebarmando.firebaseio.com",
    projectId: "paginawebarmando",
    storageBucket: "paginawebarmando.appspot.com",
    messagingSenderId: "680384147952",
    appId: "1:680384147952:web:45de42de96caa5c3f62d35"
  };

const app = firebase.initializeApp(firebaseConfig)
export const storage= app.storage()
export const db = app.firestore();