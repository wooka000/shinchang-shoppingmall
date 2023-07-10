const addButton = document.querySelector(".button-product-add");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");
const uploadButton = document.querySelector("#button-product-upload");
const cancelButton = document.querySelector("#button-product-cancel");
const modifyButton = document.querySelector(".button-modify");
const deleteButton = document.querySelector(".button-delete");

// 제품 추가
const content = document.querySelector("#content-detail");
const productName = document.querySelector("#newProduct-name");
const productCategory = document.querySelector("#newProduct-category");
const productPrice = document.querySelector("#newProduct-price");
const productImage = document.querySelector("#newProduct-image");

fetchJSONData();

// json파일에서 데이터 불러오기 (초기 화면 세팅)
// 이벤트 안에서 바로 걸어주기
async function fetchJSONData() {
  const response = await fetch("./product.json");
  const data = await response.json();
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    content.insertAdjacentHTML(
      "beforeend",
      `<div class="product">
        <div class="product-number">${data[i].productNumber}</div>
        <div class="product-image">${data[i].image}</div>
        <div class="product-name">${data[i].name}</div>
        <div class="product-price">${data[i].price}</div>
        <div class="product-date">${data[i].createdAt}</div>
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
}

// 제품추가 버튼 클릭 시 이벤트
function addProduct(e) {
  e.preventDefault();
  modal.classList.toggle("hidden");
}

addButton.addEventListener("click", addProduct);
modalBackground.addEventListener("click", addProduct);
cancelButton.addEventListener("click", addProduct);

// 제품등록 버튼 클릭시
async function upload(e) {
  e.preventDefault();
  const response = await fetch("./product.json");
  const data = await response.json();
  data.push({
    productNumber: 10,
    name: productName.value,
    price: productPrice.value,
    createdAt: `${new Date().getMonth() + 1}.${new Date().getDate()}`,
    image: productImage.value,
    category: productCategory.value,
  });

  content.insertAdjacentHTML(
    "beforeend",
    `<div class="product">
      <div class="product-number">${data[data.length - 1].productNumber}</div>
      <div class="product-image">${data[data.length - 1].image}</div>
      <div class="product-name">${data[data.length - 1].name}</div>
      <div class="product-price">${data[data.length - 1].price}</div>
      <div class="product-date">${data[data.length - 1].createdAt}</div>
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
  console.log(data);
}

uploadButton.addEventListener("click", upload);

//제품 삭제
// js에서 동적으로 생성한 엘리먼트 접근 방법
//=> 현재는 content라는 틀에 이벤트를 등록해서 삭제 버튼이 아닌 틀안의 모든요소에서 이벤트 발생
// 새로운 배열을 만드는데 성공, 어떻게 json파일의 배열을 업데이트?
async function deleteProduct(e) {
  e.preventDefault();
  const id = Number(e.target.parentNode.parentNode.firstElementChild.innerText);
  const response = await fetch("./product.json");
  const data = await response.json();
  const newData = data.filter((element) => element.productNumber !== id);
  console.log(newData);
}

content.addEventListener("click", deleteProduct);

//제품 수정
//삭제와 같은 이유로 엘리먼트 접근을 못함 => 클릭 이벤트 생성 X
// async function updateProduct(e) {
//   e.preventDefault();
//   modifyModal.classList.toggle("hidden");
// }

// const modifyBackground = document.querySelector(".modal-modify-background");
// const modifyContent = document.querySelector(".modal-modify-content");

// modifyButton.addEventListener("click", addProduct);
// modifyBackground.addEventListener("click", addProduct);
// modifyContent.addEventListener("click", addProduct);
