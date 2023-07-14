function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        document.getElementById("sample6_extraAddress").value = "";
      }

      document.getElementById("sample6_postcode").value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      document.getElementById("sample6_detailAddress").focus();
    },
  }).open();
}

// ID 유효성 검사
function formCheck() {
  const id = document.querySelector("#id").value;
  const password = document.querySelector("#password").value;
  const checkPassword = document.querySelector("#passwordc").value;
  const name = document.querySelector("#name").value;
  const number = document.querySelector("#number").value;

  const checkId = /^[a-zA-Z0-9]{4,10}$/;
  const checkPasswordForm = /^[a-zA-Z0-9]{4,10}$/;
  const checkNumber = /^\d{3}-\d{3,4}-\d{4}$/;

  if (id === "") {
    alert("아이디를 입력해 주세요.");
    return false;
  }
  if (!checkId.test(id)) {
    alert("영문 및 숫자만 4-10자리까지 입력해 주세요.");
    return false;
  }
  if (password === "" && checkPasswordForm.test(password)) {
    alert("비밀번호를 입력해 주세요.");
    return false;
  }
  if (checkPassword === "" && checkPasswordForm.test(checkPassword)) {
    alert("다시 한 번 비밀번호를 입력해 주세요.");
    return false;
  }
  if (password !== checkPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }
  if (name === "") {
    alert("이름을 입력해 주세요.");
    return false;
  }
  if (number === "") {
    alert("전화번호를 입력해 주세요.");
    return false;
  }
  if (!checkNumber.test(number)) {
    alert("전화번호를 형식에 맞게 입력해 주세요.");
    return false;
  }

  return true;
}
const registerButton = document.querySelector("#register");
registerButton.addEventListener("click", function (e) {
  const isValid = formCheck();

  if (!isValid) {
    e.preventDefault();
    return;
  }

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("id");
  const passwordInput = document.getElementById("password");
  const phoneNumberInput = document.getElementById("number");
  const address1Input = document.getElementById("sample6_address");
  const address2Input = document.getElementById("sample6_detailAddress");
  const postalCodeInput = document.getElementById("sample6_postcode");

  const subscriptionDate = new Date();

  fetch("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      phoneNumber: phoneNumberInput.value,
      address1: address1Input.value,
      address2: address2Input.value,
      postalCode: postalCodeInput.value,
      subscriptionDate: subscriptionDate,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("회원가입에 실패했습니다.");
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("회원가입이 성공적으로 완료되었습니다.", responseData);
      alert("회원가입이 완료 되었습니다. 로그인 페이지로 이동합니다 ");
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error("회원가입 중 오류가 발생했습니다.", error);
      window.location.href = "/error";
    });
});

// Enter 키 누를 때 회원가입 수행
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    registerButton.click();
  }
});
