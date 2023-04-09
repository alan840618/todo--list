//引用express及express路由器
const express = require('express')
const router = express.Router()
//準備引入路由模組
const home = require('./modules/home')
const todos = require('./modules/todos')
router.use('/',home)
router.use('/todos',todos)
//匯出路由器
module.exports = router