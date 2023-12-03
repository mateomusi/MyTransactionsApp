import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD76rjcgTfb8K7HM7z3-J6NPXQv88KWv60",
  authDomain: "myprimerproyecto-e6a14.firebaseapp.com",
  projectId: "myprimerproyecto-e6a14",
  storageBucket: "myprimerproyecto-e6a14.appspot.com",
  messagingSenderId: "780747827500",
  appId: "1:780747827500:web:8781442a2dede5b1602489",
  measurementId: "G-SH8NDKGN0P",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollection = collection(db, "users");

export const auth = getAuth(app);

export { userCollection, db };
