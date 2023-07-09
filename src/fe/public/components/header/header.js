// create header
const header = document.querySelector('#header');
const nav = document.createElement('div');
const headerFragment = new DocumentFragment();

nav.setAttribute('id', 'nav');
nav.innerHTML = `
                    <!-- Logo -->
                    <div class="logo">
                        <a href="/"><img src="../../public/assets/img/logo/떡잎마을샵-logo.png" alt="Logo" /></a>
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
                                    <li><a href="">장바구니</a></li>
                                    <li><a href="">마이 페이지</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href=""><img src="../../public/assets/img/icon/cart.svg" alt="" /></a>
                        </li>
                        <li>
                            <a href=""><img src="../../public/assets/img/icon/search.svg" alt="" style="width: 25px; height: 25px; margin: 2px" /></a>
                        </li>
                    </ul>
    `;

headerFragment.appendChild(nav);
header.appendChild(headerFragment);

// category nav
const $menu = document.querySelector('menu');
const $hideMenu = document.querySelector('.hide-menu');
const hideMenuHeight = $hideMenu.offsetHeight;
const padding = 30;

// login nav
const $login = document.querySelector('.login');
const $hideLogin = document.querySelector('.hide-login');
const hideLoginHeight = $hideLogin.offsetHeight;

$hideMenu.style.height = 0;
$hideLogin.style.height = 0;

function mouseOverHandler(target) {
    target.style.height = `${(target === $hideMenu ? hideMenuHeight : hideLoginHeight) + padding}px`;
    target.style.padding = '1rem 0';
}

function mouseOutHandler(target) {
    target.style.height = 0;
    target.style.padding = 0;
}

$menu.addEventListener('mouseover', () => mouseOverHandler($hideMenu));
$menu.addEventListener('mouseout', () => mouseOutHandler($hideMenu));

$login.addEventListener('mouseover', () => mouseOverHandler($hideLogin));
$login.addEventListener('mouseleave', () => mouseOutHandler($hideLogin));

// scroll 이동시 헤더 배경 색상 추가
window.addEventListener('scroll', () => {
    if (window.scrollY !== 0) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
    } else {
        header.removeAttribute('style');
    }
});
