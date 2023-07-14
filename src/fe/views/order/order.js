const productReq = [];  // 서버로 보낼 장바구니 정보를 담을 배열

const randomNum = Math.floor(Math.random() * 10000000000000);
const userName = document.querySelector("#name");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const recipientName = document.querySelector("#recipientName");
const sample6_postcode = document.querySelector("#sample6_postcode");
const sample6_address = document.querySelector("#sample6_address");
const sample6_detailAddress = document.querySelector("#sample6_detailAddress");
const sample6_extraAddress = document.querySelector("#sample6_extraAddress");
const userId = localStorage.getItem('username');

render();

const orderBtn = document.querySelector(".order-button");
orderBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  let message = "";
  let deliveryMessage = document.querySelector("#deliveryMessage");
  let selectedMessage = deliveryMessage.options[deliveryMessage.selectedIndex].value;
  if (selectedMessage === "직접 입력") {
    let dm = document.querySelector("#dm").value;
    message = dm;
  } else {
    message = selectedMessage;
  }

  const response = await fetch('/api/order', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({  // 주문자 정보, 배송지 정보, 장바구니 물품들 정보로 이루어진 json 문자열
      orderNo: randomNum,
      userName: userName.value,
      phoneNumber: phone.value,
      userEmail: email.value,
      recipientName: recipientName.value,
      addressCode: sample6_postcode.value,
      address: sample6_address.value,
      detailAddress: sample6_detailAddress.value,
      extraAddress: sample6_extraAddress.value,
      deliveryMessage: message,
      orderArray: productReq,
      userId: userId,
      status: "배송준비중"
    })
  })

  const data = await response.json();
  console.log(data)
  data.forEach(e => localStorage.removeItem(`pro${e.productNo}`));
  localStorage.removeItem('buy-now');
  location.href="/order/complete";
});



function render() {
  let output = '';
  let totalQuantity = 0;  // 총 주문 수량
  let total = 0;  // 총 상품 금액
  let deliveryCharge = 3000;  // 배송비
  let keys = Object.keys(localStorage).filter(k => k.substring(0, 3) === "pro" || k === "buy-now");
  let validKeys = keys.filter(k => JSON.parse(localStorage.getItem(k)).checked === "checked" || k === "buy-now");
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
              <img src="${pro.image}" alt="짱구케이스">
            </div>
            <div class="order-item">
              <div class="order-header">
                <h5 class="product-num">${pro.productNo}</h5>
              </div>
              <h4 class="product-title">${pro.productName}</h4>
              <h5 class="product-type">${pro.categoryName}</h5>
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
        productNo: pro.productNo,
        quantity: pro.quantity,
        price: pro.price,
        productName: pro.productName
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

// 서버에서 로그인중인 회원의 회원정보 가져오는 api 호출하기
async function getUserinfo() {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/user/my', {
    method: 'GET',
    headers: {
      authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  // console.log(data);
  return data;
}

async function check(n) {
  const data = await getUserinfo();
  if (n === 1) {
    userName.value = data.name;
    phone.value = data.phoneNumber;
  } else if (n === 2) {
    recipientName.value = data.name;
    sample6_postcode.value = data.postalCode;
    sample6_address.value = data.address1;
    sample6_detailAddress.value = data.address2;
  }
}