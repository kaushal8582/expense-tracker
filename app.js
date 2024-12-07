const amount = document.querySelector("#amount");
const desc = document.querySelector("#description");
const category = document.querySelector("#category");
const addBtn = document.querySelector("#addBtn");
const ul = document.querySelector("ul");

let arr = [];
let globalIndex = null;

function getDataOnLocalStorage() {
  let data = JSON.parse(localStorage.getItem("expense"));

  if (data) {
    arr = data;
  }
}

getDataOnLocalStorage();

function addDataInLocalStorage() {
  localStorage.setItem("expense", JSON.stringify(arr));
}

ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let li = e.target.closest("li");
    let index = li.dataset.index;
    arr.splice(index, 1);

    addDataInLocalStorage();
    renderDataInScreen();
  }

  if (e.target.classList.contains("edit-btn")) {
    let li = e.target.closest("li");
    let index = li.dataset.index;
    let obj = arr[index];

    console.log(obj);

    amount.value = obj.amount;
    desc.value = obj.description;
    category.value = obj.category;

    globalIndex = index;
  }
});

function renderDataInScreen() {
  getDataOnLocalStorage();
  let cluter = "";
  arr.forEach((obj, index) => {
    cluter += `
         <li class="expense-item" data-index = "${index}">
                <span class="expense-text">${obj.amount} - ${obj.description} - ${obj.category}</span>
                <div class="action-buttons">
                    <button  class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </li>
        `;
  });

  ul.innerHTML = cluter;
}

addBtn.addEventListener("click", () => {
  if (globalIndex == null) {
    let obj = {
      amount: amount.value,
      description: desc.value,
      category: category.value,
    };

    amount.value ='';
    desc.value ='';
    category.value =''

    arr.push(obj);
  } else {
    arr[globalIndex].amount = amount.value;
    arr[globalIndex].description = desc.value;
    arr[globalIndex].category = category.value;
    globalIndex = null;
    amount.value ='';
    desc.value ='';
    category.value =''
  }

  addDataInLocalStorage();
  renderDataInScreen();
});

renderDataInScreen();
