const content = document.querySelector("#content-detail");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const cancelButton = document.querySelector("#modal-button-cancel");
const deleteCheckButton = document.querySelector("#modal-button-delete");

// 삭제할 유저의 id를 전역변수로 관리
let deleteUserId;
fetchJSONData();

// userlist 가져오기, productlist 가져오기, categorylist 가져오기, orderlist 가져오기
// user 삭제, product 삭제, category 삭제, order 삭제
// product 추가, category 추가
// user 권한 수정, order status 수정

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
    const deleteButton = document.querySelector(`#user-delete-${_id}`);
    function onDelete(e) {
      e.preventDefault();
      // 회원 번호를 이용해 데이터베이스에서 해당 유저 찾기
      //Usermodel.findUserById(e.target.parentNode.parentNode.firstElementChild.innerText);
      console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
      deleteUserId = e.target.parentNode.parentNode.firstElementChild.innerText;
      modalClick();
    }
    deleteButton.addEventListener("click", onDelete);

    // 권한 수정 => 수정 API가 필요해보임
    const authority = document.querySelector(`#authority-${_id}`);
    async function changeAuthority(e) {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/products", {
        method: "PATCH",
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

function deleteUser(e) {
  console.log(e.target);
  //'네'버튼 클릭 시 데이터베이스의 유저 삭제
  // deleteUser(deleteUserId);
  modalClick();
}
deleteCheckButton.addEventListener("click", deleteUser);

function modalClick() {
  modal.classList.toggle("hidden");
}

modalBackground.addEventListener("click", modalClick);
cancelButton.addEventListener("click", modalClick);
