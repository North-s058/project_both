const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.regUser = (req,res)=>{
    const userinfo = req.body//获取客户端提交的信息
//对表单中的数据进行合法校验
    if(!userinfo.username || !userinfo.password) {
        return res.send({satus:1,message:'用户名或密码不合法!'})
    }   
    //定义sql语句
    const sqlStr = 'select * from ev_users where username = ?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err){
            return res.send({
                status:1,
                message:err.message
            })
        }
        if(results.length > 0){
            return res.send({
                status:1,
                message:'用户名被占用'
            })

        }
        //todo
        //调用crypt对密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        const sql = 'insert into ev_users set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err) return res.send({status:1,message:err.message})
            //判断影响行数是否为1
            if(results.affectedRows !== 1)return res.send({status:1,message:'注册用户失败'})
            res.send({
                status:0,
                message:'注册成功'
            })
        })
    })
   
}
exports.login = (req,res)=>{
    res.send('登录成功')
}