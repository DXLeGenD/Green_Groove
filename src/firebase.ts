import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// firebaseConfig.js
import { getDatabase, ref, set, update, get } from 'firebase/database';







const firebaseConfig = {
    apiKey: "AIzaSyA0DdGR_B31jq6P2tatW-piOCGp1Kf5caA",
    authDomain: "green-groove.firebaseapp.com",
    projectId: "green-groove",
    storageBucket: "green-groove.appspot.com",
    messagingSenderId: "84908534521",
    appId: "1:84908534521:web:82dabf72294ff1c6de1028",
    measurementId: "G-GY8WD1QM8P"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const auth = getAuth(app);
export { database, ref, set, update, get };
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
