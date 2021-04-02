"use strict"

// app.js는 노드 서버의 기본 설정이 모여있는 파일
// 실행 파일들은 bin 안에있음
// src 안에는 MVC 패턴대로 폴더를 분리했음


// 모듈
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`))
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended : true }));

app.use("/", home); // use -> 미들웨어 등록해주는 메서드


module.exports = app;
