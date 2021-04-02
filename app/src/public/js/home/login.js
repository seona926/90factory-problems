"use strict";

// login.ejs와 연결된, front 단에서 동작하는 js 파일

const id = document.querySelector("#id"),
    psword = document.querySelector("#psword"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id : id.value,
        psword : psword.value
    };

    
    // fetch()는 API를 호출함
    //어떤 경로로 주고받을지 명시. 해당 경로에 API가 만들어져있어야함
    fetch("/login", {
        method : "POST",
        headers: {
            // json 타입으로 보내겠다는 뜻
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("로그인 중 에러 발생");
    })
    
}