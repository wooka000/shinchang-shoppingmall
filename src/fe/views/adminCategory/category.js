const addButton = document.querySelector(".button-category-add");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const uploadButton = document.querySelector("#button-category-upload");
const cancelButton = document.querySelector("#button-category-cancel");
const content = document.querySelector("#content-detail");
const deleteModal = document.querySelector(".modal-delete");
const modalDeleteBackground = document.querySelector(
  ".modal-delete-background"
);
const deleteModalCheck = document.querySelector("#modal-button-delete");
const cancelDelete = document.querySelector("#modal-button-cancel");

const category = [
  { name: "인기 | 신상품", num: 1 },
  { name: "피규어", num: 2 },
  { name: "다이어리", num: 3 },
  { name: "아크릴 키링", num: 4 },
  { name: "핸드폰 케이스", num: 5 },
  { name: "의류", num: 6 },
];

fetchJSONData();

async function fetchJSONData() {
  // const response = await fetch("./order.json");
  // const data = await response.json();
  // console.log(data);
  for (let i = 0; i < category.length; i++) {
    content.insertAdjacentHTML(
      "beforeend",
      `
      <div class="category">
        <div class="category-name">
          ${category[i].name}
        </div>
        <div class="buttons">
          <button class="button-modify">
            <i class="fa-solid fa-pencil"> 수정</i>
          </button>
          <button id="delete-button-${category[i].num}">
            <i class="fa-solid fa-trash"> 삭제</i>
          </button>
        </div>
      </div>
      `
    );
    const deleteButton = document.querySelector(
      `#delete-button-${category[i].num}`
    );

    function onDelete(e) {
      e.preventDefault();
      console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
      deleteModalClick();
    }
    deleteButton.addEventListener("click", onDelete);
  }
}

function modalClick(e) {
  e.preventDefault();
  modal.classList.toggle("hidden");
}

function deleteModalClick(e) {
  deleteModal.classList.toggle("hidden");
}

addButton.addEventListener("click", modalClick);
modalBackground.addEventListener("click", modalClick);
cancelButton.addEventListener("click", modalClick);

modalDeleteBackground.addEventListener("click", deleteModalClick);
cancelDelete.addEventListener("click", deleteModalClick);
