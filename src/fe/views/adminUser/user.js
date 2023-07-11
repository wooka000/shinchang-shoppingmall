const content = document.querySelector("#content-detail");

fetchJSONData();

async function fetchJSONData() {
  const response = await fetch("./user.json");
  const data = await response.json();
  console.log(data);
  data.map((user) => {
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="user">
        <div class="user-number">${user.userNumber}</div>
        <div class="user-name">${user.userName}</div>
        <div class="user-id">${user.userId}</div>
        <div class="user-date">${user.createdAt}</div>
        <div class="user-authority">
          <select>
            <option class="admin">관리자</option>
            <option class="not-admin">일반사용자</option>
          </select>
        </div>
        <button id="user-delete${user.userNumber} class="user-delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      `
    );
  });
  for (let i = 0; i < data.length; i++) {
    const deleteButton = document.querySelector(
      `#user-delete${data[i].userNumber}`
    );
    function onDelete(e) {
      e.preventDefault();
      console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
    }
    deleteButton.addEventListener("click", onDelete);
  }
}

// document.addEventListener("click", function (e) {
//   console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
// });
// const deleteButton = document.querySelector("#user-delete");
// console.log(deleteButton);
