const todoText = document.querySelector("#todo_text");
const todoBtn = document.querySelector(".todo");
const todoContainer = document.querySelector(".todo_container");

const todoArr = [];

todoBtn.addEventListener("click", submitToDo);
function submitToDo(){
    todoArr.length = 0;
    const toDoObj = {text: todoText.value, done:false ,id:self.crypto.randomUUID()}
    todoArr.push(toDoObj)
    console.log("todoarr", todoArr);
    showTaskArr();//
}

function filterAndSortTaskArr(){
    showTaskArr();

}


function showTaskArr(){
    
    todoArr.forEach(element =>{
       todoContainer.innerHTML += `<li>${element.text}</li>`
        

        /* et li element, og putte ting fra toDoObj, og for hver dem lave et element i html
        der kan være en select box som kan "krydse" det af
        done: fra false til true
          */

    });
}

/* nvc modellen */
/* sætte sata object til done (checkbox)
showtaskarr skal vise den som klikket?
checkbox har en default behavior - preventdefault så holder den op med at gøre det  */