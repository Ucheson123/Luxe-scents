// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// REPLACE THIS with your actual config from Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2-rncqNqY4WlUCRYzvW-SDtGe2fVt3LQ",
  authDomain: "luxe-scents-731df.firebaseapp.com",
  projectId: "luxe-scents-731df",
  storageBucket: "luxe-scents-731df.firebasestorage.app",
  messagingSenderId: "1073318661897",
  appId: "1:1073318661897:web:dd5129f2e300c4c42ccdd8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);