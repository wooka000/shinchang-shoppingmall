// function loginId() {
//   const id = document.querySelector("#id").value;
//   const password = document.querySelector("#password").value;

//   if (id == "") {
//     alert("아이디를 입력해 주세요.");
//     return false;
//   }

//   if (password == "") {
//     alert("비밀번호를 입력해 주세요.");
//     return false;
//   }

//   return true;
// }

// // 로그인 버튼 클릭 이벤트 핸들러
// const loginBtn = document.querySelector("#login-btn");
// loginBtn.addEventListener("click", (e) => {
//   e.preventDefault();

//   // 아이디와 비밀번호 입력 값 가져오기
//   const username = document.getElementById("id").value;
//   const password = document.getElementById("password").value;

//   // API 호출
//   fetch("/api/user/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: username,
//       password: password,
//     }),
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         // 로그인 성공 시 토큰 값을 가져와서 로컬 스토리지에 저장
//         return response.json().then((data) => {
//           // 토큰 값 로컬 스토리지에 저장
//           localStorage.setItem("token", data.token);
//           localStorage.setItem("username", username);

//           console.log("로그인 성공");
//         });
//       } else {
//         // 로그인 실패 처리
//         console.log("로그인 실패");
//         alert("아이디 및 비밀번호를 잘못 입력하였습니다.");
//         throw new Error("로그인에 실패하였습니다.");
//       }
//     })
//     .then(function () {
//       // 로그인 성공 후 페이지 이동
//       window.location.href = "/";
//     })
//     .catch(function (error) {
//       console.log("에러 발생:", error);
//       // window.location.href = '/error';
//     });
// });

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
