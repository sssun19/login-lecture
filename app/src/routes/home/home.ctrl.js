"use strict";

// const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");

const output = {
  home: (req, res) => {
    res.render("home/index");
  },

  login: (req, res) => {
    res.render("home/login");
  },
  register: (req, res) => {
    res.render("home/register");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    console.log(response);
    return res.json(response);
    // const id = req.body.id,
    //   psword = req.body.psword;

    // // const userStorage = new UserStorage();
    // const users = UserStorage.getUsers("id", "psword");

    // const response = {};
    // console.log(id, psword);

    // if (users.id.includes(id)) {
    //   const idx = users.id.indexOf(id);
    //   if (users.psword[idx] === psword) {
    //     response.success = true;
    //     response.msg = "로그인에 성공하였습니다.";
    //     return res.json(response);
    //   }
    // }

    // response.success = false;
    // response.msg = "로그인에 실패하였습니다.";
    // return res.json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    console.log("req.body", req.body);
    const response = await user.register();
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
