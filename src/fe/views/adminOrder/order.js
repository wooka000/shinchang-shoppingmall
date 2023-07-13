const content = document.querySelector("#content-detail");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const cancelButton = document.querySelector("#modal-button-cancel");
const deleteCheckButton = document.querySelector("#modal-button-delete");

// 삭제할 주문번호
let deleteOrderNo;
fetchJSONData();

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
    const { userName, orderArray, orderStatus, orderNo } = element;
    let price = 0;
    let orderInfo = "업데이트중";
    // for (let i = 0; i < orderArray.length; i++) {
    //   price += orderArray[i].quantity * orderArray[i].price;
    //   orderInfo += `${orderArray[i].productName} - ${orderArray[i].quantity}개  `;
    // }
    // console.log(orderInfo);
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="order">
        <div class="order-number">${orderNo}</div>
        <div class="order-name">${userName}</div>
        <div class="order-info">${orderInfo}</div>
        <div class="order-price">${price}</div>
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
    const deleteButton = document.querySelector(`#delete-button-${orderNo}`);

    // 삭제 버튼 클릭 시
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
      console.log(data);
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

// 정말로 삭제하시겠습니까? 후 동작
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
  console.log(data);
  location.href = "/admin/order";
}
deleteCheckButton.addEventListener("click", deleteUser);

// orderSchema => orderArray에 상품 이름과 상품 가격 => 주문 정보 표기와 주문 총액 표기
