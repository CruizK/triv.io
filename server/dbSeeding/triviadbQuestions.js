const axios = require('axios');
const Category = require('../models/Category');
const Question = require('../models/Question');


const token = "be8c76fedc4d795c0a7ef9c87b17285ff7f373bbfbca79e8594f8128c3595ad6";



async function GetQuestions() {
  try {
    const categories = await Category.GetAllCategories();
    const res = await axios.get('https://opentdb.com/api.php?amount=50&encode=url3986&token='+token);

    let questions = res.data.results;

    questions = questions.map(question => {
      let parsedQuestion = {
        text: decodeURIComponent(question.question),
        correct_answer:decodeURIComponent(question.correct_answer)
      }
      
      for(let i = 0; i < question.incorrect_answers.length; i++) {
        parsedQuestion['incorrect_answer_'+(i+1)] = decodeURIComponent(question.incorrect_answers[i]);
      }
      
      for(let i = 0; i < categories.length; i++) {
        if(categories[i].name == decodeURIComponent(question.category)) {
          parsedQuestion.category_id = categories[i].id;
        }
      }

      return parsedQuestion;
    })
    const ids = await Question.CreateQuestion(questions);
    console.log(ids);

    process.exit();
  }
  catch(e) {
    throw e;
  }
}


GetQuestions()



