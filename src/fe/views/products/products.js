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

    const option = document.querySelector('select');
    console.log(option);

    const changeValue = (target) => {
        // 선택한 option의 value 값
        console.log(target.value);

        // option의 text 값
        console.log(target.options[target.selectedIndex].text);
    };

    changeValue();

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
            <a href="/productDetail"><strong>${pd.productName}</strong></a>
        </div>
        <div class="products-price">
            <strong>${pd.price.toLocaleString()}원</strong>
        </div>`;

        listFragment.appendChild(products);
    });

    productList.appendChild(listFragment);
}

categoryProductLoad();

// option = low 라면 -> sort 함수로 데이터를 낮은 순으로 정렬 후 for문 돌려주기
// 반대의 경우도 똑같다
