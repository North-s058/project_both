const joi = require("joi");
const username = joi.string().alphanum().min(3).max(10).required();

const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

const id = joi.number().integer().min(1).required();

const nickname = joi.string().required();
const email = joi.string().email().required();
//定义验证注册和验证登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};
//验证 更新用户基本新的 的对象
exports.update_userinfo_scheam = {
  body: {
    id,   
    nickname,
    email,
  },
};
