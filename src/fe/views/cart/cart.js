// 로컬스토리지에 담을 더미 객체 생성
class Product {
  constructor(num, name, imgUrl, type, price) {
    this.num = num;
    this.name = name;
    this.imgUrl = imgUrl;
    this.type = type;
    this.price = price;
  }
}

let product1 = new Product('11111', '상품1', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '휴대폰 케이스', 18000);
let product2 = new Product('22222', '상품2', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '의류', 23000);
let product3 = new Product('33333', '상품3', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '아크릴 키링', 7000);
let product4 = new Product('44444', '상품4', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '지류 굿즈', 14000);
let product5 = new Product('55555', '상품5', "https://m.ezendolls.com/web/product/big/201803/609_shop1_972362.jpg", '텀블러', 9000);


localStorage.setItem('pro1', JSON.stringify(product1));
localStorage.setItem('pro2', JSON.stringify(product2));
localStorage.setItem('pro3', JSON.stringify(product3));
localStorage.setItem('pro4', JSON.stringify(product4));
localStorage.setItem('pro5', JSON.stringify(product5));


// 로컬스토리지에서 더미 객체를 하나씩 가져와 장바구니 목록, 주문 정보 렌더링
function render() {
  let output = '';
  let num = 0;  // 총 주문 수량
  let sum = 0;  // 총 주문 금액
  let totalDC = 3000;  // 임의의 총 배송비
  for (let i = 1; i < localStorage.length + 1; i++) {
    let deliveryCharge = i*1000;
    let pro = JSON.parse(localStorage.getItem(`pro${i}`));
    num++;
    sum += pro.price;
    output += `
      <article class="order-card">
        <div class="order-check">
          <input class="checkbox" type="checkbox" name="product" value="" checked="on">
        </div>
        <aside class="order-content">
          <div class="order-thumb">
            <div class="order-image">
              <a href="#"><img src="${pro.imgUrl}" alt=""></a>
            </div>
            <div class="order-item">
              <div class="order-header">
                <h5 class="product-num">${pro.num}</h5>
                <img src="./images/x-button.png" alt="장바구니 취소" class="x-button ${pro.num}">
              </div>
              <a href="#"><h4 class="product-title">${pro.name}</h4></a>
              <h5 class="product-type">${pro.type}</h5>
              <div class="product-price">
                <div><h3>${pro.price}</h3></div>
                <div class="product-variation">
                  <input type='button' onclick='count("plus")' value='+'/>
                  <div id='result'>0</div>
                  <input type='button' onclick='count("minus")' value='-'/>
                </div>
              </div>
            </div>
          </div>
          <div class="order-footer">
            <div class="order-summary">
              <div class="order-amount">상품금액 ${pro.price}원 / 배송비 ${deliveryCharge}원</div>
              <div class="order-price">총 ${pro.price + deliveryCharge}원</div>
            </div>
          </div>
        </aside>
      </article>`
  }
  const section = document.querySelector(".order-list");
  section.innerHTML = output;

  const totalAmount = document.querySelector("#total-amount");
  const totalPrice = document.querySelector("#total-price");
  const totalDeliveryCharge = document.querySelector("#total-delivery-charge");
  const totalMoney = document.querySelector("#total-money");

  totalAmount.innerText = num;
  totalPrice.innerText = sum;
  totalDeliveryCharge.innerText = totalDC;
  totalMoney.innerText = sum + totalDC;
}

render(); 


// // x 버튼으로 장바구니에서 제외
// const xBtn = document.querySelectorAll(".x-button");
// xBtn.forEach(btn => {
//   btn.addEventListener("click", e => {
//     let idx = btn.classList[1].substring(0, 1);
//     localStorage.removeItem(`pro${idx}`);
//     render();
//   })
// })