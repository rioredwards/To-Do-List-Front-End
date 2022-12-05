/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { fetchToDos } from './fetch-utils.js';

/* Get DOM Elements */
const todoList = document.getElementById('todo-list');
/* State */

/* Events */
async function loadToDos() {
    const todos = await fetchToDos();
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
loadToDos();

/* Display Functions */
