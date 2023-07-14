// aos 초기화
AOS.init();

// 상품을 로드하는 함수
async function newProductRender() {
    try {
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        const newProduct = data.products.slice(0, 10);

        // 최신 상품 10개 배열
        let products = document.querySelector('.new-products');
        const newPdFragment = new DocumentFragment();

        newProduct.forEach(({ productNo, productName, price, image }) => {
            const divWrapper = document.createElement('div');

            divWrapper.setAttribute('data-aos', 'fade-up');
            divWrapper.setAttribute('data-aos-delay', '60');
            divWrapper.setAttribute('data-aos-duration', '1000');

            divWrapper.innerHTML = `
            <div>
                <div class="img-wrapper">
                    <a href="/products/${productNo}"><img src="${image}" alt="img" /></a>
                </div>
                <div class="products-title">
                    <strong><a href="/products/${productNo}">${productName}</a></strong>
                </div>

                <div class="products-price">
                    <strong>${price.toLocaleString()}원</strong>
                </div>
            </div>
            `;

            newPdFragment.appendChild(divWrapper);
        });

        products.appendChild(newPdFragment);
    } catch (error) {
        console.log(error);
        // location.href = '/error';
    }
}

newProductRender();

async function popularCategoryRender() {
    try {
        const response = await fetch('/api/category', {
            method: 'GET',
        });
        const data = await response.json();

        const productContents = document.querySelector('.popular-contents');
        const popularCategoryFragment = new DocumentFragment();

        data.forEach(({ categoryName, image }) => {
            const div = document.createElement('div');
            div.setAttribute('class', 'popular-category');

            if (categoryName != '인기 | 신상품') {
                div.innerHTML = `
            <div class="category-img-wrapper">
                <a href="/products/category?categoryName=${categoryName}&page=1&sortOption=createAt">
                    <img src="${image}" alt="goods 1" />
                </a>
            <div>
            <div class="title">
                <a href="/products/category?categoryName=${categoryName}&page=1&sortOption=createAt"><strong>${categoryName}</strong></a>
            </div>`;
                popularCategoryFragment.appendChild(div);
            }
        });

        productContents.appendChild(popularCategoryFragment);
    } catch (error) {
        console.log(error);
        // location.href = '/error';
    }
}

popularCategoryRender();
