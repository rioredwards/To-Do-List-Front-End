export function renderToDo(todo) {
    const container = document.createElement('li');
    container.setAttribute('id', `container-${todo.id}`);
    container.dataset.id = todo.id;

    const title = document.createElement('h3');
    title.textContent = todo.description;
    title.setAttribute('id', `title-${todo.id}`);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('id', `checkbox-${todo.id}`);
    checkbox.setAttribute('class', 'checkbox');
    checkbox.setAttribute('type', 'checkbox');
    if (todo.complete) {
        checkbox.setAttribute('checked', 'true');
    } else {
        checkbox.removeAttribute('checked');
    }

    const editBtn = document.createElement('button');
    editBtn.setAttribute('id', `editBtn-${todo.id}`);
    editBtn.setAttribute('class', 'editBtn');
    const editBtnImg = document.createElement('img');
    editBtnImg.setAttribute('id', `editBtnImg-${todo.id}`);
    editBtnImg.setAttribute('src', './assets/pencil.png');
    editBtnImg.setAttribute('class', 'editBtnImg');
    editBtn.append(editBtnImg);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('id', `deleteBtn-${todo.id}`);
    deleteBtn.setAttribute('class', 'deleteBtn');
    const deleteBtnImg = document.createElement('img');
    deleteBtnImg.setAttribute('id', `deleteBtnImg-${todo.id}`);
    deleteBtnImg.setAttribute('src', './assets/trash-can.png');
    deleteBtnImg.setAttribute('class', 'deleteBtnImg');
    deleteBtn.append(deleteBtnImg);

    container.append(title, checkbox, editBtn, deleteBtn);
    return container;
}

export function renderToDoEditable(container) {
    const title = container.querySelector('h3');
    container.innerHTML = '';

    const form = document.createElement('form');
    form.setAttribute('id', 'todoEditForm');
    form.setAttribute('class', 'todoEditForm');

    const input = document.createElement('input');
    input.setAttribute('id', 'todoEditInput');
    input.setAttribute('class', 'todoEditInput');
    input.setAttribute('name', 'todoEditInput');
    input.setAttribute('value', title.innerHTML);

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('id', 'editTodoSubmitBtn');
    submitBtn.setAttribute('class', 'editTodoSubmitBtn');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = '✅';

    form.append(input, submitBtn);

    return form;
}
