render();

function render() {
  let output = '';
  let totalQuantity = 0;  // 총 주문 수량
  let total = 0;  
  let deliveryCharge = 3000;  // 배송비
  let keys = Object.keys(localStorage).filter(k => JSON.parse(localStorage.getItem(k)).checked === "checked");
  for (let key of keys) {
    let pro = JSON.parse(localStorage.getItem(key));
    totalQuantity += pro.num;
    total += pro.num * pro.price;
    output += `
      <article class="order-card">
        <div class="order-check">
        </div>
        <aside class="order-content">
          <div class="order-thumb">
            <div class="order-image">
              <img src="${pro.imgUrl}" alt="짱구케이스">
            </div>
            <div class="order-item">
              <div class="order-header">
                <h5 class="product-num">${pro.serialNum}</h5>
              </div>
              <h4 class="product-title">${pro.name}</h4>
              <h5 class="product-type">${pro.type}</h5>
              <div class="product-price">
                <div><h3>${pro.price} 원</h3></div>
              </div>
            </div>
          </div>
          <div class="order-footer">
            <div class="order-summary">
              <div class="order-amount">상품금액 ${pro.price} 원 / 수량 ${pro.num} 개</div>
              <div class="order-price">총 ${pro.price * pro.num} 원</div>
            </div>
          </div>
        </aside>
      </article>`
  }
  if (totalQuantity === 0) deliveryCharge = 0;

  const section = document.querySelector(".card-list");
  section.innerHTML = output;

  const totalAmount = document.querySelector("#total-amount");
  const totalPrice = document.querySelector("#total-price");
  const totalDeliveryCharge = document.querySelector("#total-delivery-charge");
  const totalMoney = document.querySelector("#total-money");

  totalAmount.innerText = `${totalQuantity} 개`;
  totalPrice.innerText = `${total} 원`;
  totalDeliveryCharge.innerText = `${deliveryCharge} 원`;
  totalMoney.innerText = `${total + deliveryCharge} 원`;
}

function messageSelect() {
  let deliveryMessage = document.querySelector("#inputMessage");
  let selectedMessage = deliveryMessage.options[deliveryMessage.selectedIndex].innerText;
  let dm = document.querySelector("#dm");
  if (selectedMessage === "직접 입력") dm.classList.remove("hide");
  else dm.classList.add("hide");
}