const userId = localStorage.getItem('username');
let extendedPrice = 0;

drawTable();


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
  orderList.forEach(async (e, idx) => {
    let numStr = "";
    if (e.orderArray.length-1 > 0) numStr = ` 외 ${e.orderArray.length-1}개`;
    // let div = await showDetail(idx);
    output += `
      <tr>
        <td>${e.createAt}</td>
        <td class="content-title">
          <p>${e.orderArray[0].productName}${numStr}</p>
        </td>
        <td>${e.status}</td>
        <td><button onclick="deleteOrder(${e.orderNo})">주문 취소</button></td>
      </tr>
    `;
  })
  tBody.innerHTML = output;
}

// async function showDetail(idx) {
//   const orderList = await getOrderInfo();
//   const orderObj = orderList[idx];
//   let products = "";
//   orderObj.orderArray.forEach(e => {
//     products += `
//       ${e.productName} / ${e.quantity}개 - ${(e.price)*(e.quantity)}`
//     extendedPrice += (e.price)*(e.quantity);
//   })
//   let output = `
//     <div>
//       주문번호 : ${orderObj.orderNo}
//       주문 물품 : ${products}
//       총 결제 금액 : ${extendedPrice}
//       수령인 : ${orderObj.recipientName}
//       주소 : ${orderObj.address} ${orderObj.detailAddress}
//       배송메시지 : ${orderObj.deliveryMessage}
//     </div>
//   `
//   extendedPrice = 0;
//   return output;
// }


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