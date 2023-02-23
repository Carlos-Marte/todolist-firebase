import { addTask } from "../db/addTask";
import { onGetTask } from "../db/getTasks";
import { sendAlertMessage } from "../Messages/alertMessage";

const formAddTask = document.querySelector("#form-add-task");
const taskContainer = document.querySelector("#task-container");

// Get tasks
onGetTask((querySnapshot) => {
    let html = "";

    querySnapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;

        html += `
        <article class="task">
            <div class="task__content">
                ${data.completed === true ? `<input type="checkbox" checked id="${id}" class="checkbox">`
                : `<input type="checkbox" id="${id}" class="checkbox">`}
                <label for="${id}" class="checkbox__label"></label>

                <textarea readonly id="input-text" class="task__text">${data.task}</textarea>
            </div>

            <div class="task__icons">
                <img src="./public/icon-edit.svg" alt="Edit icon" class="task__icon">
                <img src="./public/icon-remove.svg" alt="Remove icon" class="task__icon">
            </div>
        </article>
        `
    });

    taskContainer.innerHTML = html;
});

// Add task
formAddTask.addEventListener('submit', (e) => {
    e.preventDefault();

    const textTask = formAddTask["input-add"].value.trim();

    if (textTask === "") {
        formAddTask["input-add"].value = "";
        return sendAlertMessage("No puedes agregar una tarea vacía", "bad");
    }

    if (textTask.length > 30) {
        formAddTask["input-add"].value = "";
        return sendAlertMessage("Longitud máxima de carácteres excedida", "bad");
    }

    addTask({
        task: formAddTask["input-add"].value.trim(),
        completed: false
    });

    formAddTask["input-add"].value = "";
});