const content = document.querySelector("#content-detail");
console.log(content);

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
        <button>
          <i class="fa-solid fa-trash"> 삭제</i>
        </button>
      </div>
      `
    );
  }
}

document.addEventListener("click", function (e) {
  console.log(e.target.parentNode.parentNode.firstElementChild.innerText);
});

const deleteButton = document.querySelector("#order-delete");
console.log(deleteButton);
