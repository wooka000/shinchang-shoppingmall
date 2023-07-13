const productReq = [];  // 서버로 보낼 장바구니 정보를 담을 배열

render();

// 서버에서 로그인중인 회원의 회원정보 가져오는 api 호출하기
// fetch('/api/user/register')
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err))



function render() {
  let output = '';
  let totalQuantity = 0;  // 총 주문 수량
  let total = 0;  // 총 상품 금액
  let deliveryCharge = 3000;  // 배송비
  let keys = Object.keys(localStorage).filter(k => k.substring(0, 3) === "pro");
  let validKeys = keys.filter(k => JSON.parse(localStorage.getItem(k)).checked === "checked");
  for (let key of validKeys) {
    let pro = JSON.parse(localStorage.getItem(key));
    totalQuantity += pro.quantity;
    total += pro.quantity * pro.price;
    output += `
      <article class="order-card">
        <div class="order-check">
        </div>
        <aside class="order-content">
          <div class="order-thumb">
            <div class="order-image">
              <img src="../home/${pro.productImg}" alt="짱구케이스">
            </div>
            <div class="order-item">
              <div class="order-header">
                <h5 class="product-num">${pro.productNum}</h5>
              </div>
              <h4 class="product-title">${pro.productName}</h4>
              <h5 class="product-type">${pro.category}</h5>
              <div class="product-price">
                <div><h3>${pro.price.toLocaleString()} 원</h3></div>
              </div>
            </div>
          </div>
          <div class="order-footer">
            <div class="order-summary">
              <div class="order-amount">상품금액 ${pro.price.toLocaleString()} 원 / 수량 ${pro.quantity} 개</div>
              <div class="order-price">총 ${(pro.price * pro.quantity).toLocaleString()} 원</div>
            </div>
          </div>
        </aside>
      </article>`;
      productReq.push({  // 장바구니 정보중 상품 번호와 주문 개수를 객체화하여 productReq 배열에 추가
        productNum: pro.productNum,
        quantity: pro.quantity
      })
  };

  if (totalQuantity === 0) deliveryCharge = 0;

  const section = document.querySelector(".card-list");
  section.innerHTML = output;

  const totalAmount = document.querySelector("#total-amount");
  const totalPrice = document.querySelector("#total-price");
  const totalDeliveryCharge = document.querySelector("#total-delivery-charge");
  const totalMoney = document.querySelector("#total-money");

  totalAmount.innerText = `${totalQuantity} 개`;
  totalPrice.innerText = `${total.toLocaleString()} 원`;
  totalDeliveryCharge.innerText = `${deliveryCharge.toLocaleString()} 원`;
  totalMoney.innerText = `${(total + deliveryCharge).toLocaleString()} 원`;
}

function messageSelect() {
  let deliveryMessage = document.querySelector("#deliveryMessage");
  let selectedMessage = deliveryMessage.options[deliveryMessage.selectedIndex].value;
  let dm = document.querySelector("#dm");
  if (selectedMessage === "직접 입력") dm.classList.remove("hide");
  else dm.classList.add("hide");
}

const orderBtn = document.querySelector(".order-button");
orderBtn.addEventListener('click', (e) => {
  e.preventDefault();

  let name = document.querySelector("#name").value;
  let phone = document.querySelector("#phone").value;
  let email = document.querySelector("#email").value;
  let recipientName = document.querySelector("#recipientName").value;
  let sample6_postcode = document.querySelector("#sample6_postcode").value;
  let sample6_address = document.querySelector("#sample6_address").value;
  let sample6_detailAddress = document.querySelector("#sample6_detailAddress").value;
  let sample6_extraAddress = document.querySelector("#sample6_extraAddress").value;

  let message = "";
  let deliveryMessage = document.querySelector("#deliveryMessage");
  let selectedMessage = deliveryMessage.options[deliveryMessage.selectedIndex].value;
  if (selectedMessage === "직접 입력") {
    let dm = document.querySelector("#dm").value;
    message = dm;
  } else {
    message = selectedMessage;
  }

  fetch('/api/order', {
    method: 'POST',
    body: JSON.stringify({  // 주문자 정보, 배송지 정보, 장바구니 물품들 정보로 이루어진 json 문자열
      userName: name,
      phoneNumber: phone,
      userEmail: email,
      recipientName: recipientName,
      addressCode: sample6_postcode,
      address: sample6_address,
      detailAddress: sample6_detailAddress,
      extraAddress: sample6_extraAddress,
      deliveryMessage: message,
      orderArray: productReq
    })
  })
  .then(res => res.json())  // res = { orderArray: [{productNum: num, quantity: num}, ...] }
  .then(data => {
    console.log(data); 
    // orderArray를 순회하여 productNum 프로퍼티의 값을 가져온 후 그에 해당하는 키값의 로컬스토리지 제거해주기 -> orderArray를 응답으로 안받고 그냥 productReq 순회해서 제거해도 될듯?
    for (let product of productReq) {
      localStorage.removeItem(`pro${product.productNum}`);
    };
    // location.href="/order/complete";
  })
  .catch(err => console.log(err));
});