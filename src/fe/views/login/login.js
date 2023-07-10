function loginId() {
    let id = document.querySelector("#id");
    let password = document.querySelector("#password");

    if (id.value == "") {
        alert("아이디를 입력해주세요");
        return false;
    }
    if (password.value == "") {
        alert("비밀번호를 입력해주세요");
        return false;
    }
}
