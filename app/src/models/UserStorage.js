"use strict";

class UserStorage {
  static #users = {
    id: ["woorimIT", "나개발", "김팀장", "dev_s"],
    psword: ["1234", "1234", "123456", "asdf"],
    nams: ["우리밋", "나개발", "김팀장", "썬"],
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
} //class 안에 변수 할당할 때는 const 같은 명령어 필요 없음

module.exports = UserStorage;
