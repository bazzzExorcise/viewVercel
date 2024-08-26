import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4LY5px_uUzOQZnOw65jCqDTmzwlRDCOE",
  authDomain: "absensi-76ad9.firebaseapp.com",
  projectId: "absensi-76ad9",
  storageBucket: "absensi-76ad9.appspot.com",
  messagingSenderId: "9619853607",
  appId: "1:9619853607:web:b862ee47ba6f5ae6115902",
  measurementId: "G-S29TL0X640"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)