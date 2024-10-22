// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeTkQ_6xPdU2OQe-GvApw34YFGqVHBUbk",
  authDomain: "plastic-info-4bca2.firebaseapp.com",
  projectId: "plastic-info-4bca2",
  storageBucket: "plastic-info-4bca2.appspot.com",
  messagingSenderId: "646611196132",
  appId: "1:646611196132:web:506030f1697e852be3f4f1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
