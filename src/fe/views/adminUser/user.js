const content = document.querySelector("#content-detail");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const cancelButton = document.querySelector("#modal-button-cancel");
const deleteCheckButton = document.querySelector("#modal-button-delete");

let deleteUserId;
fetchJSONData();

// 화면 로드 시 실행
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

    //삭제(휴지통 버튼 클릭 시)
    const deleteButton = document.querySelector(`#user-delete-${_id}`);
    function onDelete(e) {
      e.preventDefault();
      deleteUserId = _id;
      modalClick();
    }
    deleteButton.addEventListener("click", onDelete);
  });
}

// 삭제 modal 창 내의 확인 버튼 클릭 시
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

// modal 띄우기
function modalClick() {
  modal.classList.toggle("hidden");
}

modalBackground.addEventListener("click", modalClick);
cancelButton.addEventListener("click", modalClick);
