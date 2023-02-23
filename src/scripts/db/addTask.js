import { db } from "../firebase/firebaseConnection";
import { collection, addDoc } from "firebase/firestore";

const COLLECTION_NAME = "tasks";

export const addTask = async (task) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME), task);
        alert("Subida");
    } catch (error) {
        console.error(error.message);
    }
}