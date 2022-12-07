export function renderToDo(todo) {
    const container = document.createElement('li');
    container.setAttribute('id', `container-${todo.id}`);
    container.dataset.id = todo.id;

    const title = document.createElement('h3');
    title.textContent = todo.description;

    const checkbox = document.createElement('input');
    checkbox.setAttribute('class', 'checkbox');
    checkbox.setAttribute('type', 'checkbox');
    if (todo.complete) {
        checkbox.setAttribute('checked', 'true');
    } else {
        checkbox.removeAttribute('checked');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    const deleteBtnImg = document.createElement('img');
    deleteBtnImg.setAttribute('src', './assets/trash-can.png');
    deleteBtnImg.setAttribute('class', 'deleteBtnImg');
    deleteBtn.append(deleteBtnImg);

    container.append(title, checkbox, deleteBtn);
    return container;
}
