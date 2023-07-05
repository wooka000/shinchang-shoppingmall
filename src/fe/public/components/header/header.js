// create header
const header = document.querySelector('#header');
const nav = document.createElement('div');

nav.setAttribute('id', 'nav');
nav.innerHTML = `
                    <!-- Logo -->
                    <div class="logo">
                        <a href=""><img src="../../public/assets/img/logo/떡잎마을샵-logo.png" alt="Logo" /></a>
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
                                    <li><a href="">인기 | 신상품</a></li>
                                    <li><a href="">의류</a></li>
                                    <li><a href="">피규어</a></li>
                                    <li><a href="">다이어리</a></li>
                                    <li><a href="">아크릴 키링</a></li>
                                    <li><a href="">핸드폰 케이스</a></li>
                                </ul>
                            </div>
                            <div style="width: 100px">
                                <ul>
                                    <li><a href="">sale</a></li>
                                    <li><a href="">사전 예약</a></li>
                                </ul>
                            </div>
                            <div style="width: 150px">
                                <ul>
                                    <li><a href="">Q&A</a></li>
                                    <li><a href="">도움말</a></li>
                                    <li><a href="">공지사항</a></li>
                                </ul>
                            </div>
                        </div>
                    </menu>
    
                    <!-- login & myPage -->
                    <ul class="sign-list">
                        <li>
                            <a href=""><img src="../../public/assets/img/icon/admin.svg" alt="admin" style="margin-top: 2px" /></a>
                        </li>
                        <li class="login">
                            <a href=""><img src="../../public/assets/img/icon/user.svg" /></a>
                            <div class="hide-login">
                                <ul>
                                    <li><a href="">로그인</a></li>
                                    <li><a href="">회원 가입</a></li>
                                    <li><a href="">마이 페이지</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href=""><img src="../../public/assets/img/icon/cart.svg" alt="" /></a>
                        </li>
                        <li>
                            <a href=""><img src="../../public/assets/img/icon/search.svg" alt="" /></a>
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
