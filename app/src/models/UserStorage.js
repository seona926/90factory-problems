"use strict";

const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);

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
    .readFile("./src/databases/users.json")
    .then((data) => {
      return this.#getUsers(data, isAll, fields);
    })
    .catch((err) => console.error(err));
  }

  static getUserInfo(id) {
    return fs
    .readFile("./src/databases/users.json")
    .then((data) => {
      return this.#getUserInfo(data, id);
    })
    .catch((err) => console.error(err))

  }

  static async save(userInfo) {
    // users가 오브젝트 형태로 데이터 가지게 됨
    const users = await this.getUsers(true); 
    if (users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }

}

module.exports = UserStorage;
