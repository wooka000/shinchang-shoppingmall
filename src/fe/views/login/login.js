// function loginId() {
//     let id = document.querySelector("#id");
//     let password = document.querySelector("#password");

//     if (id.value == "") {
//         alert("아이디를 입력해주세요");
//         return false;
//     }
//     if (password.value == "") {
//         alert("비밀번호를 입력해주세요");
//         return false;
//     }
//     return true;
// }

// // 로그인 버튼 클릭 이벤트 핸들러
// const loginBtn = document.querySelector("#login-btn");
// loginBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log(e);
//     // 아이디와 비밀번호 입력 값 가져오기
//     var username = document.getElementById("id").value;
//     var password = document.getElementById("password").value;

//     // API 호출
//     fetch("/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email: username,
//             password: password,
//         }),
//     })
//         .then(function (response) {
//             // 응답 상태 코드 확인
//             if (response.status === 200) {
//                 // 로그인 성공 시 메인 페이지로 이동
//                 window.location.href = "/";
//             } else {
//                 // 로그인 실패 처리
//                 console.log("로그인 실패");
//             }
//         })
//         .catch(function (error) {
//             console.log("에러 발생:", error);
//         });
// });
// // 아이디 비번 입력한다.
// // 로그인버튼 누른다.
// // 버튼 눌렀을 때 api를 호출한다.
// // 데이터 response 받고 status 200 잘 뜨면(로그인 성공하면) 다른 페이지로 이동한다 (메인페이지)

// const loginForm = document.querySelector("form");

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
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e);
    // 아이디와 비밀번호 입력 값 가져오기
    var username = document.getElementById("id").value;
    var password = document.getElementById("password").value;

    // API 호출
    fetch("/login", {
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
            // 응답 상태 코드 확인
            if (response.status === 200) {
                // 로그인 성공 시 토큰 값을 가져와서 로컬 스토리지에 저장
                return response.json().then(function (data) {
                    // 토큰 값 로컬 스토리지에 저장
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", username);
                    console.log("로그인 성공");
                });
            } else {
                // 로그인 실패 처리
                console.log("로그인 실패");
                throw new Error("로그인에 실패하였습니다.");
            }
        })
        .then(function () {
            // 로그인 성공 후 페이지 이동
            window.location.href = "/";
        })
        .catch(function (error) {
            console.log("에러 발생:", error);
        });
});

// 페이지가 로드될 때 실행되는 함수
window.addEventListener("load", function () {
    // 로컬 스토리지에서 저장된 토큰 값 가져오기
    var token = localStorage.getItem("token");

    // 토큰 값이 저장되어 있는 경우, 필요한 작업을 수행하세요
    if (token) {
        // 여기에서 필요한 작업을 수행하세요 (예: 페이지 이동 등)
        console.log("토큰 값:", token);
    } else {
        console.log("토큰 값이 저장되어 있지 않습니다.");
    }
});
