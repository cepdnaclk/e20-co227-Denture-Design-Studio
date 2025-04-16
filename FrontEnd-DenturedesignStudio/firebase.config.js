// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage,ref,uploadString } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-rQGIX0avBGQPA5V3OCPTPWgnpGNpsTg",
  authDomain: "denturedesignstudio-299ad.firebaseapp.com",
  projectId: "denturedesignstudio-299ad",
  storageBucket: "denturedesignstudio-299ad.firebasestorage.app",
  messagingSenderId: "388551453151",
  appId: "1:388551453151:web:799bd791fac1088c51bc6a",
  measurementId: "G-JW4PWN0BZF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
