/*
백엔드에서 메인에 받아와야 하는 데이터
상품 createdAt 기준으로 총 8개
상품 객체 { 상품 번호: number, 상품 종류: string, 등록 시간: date, 상품 이미지: string, 상품 명: string, 상품 가격: price }
*/

// dummy.json 이용해서 메인에 상품 로드하기
async function newProductLoad() {
    const response = await fetch('../../public/db/productDummy.json');
    const data = await response.json();
    const productDummy = data.product;

    // 최신 상품 8개 배열
    let newProduct = productDummy.sort((a, b) => new Date(b.productDate) - new Date(a.productDate)).slice(0, 8);
    let products = document.querySelector('.new-products');
    const newPdFragment = new DocumentFragment();

    newProduct.forEach((pd) => {
        const div = document.createElement('div');

        div.innerHTML = `
        <div>
            <a href="productDetail/${pd.productNum}"><img src="./${pd.productImg}" alt="goods 1" /></a>
            <div class="products-title">
                <a href="/productDetail/${pd.productNum}"><strong>${pd.productName}</strong></a>
            </div>

            <div class="products-price">
                <strong>${pd.price.toLocaleString()}원</strong>
            </div>
        </div>`;

        newPdFragment.appendChild(div);
    });

    products.appendChild(newPdFragment);
}

newProductLoad();

// aos 초기화
// data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000"
AOS.init();
