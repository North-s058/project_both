const joi = require("joi");
const username = joi.string().alphanum().min(3).max(10).required();

const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

//定义验证注册和验证登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};
