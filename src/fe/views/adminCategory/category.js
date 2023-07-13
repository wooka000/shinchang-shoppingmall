const addButton = document.querySelector(".button-category-add");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const uploadButton = document.querySelector("#button-category-upload");
const cancelButton = document.querySelector("#button-category-cancel");
const content = document.querySelector("#content-detail");
const deleteModal = document.querySelector(".modal-delete");
const modifyModal = document.querySelector(".modal-modify");
const modalDeleteBackground = document.querySelector(
  ".modal-delete-background"
);
const deleteModalCheck = document.querySelector("#modal-button-delete");
const modalModifyBackground = document.querySelector(
  ".modal-modify-background"
);
const modifyModalCheck = document.querySelector("#modal-button-modify");
const cancelDelete = document.querySelector("#modal-button-cancel");

let deleteCategoryName;
let modifyCategoryName;
fetchJSONData();

async function fetchJSONData() {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/category", {
    method: "GET",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);

  data.map((element) => {
    const { _id, categoryName } = element;
    content.insertAdjacentHTML(
      "beforeend",
      `
      <div class="category">
        <div class="category-name">
          ${categoryName}
        </div>
        <div class="buttons">
          <button class="button-modify-${_id}">
            <i class="fa-solid fa-pencil"> 수정</i>
          </button>
          <button id="delete-button-${_id}">
            <i class="fa-solid fa-trash"> 삭제</i>
          </button>
        </div>
      </div>
      `
    );
    const deleteButton = document.querySelector(`#delete-button-${_id}`);
    // 삭제 버튼 누를시
    async function onDelete(e) {
      e.preventDefault();
      const name =
        e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
      deleteCategoryName = name;
      deleteModal.classList.toggle("hidden");
    }
    deleteButton.addEventListener("click", onDelete);

    // 수정 버튼 누를시
    const modifyButton = document.querySelector(`.button-modify-${_id}`);
    async function onModify(e) {
      e.preventDefault();
      const name =
        e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
      modifyCategoryName = name;
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/products/${modifyCategoryName}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      modifyCategoryName = data;

      console.log(newCategoryName.value);
      modifyModal.classList.toggle("hidden");
    }
    modifyButton.addEventListener("click", onModify);
  });
}

// 삭제 하시겠습니까? 후 확인버튼 누를시
async function deleteCategory(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/category/${deleteCategoryName}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.error) {
    alert(data.error);
  }
  location.reload();
}
deleteModalCheck.addEventListener("click", deleteCategory);

// 카테고리 추가 버튼 누를 시 이벤트
const newCategoryName = document.querySelector("#newCategory-name");
function addButtonClick(e) {
  e.preventDefault();
  modal.classList.toggle("hidden");
}

// 카테고리 등록 버튼 클릭 시 이벤트
// 카테고리 이미지?
async function upload(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const response = await fetch("/api/category", {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryName: newCategoryName.value,
      image: "image",
    }),
  });
  const data = await response.json();
  console.log(data);

  content.insertAdjacentHTML(
    "beforeend",
    `
    <div class="category">
      <div class="category-name">
        ${data.categoryName}
      </div>
      <div class="buttons">
        <button class="button-modify-${data._id}">
          <i class="fa-solid fa-pencil"> 수정</i>
        </button>
        <button id="delete-button-${data._id}">
          <i class="fa-solid fa-trash"> 삭제</i>
        </button>
      </div>
    </div>
    `
  );
  location.href = "/admin/category";
}
uploadButton.addEventListener("click", upload);

// 수정 확인 버튼 누를 시
async function modifyCategory(e) {
  e.preventDefault();
  console.log(modifyCategoryName);
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/category/${modifyCategoryName}`, {
    method: "PUT",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryName: modifyCategoryName,
      image: "https://sitem.ssgcdn.com/32/70/47/item/1000026477032_i1_750.jpg",
    }),
  });
  const data = await response.json();
  console.log(data);
  location.href = "/admin/category";
}
modifyModalCheck.addEventListener("click", modifyCategory);

// 모달 창 제어
function modalClick(e) {
  newCategoryName.value = "";
  modal.classList.toggle("hidden");
}

function deleteModalClick(e) {
  e.preventDefault();
  deleteModal.classList.toggle("hidden");
}

function modifyModalClick(e) {
  e.preventDefault();
  modifyModal.classList.toggle("hidden");
}

addButton.addEventListener("click", addButtonClick);
modalBackground.addEventListener("click", modalClick);
cancelButton.addEventListener("click", modalClick);

modalDeleteBackground.addEventListener("click", deleteModalClick);
cancelDelete.addEventListener("click", deleteModalClick);

modalModifyBackground.addEventListener("click", modifyModalClick);
