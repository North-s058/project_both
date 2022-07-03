const express =require('express')
const expressJoi = require('@escook/express-joi')
const  {reg_login_schema} = require('../schema/user')
const router = express.Router()
//导入路由处理模块
const routerHandler = require('../router_handler/user.js')

//注册新用户
router.post('/reguser',expressJoi(reg_login_schema),routerHandler.regUser)



//登录
router.post('/login',expressJoi(reg_login_schema),routerHandler.login)
module.exports = router