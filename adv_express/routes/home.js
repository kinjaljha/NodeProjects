const express = require('express');

const router = express.Router();

// router.set('view engine', 'pug');
// router.set('views', './views');

router.get('/', (req, res) => {
  //   res.render('index', { title: 'My Express App', message: 'Hello' });
  res.send('hello world');
});

module.exports = router;
