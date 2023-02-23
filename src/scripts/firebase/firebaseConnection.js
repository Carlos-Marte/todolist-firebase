import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCbw-t_8dle0eVc7Rf6dmNeGxrseaeWuqs",
  authDomain: "todolist-54c73.firebaseapp.com",
  projectId: "todolist-54c73",
  storageBucket: "todolist-54c73.appspot.com",
  messagingSenderId: "510669765180",
  appId: "1:510669765180:web:ea113352e52adc0c04a139"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);