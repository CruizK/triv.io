const router = require('express').Router();

router.use('/questions', require('./questions'));
router.use('/categories', require('./categories'));

router.get('/', (req, res, next) => {
  res.send("test");
})




module.exports = router;