render();


// 로컬스토리지에서 더미 객체를 하나씩 가져와 장바구니 목록, 주문 정보 렌더링
function render() {
  let output = '';
  let totalQuantity = 0;  // 총 주문 수량
  let total = 0;  
  let deliveryCharge = 3000;  // 배송비
  // username, token 로컬스토리지 등을 제외하고 장바구니에 담은 상품의 로컬스토리지들만 추출
  let keys = Object.keys(localStorage).filter(k => k.substring(0, 3) === "pro");
  // console.log(keys);
  for (let key of keys) {
    let pro = JSON.parse(localStorage.getItem(key));
    if (pro.checked == "checked") {
      totalQuantity += pro.quantity;
      total += pro.quantity * pro.price;
    }
    output += `
      <article class="order-card">
        <div class="order-check">
          <input class="checkbox" type="checkbox" name="product" value="" ${pro.checked} onclick="toggle(${pro.productNo})">
        </div>
        <aside class="order-content">
          <div class="order-thumb">
            <div class="order-image">
              <a href="#"><img src="../home/${pro.image}" alt=""></a>
            </div>
            <div class="order-item">
              <div class="order-header">
                <h5 class="product-num">${pro.productNo}</h5>
                <img src="./images/x-button.png" alt="장바구니 취소" class="x-button" onclick="deleteCard(${pro.productNo})">
              </div>
              <a href="#"><h4 class="product-title">${pro.productName}</h4></a>
              <h5 class="product-type">${pro.categoryName}</h5>
              <div class="product-price">
                <div><h3>${pro.price.toLocaleString()} 원</h3></div>
                <div class="product-variation">
                  <input type='button' onclick='minus(${pro.productNo})' value='-'/>
                  <div id='result'>${pro.quantity}</div>
                  <input type='button' onclick='plus(${pro.productNo})' value='+'/>
                </div>
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
      </article>`
  }
  if (totalQuantity === 0) deliveryCharge = 0;

  const section = document.querySelector(".order-list");
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

function plus(n) {
  let idx = String(n);
  let currObj = JSON.parse(localStorage.getItem(`pro${idx}`));
  let currNum = JSON.parse(localStorage.getItem(`pro${idx}`)).quantity;
  currObj.quantity = currNum+1;
  localStorage.setItem(`pro${idx}`, JSON.stringify(currObj));
  render();
}

function minus(n) {
  let idx = String(n);
  let currObj = JSON.parse(localStorage.getItem(`pro${idx}`));
  let currNum = JSON.parse(localStorage.getItem(`pro${idx}`)).quantity;
  if ((currNum-1) > 0) currObj.quantity = currNum-1;
  localStorage.setItem(`pro${idx}`, JSON.stringify(currObj));
  render();
}

function deleteCard(n) {
  let idx = String(n);
  localStorage.removeItem(`pro${idx}`);
  render();
}

function deleteAll() {
  localStorage.clear();
  render();
}

function order() {
  if (!localStorage.getItem('token')) {
    alert("상품을 주문하시려면 로그인을 해주세요!");
    location.href="/login";
  } else {
    let keys = Object.keys(localStorage).filter(k => k.substring(0, 3) === "pro");
    if (keys.length == 0) {
      alert("결제할 물품이 없습니다!");
      location.href="/";
    } else {
      location.href="/order";
    }
  }
}

function toggle(n) {
  let idx = String(n);
  let currObj = JSON.parse(localStorage.getItem(`pro${idx}`));
  let currChecked = JSON.parse(localStorage.getItem(`pro${idx}`)).checked;
  if (currChecked == "checked") currObj.checked = "";
  else currObj.checked = "checked"; 
  localStorage.setItem(`pro${idx}`, JSON.stringify(currObj));
  render();
}