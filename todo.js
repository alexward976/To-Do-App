import anime from './node_modules/animejs/lib/anime.es.js';

anime({
    targets: 'h1',
    opacity: [0, 1],
    translateY: [-600, 0],
    easing: "easeOutExpo",
    duration: 1400
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
        let toDo = document.createElement("li");
        toDo.textContent = toDos[i].text;
        
        let completeBtn = document.createElement("button");
        completeBtn.innerHTML = "&check;";
        completeBtn.addEventListener('click', () => {
            if (toDos[i].completed) {
                toDos[i].completed = false;
                toDo.style.textDecoration = "none";
            } else {
                toDos[i].completed = true;
                toDo.style.textDecoration = "line-through";
            }
        })

        if (toDos[i].completed) {
            toDo.style.textDecoration = "line-through";
        } else {
            toDo.style.textDecoration = "none";
        }

        toDo.appendChild(completeBtn);

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
        targets: 'li:last-of-type',
        opacity: [0, 1],
        translateX: [-600, 0],
        easing: "easeOutExpo",
        duration: 1000,
        delay: anime.stagger(140)
    })
}

