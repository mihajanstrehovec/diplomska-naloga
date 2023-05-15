import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA59Vr746O0N3yv5rBfw_uu74lJIUHWNuc",
  authDomain: "diplomksa-naloga.firebaseapp.com",
  projectId: "diplomksa-naloga",
  storageBucket: "diplomksa-naloga.appspot.com",
  messagingSenderId: "100997775729",
  appId: "1:100997775729:web:f0a36c91f415f8383976d0",
  measurementId: "G-22QWS2MR7T"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig)
// Initialize database
const db = getFirestore(app)

export{app, db}