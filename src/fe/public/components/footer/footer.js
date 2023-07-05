// create footer
const footer = document.querySelector('#footer');
const div = document.createElement('div');

div.setAttribute('class', 'footer-box');
div.innerHTML = `
<div class="site-logo">
                    <div>
                        <img src="../../public/assets/img/icon/twitter.svg" alt="twitter" />
                    </div>
                    <div>
                        <img src="../../public/assets/img/icon/youtube.svg" alt="youtube" />
                    </div>
                    <div>
                        <img src="../../public/assets/img/icon/facebook.svg" alt="facebook" />
                    </div>
                </div>
                <div class="info">
                    <span> (주)떡잎마을샵 • 서울특별시 초록구 떡잎마을 떡잎3로 짱구네 • South Korea </span>
                </div>
                <div class="net">
                    <div>
                        <img src="../../public/assets/img/icon/email.svg" alt="email" />
                        <span> &nbsp; info@tteogipmaeulshop.com</span>
                    </div>
                    <div>
                        <div>|</div>
                    </div>
                    <div>
                        <img src="../../public/assets/img/icon/call.svg" alt="call" />
                        <span>&nbsp; 1994-0505 </span>
                    </div>
                </div>
                <div class="footer-logo">
                    <img src="../../public/assets/img/logo/떡잎마을샵-logo.png" alt="Logo" />
                </div>
                <div class="copyright">
                    <span>© 2023 TTEOGIPMAEULSHOP Co. ALL RIGHTS RESERVED.</span>
                </div>
`;

footer.appendChild(div);
