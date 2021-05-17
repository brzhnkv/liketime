import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUvepMMzgNGs8i7UWckIJDiOxq59vPsW0",
  authDomain: "liketime-server.firebaseapp.com",
  projectId: "liketime-server",
  storageBucket: "liketime-server.appspot.com",
  messagingSenderId: "369110340364",
  appId: "1:369110340364:web:a415673372c20c39c66f29",
  measurementId: "G-R25JK2PYV8",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
