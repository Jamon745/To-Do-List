const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".myList");

let list = JSON.parse(localStorage.getItem("list")) || []; // Initialize with an empty array if no data found in localStorage

// Loop through the list if it exists
if (list) {
  list.forEach(task => {
    toDoList(task);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList(); // This will add a new task
});

function toDoList(task) {
  let newTask = inputEl.value;

  // If a task is provided, use its name
  if (task) {
    newTask = task.name;
  }

  // Trimmed task should not be empty
  if (newTask.trim() === "") return;

  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }
  
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

  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach(liEl => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked")
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}
