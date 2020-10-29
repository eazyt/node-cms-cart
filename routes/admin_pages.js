const express = require('express')
const router = express.Router()


/*
*GET pages index
*/
router.get('/', (req, res) => {
  res.send('admin area')
})
/*
*GET add page
*/
router.get('/add-page', (req, res) => {
  const title = ''
  const slug = ''
  const content = ''

  res.render('admin/add_page', {
    title: title,
    slug: slug,
    content: content
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