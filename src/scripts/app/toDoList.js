import { async } from "@firebase/util";
import { addTask } from "../db/addTask";
import { sendAlertMessage } from "../Messages/alertMessage";

const formAddTask = document.querySelector("#form-add-task");

formAddTask.addEventListener('submit', (e) => {
    e.preventDefault();

    const textTask = formAddTask["input-add"].value.trim();

    if(textTask === "") {
        formAddTask["input-add"].value = "";
        return sendAlertMessage("No puedes agregar una tarea vacía", "bad");
    }

    if(textTask.length > 30) {
        formAddTask["input-add"].value = "";
        return sendAlertMessage("Longitud máxima de carácteres excedida", "bad");
    }

    addTask({
        task: formAddTask["input-add"].value.trim(),
        completed: false
    }); 

    formAddTask["input-add"].value = "";
})