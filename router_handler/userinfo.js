//导入数据库
const db = require("../db/index");
//导入处理密码的模块
const bcrypt = require("bcryptjs");

exports.getUserInfo = (req, res) => {
  const sql = `select id, username, nickname, email, user_pic from ev_users where id =?`;

  //调用db,query()执行语句
  db.query(sql, req.auth.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("获取用户信息失败");
    res.send({
      status: 0,
      message: "获取数据成功",
      data: results[0],
    });
  });
};
exports.updateUserInfo = (req, res) => {
  const sql = `update ev_users set ? where id=?`;
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("修改用户信息失败");
    return res.cc("修改用户信息成功");
  });
};
//更新密码的处理函数
exports.updatePassword = (req, res) => {
  const sql = `select * from ev_users where id=?`;
  db.query(sql, req.auth.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("用户不存在!");
    //判断密码是否正确
    let conpareReault = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!conpareReault) return res.cc("原密码错误!");
    //定义更新密码的sql
    const sql = `update ev_users set password =? where id = ?`;

    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    db.query(sql, [newPwd, req.auth.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("更新密码失败");
      res.cc("更新密码成功");
    });
  });
};
//更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
  const sql = "update ev_users set user_pic = ? where id=?";
  db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("更新头像失败");
    return res.cc("更新头像成功!", 0);
  });
};
