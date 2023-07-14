const addButton = document.querySelector(".button-product-add");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const uploadButton = document.querySelector("#button-product-upload");
const cancelButton = document.querySelector("#button-product-cancel");
const modifyButton = document.querySelector(".button-modify");
const deleteButton = document.querySelector(".button-delete");

const content = document.querySelector("#content-detail");
const productName = document.querySelector("#newProduct-name");
const productCategory = document.querySelector("#newProduct-category");
const productPrice = document.querySelector("#newProduct-price");
const productImage = document.querySelector("#newProduct-image");
const productDescription = document.querySelector("#newProduct-description");

const modifyUploadButton = document.querySelector(
  "#button-product-modify-upload"
);
const newProductName = document.querySelector("#newProduct-modify-name");
const newProductCategory = document.querySelector(
  "#newProduct-modify-category"
);
const newProductPrice = document.querySelector("#newProduct-modify-price");
const newProductImage = document.querySelector("#newProduct-modify-image");
const newProductDescription = document.querySelector(
  "#newProduct-modify-description"
);

let productsLength;
let modifyId;
let modifyData;
let deleteProductId;

fetchJSONData();

// 화면 로드 시 실행
async function fetchJSONData() {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/products/get/all", {
    method: "GET",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  productsLength = data.length;
  console.log(productsLength);

  data.map((element) => {
    const { productName, image, price, createAt, productNo } = element;
    const createdAt = `
    ${createAt.slice(0, 10)}
    ${createAt.slice(12, 19)}
    `;
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="product">
        <div class="product-number">${productNo}</div>
        <div class="product-image">
          <img class="product-image-src" src="${image}" alt="이미지"></img>
        </div>
        <div class="product-name">${productName}</div>
        <div class="product-price">${price}원</div>
        <div class="product-date">${createdAt}</div>
        <button class="button-modify button-modify-${productNo}">
          <i class="fa-solid fa-pencil"></i>
        </button>
        <button class="button-delete-${productNo}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      `
    );

    //제품 수정(연필 버튼 클릭 시)
    const modifyButton = document.querySelector(`.button-modify-${productNo}`);
    const modifyCancelButton = document.querySelector(
      "#button-product-modify-cancel"
    );

    modifyCancelButton.addEventListener("click", updateProduct);

    async function clickModifyButton(e) {
      e.preventDefault();
      const id = Number(
        e.target.parentNode.parentNode.firstElementChild.innerText
      );
      modifyId = id;
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/products/${id}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      modifyData = data;
      console.log(data);
      newProductName.value = data.productName;
      newProductCategory.value = data.categoryName;
      newProductPrice.value = data.price;
      newProductImage.value = data.image;
      newProductDescription.value = data.description;
      updateProduct();
    }
    modifyButton.addEventListener("click", clickModifyButton);

    //제품 삭제 (휴지통 버튼 클릭 시)
    const deleteButton = document.querySelector(`.button-delete-${productNo}`);

    async function deleteProduct(e) {
      e.preventDefault();
      deleteProductId = productNo;
      console.log(deleteProductId);
      deleteModal.classList.toggle("hidden");
    }
    deleteButton.addEventListener("click", deleteProduct);
  });
}

// 제품 추가 버튼 클릭 시 이벤트
function addProduct(e) {
  e.preventDefault();
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productImage.value = "";
  productDescription.value = "";
  modal.classList.toggle("hidden");
}

addButton.addEventListener("click", addProduct);
modalBackground.addEventListener("click", addProduct);
cancelButton.addEventListener("click", addProduct);

// 제품 추가 모달 창에서 등록 버튼 클릭 시 이벤트
async function upload(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productNo: Math.floor(Math.random() * 1000000000),
      productName: productName.value,
      categoryName: productCategory.value,
      price: productPrice.value,
      image: productImage.value,
      description: productDescription.value,
    }),
  });
  const data = await response.json();
  console.log(data);

  content.insertAdjacentHTML(
    "beforeend",
    `<div class="product">
      <div class="product-number">${data.productNo}</div>
      <div class="product-image">${data.image}</div>
      <div class="product-name">${data.productName}</div>
      <div class="product-price">${data.price}</div>
      <div class="product-date">${data.createAt}</div>
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
  productDescription.value = "";
  modal.classList.toggle("hidden");
  location.href = "/admin/product";
}

uploadButton.addEventListener("click", upload);

// 수정 modal 창 내의 확인 버튼 클릭 시
async function modifyProduct(e) {
  e.preventDefault();
  console.log(modifyId);
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/products/${modifyId}`, {
    method: "PUT",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productNo: modifyData.productNo,
      productName: newProductName.value,
      categoryName: newProductCategory.value,
      price: newProductPrice.value,
      image: newProductImage.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  location.href = "/admin/product";
}
modifyUploadButton.addEventListener("click", modifyProduct);

function updateProduct() {
  modifyModal.classList.toggle("hidden");
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productImage.value = "";
}

const modifyModal = document.querySelector(".modal-modify");
const modifyBackground = document.querySelector(".modal-modify-background");
const modifyContent = document.querySelector(".modal-modify-content");

modifyBackground.addEventListener("click", updateProduct);

// 삭제 modal 창 내의 확인 버튼 클릭 시
const deleteModal = document.querySelector(".modal-delete");
const deleteBackground = document.querySelector(".modal-delete-background");
const deleteCheck = document.querySelector("#modal-button-delete");
const deleteCancel = document.querySelector("#modal-button-cancel");
deleteBackground.addEventListener("click", deleteProduct);
deleteCancel.addEventListener("click", deleteProduct);

function deleteProduct() {
  deleteModal.classList.toggle("hidden");
}

async function clickDelete(e) {
  e.preventDefault();
  console.log(deleteProductId);
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/products/${deleteProductId}`, {
    method: "DELETE",
    headers: {
      authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  location.reload();
}
deleteCheck.addEventListener("click", clickDelete);
