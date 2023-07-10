// input 값 id 를 이용해 변수 정리

function formcheck() {
    let form = document.querySelector("#form");
    let id = document.querySelector("#id");
    let password = document.querySelector("#password");
    let passwordcheck = document.querySelector("#passwordc");
    let name = document.querySelector("#name");
    let number = document.querySelector("#number");

    let checkname = /^[가-힣]4,10}$/;
    let idcheck = /^[a-zA-Z0-9]{4,10}$/;
    let passwordcheckk = /^[0-9]$/;
    let numbercheck = /^[0-9]+$/;

    if (id.value == "") {
        alert("아이디를 입력해주세요");
        return false;
    }
    if (!idcheck.test(id.value)) {
        alert("영문 및 숫자만 4-10자리까지입력해주세요");
        return false;
    }
    if (password.value == "") {
        alert("비밀번호를 입력해주세요");
        return false;
    }
    if (password.value !== passwordcheck.value) {
        alert("비밀번호가 일치하지 않습니다");
        return false;
    }
    if (name.value == "") {
        alert("이름을 입력해주세요");
        return false;
    }
    if (number.value == "") {
        alert("전화번호를 입력해주세요");
        return false;
    }
    if (!numbercheck.test(number.value)) {
        alert("숫자로만 입력해주세요");
        return false;
    }
    form.submit();
}
