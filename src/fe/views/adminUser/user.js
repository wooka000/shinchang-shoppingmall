const content = document.querySelector("#content-detail");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const cancelButton = document.querySelector("#modal-button-cancel");
const deleteCheckButton = document.querySelector("#modal-button-delete");

// 삭제할 유저의 id를 전역변수로 관리
let deleteUserId;

fetchJSONData();

async function fetchJSONData() {
  // const users = await Api.get("/api/userlist");
  const response = await fetch("./user.json");
  const data = await response.json();
  console.log(data);
  // map 사용해서 객체형태로 받아오기
  for (let i = 0; i < data.length; i++) {
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="user">
        <div class="user-number">${data[i].userNumber}</div>
        <div class="user-name">${data[i].userName}</div>
        <div class="user-id">${data[i].userId}</div>
        <div class="user-date">${data[i].createdAt}</div>
        <div class="user-authority">
          <select>
            <option class="admin">관리자</option>
            <option class="not-admin" >일반사용자</option>
          </select>
        </div>
        <button id="user-delete-${data[i].userNumber}" class="user-delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      `
    );
    const deleteButton = document.querySelector(
      `#user-delete-${data[i].userNumber}`
    );
    function onDelete(e) {
      e.preventDefault();
      // 회원 번호를 이용해 데이터베이스에서 해당 유저 찾기
      // findUser(e.target.parentNode.parentNode.firstElementChild.innerText);
      console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
      deleteUserId = e.target.parentNode.parentNode.firstElementChild.innerText;
      modalClick();
    }
    deleteButton.addEventListener("click", onDelete);
  }
}

function deleteUser(e) {
  console.log(e.target);
  //'네'버튼 클릭 시 데이터베이스의 유저 삭제
  // deleteUser(deleteUserId);
}
deleteCheckButton.addEventListener("click", deleteUser);

function modalClick() {
  modal.classList.toggle("hidden");
}

modalBackground.addEventListener("click", modalClick);
cancelButton.addEventListener("click", modalClick);
