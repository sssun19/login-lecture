"use strict";

class UserStorage {
  static #users = {
    id: ["woorimIT", "나개발", "김팀장", "dev_s"],
    psword: ["1234", "1234", "123456", "asdf"],
    name: ["우리밋", "나개발", "김팀장", "썬"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      //   console.log(newUsers, field);
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, psword, name] users의 key값만 모아 놓은 배열
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static save(userInfo) {
    const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
    return { success: true };
  }
} //class 안에 변수 할당할 때는 const 같은 명령어 필요 없음

module.exports = UserStorage;
