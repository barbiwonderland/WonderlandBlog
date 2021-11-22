// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD5mhWJSIlwNo_49QJ52Uho7me8sxSjL3Y",
    authDomain: "fb-clon-329e6.firebaseapp.com",
    projectId: "fb-clon-329e6",
    storageBucket: "fb-clon-329e6.appspot.com",
    messagingSenderId: "1063259626177",
    appId: "1:1063259626177:web:8f7613e7bacca4f2eed240"
})

export const auth = firebase.auth();
export const fs=firebase.firestore();
export const storage=firebase.storage();
export default firebaseApp;