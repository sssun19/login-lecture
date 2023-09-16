"use strict";

const fs = require("fs").promises;

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

  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./app/src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch(console.error);
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

  static getUserInfo(id) {
    return fs
      .readFile("./app/src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    // const users = this.#users;
    // users.id.push(userInfo.id);
    // users.name.push(userInfo.name);
    // users.psword.push(userInfo.psword);
    // return { success: true };

    const users = await this.getUsers(true);
    if (users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);

    //데이터 추가
    fs.writeFile("./app/src/databases/users.json", JSON.stringify(users));

    return { success: true };
  }
} //class 안에 변수 할당할 때는 const 같은 명령어 필요 없음

module.exports = UserStorage;
