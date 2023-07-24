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

const createCategoryName = document.querySelector("#newCategory-name");
const createCategoryImage = document.querySelector("#newCategory-image");

const modifyModalCheck = document.querySelector("#modal-button-modify");
const cancelDelete = document.querySelector("#modal-button-cancel");

const newCategoryName = document.querySelector("#newCategory-modify-name");
const newCategoryImage = document.querySelector("#newCategory-modify-image");

let deleteCategoryName;
let modifyCategoryName;
let modifyData;
fetchJSONData();

// 화면 로드 시 실행
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
    const { _id, categoryName, image } = element;
    content.insertAdjacentHTML(
      "beforeend",
      `
      <div class="category">
        <div class="category-name">
          ${categoryName}
        </div>
        <div class="category-image">
          <img class="category-image-src" src=${image} alt="이미지"/>
        </div>
        <div class="buttons">
          <button class="button-modify button-modify-${_id}">
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

    //삭제(휴지통 버튼 클릭 시)
    async function onDelete(e) {
      e.preventDefault();
      const name =
        e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
      deleteCategoryName = name;
      deleteModal.classList.toggle("hidden");
    }
    deleteButton.addEventListener("click", onDelete);

    //수정(연필 버튼 클릭 시)
    const modifyButton = document.querySelector(`.button-modify-${_id}`);
    async function onModify(e) {
      e.preventDefault();
      const name =
        e.target.parentNode.parentNode.parentNode.firstElementChild.innerText;
      modifyCategoryName = name;
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/category/${name}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      modifyCategoryName = data;
      newCategoryName.value = data.categoryName;
      newCategoryImage.value = data.image;
      modifyModal.classList.toggle("hidden");
    }
    modifyButton.addEventListener("click", onModify);
  });
}

// 삭제 modal 창 내의 확인 버튼 클릭 시
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

// 카테고리 추가 버튼 클릭 시 이벤트
function addButtonClick(e) {
  e.preventDefault();
  modal.classList.toggle("hidden");
}

// 카테고리 추가 모달 창에서 등록 버튼 클릭 시 이벤트
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
      categoryName: createCategoryName.value,
      image: createCategoryImage.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (data.error) {
    alert(data.error);
    return;
  }

  content.insertAdjacentHTML(
    "beforeend",
    `
    <div class="category">
      <div class="category-name">
        ${data.categoryName}
      </div>
      <div class="category-image">
        <img class="category-image-src" src=${data.image} alt="이미지"/>
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

// 수정 modal 창 내의 확인 버튼 클릭 시
async function modifyCategory(e) {
  e.preventDefault();
  console.log(newCategoryName.value);
  if (!newCategoryName.value || !newCategoryImage.value) {
    alert("카테고리 이름과 이미지를 확인해주세요!");
    return;
  }
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/category/${modifyCategoryName}`, {
    method: "PUT",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryName: newCategoryName.value,
      image: newCategoryImage.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  location.href = "/admin/category";
}
modifyModalCheck.addEventListener("click", modifyCategory);

// 모달 창 제어
function modalClick(e) {
  createCategoryName.value = "";
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
