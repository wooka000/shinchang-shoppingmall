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
        console.log(data);

        const { name, email, phoneNumber, role } = data;

        const main = document.querySelector('.main');
        const userCardFragment = new DocumentFragment();

        const section = document.createElement('section');
        section.setAttribute('class', 'user-card');

        section.innerHTML = `
    <div class="user-profile">
                        <div class="user-image">
                            <img id="user-image" src="./images/defaultUser.png" alt="프로필사진" />
                        </div>
                        <div class="user-info">
                            <h4>${name}</h4>
                            <h6>${email}</h6>
                            <h6>${phoneNumber}</h6>
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
