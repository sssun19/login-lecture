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
