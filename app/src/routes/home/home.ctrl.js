"use strict";

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
  }
};

const process = {
  login: (req, res) => {
    // user는 사용자가 입력한 정보를 갖고있는 인스턴스
    const user = new User(req.body);

    // 사용자 정보를 갖고 login 메서드를 수행
    const response = user.login();
    return res.json(response);
  },

  register: (req, res) => {
    const user = new User(req.body);
    const response = user.register();
    return res.json(response);
  }
};

module.exports = {
  output,
  process,
};
