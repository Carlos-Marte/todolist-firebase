import { addTask } from "../db/addTask";

const taskContainer = document.querySelector("#task-container");
const formAddTask = document.querySelector("#form-add-task");

formAddTask.addEventListener('submit', (e) => {
    e.preventDefault();

    const textTask = formAddTask["input-add"].value.trim();

    addTask({
        task: formAddTask["input-add"].value.trim(),
        completed: false
    });

    formAddTask["input-add"].value = "";
})