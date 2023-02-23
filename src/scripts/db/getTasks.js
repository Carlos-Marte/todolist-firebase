import { db } from "../firebase/firebaseConnection";
import { collection, onSnapshot } from "firebase/firestore";

const COLLECTION_NAME = "tasks";

export const onGetTask = (callback) => onSnapshot(collection(db, COLLECTION_NAME), callback);