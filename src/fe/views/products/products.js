async function productsRender() {
    // url 구분해서 categoryName 가져오기
    let queryObject = location.search
        .replace('?', '')
        .split('&')
        .reduce((acc, query) => {
            let [key, value] = query.split('=');
            acc[key] = decodeURI(value);

            return acc;
        }, {});

    let { categoryName } = queryObject;

    // 백엔드 api 호출
    const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    // 상품 카테고리 제목
    const listTitle = document.querySelector('.list-title');
    const strong = document.createElement('strong');

    strong.textContent = categoryName;
    listTitle.appendChild(strong);

    /*
    const option = document.querySelector('select');
    console.log(option);

    const changeValue = (target) => {
    선택한 option의 value 값
    console.log(target.value);

    // option의 text 값
    console.log(target.options[target.selectedIndex].text);
    };

    changeValue();
    */

    // 상품 목록
    let productList = document.querySelector('.products-list');
    const listFragment = new DocumentFragment();

    data.forEach(({ productNo, productName, price }) => {
        let products = document.createElement('div');
        products.setAttribute('class', 'products');
        products.setAttribute('id', `${productNo}`);

        products.innerHTML = `
        <div class="img-wrapper">
            <a href="/products/${productNo}">
                <img src="./list.jpeg" alt="goods 1" />
            </a>
        </div>
        <div class="products-title">
            <a href="/products/${productNo}"><strong>${productName}</strong></a>
        </div>
        <div class="products-price">
            <strong>${price.toLocaleString()}원</strong>
        </div>`;

        listFragment.appendChild(products);
    });

    productList.appendChild(listFragment);
}

productsRender();
