// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwiGytG-P7lDkR2bCWXQJkZjm_-XhNSsI",
  authDomain: "real-shop-test.firebaseapp.com",
  databaseURL: "https://real-shop-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "real-shop-test",
  storageBucket: "real-shop-test.appspot.com",
  messagingSenderId: "259864036071",
  appId: "1:259864036071:web:5f8af2dd2837ce33d7d842"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;



