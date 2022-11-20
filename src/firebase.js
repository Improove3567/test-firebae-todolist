// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsL6zdfumAGz8bPVb9yxVEfDps4F3ni7U",
    authDomain: "test-todolis.firebaseapp.com",
    projectId: "test-todolis",
    storageBucket: "test-todolis.appspot.com",
    messagingSenderId: "502574675469",
    appId: "1:502574675469:web:51f0d2dc5efb97e983c744"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db, app }