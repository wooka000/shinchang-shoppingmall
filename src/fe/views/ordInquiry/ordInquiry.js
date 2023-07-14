const userId = localStorage.getItem('username');

drawTable()
  .then(() => {
    const content = document.querySelectorAll(".content");
    const contentAnswer = document.querySelectorAll(".content-answer");
    console.log(content);

    for (let i = 0; i < content.length; i++) {
      content[i].addEventListener("click", () => {
        contentAnswer[i].classList.toggle("active");
      })
    }
  });



async function getOrderInfo() {
  let res = await fetch(`/api/order/userId/${userId}`);
  let data = await res.json();
  return data;
}

async function drawTable() {
  const orderList = await getOrderInfo();
  console.log(orderList);

  const tBody = document.querySelector(".order-table > tbody");
  let output = "";
  orderList.forEach((e) => {
    let numStr = "";
    if (e.orderArray.length-1 > 0) numStr = ` 외 ${e.orderArray.length-1}개`;
    let products = `주문번호 : ${e.orderNo}<br>`;
    let extendedPrice = 0;
    e.orderArray.forEach(o => {
      products += `
        ${o.productName}(${(o.price).toLocaleString()}원) / ${o.quantity}개 : ${((o.price)*(o.quantity)).toLocaleString()}원<br>
      `
      extendedPrice += (o.price)*(o.quantity);
    })
    products += `
      결제금액 : ${(extendedPrice).toLocaleString()}원<br>
      수령인 : ${e.recipientName}<br>
      주소 : ${e.address} ${e.detailAddress}
    `
    output += `
      <tr class="content">
        <td>${e.createAt}</td>
        <td>
          <p class="content-title">${e.orderArray[0].productName}${numStr}</p>
          <div class="content-answer">${products}</div>
        </td>
        <td>${e.status}</td>
        <td><button onclick="deleteOrder(${e.orderNo})">주문 취소</button></td>
      </tr>
    `;
  })
  tBody.innerHTML = output;
}

async function deleteOrder(num) {
  let answer = confirm('주문을 삭제하시겠습니까?');
  if (answer) {
    let res = await fetch(`/api/order/${num}`, {
      method: 'DELETE'
    });
    let data = await res.json();
    if (data.result === "success") alert('주문이 취소되었습니다!');
    else throw new Error();
  }
  drawTable();
}