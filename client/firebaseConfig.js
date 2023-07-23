// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkst_ng1nZ-55p-wcyfA5DtgwTXB41rRs",
  authDomain: "scarletrecipe-63e2e.firebaseapp.com",
  projectId: "scarletrecipe-63e2e",
  storageBucket: "scarletrecipe-63e2e.appspot.com",
  messagingSenderId: "32980884613",
  appId: "1:32980884613:web:7c3cd8b1ef7bf68643ddec",
  measurementId: "G-1PPQ1MW5ZN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp