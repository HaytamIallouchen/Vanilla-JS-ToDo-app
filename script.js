// localStorage.clear();
let todoList = localStorage.getItem("todoList").split(',');

// generate todo list:
function generateTodoList(listToGenerate) {
    let todoUlElement = document.getElementById("todo-list");
    todoUlElement.innerHTML = "";
    return listToGenerate.forEach((element) => {
        const toDo = element.split('-')[0]
        const status = element.split('-')[1]
        const html = 
        `<li id="${listToGenerate.indexOf(element)}" class="flex justify-between border-b py-3">
            <div class="flex">
                <button class="bg-slate-500 text-white p-1 m-1 text-xl rounded" onclick="status()">${status === "notdone" ? 'Set done' : 'Set not done'}</button>
                <p class="self-center text-lg text-white px-3 py-1 rounded${status === "done" ? " bg-green-600" : " bg-red-600"}">${toDo}</p>
            </div>
            <div class="flex">
                <button class="bg-slate-500 text-white p-1 m-1 text-xl rounded" onclick="edit()">Edit</button>
                <button class="bg-slate-500 text-white p-1 m-1 text-xl rounded" onclick="del()">Delete</button>
            </div>
        </li>`;
        todoUlElement.innerHTML = todoUlElement.innerHTML + html;
    });
}

// button functions:
function add() {
    let todoUlElement = document.getElementById("todo-list");
    let addButton = document.getElementById("addButton");
    if (addButton.innerText === "x") {
        addButton.innerText = "+";
        const addRow = document.getElementById("add");
        return addRow.remove();
    }
    const element =
        `<li id="add" class="flex justify-between border-b py-3">
            <input type="text" id="newTodo" class="self-center bg-slate-600 text-white py-2 ps-2 rounded" placeholder="Add ToDo">
            <button class="bg-slate-500 text-white p-1 m-1 text-xl rounded" onclick="save()">Add</button>
        </li>`;
    todoUlElement.innerHTML = element + todoUlElement.innerHTML;
    return addButton.innerText = "x";
}

function save() {
    const todo = document.getElementById("newTodo").value;
    if (localStorage.getItem("todoList") == false) {
        localStorage.setItem("todoList", todo + "-notdone");
    } else {
        localStorage.setItem("todoList", todo + "-notdone," + localStorage.getItem("todoList"));
    }
    return location.reload();
}

function edit() {
    const parentElement = this.document.activeElement.parentElement.parentElement;
    let status = todoList[parentElement.id].split('-')[1];
    const par = parentElement.querySelector("div").getElementsByTagName('p')[0];
    const buttons = parentElement.getElementsByTagName('div')[1].getElementsByTagName('button');
    if (buttons[0].innerText === "Edit") {
        buttons[0].innerHTML = "Save";
        buttons[1].innerHTML = "Cancel";
        buttons[1].setAttribute("onclick", "location.reload()");
        par.innerHTML = `<input type="text" id="editTodo" class="self-center bg-slate-600 text-white py-2 ps-2 rounded" placeholder="Edit ToDo" value=${par.innerHTML}>`;
        return;
    }
    todoList[parentElement.id] = `${document.getElementById("editTodo").value}-${status}`;
    localStorage.setItem("todoList", todoList.join(','));
    return location.reload();
}

function del() {
    const id = this.document.activeElement.parentElement.parentElement.id;
    todoList.splice(id, 1);
    localStorage.setItem("todoList", todoList.join(','));
    return location.reload();
}

function status() {
    const id = this.document.activeElement.parentElement.parentElement.id;
    const toDo = todoList[id].split('-')[0];
    const newStatus = todoList[id].split('-')[1] === "notdone" ? "done" : "notdone";
    todoList[id] = `${toDo}-${newStatus}`;
    localStorage.setItem("todoList", todoList.length === 1 ? todoList[0] : todoList.join(','));    
    return location.reload();
}

function filter() {
    switch (this.document.activeElement.value) {
        case "done":
            generateTodoList(todoList.filter((element) => element.split('-')[1] === "done"));
            break;
        case "notdone":
            generateTodoList(todoList.filter((element) => element.split('-')[1] === "notdone"));
            break;
        default:
            generateTodoList(todoList);
            break;
    }
}

function showNoTodoListMessage() {
    let todoUlElement = document.getElementById("todo-list");
    const element =
        `<li id="noTodoList" class="flex justify-center py-3">
            <p class="self-center text-lg text-white px-3 py-1">No ToDo List</p>
        </li>`;
    return todoUlElement.innerHTML = element;
}

function search() {
    const searchValue = this.document.activeElement.value;
    if (searchValue === "") {
        return generateTodoList(todoList);
    } else {
        return generateTodoList(todoList.filter((element) => element.split('-')[0].includes(searchValue)));
    }
}

// show todo list if exists:
localStorage.getItem("todoList") ? generateTodoList(todoList) : showNoTodoListMessage();