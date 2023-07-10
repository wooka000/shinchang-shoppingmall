// 상품 상세 페이지 리스트 업
async function init() {
    // 상품 번호 가져오기
    let productNum = {};

    const response = await fetch('../../public/db/productDummy.json');
    const data = await response.json();
    const productDummy = data.product;

    // 로드되자마자 보이는 이미지
    let productImg = document.querySelector('.product-img');
    let productFragment = new DocumentFragment();
    let productDiv = document.createElement('div');

    productDiv.innerHTML = `<img src="../home/${productDummy[1].productImg}" alt="product-img" />`;
    productFragment.appendChild(productDiv);
    productImg.appendChild(productFragment);

    // 본문 상품 상세 이미지
    let contentsImg = document.querySelector('.contents-img');
    let contentsFragment = new DocumentFragment();
    let contentsDiv = document.createElement('div');

    contentsDiv.innerHTML = `<img src="../home/${productDummy[1].productImg}" alt="product-img" />`;
    contentsFragment.appendChild(contentsDiv);
    contentsImg.appendChild(contentsFragment);

    // 로드되자마자 보이는 제품 제목 및 가격
    let productInfo = document.querySelector('.product-info');
    let productInfoFragment = new DocumentFragment();
    let productInfoDiv = document.createElement('div');

    productInfoDiv.innerHTML = `<h2>${productDummy[1].productName}</h2>
                            <p>${productDummy[1].price.toLocaleString()}원</p>`;
    productInfoFragment.appendChild(productInfoDiv);
    productInfo.appendChild(productInfoFragment);

    // minus & plus btn 클릭시 input 값 증가 / 감소
    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');

    let inputNum = document.querySelector('input');
    let num = parseInt(inputNum.value);

    minusBtn.addEventListener('click', () => {
        if (num == 1) inputNum.value = 1;
        else inputNum.value = num -= 1;
    });

    plusBtn.addEventListener('click', () => {
        inputNum.value = num += 1;
    });

    // 장바구니와 구매하기 버튼 클릭시 로컬 스토리지에 데이터 저장
    const cartBtn = document.querySelector('.cart-btn');
    const orderBtn = document.querySelector('.order-btn');

    // 장바구니 담기
    cartBtn.addEventListener('click', () => {
        // 이미 저장되어 있는 카트 목록 불러오기
        const prevCartProductList = JSON.parse(localStorage.getItem('cart-list')) || {};

        let currentProductInfo = productDummy[4];

        const { productNum, productName } = currentProductInfo;

        // 이미 저장되어 있는 카트 목록에 제품 번호가 있는지 확인
        if (prevCartProductList[productNum]) {
            currentProductInfo = prevCartProductList[productNum];
        } else {
            currentProductInfo.quantity = 0;
        }

        currentProductInfo.quantity += num;

        // 현재 장바구니에 담을 데이터를 저장되어 있는 카트 목록에 추가 -> 배열 json 문자열로 변환
        const newList = JSON.stringify({ ...prevCartProductList, [productName]: currentProductInfo });

        // 로컬 스토리지에 저장
        localStorage.setItem('cart-list', newList);

        //
        const confirmCart = confirm('장바구니에 상품이 담겼습니다. 장바구니로 이동하시겠습니까?');

        if (confirmCart === true) {
            location.href = '/cart';
        } else {
            alert('즐거운 쇼핑 되시길 바랍니다🥰');
        }
    });

    // 바로 구매하기
    orderBtn.addEventListener('click', () => {
        const immediatePurchase = productDummy[8];
        immediatePurchase.quantity = num;

        const { productName } = immediatePurchase;

        const orderPd = JSON.stringify({ [productName]: immediatePurchase });
        localStorage.setItem('buy-now', orderPd);

        alert('결제 화면으로 넘어갑니다.');
        location.href = '/order';
    });
}

init();
