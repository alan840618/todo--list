const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
//資料庫連線設定
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error',()=>{
  console.log('mongodb error!')
})
db.once('open',()=>{
  console.log('mongodb connected!')
})
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')
//路由設定
app.get('/',(req,res)=>{
  res.render('index')
})
app.listen(3000,()=>{
  console.log('App is listening on localhost:3000')
})