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

  data.map((element) => {
    const { _id, name, email, subscriptionDate } = element;
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="user">
        <div class="user-number">${_id}</div>
        <div class="user-name">${name}</div>
        <div class="user-id">${email}</div>
        <div class="user-date">${subscriptionDate}</div>
        <div class="user-authority">
          <select>
            <option class="admin">관리자</option>
            <option class="not-admin" >일반사용자</option>
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
