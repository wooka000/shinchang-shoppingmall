/*
백엔드에서 받아와서 상품 상세 페이지에 필요한 데이터

상품 객체 { 상품 번호: number, 상품 종류: string, 등록 시간: date, 상품 이미지: string, 상품 명: string, 상품 가격: price }

장바구니에 담았을 때 넘겨줘야 하는 정보 ↓
상품 객체 { 상품 번호: number, 상품 종류: string, 등록 시간: date, 상품 이미지: string, 상품 명: string, 상품 가격: price*quantity, 상품 갯수: number }
*/

// minus & plus btn 클릭시 input 값 증가 / 감소
const minusBtn = document.querySelector('.minus-btn');
const plusBtn = document.querySelector('.plus-btn');

let inputNum = document.querySelector('input');
let num = parseInt(inputNum.value);

minusBtn.addEventListener('click', () => {
    if (num == 1) inputNum.value = 1;
    else inputNum.value = num -= 1;
});

plusBtn.addEventListener('click', () => {
    inputNum.value = num += 1;
});
