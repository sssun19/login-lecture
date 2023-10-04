# login-lecture


<br/>
🙌 Node.js 로 서버 개발을 해보자!
<br/>
<br/>
<h2>express vs http</h2>
<br/>
//express 로 서버 개발<br/><br/>
const express = require('express');<br/>
const app = express();<br/>
const PORT = 3000;<br/>
<br/><br/>
app.get("/", (req, res)=> {<br/>
res.send('루트 경로입니다.');<br/>
});<br/>
<br/>
app.listen(PORT, ()=> {<br/>
console.log(`express를 이용한 port 번호 ${PORT} 번 서버입니다.`);<br/>
});<br/>
<br/><br/>
//http 로 서버 개발<br/><br/>
const http = require('http');<br/>
const PORT = 3001;<br/>
const app = http.createServer((req, res)=>{<br/>
res.writeHead(200, {<br/>
"Content-Type" : "text/html; charset=utf-8"});<br/>
<br/><br/>
console.log(req.url);<br/>
const \_url = req.url;<br/>
<br/><br/>
if (\_url === "/") {<br/>
  res.end('루트 경로입니다.');<br/>
} else if (\_url === "/login") {<br/>
    res.end('로그인 화면입니다.');<br/>
  }<br/>
});<br/>
<br/><br/>
app.listen(PORT, ()=>{<br/>
  console.log(`http를 이용한 port 번호 ${PORT} 번 서버입니다.`);<br/>
});<br/>
<br/><br/>
💁🏻‍♀️ http를 이용하여 서버를 개발하면 charset도 따로 처리해 주어야 하고, app.get("/") 처럼 바로 경로를 가져오지 못해서 url 파싱을 해주어야 하는 번거로움<br/>
💁🏻‍♀️ 후처리 과정이 많다보니 코드가 길어질 수밖에 없어서 가독성이 좋지 못함<br/>
<br/><br/>
<br/>
<h2>🙌 app setting (ejs)</h2>
<br/>
app.set("views", "./views"); //views 디렉토리 위치 세팅<br/>
app.set("view engine", "ejs"); //view engine 으로 ejs 사용<br/>
<br/>
app.get("/", (req, res)=>{<br/>
  res.render("home/index"); //views>home>index 파일 찾아<br/>
});<br/>
<br/>
💁🏻‍♀️ ejs란?<br/>
NodeJS와 Express에서 많이 사용하고 있는 템플릿 엔진<br/>
javascript를 포함한 html 파일을 편리하게 작성하기 위함<br/>
<br/>
🙌 Node.js 에서 mvc 디자인 적용하기<br/>
여러 갈래로 나누어진 파일들을 Model View Controller 세가지로 분리해 관리하는 디자인 기법<br/>
mvc 패턴의 장점<br/>
1. 중복된 코드를 줄일 수 있어 코드의 길이가 짧아진다. (가독성 향상)<br/>
2. 의존성을 낮추어 유지보수하기 편해진다.<br/>
3. 개발 시간이 단축된다.<br/>
<br/>
Router 를 사용해보자.<br/>
<br/>
//index.js<br/>
"use strict";<br/>
const express = require('express');<br/>
const router = express.Router();<br/>
<br/><br/>
const ctrl = require('./home.ctrl'); //controller 분리<br/>
router.get("/", ctrl.home);<br/>
router.get("/login", ctrl.login);<br/>
<br/>
module.exports = router;<br/>
<br/><br/>
//home.ctrl.js<br/>
"use strict";<br/>
<br/>
const home = (req, res)=>{<br/>
  res.render("home/index");<br/>
};<br/>
<br/>
const login = (req, res)=>{<br/>
  res.render("home/login");<br/>
};<br/>
<br/>
module.exports = {<br/>
  home,<br/>
  login<br/>
};<br/>
<br/>
//app.js<br/>
const home = require("./routes/home"); //module.exports 로 내보낸 파일들을 require 해오기<br/>
<br/>
app.use("/", home); // use : 미들 웨어를 등록해주는 메서드<br/>
