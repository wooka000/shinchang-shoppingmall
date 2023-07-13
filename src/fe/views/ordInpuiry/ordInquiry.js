// 회원 정보 api 호출해서 정보 가져온 후 프사, 이름, 이메일, 전화번호, 회원등급(role) 렌더링
// api 명세서 10번째 줄 api 쓰면 되는듯? 
fetch('api/user/my', {
  method: 'GET',
  headers: {
    Authorization: localStorage.getItem(token)
  }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(console.log);