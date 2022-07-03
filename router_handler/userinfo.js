//导入数据库
const db =require('../db/index')



exports.getUserInfo = (req, res) => {
    const sql =`select id, username, nickname, email, user_pic from ev_users where id =?`
    
    //调用db,query()执行语句
    db.query(sql,req.auth.id,(err,results)=>{
        if(err)return res.cc(err)
        if(results.length !== 1)return res.cc('获取用户信息失败')
        res.send({
            status:0,
            message:'获取数据成功',
            data:results[0]
        })
    })


}
exports.updateUserInfo = (req,res)=>{
    const sql = `update ev_users set ? where id=?`
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        if(err) return res.cc(err)
        if(results.affectedRows !== 1)return res.cc('修改用户信息失败')
        return res.cc('修改用户信息成功')
    })
}
exports.updatePassword = (req,res)=>{
    res.send('ok')
}