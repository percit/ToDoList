//Selectors
const todoInput = document.querySelector('.todo-input');//to bierze pierwszy element, ktory bedzie pasowal do opisu, czyli todo-input
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');//to jest ta nasza klasa z html odpowiedzialna za select

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addToDo(event){
    event.preventDefault(); // to jest po to, zeby po naciskaniu przycisku strona sie nie refreshowala
    //we make now element with div and inside it will be li (list) and a delete button
    const todoDiv = document.createElement('div'); //this creates div
    todoDiv.classList.add("todo");//we add class named "todo" to this div element
    //this creates element of a list
    const newTodo = document.createElement("li"); 
    newTodo.innerText = todoInput.value;//so this will be what is inside the future task, so one part of a list
    newTodo.classList.add("todo-item"); // we add newTodo element to todo-item
    todoDiv.appendChild(newTodo); //tutaj dodajemy caly nasz ToDo z napisem i klasa do diva
    //adding todo to localstorage
    saveLocalTodos(todoInput.value);
    //check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';//so this is our icon added
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';//so this is our icon added
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //dodaj do to do list
    todoList.appendChild(todoDiv);//i tutaj ostatecznie dodajemy nasz div z textem i dwoma przyciskami
    todoInput.value = "";//czysci nam okienko, gdzie taski wpisujemy
}
function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");//animation
        removeLocalTodos(todo);
        todo.addEventListener("transitionEnd", function(){
            todo.remove();
        });
    }
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!(todo.classList.contains("completed"))){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            default:
                break;
        }  
        return; 
    });
}

function saveLocalTodos(todo) {
    let todos;
    //checking if I have sth in localStorage
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
      //deleting deleted items
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText; //bierzemy jaki tekst mamy w tasku
    todos.splice(todos.indexOf(todoIndex), 1);//splice to usuwanie elementu z array, pierwszy element to index (bierzemy jaki index jest dla danego tekstu), a drugi argument to ile elementow usuwamy
    localStorage.setItem("todos", JSON.stringify(todos));//update local storage
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }