// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2QLUSXci--zb0__Zd33fRRI6eX2l6rlU",
  authDomain: "ayo-nugas-26cd4.firebaseapp.com",
  projectId: "ayo-nugas-26cd4",
  storageBucket: "ayo-nugas-26cd4.appspot.com",
  messagingSenderId: "1069700732463",
  appId: "1:1069700732463:web:5b34c593838e7215d198da",
  measurementId: "G-9MW51R24NW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
