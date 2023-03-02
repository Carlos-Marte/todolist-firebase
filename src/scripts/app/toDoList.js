import { addTask } from "../db/addTask";
import { onGetTask } from "../db/getTasks";
import { removeTask } from "../db/removeTask";
import { updateTask } from "../db/updateTask";
import { sendAlertMessage } from "../Messages/alertMessage";

const formAddTask = document.querySelector("#form-add-task");
const taskContainer = document.querySelector("#task-container");

let edit = false;

// Get tasks
onGetTask((querySnapshot) => {
    taskContainer.innerHTML = "";

    querySnapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;

        taskContainer.innerHTML += `
            <article class="task">
                <div class="task__content">
                    ${data.completed === true ? `<input type="checkbox" checked id="${id}" class="checkbox">`
                                              : `<input type="checkbox" id="${id}" class="checkbox">`}
                    <label for="${id}" class="checkbox__label"></label>
    
                    <textarea maxlength="30" readonly id="input-text" class="task__text">${data.task}</textarea>
                </div>
    
                <div class="task__icons">
                    <img src="./public/icon-edit.svg" alt="Edit icon" class="task__icon task__icon--edit">
                    <img src="./public/icon-remove.svg" alt="Remove icon" class="task__icon task__icon--remove">
                </div>
            </article>
            `
    });

});

// Remove and Edit tasks [Trash code]
taskContainer.addEventListener('click', (e) => {
    const targetClass = e.target.classList[1] === undefined ? e.target.classList[0] : e.target.classList[1];
    
    // Remove
    if (targetClass === "task__icon--remove") {
        const targetId = e.target.parentElement.previousElementSibling.firstElementChild.id;
        removeTask(targetId);

    }
    
    // Edit
    if (targetClass === "task__icon--edit") {
        const targetId = e.target.parentElement.previousElementSibling.firstElementChild.id;
        const textArea = e.target.parentElement.previousElementSibling.lastElementChild;
        
        if (!edit) {
            textArea.removeAttribute("readonly");
            textArea.focus();
            edit = true;
            
        } else {
            textArea.setAttribute("readonly", "");
            
            if(textArea.value !== "") {
                updateTask(targetId, {
                    task: textArea.value.trim()
                });
            } else {
                sendAlertMessage("No puedes dejar una tarea vacía.", "bad");
            }
            
            edit = false;
        }
    }

    // Edit status of the task
    if(targetClass === "checkbox") {
        const targetId = e.target.id;

        updateTask(targetId, {
            completed: e.target.checked
        });
    }
})

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

