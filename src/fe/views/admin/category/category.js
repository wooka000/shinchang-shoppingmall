const addButton = document.querySelector(".button-category-add");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const uploadButton = document.querySelector("#button-category-upload");
const cancelButton = document.querySelector("#button-category-cancel");

function onClick(e) {
  e.preventDefault();
  modal.classList.toggle("hidden");
}

addButton.addEventListener("click", onClick);
modalBackground.addEventListener("click", onClick);
cancelButton.addEventListener("click", onClick);
