// create footer
const footer = document.querySelector('#footer');
const div = document.createElement('div');

div.setAttribute('class', 'footer-box');
div.innerHTML = `
<div class="site-logo">
                    <div>
                        <img src="../../public/assets/img/site-logo/twitter.svg" alt="twitter" />
                    </div>
                    <div>
                        <img
                            src="https://e7.pngegg.com/pngimages/208/269/png-clipart-youtube-play-button-computer-icons-youtube-youtube-logo-angle-rectangle-thumbnail.png"
                            alt="youtube"
                        />
                    </div>
                    <div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                            alt="facebook"
                        />
                    </div>
                </div>
                <div class="info">
                    <span> (주)떡잎마을샵 • 서울특별시 초록구 떡잎마을 떡잎3로 짱구네 • South Korea </span>
                </div>
                <div class="net">
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/3653/3653846.png" alt="email" />
                        <span> &nbsp; info@tteogipmaeulshop.com</span>
                    </div>
                    <div>
                        <div>|</div>
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/2067/2067643.png" alt="call" />
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
