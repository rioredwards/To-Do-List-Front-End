/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createTodo, deleteTodo, fetchToDos, updateToDo } from './fetch-utils.js';
import { renderToDo, renderToDoEditable } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error');
const addTodoForm = document.getElementById('add-todo-form');
const addTodoSubmitBtn = document.getElementById('submit-btn');
const todoList = document.getElementById('todo-list');

/* State */
let error = null;
let todos = [];

/* Events */
window.addEventListener('load', async () => {
    todos = [];
    todos = await fetchToDos();
    displayTooDos();
});

addTodoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addTodoSubmitBtn.disabled = true;

    const formData = new FormData(addTodoForm);
    const description = formData.get('description');

    const response = await createTodo(description);

    todos.unshift(response);
    displayTooDos();

    addTodoForm.reset();
    addTodoSubmitBtn.disabled = false;
});

async function displayTooDos() {
    todoList.innerHTML = '';
    for (let todo of todos) {
        const container = renderToDo(todo);

        const checkbox = container.querySelector('.checkbox');
        checkbox.addEventListener('change', await handleCheckboxUpdate);

        const deleteBtn = container.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', await handleDeleteClick);

        const editBtn = container.querySelector('.editBtn');
        editBtn.addEventListener('click', await handleEditClick);

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

async function handleEditClick(e) {
    // Select elements
    const container = e.currentTarget.parentNode;

    // Render New container with form
    // (Delete old elements and replace with text box)
    const form = renderToDoEditable(container);

    // Add event listener to form
    form.addEventListener('submit', await handleEditFormSubmit);
    container.append(form);
}

async function handleEditFormSubmit(e) {
    e.preventDefault();

    // Select Elements
    const container = e.currentTarget.parentNode;
    const editForm = e.currentTarget;
    const editTodoSubmitBtn = editForm.querySelector('#editTodoSubmitBtn');

    editTodoSubmitBtn.disabled = true;

    const formData = new FormData(editForm);
    const todoEditInput = formData.get('todoEditInput');

    const response = await updateToDo(container.dataset.id, { description: todoEditInput });

    const index = todos.findIndex((element) => element.id === container.dataset.id);
    // Replace old ToDo with New one
    todos[index] = response;
    displayTooDos();

    editForm.reset();
    editTodoSubmitBtn.disabled = false;
}

async function handleDeleteClick(e) {
    const deleteBtn = e.currentTarget;
    const parentId = deleteBtn.parentNode.dataset.id;
    await deleteTodo(parentId);

    // Find index of todo in todos to delete
    const index = todos.findIndex((element) => element.id === parentId);
    // Remove todo from local todos array
    todos.splice(index, 1);
    displayTooDos();
}
