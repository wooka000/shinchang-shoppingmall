async function userInfoRender() {
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

        const { name, email, phoneNumber, role } = data;

        const number = phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

        const main = document.querySelector('.main');
        const userCardFragment = new DocumentFragment();

        const section = document.createElement('section');
        section.setAttribute('class', 'user-card');

        section.innerHTML = `
    <div class="user-profile">
                        <div class="user-image">
                            <img id="user-image" src="../../public/assets/img/icon/mypage-user.svg" alt="프로필사진" />
                        </div>
                        <div class="user-info">
                            <h2 class="user-name">${name}</h2>
                            <h4 class="user-email">${email}</h4>
                            <h4 class="user-phoneNo">${number}</h4>
                        </div>
                    </div>
                    <div class="user-grade"><h4>${role === 'admin' ? '관리자' : '일반 회원'}</h4></div>
    `;

        userCardFragment.appendChild(section);
        main.prepend(userCardFragment);
    } catch (error) {
        location.href = '/error';
    }
}

userInfoRender();
