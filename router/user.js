const express =require('express')
const router = express.Router()
//导入路由处理模块
const routerHandler = require('../router_handler/user.js')

//注册新用户
router.post('/reguser',routerHandler.regUser)



//登录
router.post('/login',routerHandler.login)
module.exports = router