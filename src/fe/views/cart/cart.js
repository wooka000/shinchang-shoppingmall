// 로컬스토리지에 담을 더미 객체 생성
// class Product {
//   constructor(serialNum, name, imgUrl, type, num, price, checked="checked") {
//     this.serialNum = serialNum;
//     this.name = name;
//     this.imgUrl = imgUrl;
//     this.type = type;
//     this.num = num;
//     this.price = price;
//     this.checked = checked;
//   }
// }

// let product1 = new Product('11111', '상품1', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '휴대폰 케이스', 1, 18000);
// let product2 = new Product('22222', '상품2', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '의류', 2, 23000);
// let product3 = new Product('33333', '상품3', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '아크릴 키링', 1, 7000);
// let product4 = new Product('44444', '상품4', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '지류 굿즈', 1, 14000);
// let product5 = new Product('55555', '상품5', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '텀블러', 3, 9000);


// localStorage.setItem('pro1', JSON.stringify(product1));
// localStorage.setItem('pro2', JSON.stringify(product2));
// localStorage.setItem('pro3', JSON.stringify(product3));
// localStorage.setItem('pro4', JSON.stringify(product4));
// localStorage.setItem('pro5', JSON.stringify(product5));

render();

// 로컬스토리지에서 더미 객체를 하나씩 가져와 장바구니 목록, 주문 정보 렌더링
function render() {
  let output = '';
  let totalQuantity = 0;  // 총 주문 수량
  let total = 0;  
  let deliveryCharge = 3000;  // 배송비
  let keys = Object.keys(localStorage);
  for (let key of keys) {
    let pro = JSON.parse(localStorage.getItem(key));
    if (pro.checked == "checked") {
      totalQuantity += pro.quantity;
      total += pro.quantity * pro.price;
    }
    output += `
      <article class="order-card">
        <div class="order-check">
          <input class="checkbox" type="checkbox" name="product" value="" ${pro.checked} onclick="toggle(${pro.productNum})">
        </div>
        <aside class="order-content">
          <div class="order-thumb">
            <div class="order-image">
              <a href="#"><img src="../home/${pro.productImg}" alt=""></a>
            </div>
            <div class="order-item">
              <div class="order-header">
                <h5 class="product-num">${pro.productNum}</h5>
                <img src="./images/x-button.png" alt="장바구니 취소" class="x-button" onclick="deleteCard(${pro.productNum})">
              </div>
              <a href="#"><h4 class="product-title">${pro.productName}</h4></a>
              <h5 class="product-type">${pro.category}</h5>
              <div class="product-price">
                <div><h3>${pro.price.toLocaleString()} 원</h3></div>
                <div class="product-variation">
                  <input type='button' onclick='plus(${pro.productNum})' value='+'/>
                  <div id='result'>${pro.quantity}</div>
                  <input type='button' onclick='minus(${pro.productNum})' value='-'/>
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
  if (localStorage.length == 0) {
    alert("결제할 물품이 없습니다!");
    location.href="/";
  } else {
    location.href="/order";
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