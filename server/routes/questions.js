const router = require('express').Router();
const Question = require('../models/Question');

router.get('/', (req, res, next) => {

})

router.get('/random', async (req, res, next) => {

  try {
    let question = await Question.GetRandomQuestion();

    return res.json(question[0]);
  }
  catch(e) {
    return next(e);
  }
})

router.post('/', async (req, res, next) => {
  let questionData = {
    text: req.body.text,
    category_id: req.body.category,
    correct_answer: req.body.correct,
    incorrect_answer_1: req.body.answers[0],
    incorrect_answer_2: req.body.answers[1],
    incorrect_answer_3: req.body.answers[2],
  }

  try {
    const id = await Question.CreateQuestion(questionData);

    return res.json(id);
  }
  catch(e) {
    return next(e);
  }
})



module.exports = router;