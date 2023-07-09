async function categoryProductLoad() {
    // url 구분
    let queryObject = location.search
        .replace('?', '')
        .split('&')
        .reduce((acc, query) => {
            let [key, value] = query.split('=');
            acc[key] = value;

            return acc;
        }, {});

    let { category } = queryObject;

    const response = await fetch('../../public/db/productDummy.json');
    const data = await response.json();
    const productDummy = data.product;

    // 상품 카테고리 제목
    const listTitle = document.querySelector('.list-title');
    const strong = document.createElement('strong');

    strong.textContent = productDummy[0].category;
    listTitle.appendChild(strong);

    // 상품 리스트 부분
    let productList = document.querySelector('.products-list');
    const listFragment = new DocumentFragment();

    productDummy.forEach((pd) => {
        let products = document.createElement('div');
        products.setAttribute('class', 'products');

        products.innerHTML = `
        <a href="">
            <img src="../home/${pd.productImg}" alt="goods 1" />
        </a>
        <div class="products-title">
            <a href=""><strong>${pd.productName}</strong></a>
        </div>
        <div class="products-price">
            <strong>${pd.price.toLocaleString()}원</strong>
        </div>`;

        listFragment.appendChild(products);
    });

    productList.appendChild(listFragment);
}

categoryProductLoad();
