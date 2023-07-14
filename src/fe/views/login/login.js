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

const loginBtn = document.querySelector("#login-btn");
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (loginId()) {
        var username = document.getElementById("id").value;
        var password = document.getElementById("password").value;

        fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    return response.json().then(function (data) {
                        console.log(data);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("username", username);
                        console.log("로그인 성공");
                    });
                } else {
                    console.log("로그인 실패");
                    throw new Error("로그인에 실패하였습니다.");
                }
            })
            .then(function () {
                window.location.href = "/";
            })
            .catch(function (error) {
                console.log("에러 발생:", error);
                window.location.href = "/error";
            });
    }
});

document.getElementById("id").addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("password").focus();
    }
});

document.getElementById("password").addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        if (loginId()) {
            loginBtn.click();
        }
    }
});

window.addEventListener("load", function () {
    var token = localStorage.getItem("token");
    if (token) {
        console.log("토큰 값:", token);
    } else {
        console.log("토큰 값이 저장되어 있지 않습니다.");
    }
});
//
