// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqq5vn-VMjUyd7BSOifWrW3GtNJMPJgeY",
  authDomain: "reels-8a832.firebaseapp.com",
  projectId: "reels-8a832",
  storageBucket: "reels-8a832.appspot.com",
  messagingSenderId: "849568113831",
  appId: "1:849568113831:web:fbc8ad7c60afe8319da782"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();

export const database ={
    users : firestore.collection('users'),
    post : firestore.collection('post'),
    comments:firestore.collection('comments'),
    getTime : firebase.firestore.FieldValue.serverTimestamp
}
export const storage =firebase.storage()