const content = document.querySelector("#content-detail");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const cancelButton = document.querySelector("#modal-button-cancel");
const deleteCheckButton = document.querySelector("#modal-button-delete");

// 삭제할 유저의 id를 전역변수로 관리
let deleteUserId;
fetchJSONData();

// userlist 가져오기 O, productlist 가져오기 O, categorylist 가져오기 O, orderlist 가져오기 O
// user 삭제 O, product 삭제 O, category 삭제 O, order 삭제 O
// product 추가 O, category 추가 Os
// product 수정 O, category 수정 O
// ***user 권한 수정, order status 수정 (추가 기능)***

async function fetchJSONData() {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/user/userlist", {
    method: "GET",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  data.map((element) => {
    const { _id, name, email, subscriptionDate, role } = element;
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="user">
        <div class="user-number">${_id.slice(13)}</div>
        <div class="user-name">${name}</div>
        <div class="user-id">${email}</div>
        <div class="user-date">${subscriptionDate.slice(0, 10)}</div>
        <div class="user-authority">
          <select id="authority-${_id}">
            <option class="admin" ${
              role === "admin" ? "selected" : ""
            }>관리자</option>
            <option class="not-admin" ${
              role === "user" ? "selected" : ""
            }>일반사용자</option>
          </select>
        </div>
        <button id="user-delete-${_id}" class="user-delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      `
    );

    //삭제
    const deleteButton = document.querySelector(`#user-delete-${_id}`);
    function onDelete(e) {
      e.preventDefault();
      deleteUserId = _id;
      console.log(deleteUserId);
      modalClick();
    }
    deleteButton.addEventListener("click", onDelete);

    // 권한 수정
    const authority = document.querySelector(`#authority-${_id}`);
    async function changeAuthority(e) {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/user/user/${authority}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    }
    authority.addEventListener("change", changeAuthority);
  });
}

// 삭제 확인 버튼
async function deleteUser(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/user/user/${deleteUserId}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  console.log(response);

  modalClick();
  location.reload();
}
deleteCheckButton.addEventListener("click", deleteUser);

function modalClick() {
  modal.classList.toggle("hidden");
}

modalBackground.addEventListener("click", modalClick);
cancelButton.addEventListener("click", modalClick);
