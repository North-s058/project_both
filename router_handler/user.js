const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req,res)=>{
    const userinfo = req.body//获取客户端提交的信息
//对表单中的数据进行合法校验
    // if(!userinfo.username || !userinfo.password) {
    //     return res.send({satus:1,message:'用户名或密码不合法!'})
    // }   
    //定义sql语句
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err){
            // return res.send({
            //     status:1,
            //     message:err.message
            // })
            return res.cc(err)
        }
        if(results.length > 0){
            // return res.send({
            //     status:1,
            //     message:'用户名被占用'
            // })
            return res.cc('用户名被占用')

        }
        //todo
        //调用crypt对密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        const sql = 'insert into ev_users set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            // if(err) return res.send({status:1,message:err.message})
            // //判断影响行数是否为1
            if(err) return res.cc(err)
            if(results.affectedRows !== 1)return res.cc('注册用户失败')
            res.send({
                status:0,
                message:'注册成功'
            })
        })
    })
   
}
exports.login = (req,res)=>{
    //接受表单数据
    const userinfo =req.body
    //定义sql语句
    const sql =`select * from ev_users where username = ?`
    //执行sql语句,根据用户名查询用户信息
    db.query(sql,userinfo.username,(err,results)=>{
        //执行sql失败
        if(err) return res.cc(err)
        //执行成功,但获取到的数据条数不等于一
        if(results.length !== 1) return res.cc('登录失败')

        //判断密码是否正确
        const compareResults = bcrypt.compareSync(userinfo.password,results[0].password)
    
        if(!compareResults) return res.cc('登录失败')
        const user = {...results[0],password:'',user_pic:''}
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
        //调用send来响应给客户端
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer ' + tokenStr,
        })
    })



}