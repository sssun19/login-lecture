"use strict";

const id = document.querySelector("#id"),
  pwsord = document.querySelector("#psword"),
  loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };
  console.log(req); //object type
  console.log(JSON.stringify(req)); //json type

  fetch("/login", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
}
