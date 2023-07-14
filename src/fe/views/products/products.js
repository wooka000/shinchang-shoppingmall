async function productsRender() {
    try {
        let queryObject = window.location.search ? searchToObject(location.search) : {};
        let categoryName = decodeURI(queryObject.categoryName);

        // 상품 카테고리 제목
        const listTitle = document.querySelector('.list-title');
        const strong = document.createElement('strong');

        strong.textContent = categoryName;
        listTitle.appendChild(strong);

        productSort(categoryName);

        // 상품 전체 목록 불러와서 넣어줄 div
        let productList = document.querySelector('.products-list');

        // 전체 목록 불러오기
        if (categoryName === '인기 | 신상품') {
            apiFetch(productList, `/api/products${objectToSearch(queryObject)}`);
        } else {
            apiFetch(productList, `/api/products/category${objectToSearch(queryObject)}`);
        }
    } catch (error) {
        console.log(error);
        // location.href = '/error';
    }
}

productsRender();

// api 호출 함수
async function apiFetch(target, url) {
    try {
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

        let { products, totalPage } = data;
        console.log(products);

        // 상품 목록
        const listFragment = new DocumentFragment();

        products.forEach(({ productNo, productName, price, image }) => {
            let products = document.createElement('div');
            products.setAttribute('class', 'products');

            products.innerHTML = `
            <div class="img-wrapper">
                <a href="/products/${productNo}">
                    <img src="${image}" alt="goods 1" />
                </a>
            </div>
            <div class="products-title">
                <a href="/products/${productNo}"><strong>${productName}</strong></a>
            </div>
            <div class="products-price">
                <strong>${price.toLocaleString()}원</strong>
            </div>
        `;

            listFragment.appendChild(products);
        });

        target.appendChild(listFragment);

        pagination(totalPage);
    } catch (error) {
        console.log(error);
        // location.href = '/error';
    }
}

function searchToObject(searchParam) {
    const searchObj = searchParam
        .replace('?', '')
        .split('&')
        .reduce((acc, search) => {
            const [key, value] = search.split('=');
            acc[key] = value;
            return acc;
        }, {});

    return searchObj;
}

function objectToSearch(obj) {
    const searchParam = `?${Object.entries(obj)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`;

    return searchParam;
}

function pagination(totalPage) {
    const { pathname, search } = window.location;
    const searchObj = search ? searchToObject(search) : {};

    const target = document.querySelector('.pagination');
    const fragment = new DocumentFragment();
    const pageWrapper = document.createElement('ul');
    pageWrapper.setAttribute('class', 'page-wrapper');

    const prevPage = document.createElement('div');
    prevPage.setAttribute('class', 'prev-page');

    const prevImage = '../../public/assets/img/icon/left.svg';
    const prevImg = document.createElement('img');
    prevImg.setAttribute('src', prevImage);

    if (searchObj.page > 1) {
        prevPage.style.cursor = 'pointer';
        prevPage.addEventListener('click', () => {
            window.location.href = pathname + objectToSearch({ ...searchObj, page: +searchObj.page - 1 });
        });
    }

    for (let i = 1; i <= totalPage; i += 1) {
        const pageItem = document.createElement('li');
        pageItem.textContent = i;

        if (searchObj.page && Number(searchObj.page) !== i) {
            pageItem.style.cursor = 'pointer';
            pageItem.addEventListener('click', () => {
                window.location.href = pathname + objectToSearch({ ...searchObj, page: i });
            });
        } else {
            pageItem.classList.add('current');
        }
        pageWrapper.append(pageItem);
    }

    const nextPage = document.createElement('div');
    nextPage.setAttribute('class', 'prev-page');

    const nextImage = '../../public/assets/img/icon/right.svg';
    const nextImg = document.createElement('img');
    nextImg.setAttribute('src', nextImage);

    if (searchObj.page < totalPage) {
        nextPage.style.cursor = 'pointer';
        nextPage.addEventListener('click', () => {
            window.location.href = pathname + objectToSearch({ ...searchObj, page: +searchObj.page + 1 });
        });
    }

    prevPage.append(prevImg);
    nextPage.append(nextImg);

    fragment.append(prevPage, pageWrapper, nextPage);
    target.append(fragment);
}

function productSort(categoryName) {
    const dropDown = document.querySelector('.drop-down');
    const selectFragment = new DocumentFragment();

    const select = document.createElement('select');
    select.innerHTML = `
        <option value="/products/category/?categoryName=${categoryName}&page=1&sortOption=createAt">최신순</option>
        <option value="/products/category/?categoryName=${categoryName}&page=1&sortOption=priceDesc">가격 낮은순</option>
        <option value="/products/category/?categoryName=${categoryName}&page=1&sortOption=priceAsc">가격 높은순</option>
        `;

    selectFragment.appendChild(select);
    dropDown.appendChild(selectFragment);
}
