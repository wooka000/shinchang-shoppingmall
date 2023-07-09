/*
백엔드에서 받아와서 상품 목록 페이지에 필요한 데이터

한 페이지에 총 12개의 데이터가 필요

상품 객체 { 상품 번호: number, 상품 종류: string, 등록 시간: date, 상품 이미지: string, 상품 명: string, 상품 가격: price }

페이지 이동할 때 상품 /products/:pid(상품 번호)

백엔드에서 상품을 카테고리별로 나눠서 올려주면 프론트에서 카테고리 제목과 헤더의 li 태그의 innerText와 일치하는지 확인 후
페이지를 로드한다. 우선 더미.json을 내가 카테고리 별로 나누고 헤더.js에 기능을 주고 나서 상품 목록 페이지를 로드한다.
*/

async function categoryProductLoad() {
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

    const url = new URL('https://dic.daum.net/word/view.do?wordid=ekw000033653&q=coffee');
}

categoryProductLoad();
