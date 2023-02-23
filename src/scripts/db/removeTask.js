import { db } from "../firebase/firebaseConnection";
import { doc, deleteDoc } from "firebase/firestore";
import { sendAlertMessage } from "../Messages/alertMessage";

const COLLECTION_NAME = "tasks";

export const removeTask = async (idTask) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, idTask));
        sendAlertMessage("Se ha eliminado la tarea.", "good");
    } catch (error) {
        sendAlertMessage("No se ha podido eliminar la tarea.", "bad");
        console.log(error.message);
    }
}