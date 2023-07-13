// 회원 정보 api 호출해서 정보 가져온 후 프사, 이름, 이메일, 전화번호, 회원등급(role) 렌더링
// api 명세서 10번째 줄 api 쓰면 되는듯? 
// const token = localStorage.getItem('token');
// // console.log(token);
// fetch('api/user/my', {
//   method: 'GET',
//   headers: {
//     authorization: `bearer ${token}`,
//     'Content-Type': 'application/json',
//   }
// })
// .then(res => {
//   // console.log(res);
//   res.json();
// })
// .then(data => console.log(data))
// .catch(console.log);

async function getUserinfo() {
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
}

getUserinfo();