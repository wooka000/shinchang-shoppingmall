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

// aos 초기화
// data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000"
AOS.init();
