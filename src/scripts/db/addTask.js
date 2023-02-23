import { db } from "../firebase/firebaseConnection";
import { collection, addDoc } from "firebase/firestore";
import { sendAlertMessage } from "../Messages/alertMessage";

const COLLECTION_NAME = "tasks";

export const addTask = async (task) => {
    try {
        await addDoc(collection(db, COLLECTION_NAME), task);
        sendAlertMessage("Se ha agregado una tarea", "good");
    } catch (error) {
        sendAlertMessage("Ha ocurrido un error.", "bad");
        console.error(error.message);
    }
}