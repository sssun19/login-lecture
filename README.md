# login-lecture

백엔드 맛보기 강의
Youtube woorimIT 강좌를 토대로 공부\n
(https://youtube.com/playlist?list=PLSK4WsJ8JS4cQ-niGNum4bkK_THHOizTs&si=qv7viRCTVjehhJax)

🙌 Node.js 로 서버 개발을 해보자!

express vs http

//express 로 서버 개발
const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", (req, res)=> {
res.send('루트 경로입니다.');
});

app.listen(PORT, ()=> {
console.log(`express를 이용한 port 번호 ${PORT} 번 서버입니다.`);
});

//http 로 서버 개발
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

💁🏻‍♀️ http를 이용하여 서버를 개발하면 charset도 따로 처리해 주어야 하고, app.get("/") 처럼 바로 경로를 가져오지 못해서 url 파싱을 해주어야 하는 번거로움
💁🏻‍♀️ 후처리 과정이 많다보니 코드가 길어질 수밖에 없어서 가독성이 좋지 못함

느낀점 : http, express 두 방법 모두 실습해보니 express 모듈을 사용하여 서버를 개발하는 것이 얼마나 편리한지 알게 되었다.
대신 궁금한 점이 생겼는데 그렇다면 현재 서버 개발은 모두 express 모듈을 사용하는지? 아니라면 http 내장 라이브러리를 사용해야하는 경우도 있는 것인지?
추가로 공부하면 좋을 것 같다.

🙌 app setting (ejs)

app.set("views", "./views"); //views 디렉토리 위치 세팅
app.set("view engine", "ejs"); //view engine 으로 ejs 사용

app.get("/", (req, res)=>{
res.render("home/index"); //views>home>index 파일 찾아
});

💁🏻‍♀️ ejs란?
NodeJS와 Express에서 많이 사용하고 있는 템플릿 엔진
javascript를 포함한 html 파일을 편리하게 작성하기 위함

🙌 Node.js 에서 mvc 디자인 적용하기
여러 갈래로 나누어진 파일들을 Model View Controller 세가지로 분리해 관리하는 디자인 기법
mvc 패턴의 장점 : 1. 중복된 코드를 줄일 수 있어 코드의 길이가 짧아진다. (가독성 향상) 2. 의존성을 낮추어 유지보수하기 편해진다. 3. 개발 시간이 단축된다.

Router 를 사용해보자.

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
