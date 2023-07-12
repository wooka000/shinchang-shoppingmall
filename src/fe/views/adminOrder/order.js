const content = document.querySelector("#content-detail");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const cancelButton = document.querySelector("#modal-button-cancel");
const deleteCheckButton = document.querySelector("#modal-button-delete");

fetchJSONData();

async function fetchJSONData() {
  const response = await fetch("./order.json");
  const data = await response.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="order">
        <div class="order-date">${data[i].orderDate}</div>
        <div class="order-name">${data[i].orderName}</div>
        <div class="order-info">${data[i].orderInfo}</div>
        <div class="order-price">${data[i].orderPrice}</div>
        <div class="order-status">
          <select>
            <option>상품 준비중</option>
            <option>상품 배송중</option>
            <option>배송 완료</option>
          </select>
        </div>
        <button id="delete-button-${data[i].orderNo}">
          <i class="fa-solid fa-trash"> 삭제</i>
        </button>
      </div>
      `
    );
    const deleteButton = document.querySelector(
      `#delete-button-${data[i].orderNo}`
    );

    function onDelete(e) {
      e.preventDefault();
      console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
      modalClick();
    }
    deleteButton.addEventListener("click", onDelete);
  }
}

function modalClick() {
  modal.classList.toggle("hidden");
}

modalBackground.addEventListener("click", modalClick);
cancelButton.addEventListener("click", modalClick);

function deleteUser(e) {
  e.preventDefault();
  console.log(e.target);
  //'네'버튼 클릭 시 데이터베이스의 주문 삭제
}
deleteCheckButton.addEventListener("click", deleteUser);
