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
                document.getElementById('extra-address').value = extraAddr;
            } else {
                document.getElementById('extra-address').value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById('detail-address').focus();
        },
    }).open();
}

// myPage api 불러와서 연결 회원 정보 그리기
async function myPageModifyRender() {
    const token = localStorage.getItem('token');

    const response = await fetch('/api/user/my', {
        method: 'GET',
        headers: {
            authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    const { address1, address2, postalCode, email, name, phoneNumber } = data;

    console.log(data);

    const contentsWrapper = document.querySelector('.contents-wrapper');
    // const contentsFragment = new DocumentFragment();

    contentsWrapper.innerHTML = `
                    <div class="middle-wrapper">
                        <div class="name-wrapper">
                            <p>이름</p>
                            <input type="text" value="${name}" readonly />
                        </div>
                        <div class="id-wrapper">
                            <p>아이디</p>
                            <input type="text" value="${email}" readonly />
                        </div>
                        <div class="password-wrapper">
                            <p>비밀번호</p>
                            <input type="password" />
                        </div>
                        <div class="password-check-wrapper">
                            <p>비밀번호 확인</p>
                            <input type="password" />
                        </div>
                        <div class="number-wrapper">
                            <p>전화번호</p>
                            <input type="text" id="number" value="${phoneNumber}" />
                        </div>
                    </div>
                    <div class="last-wrapper">
                        <div class="img-wrapper">
                            <div>
                                <img src="./철수.jpeg" alt="" />
                            </div>
                            <div class="file-wrapper"> 
                            <input id="file-input" type="file" />
                            <label for="file-input">업로드</label>
                            </div>
                        </div>
                        <div class="address-wrapper">
                            <div>
                                <p>주소</p>
                            </div>
                            <div>
                                <div class="address-search">
                                    <input type="text" id="postcode" value="${postalCode}" />
                                    <button class="btn-address">검색</button>
                                </div>
                                <div class="main-address">
                                    <input type="text" value="${address1}" id="address" />
                                </div>
                                <div class="sub-address">
                                    <input type="text" value="${address2}" id="detail-address" />
                                    <input type="text" placeholder="참조 사항" id="extra-address" />
                                </div>
                            </div>
                        </div>
                    </div>
    `;

    const addressBtn = document.querySelector('.btn-address');
    addressBtn.addEventListener('click', execDaumPostcode);
}

myPageModifyRender();
