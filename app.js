const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')
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
//設定樣板引擎
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')
//設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))
//路由設定
app.get('/',(req,res)=>{
  Todo.find()//取出 Todo model 裡的所有資料
      .lean()// 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
      .then(todos => res.render('index',{todos}))// 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
      .catch(error => console.error(error))
  
})
//新增todo頁面
app.get('/todos/new',(req,res)=>{
  return res.render('new')
})
//將新增的todo傳入資料庫，並將顯示頁面導回首頁
app.post('/todos',(req,res)=>{
  const name = req.body.name
  return Todo.create({name})
     .then(()=>res.redirect('/'))
     .catch(error=>console.log(error))
})
//瀏覽特定todo頁面
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)//從資料庫找出資料
    .lean()
    .then((todo) => res.render('detail', { todo }))//把資料傳給前端樣板
    .catch(error => console.log(error))
})
//瀏覽todo修改頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
//將修改後的todo傳入資料庫
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.deleteOne())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
app.listen(3000,()=>{
  console.log('App is listening on localhost:3000')
})