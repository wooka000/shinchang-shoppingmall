async function productsRender() {
  // url 구분해서 categoryName 가져오기
  let queryObject = location.search
    .replace("?", "")
    .split("&")
    .reduce((acc, query) => {
      let [key, value] = query.split("=");
      acc[key] = decodeURI(value);

      return acc;
    }, {});

  let { categoryName } = queryObject;

  // 상품 카테고리 제목
  const listTitle = document.querySelector(".list-title");
  const strong = document.createElement("strong");

  strong.textContent = categoryName;
  listTitle.appendChild(strong);

  // 상품 전체 목록 불러와서 넣어줄 div
  let productList = document.querySelector(".products-list");

  // 전체 목록 불러오기
  if (categoryName === "인기 | 신상품") {
    apiFetch(productList, "/api/products");
  } else {
    apiFetch(
      productList,
      `/api/products/category?categoryName=${categoryName}`
    );
  }

  /*
    pagination
    let currentPage = 1;
    let itemsPerPage = 5;
    let totalItems = 50;

    function generatePagination() {
        let totalPages = Math.ceil(totalItems / itemsPerPage);

        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            let link = document.createElement('a');
            link.href = '#';
            link.innerText = i;

            if (i === currentPage) {
                link.classList.add('active');
            }

            link.addEventListener('click', function (e) {
                e.preventDefault();
                currentPage = parseInt(this.innerText);
                generatePagination();
            });

            pagination.appendChild(link);
        }
    }

    generatePagination();
    */
}

productsRender();

// api 호출 함수
async function apiFetch(target, url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // 상품 목록
  const listFragment = new DocumentFragment();

  data.forEach(({ productNo, productName, price, image }) => {
    let products = document.createElement("div");
    products.setAttribute("class", "products");
    products.setAttribute("id", `${productNo}`);

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
}
