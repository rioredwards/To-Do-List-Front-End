/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createTodo, fetchToDos } from './fetch-utils.js';

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
    console.log(response);
    todos.unshift(response);
    displayTooDos();

    addTodoForm.reset();
    submitBtn.disabled = false;
});

async function displayTooDos() {
    todoList.innerHTML = '';
    for (let todo of todos) {
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        if (todo.complete) {
            checkbox.setAttribute('checked', 'true');
        }
        h3.textContent = todo.description;
        li.append(h3, checkbox);
        todoList.append(li);
    }
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
