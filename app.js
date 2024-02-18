const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".myList");

let list = JSON.parse(localStorage.getItem("list"));//converting the string back to an array

//loop through the list
list.forEach(task =>{
  toDoList(task);
})

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value;
  if (task){
    newTask = task.name;//this will prevent the task from disappearing when refreshed.
  };

  if (newTask.trim() === "") return; 

  const liEl = document.createElement("li");
  if (task && task.checked){
    liEl.classList.add("checked"); /*this will prevent the checked task from being
    unchecked when refreshed*/
  };
  
  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";

  const checkBtnEl = document.createElement("div"); 
  checkBtnEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`; 
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener('click', () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });
  

  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();//calling the localStroage function in the toDoList
}

function updateLocalStorage(){
  const liEls = document.querySelectorAll("li") //selects all the li elements
  list = [] //stores the li elements
  liEls.forEach(liEl => {
      list.push({
        name: liEl.innerText,
        checked: liEl.classList.contains("checked")

      })
  });
  localStorage.setItem("list", JSON.stringify(list))//converting the array variable "list" to a string
}
