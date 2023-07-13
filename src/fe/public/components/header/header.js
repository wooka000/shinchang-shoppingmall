async function headerRender() {
  // 카테고리 api 호출
  const response = await fetch("/api/category", {
    method: "GET",
  });
  let data = await response.json();

  // (acc, query) => acc.push({...query}); acc.sort((a, b) => a.categoryName.length - b.categoryName.length); return acc;
  data = data.reduce(
    (acc, query) =>
      [...acc, query].sort(
        (a, b) => a.categoryName.length - b.categoryName.length
      ),
    []
  );

  data = [...data.slice(-1), ...data].slice(0, -1);

  // 헤더 생성
  const header = document.querySelector("#header");
  const nav = document.createElement("div");
  const headerFragment = new DocumentFragment();

  nav.setAttribute("id", "nav");
  nav.innerHTML = `
                    <!-- Logo -->
                    <div class="logo">
                        <a href="/"><img src="../../public/assets/img/logo/떡잎마을샵-logo.png" alt="Logo" /></a>
                    </div>
    
                    <!-- Menu -->
                    <menu>
                        <ul class="main-menu">
                            <li class="store"><a href="">스토어</a></li>
                            <li class="event"><a href="">이벤트</a></li>
                            <li class="community"><a href="">커뮤니티</a></li>
                        </ul>
                        <div class="hide-menu">
                            <div style="width: 140px">
                                <ul class="menu-ul">
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
                        <li class="admin-btn">
                            <a href="/admin/user"><img src="../../public/assets/img/icon/admin.svg" alt="admin" style="margin-top: 2px" /></a>
                        </li>
                        <li class="login">
                            <a href="/login"><img src="../../public/assets/img/icon/user.svg" /></a>
                            <div class="hide-login">
                                <ul>
                                    <li class="login-btn"><a href="/login">로그인</a></li>
                                    <li class="logout-btn">로그아웃</li>
                                    <li class="register-btn"><a href="/register">회원 가입</a></li>
                                    <li><a href="/cart">장바구니</a></li>
                                    <li><a href="/mypage">마이 페이지</a></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="/cart"><img src="../../public/assets/img/icon/cart.svg" alt="" /></a>
                        </li>
                        <li>
                            <a href=""><img src="../../public/assets/img/icon/search.svg" alt="" style="width: 25px; height: 25px; margin: 2px" /></a>
                        </li>
                    </ul>
    `;

  headerFragment.appendChild(nav);
  header.appendChild(headerFragment);

  // 카테고리 api 호출 후 db에 저장된 정보에 따라 호출
  const hideMenu = document.querySelector(".menu-ul");
  const categoryFragment = new DocumentFragment();

  data.forEach(({ categoryName }) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="/products/category?categoryName=${categoryName}">${categoryName}</a>`;
    categoryFragment.appendChild(li);
  });

  hideMenu.appendChild(categoryFragment);

  // 카테고리 및 로그인 nav 바 마우스 호버시 보여주기
  const $menu = document.querySelector("menu");
  const $hideMenu = document.querySelector(".hide-menu");
  const hideMenuHeight = $hideMenu.offsetHeight;
  const padding = 20;

  const $login = document.querySelector(".login");
  const $hideLogin = document.querySelector(".hide-login");
  const hideLoginHeight = $hideLogin.offsetHeight;

  $hideMenu.style.height = 0;
  $hideLogin.style.height = 0;

  function mouseOverHandler(target) {
    target.style.height = `${
      (target === $hideMenu ? hideMenuHeight : hideLoginHeight) + padding
    }px`;
    target.style.padding = "1rem 0 0 0";
  }

  function mouseOutHandler(target) {
    target.style.height = 0;
    target.style.padding = 0;
  }

  $menu.addEventListener("mouseover", () => mouseOverHandler($hideMenu));
  $menu.addEventListener("mouseout", () => mouseOutHandler($hideMenu));

  $login.addEventListener("mouseover", () => mouseOverHandler($hideLogin));
  $login.addEventListener("mouseleave", () => mouseOutHandler($hideLogin));

  // scroll 이동시 헤더 배경 색상 추가
  window.addEventListener("scroll", () => {
    if (window.scrollY !== 0) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.85)";
    } else {
      header.removeAttribute("style");
    }
  });

  // 로그인시 로그인에서 로그아웃으로 변경 / 회원가입 가리기 (jwt 토큰 살아있는지 유무 확인)
  let loginBtn = document.querySelector(".login-btn");
  let registerBtn = document.querySelector(".register-btn");
  let logoutBtn = document.querySelector(".logout-btn");

  function changeBtnStyle(status) {
    loginBtn.style.display = status ? "none" : "block";
    registerBtn.style.display = status ? "none" : "block";
    logoutBtn.style.display = status ? "block" : "none";
  }

  const checkToken = localStorage.getItem("token");

  if (checkToken) {
    changeBtnStyle(checkToken);

    logoutBtn.addEventListener("click", () => {
      if (confirm("로그아웃하시겠습니까?") === true) {
        alert("방문해 주셔서 감사합니다😍 다음에 또 방문 부탁드려요😘");
        localStorage.removeItem("token");

        changeBtnStyle(false);

        location.href = "/";
      } else alert("즐거운 쇼핑 되시길 바랍니다😋");
    });
  } else {
    changeBtnStyle(checkToken);
  }

  // admin 일 경우 마크 띄우기
  fetch("/api/user/my", {
    method: "GET",
    headers: {
      Authorization: `bearer ${checkToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const isAdmin = data.role === "admin";

      const adminBtn = document.querySelector(".admin-btn");

      if (isAdmin) {
        adminBtn.style.display = "block";
      } else {
        adminBtn.style.display = "none";
      }
    })
    .catch(console.log);
}

headerRender();
