// create header
const header = document.querySelector('#header');
const nav = document.createElement('div');

nav.setAttribute('id', 'nav');
nav.innerHTML = `
                    <!-- Logo -->
                    <div class="logo">
                        <img src="../../public/assets/img/logo/떡잎마을샵-logo.png" alt="Logo" />
                    </div>
    
                    <!-- Menu -->
                    <menu>
                        <ul class="main-menu">
                            <li class="store"><a>스토어</a></li>
                            <li class="event"><a>이벤트</a></li>
                            <li class="community"><a>커뮤니티</a></li>
                        </ul>
                        <div class="hide-menu">
                            <div style="width: 140px">
                                <ul>
                                    <li><a>인기 | 신상품</a></li>
                                    <li><a>의류</a></li>
                                    <li><a>피규어</a></li>
                                    <li><a>다이어리</a></li>
                                    <li><a>아크릴 키링</a></li>
                                    <li><a>핸드폰 케이스</a></li>
                                </ul>
                            </div>
                            <div style="width: 100px">
                                <ul>
                                    <li><a>sale</a></li>
                                    <li><a>사전 예약</a></li>
                                </ul>
                            </div>
                            <div style="width: 150px">
                                <ul>
                                    <li><a>Q&A</a></li>
                                    <li><a>도움말</a></li>
                                    <li><a>공지사항</a></li>
                                </ul>
                            </div>
                        </div>
                    </menu>
    
                    <!-- login & myPage -->
                    <ul class="sign-list">
                        <li>
                            <img src="../../public/assets/img/icon/admin.svg" alt="admin" style="margin-top: 2px" />
                        </li>
                        <li class="login">
                            <img src="../../public/assets/img/icon/user.svg" />
                            <div class="hide-login">
                                <ul>
                                    <li><a>로그인</a></li>
                                    <li><a>회원 가입</a></li>
                                    <li><a>마이 페이지</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <img src="../../public/assets/img/icon/cart.svg" alt="" />
                        </li>
                        <li>
                            <img src="../../public/assets/img/icon/search.svg" alt="" />
                        </li>
                    </ul>
    `;

header.appendChild(nav);

// category nav
const $menu = document.querySelector('menu');
const $hideMenu = document.querySelector('.hide-menu');
const padding = 30;
const hideMenuHeight = $hideMenu.offsetHeight;

$hideMenu.style.height = 0;

$menu.addEventListener('mouseover', () => {
    $hideMenu.style.height = `${hideMenuHeight + padding}px`;
    $hideMenu.style.padding = '1rem 0';
});

$menu.addEventListener('mouseout', () => {
    $hideMenu.style.height = 0;
    $hideMenu.style.padding = 0;
});

// login nav
const $login = document.querySelector('.login');
const $hideLogin = document.querySelector('.hide-login');
const hideLoginHeight = $hideLogin.offsetHeight;

$hideLogin.style.height = 0;

$login.addEventListener('mouseover', () => {
    $hideLogin.style.height = `${hideLoginHeight + padding}px`;
    $hideLogin.style.padding = `1rem 0`;
});

$login.addEventListener('mouseleave', () => {
    $hideLogin.style.height = 0;
    $hideLogin.style.padding = 0;
});
