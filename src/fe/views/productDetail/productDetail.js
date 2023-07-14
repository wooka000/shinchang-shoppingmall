async function productDetailRender() {
    try {
        const response = await fetch(`/api${window.location.pathname}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        let { productNo, productName, image, price, description } = data;

        let descriptionSummary = description.split('.')[0];

        // 로드되자마자 보이는 이미지
        let productImg = document.querySelector('.product-img');
        let productFragment = new DocumentFragment();
        let productDiv = document.createElement('div');

        productDiv.innerHTML = `<img src="${image}" alt="product-img" />`;
        productFragment.appendChild(productDiv);
        productImg.appendChild(productFragment);

        // 본문 상품 상세 이미지
        const contentsImg = document.querySelector('.contents-img');
        const contentsFragment = new DocumentFragment();
        const contentsDiv = document.createElement('div');

        contentsDiv.innerHTML = `<img src="${image}" alt="product-img" />`;
        contentsFragment.appendChild(contentsDiv);
        contentsImg.appendChild(contentsFragment);

        // 로드되자마자 보이는 제품 제목 및 가격
        const productInfo = document.querySelector('.product-info');
        const productInfoFragment = new DocumentFragment();
        const productInfoDiv = document.createElement('div');

        productInfoDiv.innerHTML = `<h2>${productName}</h2>
                            <p>${price.toLocaleString()}원</p>`;

        productInfoFragment.appendChild(productInfoDiv);
        productInfo.appendChild(productInfoFragment);

        // 로드되자마자 보이는 상품 설명
        const productDescription = document.querySelector('.product-description');
        productDescription.innerText = `${descriptionSummary}.`;

        const contentsEx = document.querySelector('.contents-ex');
        contentsEx.textContent = description;

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
            // 로컬 스토리지에 이미 저장되어 있는 목록 중에 현재 상품 상세 페이지에 있는 상품이 있는지 확인
            let currentPdInfo = JSON.parse(localStorage.getItem(`pro${productNo}`));

            if (!currentPdInfo) {
                currentPdInfo = data;
                currentPdInfo.quantity = 0;
            }

            currentPdInfo.quantity += num;
            currentPdInfo.checked = 'checked';
            localStorage.setItem(`pro${productNo}`, JSON.stringify(currentPdInfo));

            // 장바구니 버튼 클릭시 페이지 이동
            const confirmCart = confirm('장바구니에 상품이 담겼습니다. 장바구니로 이동하시겠습니까?');

            if (confirmCart === true) {
                location.href = '/cart';
            } else {
                alert('즐거운 쇼핑 되시길 바랍니다.');
            }
        });

        // 바로 구매하기
        orderBtn.addEventListener('click', () => {
            if (localStorage.getItem('token')) {
                const immediatePurchase = data;
                immediatePurchase.quantity = num;

                localStorage.setItem('buy-now', JSON.stringify(immediatePurchase));

                alert('결제 화면으로 넘어갑니다.');
                location.href = '/order';
            } else {
                alert('로그인 후 이용 가능합니다. 로그인 페이지로 이동합니다.');
                location.href = '/login';
            }
        });
    } catch (error) {
        location.href = '/error';
    }
}

productDetailRender();

/*
로컬 스토리지 객체로 담기

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

    const confirmCart = confirm('장바구니에 상품이 담겼습니다. 장바구니로 이동하시겠습니까?');

    if (confirmCart === true) {
        location.href = '/cart';
    } else {
        alert('즐거운 쇼핑 되시길 바랍니다🥰');
    }
});
*/
