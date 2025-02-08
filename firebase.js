// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuK6bYwvFkO6MTo83B1zycYqj72KaA5Tc",
  authDomain: "hacknyu-53b32.firebaseapp.com",
  projectId: "hacknyu-53b32",
  storageBucket: "hacknyu-53b32.firebasestorage.app",
  messagingSenderId: "576908935727",
  appId: "1:576908935727:web:4255aca791ad1711697cda",
  measurementId: "G-CJLGW3J62P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);