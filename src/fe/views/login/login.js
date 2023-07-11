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
    return true;
}

// 로그인 버튼 클릭 이벤트 핸들러
const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(e);
    // 아이디와 비밀번호 입력 값 가져오기
    var username = document.getElementById("id").value;
    var password = document.getElementById("password").value;

    // API 호출
    fetch("/user/login", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: username,
            password: password,
        }),
    })
        .then(function (response) {
            // 응답 상태 코드 확인
            if (response.status === 200) {
                // 로그인 성공 시 메인 페이지로 이동
                window.location.href = "/main";
            } else {
                // 로그인 실패 처리
                console.log("로그인 실패");
            }
        })
        .catch(function (error) {
            console.log("에러 발생:", error);
        });
});
// 아이디 비번 입력한다.
// 로그인버튼 누른다.
// 버튼 눌렀을 때 api를 호출한다.
// 데이터 response 받고 status 200 잘 뜨면(로그인 성공하면) 다른 페이지로 이동한다 (메인페이지)

const loginForm = document.querySelector("form");
