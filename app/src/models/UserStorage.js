"use strict";
//Notion -> login_lecture/Node.js 참조

const db = require("../config/db");

class UserStorage {
  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;

    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, psword, name] users의 key값만 모아 놓은 배열
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    console.log("------!!", userInfo);
    return userInfo;
  }

  static getUsers(isAll, ...fields) {}

  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users where id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "insert into users (id, name, psword) values (?, ?, ?);";
      db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
