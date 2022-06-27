const express = require ('express')

const app = express()

//导入配置cors中间件
const cors = require('cors')
app.use(cors())

//配置表单数据的中间件 解析www格式
app.use(express.urlencoded({extended:false}))


//导入使用用户模块
const userRouter = require('./router/user')
app.use('/api',userRouter)
app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007');
})