const content = document.querySelector("#content-detail");
console.log(content);

fetchJSONData();

async function fetchJSONData() {
  const response = await fetch("./user.json");
  const data = await response.json();
  console.log(data);
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
            <option>관리자</option>
            <option>일반사용자</option>
          </select>
        </div>
        <button class="user-delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      `
    );
  }
}

document.addEventListener("click", function (e) {
  console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
});
const deleteButton = document.querySelector("#user-delete");
console.log(deleteButton);
