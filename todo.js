import anime from './node_modules/animejs/lib/anime.es.js';

anime({
    targets: 'h1',
    opacity: [0, 1],
    translateY: [-150, 0],
    easing: "easeOutExpo",
    duration: 1600
})

const toDos = [];

const newToDo = document.getElementById("new-todo"); // input
newToDo.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        if (newToDo.value !== "") {
            appendToDo();
        }
    }
})

const addToDo = document.getElementById("add-todo"); //button
addToDo.addEventListener('click', () => {
    if (newToDo.value !== "") {
        appendToDo();
    }
})

const toDoList = document.getElementById("todos"); // ul

const sortBtn = document.getElementById("sort-completed"); //button
sortBtn.addEventListener("click", () => {
    toDos.sort(function(x, y) {
        return x.completed - y.completed;
    })
    toDoList.innerHTML = "";
    updateToDos();
})


// recursive function that updates the to-do list
function updateToDos(i = 0) {

    if (i !== toDos.length) {
        // div to hold complete to-do
        let toDo = document.createElement("div");
        toDo.classList.add("todo");

        // span to hold to-do text
        let toDoText = document.createElement("span");
        toDoText.textContent = toDos[i].text;
        toDo.appendChild(toDoText);

        // div to hold complete and delete buttons
        let toDoBtns = document.createElement("div");
        toDoBtns.classList.add("todo-btns");

        let completeBtn = document.createElement("button");
        completeBtn.innerHTML = "&check;";
        completeBtn.addEventListener("click", () => {
            if (toDos[i].completed) {
                toDos[i].completed = false;
                toDoText.style.textDecoration = "none";
            } else {
                toDos[i].completed = true;
                toDoText.style.textDecoration = "line-through";
            }
        })
        toDoBtns.appendChild(completeBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&#10006;";
        deleteBtn.addEventListener("click", () => {
            deleteTodo(i);
        })
        toDoBtns.appendChild(deleteBtn);

        if (toDos[i].completed) {
            toDoText.style.textDecoration = "line-through";
        } else {
            toDoText.style.textDecoration = "none";
        }

        toDo.appendChild(toDoBtns);
        toDoList.appendChild(toDo);
        
        updateToDos(i + 1);
    }

}

function appendToDo() {
    const toDoItem = {text: newToDo.value, completed: false};
    toDos.push(toDoItem);
    newToDo.value = "";
    toDoList.innerHTML = "";
    updateToDos();
    anime({
        targets: '.todo:last-of-type',
        opacity: [0, 1],
        translateX: [-600, 0],
        easing: "easeOutExpo",
        duration: 1000,
        delay: anime.stagger(140)
    })
}

function deleteTodo(index) {
    toDos.splice(index, 1);
    toDoList.innerHTML = "";
    updateToDos();
}