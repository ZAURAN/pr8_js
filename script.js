let todos = JSON.parse(localStorage.getItem('todos')) || [];

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
    const text = prompt("Введіть текст завдання:");
    if (text) {
        const todo = {
            id: todos.length + 1,
            text: text,
            completed: false
        };
        todos.push(todo);
        updateLocalStorage();
        render();
        updateCounter();
    }
}

function renderTodo(todo) {
    return `<li data-id="${todo.id}">
        <input type="checkbox" ${todo.completed ? "checked" : ""} onclick="checkTodo(${todo.id})">
        <label class="${todo.completed ? "completed" : ""}" ondblclick="editTodo(${todo.id})">${todo.text}</label>
        <button onclick="deleteTodo(${todo.id})">Видалити</button>
    </li>`;
}


function render() {
    const html = todos.map(todo => renderTodo(todo)).join("");
    document.getElementById("todo-list").innerHTML = html;
}

function updateCounter() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    document.getElementById("total-count").textContent = `Всього: ${total}`;
    document.getElementById("active-count").textContent = `Незроблені: ${total - completed}`;
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateLocalStorage();
    render();
    updateCounter();
}

function checkTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    updateLocalStorage();
    render();
    updateCounter();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    const listElement = document.querySelector(`li[data-id="${id}"]`);
    const label = listElement.querySelector('label');
    label.innerHTML = `<input type='text' value='${todo.text}' onblur='saveTodo(${id}, this.value)'>`;
    label.querySelector('input').focus();
}

function saveTodo(id, newText) {
    const todo = todos.find(t => t.id === id);
    todo.text = newText;
    updateLocalStorage();
    render();
    updateCounter();
}

document.addEventListener('DOMContentLoaded', function () {
    render();
    updateCounter();
});
