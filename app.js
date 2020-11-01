require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
// const expressValidator = require('express-validator')
// connect to DB
// mongoose.connect(process.env.MONGO_URL, {
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useNewUrlParser: true
// })
// .then(() => {
//   console.log('MongoDb connected')
// })
// .catch(err => {
//   console.log(err)
// })

mongoose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})
// initialize app
const app = express()
// View engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Set public folder
app.use(express.static(path.join(__dirname, 'public')))

// app.locals.error = null

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash())
// Set routes
const pages = require('./routes/pages')
const adminPages = require('./routes/admin_pages')


app.use('/', pages)
app.use('/admin/pages', adminPages)

// start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}`)
})