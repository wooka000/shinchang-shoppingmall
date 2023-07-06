const addButton = document.querySelector(".button-product-add");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const uploadButton = document.querySelector("#button-product-upload");
const cancelButton = document.querySelector("#button-product-cancel");
const deleteButton = document.querySelector(".button-delete");

// 제품 추가
const content = document.querySelector("#content-detail");
const productName = document.querySelector("#newProduct-name");
const productCategory = document.querySelector("#newProduct-category");
const productPrice = document.querySelector("#newProduct-price");
const productImage = document.querySelector("#newProduct-image");

let products = [
  {
    productNumber: 1,
    name: "짱구 케이스",
    price: "18000원",
    createdAt: new Date().getMilliseconds(),
    image: "이미지 파일",
    category: "케이스",
  },
  {
    productNumber: 2,
    name: "맹구 케이스",
    price: "17000원",
    createdAt: new Date().getMilliseconds(),
    image: "이미지 파일",
    category: "케이스",
  },
  {
    productNumber: 3,
    name: "철수 케이스",
    price: "19000원",
    createdAt: new Date().getMilliseconds(),
    image: "이미지 파일",
    category: "케이스",
  },
  {
    productNumber: 4,
    name: "흰둥이 케이스",
    price: "13000원",
    createdAt: new Date().getMilliseconds(),
    image: "이미지 파일",
    category: "케이스",
  },
];

// product 배열을 받아옴
// 받아온 배열을 50번째줄부터 채워넣어야함. +삭제 버튼과 함께
// 그럼 .order 내의 태그들은 js로 이동해서 사용 __.insertAdjacentHTML

for (let i = 0; i < products.length; i++) {
  content.insertAdjacentHTML(
    "beforeend",
    `<div class="product">
      <div class="product-number">${products[i].productNumber}</div>
      <div class="product-image">${products[i].image}</div>
      <div class="product-name">${products[i].name}</div>
      <div class="product-price">${products[i].price}</div>
      <div class="product-date">${products[i].createdAt}</div>
      <button class="button-modify">
        <i class="fa-solid fa-pencil"></i>
      </button>
      <button class="button-delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
    `
  );
}

function onClick(e) {
  e.preventDefault();
  modal.classList.toggle("hidden");
}

addButton.addEventListener("click", onClick);
modalBackground.addEventListener("click", onClick);
cancelButton.addEventListener("click", onClick);

// 제품 업로드

function upload(e) {
  e.preventDefault();
  products.push({
    productNumber: 10,
    name: productName.value,
    price: productPrice.value,
    createdAt: new Date().getMilliseconds(),
    image: productImage.value,
    category: productCategory.value,
  });
  console.log(products);
  content.insertAdjacentHTML(
    "beforeend",
    `<div class="product">
      <div class="product-number">${
        products[products.length - 1].productNumber
      }</div>
      <div class="product-image">${products[products.length - 1].image}</div>
      <div class="product-name">${products[products.length - 1].name}</div>
      <div class="product-price">${products[products.length - 1].price}</div>
      <div class="product-date">${products[products.length - 1].createdAt}</div>
      <button class="button-modify">
        <i class="fa-solid fa-pencil"></i>
      </button>
      <button class="button-delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
    `
  );
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productImage.value = "";
  modal.classList.toggle("hidden");
}

uploadButton.addEventListener("click", upload);

//제품 삭제
// 삭제 및 수정은 제품 데이터를 가지고 하기엔 무리가 있어보임 얼른 백엔드에서 데이터 받아서 해야할듯?
// function deleteProduct(e) {
//   console.log(e);
//   if (e.target.classList[1] === "fa-trash") {
//     const productNumber = 1;
//     const newProducts = products.filter(
//       (product) => product.productNumber !== productNumber
//     );
//     products = newProducts;
//   }
// }

// content.addEventListener("click", deleteProduct);
