"use strict";

class UserStorage {
  static #users = {
    // private하게 은닉화 (#) -> 외부에서 불러올 수 없음
    id: ["seona", "aaa"],
    psword: ["1234", "1234"],
    name: ["박선아", "신지나"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUserInfo(id) {
    const users = this.#users;

    // 사용자가 입력한 값이 users에서 찾아서 index 반환
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users); // => [id, psword, name]
    
    // userInfo는 해당 인덱스의 id, psword, name을 모두 갖게 됨
    const userInfo = userKeys.reduce((newUser, info) => {
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
    return { success : true };
  }

}

module.exports = UserStorage;
