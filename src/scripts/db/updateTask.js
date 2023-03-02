import { db } from "../firebase/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";
import { sendAlertMessage } from "../Messages/alertMessage";

const COLLECTION_NAME = "tasks";

export const updateTask = async (idTask, task) => {
    try {
        await updateDoc(doc(db, COLLECTION_NAME, idTask), task);
        return sendAlertMessage("Se ha actualizado una tarea", "good");
    } catch (error) {
        sendAlertMessage("Ha ocurrido un error.", "bad");
        console.error(error.message);
    }
}