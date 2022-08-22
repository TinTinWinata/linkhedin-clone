// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKVNXMd0qSOeah9xjmQ5N9lmKF7FCQVUc",
  authDomain: "linkhedin-eddc1.firebaseapp.com",
  projectId: "linkhedin-eddc1",
  storageBucket: "linkhedin-eddc1.appspot.com",
  messagingSenderId: "620379853107",
  appId: "1:620379853107:web:4964c9b48b2aa1967f2e46",
  measurementId: "G-36NME4RM32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);