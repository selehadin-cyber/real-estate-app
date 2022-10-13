// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoIkKXrxy3DF7kT0ZTbmkmogh23NN9hPM",
  authDomain: "ihsan-home.firebaseapp.com",
  projectId: "ihsan-home",
  storageBucket: "ihsan-home.appspot.com",
  messagingSenderId: "902014505219",
  appId: "1:902014505219:web:c44d33b98b829859ad1936"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const database = getFirestore(app)
export const storage = getStorage()