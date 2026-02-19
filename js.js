//Først bliver der lavet variabler, som vælger specifikke elementer i DOM'en
const todoText = document.querySelector("#todo_text");
const todoAmount = document.querySelector("#todo_amount")
const todoBtn = document.querySelector(".todo");
const todoContainer = document.querySelector(".todo_container");
const doneContainer = document.querySelector(".done_container");

// Array til at gemme alle tasks. Bruger 'let' fordi arrayet ændrer sig
let todoArr = [];

//Henter gemte tasks fra localStorage, hvis de findes
const savedTasks = localStorage.getItem("todoArr");

// Hvis der er gemte tasks, indlæses de i todoArr og vises
if(savedTasks){
    todoArr = JSON.parse(savedTasks); // Konverterer JSON-strengen tilbage til et array
    showTaskArr(); // Vis de indlæste tasks
}

//Her laver man en eventlistener, som lytter til når brugeren klikker på knappen, når de gør det så kører funktionen, submitToDo
todoBtn.addEventListener("click", submitToDo);


//Denne funktion kører når brugeren indsender en task
function submitToDo(){

    //Opretter et objekt med task-detaljer
    const toDoObj = {
    text: todoText.value, 
    amount: todoAmount.value,
    done: false ,
    unchecked: true,
    star: true,
    trashcan: true,
    id:self.crypto.randomUUID()
}
    // Tilføjer den nye task til arrayet
    todoArr.push(toDoObj)

    // Gemmer det opdaterede array i localStorage som en JSON-streng
    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    // Opdaterer visningen af tasks
    showTaskArr();

    // Nulstiller inputfelterne efter indsendelse
    todoText.value = "";
    todoAmount.value = "";
}

// Funktion der viser alle tasks i deres respektive containere
function showTaskArr(){
    
    // Rydder indholdet i begge containere
    todoContainer.innerHTML = "";
    doneContainer.innerHTML = "";
    
    // Looper igennem alle tasks i todoArr, så for hvert element/task der bliver skrevet så bliver det oprettet som <li> element
    todoArr.forEach(elm =>{
        const li = document.createElement("li")
       li.innerHTML = `
       <p class="checkbox"> ${elm.unchecked ? "☐" : "☒"} </p>
       <p class="star"> ${elm.star ? "☆" : "★" }</p>  
       <p class="textelement">${elm.text} <span class="amount">(${elm.amount})</span> </p>
        `;
        
        // Hvis tasken ikke er afkrydset, tilføjes den til "Igangværende tasks"
       if(elm.unchecked){
        todoContainer.appendChild(li);

        // Hvis tasken er afkrydset, tilføjes den til "Færdige tasks"
       } else {
        doneContainer.appendChild(li);
        li.innerHTML = `
       <p class="checkbox"> ${elm.unchecked ? "☐" : "☒"} </p>
       <img src="/img/delete.webp" alt="" ${elm.trashcan} class="trash">  
       <p class="textelement line-thru">${elm.text} <span class="amount">(${elm.amount})</span></p>
        `;
       }

       // Tilføjer en eventlistener til <li>-elementet
        li.addEventListener("click", (evt) => {
        // Hvis der klikkes på checkboxen, skifter taskens status mellem afkrydset/ikke-afkrydset
      if(evt.target.classList.contains("checkbox")) {
            elm.unchecked = !elm.unchecked;
        } 
        // Hvis der klikkes på stjernen, skifter den mellem udfyldt/ikke-udfyldt
      if(evt.target.classList.contains("star")){
            elm.star = !elm.star;
            
        }
                    // Hvis der klikkes på skraldespanden, slettes tasken fra arrayet
      if(evt.target.classList.contains("trash")){
            const index = todoArr.findIndex(targetArr => targetArr.id === elm.id);
            todoArr.splice(index, 1); // Fjerner tasken fra arrayet
            
            }
        evt.preventDefault()

        // Opdaterer localStorage efter sletning
        localStorage.setItem("todoArr", JSON.stringify(todoArr));
            
        showTaskArr(); // Opdaterer visningen af tasks
      
         });

     });

   
}