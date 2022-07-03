const express = require("express");
const router = express.Router();

//挂载路由
//导入路由处理函数
const userinfo_handler = require("../router_handler/userinfo");
//导入验证的 中间件 
const expressJoi = require("@escook/express-joi");
const { update_userinfo_scheam } = require("../schema/user");
router.get("/userinfo", userinfo_handler.getUserInfo);

//更新用户的基本信息
router.post("/userinfo",expressJoi(update_userinfo_scheam), userinfo_handler.updateUserInfo);

//重置密码的路由
router.post('/updatepwd',userinfo_handler.updatePassword)
module.exports = router;
