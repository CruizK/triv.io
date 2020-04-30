const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send("test");
})

router.use('/questions', require('./questions'));
router.use('/categories', require('./categories'));


module.exports = router;