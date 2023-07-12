function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            var addr = ""; // 주소 변수
            var extraAddr = ""; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === "R") {
                // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else {
                // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === "R") {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraAddr +=
                        extraAddr !== ""
                            ? ", " + data.buildingName
                            : data.buildingName;
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== "") {
                    extraAddr = " (" + extraAddr + ")";
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value =
                    extraAddr;
            } else {
                document.getElementById("sample6_extraAddress").value = "";
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample6_postcode").value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        },
    }).open();
}

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
    if (passwordc.value == "") {
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
    // form.submit();
}
const register = document.querySelector("#register");
register.addEventListener("click", function (e) {
    e.preventDefault();
    const idd = document.getElementById("id");
    const passwordInput = document.getElementById("password");
    const phoneNumberInput = document.getElementById("number");
    const names = document.getElementById("name");

    const data = {
        id: idd.value,
        password: passwordInput.value,
        phoneNumber: phoneNumberInput.value,
        name: names.value,
    };

    fetch("/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("회원가입에 실패했습니다.");
            }
            return response.json();
        })
        .then((responseData) => {
            console.log("회원가입이 성공적으로 완료되었습니다.", responseData);
        })
        .catch((error) => {
            console.error("회원가입 중 오류가 발생했습니다.", error);
        });
});
