const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // res.send('IT WORKS')
  res.render('index', {
    title: 'Home1'
  })
})

// Exports
module.exports = router

// module.exports = (req, res) => {
//   // res.send('IT WORKS')
//   res.render('index', {
//     title: 'Home1'
//   })
// }
// }