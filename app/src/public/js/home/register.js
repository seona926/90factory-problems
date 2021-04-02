"use strict";

// register.ejs와 연결된, front 단에서 동작하는 js 파일

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"),
    confirmPsword = document.querySelector("#confirm-psword"),
    registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if (!id.value) return alert("아이디를 입력해주십시오.")
    if (psword.value !== confirmPsword.value) 
    return alert("비밀번호가 일치하지 않습니다.");

    const req = {
        id : id.value,
        name : name.value,
        psword : psword.value,
    };
    
    // fetch()는 API를 호출함
    //어떤 경로로 주고받을지 명시. 해당 경로에 API가 만들어져있어야함
    fetch("/register", {
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
            location.href = "/login"; // 성공하면 로그인페이지로 이동
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("회원가입 중 에러 발생");
    })
    
}