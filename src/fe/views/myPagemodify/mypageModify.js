// 주소 검색
function execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
                // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else {
                // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.querySelector('.extra-address').value = extraAddr;
            } else {
                document.querySelector('.extra-address').value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.querySelector('.postal-code').value = data.zonecode;
            document.querySelector('.address').value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.querySelector('.detail-address').focus();
        },
    }).open();
}

// myPage api 불러와서 연결 회원 정보 그리기
async function myPageModifyRender() {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('/api/user/my', {
            method: 'GET',
            headers: {
                authorization: `bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        const { address1, address2, postalCode, email, name, phoneNumber, image } = data;

        const contentsWrapper = document.querySelector('.contents');
        const contentsFragment = new DocumentFragment();

        const div = document.createElement('div');
        div.setAttribute('class', 'contents-wrapper');

        div.innerHTML = `
                    <div class="middle-wrapper">
                        <div class="name-wrapper">
                            <p>이름</p>
                            <input type="text" value="${name}" class="name-input" readonly />
                        </div>
                        <div class="id-wrapper">
                            <p>아이디</p>
                            <input type="text" value="${email}" class="id-input" readonly />
                        </div>
                        <div class="password-wrapper">
                            <p>현재 비밀번호</p>
                            <input type="password" class="current-pw" />
                        </div>
                        <div class="password-wrapper">
                            <p>새 비밀번호</p>
                            <input type="password" class="new-pw" />
                        </div>
                        <div class="password-check-wrapper">
                            <p>새 비밀번호 확인</p>
                            <input type="password" class="new-check-pw" />
                        </div>
                        <div class="number-wrapper">
                            <p>전화번호</p>
                            <input type="text" class="number-input" value="${phoneNumber}" />
                        </div>
                    </div>
                    <div class="last-wrapper">
                        <div class="img-wrapper">
                            <div>
                                <img src="${
                                    image ? image : '../../public/assets/img/icon/mypage-user.svg'
                                }" alt="preview-image" class="preview-image" />
                            </div>
                            <div class="file-wrapper"> 
                            <input class="file-input" type="file" />
                            <label for="file-input">업로드</label>
                            </div>
                        </div>
                        <div class="address-wrapper">
                            <div>
                                <p>주소</p>
                            </div>
                            <div>
                                <div class="address-search">
                                    <input type="text" class="postal-code" value="${postalCode}" />
                                    <button class="btn-address">검색</button>
                                </div>
                                <div class="main-address">
                                    <input type="text" value="${address1}" class="address" />
                                </div>
                                <div class="sub-address">
                                    <input type="text" value="${address2}" class="detail-address" />
                                    <input type="text" placeholder="참조 항목" class="extra-address" />
                                </div>
                            </div>
                        </div>
                    </div>
    `;

        contentsFragment.appendChild(div);
        contentsWrapper.appendChild(contentsFragment);

        // 이미지 업로드 버튼 클릭시 발생 이벤트
        function readImage(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();

                // 이미지가 로드가 된 경우
                reader.onload = (e) => {
                    const previewImage = document.querySelector('.preview-image');
                    previewImage.src = e.target.result;
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

        // 파일 업로드에 change 이벤트
        const inputImage = document.querySelector('.file-input');
        inputImage.addEventListener('change', (e) => {
            readImage(e.target);
        });

        // 주소 검색 버튼 클릭시 발생 이벤트
        const addressBtn = document.querySelector('.btn-address');
        addressBtn.addEventListener('click', execDaumPostcode);
    } catch (error) {
        // location.href = '/error';
    }
}

myPageModifyRender();

// 회원 정보 수정 함수
async function modifyUserInfo() {
    try {
        const token = localStorage.getItem('token');

        // 이름 / 새로운 비밀번호 & 새로운 비밀번호 체크 / 주소 1 / 주소 2 / 우편번호 / 폰 넘버 / 이미지
        const name = document.querySelector('.name-input').value;
        const currentPassword = document.querySelector('.current-pw').value;
        const newPassword = document.querySelector('.new-pw').value;
        const checkNewPw = document.querySelector('.new-check-pw').value;
        const address1 = document.querySelector('.address').value;
        const address2 = document.querySelector('.detail-address').value;
        const postalCode = document.querySelector('.postal-code').value;
        const phoneNum = document.querySelector('.number-input').value;
        const inputImage = document.querySelector('.file-input').files[0];

        // formData 만들기
        const formData = new FormData();

        formData.append('name', name);
        formData.append('address1', address1);
        formData.append('address2', address2);
        formData.append('postalCode', postalCode);
        formData.append('phoneNumber', phoneNum);
        formData.append('role', 'user' ? 'user' : 'admin');
        // formData.set('profileImage', inputImage);

        if (newPassword === checkNewPw) {
            formData.set('currentPassword', currentPassword);

            if (checkNewPw !== '') {
                formData.set('password', checkNewPw);
            }

            const response = await fetch('/api/user/my', {
                method: 'PATCH',
                headers: {},
                body: formData,
            });

            console.log(response);
            return true;
        } else {
            alert('현재 패스워드가 일치하지 않습니다!');
            return false;
        }
    } catch (error) {
        console.log(error);
        location.href = '/error';
    }
}

const modifyBtn = document.querySelector('.modify-btn');
modifyBtn.addEventListener('click', () => {
    if (confirm('회원 정보를 수정하시겠습니까?') == true) {
        if (modifyUserInfo()) {
            alert('회원 정보가 수정되었습니다.');
            // location.href = '/mypage/modify';
        }
    }
});

// 회원 탈퇴 함수
async function deleteUser() {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('/api/user/my', {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
    } catch (error) {
        // location.href = '/error';
    }
}

// 회원 탈퇴 버튼 클릭 이벤트
const deleteBtn = document.querySelector('.delete-btn');
deleteBtn.addEventListener('click', () => {
    if (confirm('정말 탈퇴하실 건가요?') == true) {
        deleteUser();
        alert('탈퇴가 완료되었습니다.');

        location.href = '/';
    }
});
