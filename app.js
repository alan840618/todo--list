const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')

//設定樣板引擎
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')
//設定body-parser，負責解析req.body
app.use(bodyParser.urlencoded({ extended: true }))
//路由設定
app.use(methodOverride('_method'))
app.use(routes)
app.listen(PORT,()=>{
  console.log(`App is listening on http://localhost:${PORT}`)
})