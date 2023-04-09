const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
router.get('/', (req, res) => {
  Todo.find()//取出 Todo model 裡的所有資料
    .lean()// 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})
module.exports = router