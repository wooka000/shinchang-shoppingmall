// 상품을 로드하는 함수
async function newProductRender() {
    const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    const newProduct = data.slice(0, 10);

    // 최신 상품 10개 배열
    let products = document.querySelector('.new-products');
    const newPdFragment = new DocumentFragment();

    newProduct.forEach(({ productNo, productName, price }) => {
        const div = document.createElement('div');

        div.innerHTML = `
        <div>
            <div class="img-wrapper">
            <a href="/products/${productNo}"><img src="./list.jpeg" alt="img" /></a>
            </div>
            <div class="products-title">
                <strong><a href="/products/${productNo}">${productName}</a></strong>
            </div>

            <div class="products-price">
                <strong>${price.toLocaleString()}원</strong>
            </div>
        </div>`;

        newPdFragment.appendChild(div);
    });

    products.appendChild(newPdFragment);
}

newProductRender();

async function popularCategoryRender() {
    const response = await fetch('/api/category', {
        method: 'GET',
    });
    const data = await response.json();

    const productContents = document.querySelector('.popular-contents');
    const popularCategoryFragment = new DocumentFragment();

    data.forEach(({ categoryName }) => {
        const div = document.createElement('div');
        div.setAttribute('class', 'popular-category');

        if (categoryName != '인기 | 신상품') {
            div.innerHTML = `
            <div class="category-img-wrapper">
                <a href="/products/category?categoryName=${categoryName}">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKz_qwtTkmVri-erStn2lSSQ7SRxmC-7pMQw&usqp=CAU" alt="goods 1" />
                </a>
            <div>
            <div class="title">
                <a href="/products/category?categoryName=${categoryName}"><strong>${categoryName}</strong></a>
            </div>`;
            popularCategoryFragment.appendChild(div);
        }
    });

    productContents.appendChild(popularCategoryFragment);
}

popularCategoryRender();

// aos 초기화
// data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000"
AOS.init();
