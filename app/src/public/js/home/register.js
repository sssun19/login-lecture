"use strict";

const id = document.querySelector("#id"),
  name = document.querySelector("#name"),
  psword = document.querySelector("#psword"),
  confirmPsword = document.querySelector("#confirm-psword"),
  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
  if (!id.value) return alert("아이디를 입력해주십시오.");
  if (psword.value !== confirmPsword.value)
    return alert(
      `비밀번호가 일치하지 않습니다. ${psword.value} / ${confirmPsword.value}`
    );

  const req = {
    id: id.value,
    name: name.value,
    psword: psword.value,
  };
  console.log(req); //object type
  console.log(JSON.stringify(req)); //json type

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/login";
        console.log("회원가입 성공");
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("회원가입 중 에러 발생");
    });
}
