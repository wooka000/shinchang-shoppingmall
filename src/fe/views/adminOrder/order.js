const content = document.querySelector("#content-detail");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const cancelButton = document.querySelector("#modal-button-cancel");
const deleteCheckButton = document.querySelector("#modal-button-delete");

let deleteOrderNo;
fetchJSONData();

// 화면 로드 시 실행
async function fetchJSONData() {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/order", {
    method: "GET",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);

  data.map((element) => {
    const { userName, orderArray, orderNo } = element;
    let price = 0;
    for (let i = 0; i < orderArray.length; i++) {
      price += orderArray[i].quantity * orderArray[i].price;
    }

    content.insertAdjacentHTML(
      "beforeend",
      `<div class="order">
        <div class="order-number">${orderNo}</div>
        <div class="order-name">${userName}</div>
        <div class="order-info order-info-${orderNo}"></div>
        <div class="order-price">${price}원</div>
        <div class="order-status">
          <select>
            <option>상품 준비중</option>
            <option>상품 배송중</option>
            <option>배송 완료</option>
          </select>
        </div>
        <button id="delete-button-${orderNo}">
          <i class="fa-solid fa-trash"> 삭제</i>
        </button>
      </div>
      `
    );
    document.querySelector(`.order-info-${orderNo}`).innerHTML = orderArray
      .map((order) => {
        return `<div>${order.productName} - ${order.quantity}개</div>`;
      })
      .join("");
    const deleteButton = document.querySelector(`#delete-button-${orderNo}`);

    //삭제 (휴지통 버튼 클릭 시)
    async function onDelete(e) {
      e.preventDefault();
      const id = Number(
        e.target.parentNode.parentNode.firstElementChild.innerText
      );
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/order/${id}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      deleteOrderNo = data.orderNo;
      modalClick();
    }
    deleteButton.addEventListener("click", onDelete);
  });
}

function modalClick() {
  modal.classList.toggle("hidden");
}

modalBackground.addEventListener("click", modalClick);
cancelButton.addEventListener("click", modalClick);

// 삭제 modal 창 내의 확인 버튼 클릭 시
async function deleteUser(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/order/${deleteOrderNo}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  location.href = "/admin/order";
}
deleteCheckButton.addEventListener("click", deleteUser);
