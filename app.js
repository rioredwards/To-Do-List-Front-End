/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createTodo, deleteTodo, fetchToDos, updateToDo } from './fetch-utils.js';
import { renderToDo } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error');
const addTodoForm = document.getElementById('add-todo-form');
const submitBtn = document.getElementById('submit-btn');
const todoList = document.getElementById('todo-list');

/* State */
let error = null;
let todos = [];

/* Events */
window.addEventListener('load', async () => {
    console.log('window reload!');
    todos = [];
    todos = await fetchToDos();
    displayTooDos();
});

addTodoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;

    const formData = new FormData(addTodoForm);
    const description = formData.get('description');

    const response = await createTodo(description);

    todos.unshift(response);
    displayTooDos();

    addTodoForm.reset();
    submitBtn.disabled = false;
});

async function displayTooDos() {
    todoList.innerHTML = '';
    for (let todo of todos) {
        const container = renderToDo(todo);

        const checkbox = container.querySelector('.checkbox');
        checkbox.addEventListener('change', await handleCheckboxUpdate);

        const deleteBtn = container.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', await handleDeleteClick);

        todoList.append(container);
    }
}

/* Event Handlers */
async function handleCheckboxUpdate(e) {
    const checkbox = e.target;
    const parentId = checkbox.parentNode.dataset.id;

    let isChecked = false;
    if (checkbox.checked) isChecked = true;
    const response = await updateToDo(parentId, { complete: isChecked });
}

async function handleDeleteClick(e) {
    e.preventDefault();

    const deleteBtn = e.target;
    const parentId = deleteBtn.parentNode.dataset.id;
    await deleteTodo(parentId);

    // Find index of todo in todos to delete
    const index = todos.findIndex((element) => element.id === parentId);
    // Remove todo from local todos array
    todos.splice(index, 1);
    displayTooDos();
}

/* Display Functions */
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
