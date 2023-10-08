# login-lecture


<br/>
🙌 Node.js 로 서버 개발을 해보자!
<br/>
<br/>
<h2>express vs http</h2>
<br/>

- express 로 서버 개발

```
const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", (req, res)=> {
  res.send('루트 경로입니다.');
});


app.listen(PORT, ()=> {
  console.log(`express를 이용한 port 번호 ${PORT} 번 서버입니다.`);
});
```


- http 로 서버 개발

```
const http = require('http');
const PORT = 3001;
const app = http.createServer((req, res)=>{
  res.writeHead(200, {
  "Content-Type" : "text/html; charset=utf-8"});

  console.log(req.url);
  const \_url = req.url;

  if (\_url === "/") {
    res.end('루트 경로입니다.');
  } else if (\_url === "/login") {
      res.end('로그인 화면입니다.');
    }
 });

app.listen(PORT, ()=>{
  console.log(`http를 이용한 port 번호 ${PORT} 번 서버입니다.`);
});

```

💁🏻‍♀️ http를 이용하여 서버를 개발하면 charset도 따로 처리해 주어야 하고, app.get("/") 처럼 바로 경로를 가져오지 못해서 url 파싱을 해주어야 하는 번거로움<br/>
💁🏻‍♀️ 후처리 과정이 많다보니 코드가 길어질 수밖에 없어서 가독성이 좋지 못함<br/>
<br/><br/>
<br/>
<h2>🙌 app setting</h2>

```
app.set("views", "./views"); //views 디렉토리 위치 세팅
app.set("view engine", "ejs"); //view engine 으로 ejs 사용

app.get("/", (req, res)=>{
  res.render("home/index"); //views>home>index 파일 찾아
});
```

💁🏻‍♀️ ejs란?<br/>
NodeJS와 Express에서 많이 사용하고 있는 템플릿 엔진<br/>
javascript를 포함한 html 파일을 편리하게 작성하기 위함

app.set으로 views 디렉토리 위치를 ./views 로 지정했기 때문에 home/index 만 설정해도 알아서 views 파일 하위의 폴더를 조회함

🙌 Node.js 에서 mvc 디자인 적용하기<br/>
여러 갈래로 나누어진 파일들을 Model View Controller 세가지로 분리해 관리하는 디자인 기법<br/>
mvc 패턴의 장점<br/>
1. 중복된 코드를 줄일 수 있어 코드의 길이가 짧아진다. (가독성 향상)<br/>
2. 의존성을 낮추어 유지보수하기 편해진다.<br/>
3. 개발 시간이 단축된다.<br/>
<br/>
Router 를 사용해보자.<br/>

```
//index.js
"use strict";
const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl'); //controller 분리
router.get("/", ctrl.home);
router.get("/login", ctrl.login);

module.exports = router;

//home.ctrl.js
"use strict";

const home = (req, res)=>{
  res.render("home/index");
};

const login = (req, res)=>{
  res.render("home/login");
};

module.exports = {
  home,
  login
};

//app.js
const home = require("./routes/home"); //module.exports 로 내보낸 파일들을 require 해오기

app.use("/", home); // use : 미들 웨어를 등록해주는 메서드
```
💁🏻‍♀️ router.get 메서드를 이용해 루트에 맞는 컨트롤러 찾아갈 수 있도록 분리<br/>
home.ctrl.js 파일은 루트 경로 home과 login을 담고 있고 render 메서드로 해당 ejs 파일 찾아가는 로직 구현


## login 로직
- login.ejs
```
<head>
  <script src="/js/home/login.js" defer></script>
..생략..
</head>
<body>
  ...
  <input type="text" id="id"/>
  <input type="password" id="psword"/>
  <p id="button"> login </p>
  <p class="message">
    Not registered? <a href="/register"> Create an account </a></p>
  ...
```
💁🏻‍♀️  defer : 페이지가 모두 로드된 후에 해당 외부 스크립트가 실행됨

id 속성으로 login.js 에 데이터값 넘겨주기

a href 링크로 로그인 화면에서 바로 register.ejs 로 이동

- login.js
```
const id = document.querySelector("#id"),
  psword = document.querySelector("#psword"),
  loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login); //loginBtn 버튼 click 시 login 이벤트 발생

function login() {
  const req = {
    id : id.value,
    psword : psword.value,
  };
  console.log(JSON.stringify(req));

  fetch("/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(req),
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.success) {
      location.href="/";
    } else {
      alert(res.msg);
    }
  })
  .catch((err) => { console.error(new Error("로그인 중 에러 발생"));
  });
}
```
💁🏻‍♀️ login 화면에서 입력 받은 id, psword 값을 담은 req 객체 생성

fetch 메서드로 데이터 전송. POST 방식, headers 에는 json 타입으로 데이터를 전송할 수 있도록 설정.

body에 실제 전송할 데이터 값을 담기 (JSON.stringfigy() 메서드로 req 객체를 json 데이터 타입으로 변환해서 보냄)

서버에서 응답이 오면 res로 받아 json 타입으로 변환 (res.json())

서버에서 success 응답을 주었을 경우 페이지 redirect 하여 "/" 루트로 이동, 응답 실패인 경우 오류 메세지 알림 창으로 표시

응답이 오지 않은 경우(전송 에러) .catch 구문으로 들어가 콘솔에 에러 메세지 출력

- POST 방식으로 로그인 요청을 보낸 경우
```
//index.js
router.post("/login", ctrl.process.login);

//home.ctrl.js
...
const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    console.log("req.body: ", req.body);
    const response = await user.login();
    console.log(response);
    return res.json(response);
  }
};
```
💁🏻‍♀️ async, await 란?

- node.js에서 비동기 통신을 구현하는 방법으로 async와 await 가 있다.
- async 함수는 항상 Promise 객체를 반환하며, await 키워드로 비동기 작업을 처리할 수 있다.
- await 키워드가 붙은 메서드는 async 함수 내에서만 사용할 수 있으며, Promise 가 반환될 때까지 코드 실행을 일시 중지한다.

```
//User.js

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body= body;
  }

  async login() {
    const client = this.body;
    try {
      const user = await UserStorage.getUserInfo(client.id);
  
    if (user) {
      if (user.id === client.id && user.psword === client.psword) {
        return {success: true};
        }
        return {success: false, msg: "비밀번호가 틀렸습니다."};
      }
      return {success: false, msg: "존재하지 않는 아이디입니다."};
    } catch (err) {
      return {success: false, msg: err};
    }
  }
}
```

- UserStorage.js
```
const db = require("../config/db");

static getUserInfo(id) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users where id = ?;";
    db.query(query, [id], (err, data) => {
      if (err) reject(`${err}`);
      resolve(data[0]);
    });
  });
}
```
> DB 에 query문을 전송할 때는 일반적으로 비동기 통신으로 구현한다. query 결과를 기다렸다가 성공 또는 실패 응답을 받은 뒤 처리해야 하기 때문.<br/>
> Promise 객체는 query 전송이 성공했을 때 resolve 를, 실패했을 때 reject 를 호출한다.<br/>
> db.query 메서드 파라미터로 쿼리문, id 데이터값, 콜백 함수를 넘겨 준다. <br/>
> query 전송이 성공하면 Promise 객체가 반환하는 값 중 인덱스 0번째 (사용자 정보) 를 반환한다.

- mysql 연동 방법 (db.js)
```
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST, //dotenv 암호화
  user: process.env.DB_USER,
  ...
});

db.connect();

module.exports = db;
```

💁🏻‍♀️ .env ?

- dotenv 모듈을 이용해 사용자의 아이디/비밀번호나 개인정보를 암호화 할 수 있다.
```
PORT = 3000;

DB_HOST = "...";
DB_USER = "...";
...
```
