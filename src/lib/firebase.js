// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "samvaad-chatapp.firebaseapp.com",
  projectId: "samvaad-chatapp",
  storageBucket: "samvaad-chatapp.appspot.com",
  messagingSenderId: "727488074023",
  appId: "1:727488074023:web:80c244d9469969de629902"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);