const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')
//新增todo頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
//將新增的todo傳入資料庫，並將顯示頁面導回首頁
router.post('/', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//瀏覽特定todo頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)//從資料庫找出資料
    .lean()
    .then((todo) => res.render('detail', { todo }))//把資料傳給前端樣板
    .catch(error => console.log(error))
})
//瀏覽todo修改頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
//將修改後的todo傳入資料庫
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.deleteOne())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
