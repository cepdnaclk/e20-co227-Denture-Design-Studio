// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage,ref,uploadString } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-3rkJLYHfuHJaT1ED3d7xjaBnm509KTU",
  authDomain: "denture-design.firebaseapp.com",
  projectId: "denture-design",
  storageBucket: "denture-design.appspot.com",
  messagingSenderId: "1017446132796",
  appId: "1:1017446132796:web:2310bde5d03176e7b86739",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
