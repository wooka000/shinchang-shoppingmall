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
                            <li>스토어</li>
                            <li>이벤트</li>
                            <li>커뮤니티</li>
                        </ul>
                        <div class="hide-menu">
                            <div style="width: 140px">
                                <ul>
                                    <li>인기 | 신상품</li>
                                    <li>의류</li>
                                    <li>피규어</li>
                                    <li>다이어리</li>
                                    <li>아크릴 키링</li>
                                    <li>핸드폰 케이스</li>
                                </ul>
                            </div>
                            <div style="width: 100px">
                                <ul>
                                    <li>sale</li>
                                    <li>사전 예약</li>
                                </ul>
                            </div>
                            <div style="width: 150px">
                                <ul>
                                    <li>Q&A</li>
                                    <li>도움말</li>
                                    <li>공지사항</li>
                                </ul>
                            </div>
                        </div>
                    </menu>
    
                    <!-- Login & myPage -->
                    <ul class="sign-list">
                        <li>
                            <i class="fa-solid fa-lock"></i>
                        </li>
                        <li class="login">
                            <!-- <i class="fa-regular fa-user"></i> -->
                            <img
                                src="https://webtoonshop.co.kr/web/season2_skin/skin61/images/member_icon_b.svg"
                            />
                            <div class="hide-login">
                                <ul>
                                    <li>로그인</li>
                                    <li>회원 가입</li>
                                    <li>마이 페이지</li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <!-- <i class="fa-solid fa-cart-shopping"></i> -->
                            <img src="https://webtoonshop.co.kr/web/season2_skin/skin61/images/basket_icon_b.svg" alt="" />
                        </li>
                        <li>
                            <!-- <i class="fa-solid fa-magnifying-glass"></i> -->
                            <img src="https://webtoonshop.co.kr/web/season2_skin/skin61/images/search_icon_b.svg" alt="" />
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
