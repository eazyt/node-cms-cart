const express = require('express')
const router = express.Router()
const {
  check,
  validationResult
} = require('express-validator');
const Page = require('../models/page')




router.get('/', (req, res) => {
  Page.find({})
    .sort({
      sorting: 1
    })
    .exec((err, pages) => {
      console.log(pages)
      res.render('admin/pages', {
        pages: pages
        // 'title': title,
      //   slug: slug,
      //   content: content
      })

    })
    // res.send('admin area')
          // res.render('index', {
          //   title: 'Admin Panel'
          // })
})

router.get('/add-page', (req, res) => {
  let title = '';
  let slug = '';
  let content = '';

  res.render('admin/add_page', {
    title: title,
    slug: slug,
    content: content
  })
})

router.post('/add-page', [
  // console.log(req.body)
  check('title', 'Title must be 3+ character long')
  .exists()
  .isLength({
    min: 2
  }),
  check('slug', 'Slug must be 3+ character long')
  .exists()
  .isLength({
    min: 2
  }),
  check('content', 'Content must be 3+ character long')
  .exists()
  .isLength({
    min: 2
  }),
], (req, res) => {
  let title = req.body.title;
  let slug = req.body.slug;
  let content = req.body.content;
  console.log(req.body)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    // return res.status(400).json({ errors: errors.array() });
    const alert = errors.array()
    res.render('admin/add_page', {
      title: title,
      slug: slug,
      content: content,
      alert: alert
    })
  }

  Page.findOne({
    slug: slug
  }, function (err, page) {
    console.log('findOne Post')
    console.log(page)
    if (page) {
      req.flash('danger', 'Page slug exists, choose another.');
      // req.flash('info', 'Flash is back!')
      res.render('admin/add_page', {
        title: title,
        slug: slug,
        content: content
      });
    } else {
      var page = new Page({
        title: title,
        slug: slug,
        content: content,
        sorting: 100
      });

      page.save(function (err) {
        if (err)
          return console.log(err);

        Page.find({}).sort({
          sorting: 1
        }).exec(function (err, pages) {
          if (err) {
            console.log(err);
          } else {
            req.app.locals.pages = pages;
          }
        });

        // req.flash('success', 'Page added!');
        res.redirect('/admin/pages');
      });
    }
  });


  router.post('/reorder-pages', (req, res) => {
    let ids = req.body['id[]']
    let count = 0
    for (let i = 0; i < ids.length; i++) {
      let id = ids[i]
      count++

      ((count) => {
        Page.findById(id, (err, page) => {
          page.sorting = countpage.save((err) => {
            if (err) {
              return console.log(err)
            }
          })
        })
      })(count)
    }
  })


})

router.get('/edit-page/:slug', (req, res) => {
  Page.findOne({
    slug: req.params.slug
  }, (err, page) => {
    console.log('findOne Post')
    console.log(page)
    // if (page) {
    //   req.flash('danger', 'Page slug exists, choose another.');
    //   // req.flash('info', 'Flash is back!')
    //   res.render('admin/add_page', {
    //     title: title,
    //     slug: slug,
    //     content: content
    //   });
    //   // console.log(page.title)
    // }
    if (err) {
      return console.log(err)
    } else {
      res.render('admin/edit_page', {
        title: page.title,
        slug: page.slug,
        content: page.content,
        id: page._id
      })
    }
  }).catch((err) =>{
    console.log('There was an error', err);
  });

})

router.post('/edit-page/:slug')
// Exports
module.exports = router