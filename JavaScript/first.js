// chosseing all elements from html

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
  //All event listeners
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
  if (confirm("Are you sure to delete all ?")) {
    // todoList.innerHTML = "";

    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();

    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display : none !important");
    } else {
      listItem.setAttribute("style", "display : block");
    }
  });
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    //deleting todos

    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Todos has been successfully deleted");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); // deleting value from array
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  });
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert(
      "danger",
      "you cannot send the empty cell. Please enter something"
    );
  } else {
    addTodoToUI(newTodo);
    addTodoStorage(newTodo);
    showAlert("success", "New todo added successfully");
  }

  e.preventDefault();
}

function getTodosFromStorage() {
  // getting todos from Storage
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;

  alert.textContent = message;

  firstCardBody.appendChild(alert);

  //setTimeout

  setTimeout(function () {
    alert.remove();
  }, 1900);
}

function addTodoToUI(newTodo) {
  //adding string value to UI as a list item

  /*
  <li class="list-group-item d-flex justify-content-between">
    // Todo 1
    <a href="#" class="delete-item">
      <i class="fa fa-remove"></i>
    </a>
  </li>;
  */

  //creating list item
  const listItem = document.createElement("li");
  // creating link
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class= 'fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";

  // text node adding

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //ADDING LIST ITEM TO TODO LIST

  todoList.appendChild(listItem);
  todoInput.value = "";
}
