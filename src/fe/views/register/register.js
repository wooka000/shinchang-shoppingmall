function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            if (data.userSelectedType === 'R') {
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
                }
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                document.getElementById('sample6_extraAddress').value = extraAddr;
            } else {
                document.getElementById('sample6_extraAddress').value = '';
            }

            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById('sample6_address').value = addr;
            document.getElementById('sample6_detailAddress').focus();
        },
    }).open();
}

function formCheck() {
    const id = document.querySelector('#id').value;
    const password = document.querySelector('#password').value;
    const checkPassword = document.querySelector('#passwordc').value;
    const name = document.querySelector('#name').value;
    const number = document.querySelector('#number').value;

    const nameCheck = /^[가-힣]{4,10}$/;
    const checkId = /^[a-zA-Z0-9]{4,10}$/;
    const checkPasswordForm = /^[0-9]+$/;
    const checkNumber = /^[0-9]+$/;

    if (id === '') {
        alert('아이디를 입력해 주세요.');
        return false;
    }
    if (!checkId.test(id)) {
        alert('영문 및 숫자만 4-10자리까지 입력해 주세요.');
        return false;
    }
    if (password === '') {
        alert('비밀번호를 입력해 주세요.');
        return false;
    }
    if (checkPassword === '') {
        alert('비밀번호를 입력해 주세요.');
        return false;
    }
    if (password !== checkPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return false;
    }
    if (name === '') {
        alert('이름을 입력해 주세요.');
        return false;
    }
    if (number === '') {
        alert('전화번호를 입력해 주세요.');
        return false;
    }
    if (!checkNumber.test(number)) {
        alert('숫자로만 입력해 주세요.');
        return false;
    }

    return true;
}

const register = document.querySelector('#register');
register.addEventListener('click', (e) => {
    const isValid = formCheck();

    if (!isValid) {
        e.preventDefault();
        return;
    }

    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('id').value;
    const passwordInput = document.getElementById('password').value;
    const phoneNumberInput = document.getElementById('number').value;
    const address1Input = document.getElementById('sample6_address').value;
    const address2Input = document.getElementById('sample6_detailAddress').value;
    const postalCodeInput = document.getElementById('sample6_postcode').value;

    const subscriptionDate = new Date();

    fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nameInput,
            email: emailInput,
            password: passwordInput,
            phoneNumber: phoneNumberInput,
            address1: address1Input,
            address2: address2Input,
            postalCode: postalCodeInput,
            subscriptionDate: subscriptionDate,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('회원가입에 실패했습니다.');
            }
            return response.json();
        })
        .then((responseData) => {
            console.log('회원가입이 성공적으로 완료되었습니다.', responseData);
            alert('회원가입이 완료 되었습니다. 로그인 페이지로 이동합니다.');
            window.location.href = '/login';
        })
        .catch((error) => {
            console.error('회원가입 중 오류가 발생했습니다.', error);
            window.location.href = '/error';
        });
});
