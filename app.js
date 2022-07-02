const express = require("express");

const app = express();

//导入配置cors中间件
const cors = require("cors");
app.use(cors());

//配置表单数据的中间件 解析www格式
app.use(express.urlencoded({ extended: false }));

//在路路由之前,封装res.cc函数
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

//导入使用用户模块
const userRouter = require("./router/user");
const Joi = require("@hapi/joi");
app.use("/api", userRouter);

// 定义错误级别的中间件
app.use((err,req,res,next)=>{
  // 验证导致的错误
  if(err instanceof Joi.ValidationError) res.cc(err)
  // 未知错误
  res.cc(err)
})
app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
