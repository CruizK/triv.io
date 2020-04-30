import React, { useState, useEffect } from 'react'
import shuffle from 'shuffle-array'
import styles from './play.module.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Answer from '../components/Answer/Answer'

import { GetQuestion } from '../lib/questions'


let questions = [];
let questionIndex = -1;
export default function Play() {

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  const nextQuestion = async () => {
    try {
      setAnswer(null);
      const questionData = (await GetQuestion()).data;
  
      let answers = [questionData.correct_answer, questionData.incorrect_answer_1];
  
      if(questionData.incorrect_answer_2) answers.push(questionData.incorrect_answer_2);
      if(questionData.incorrect_answer_3) answers.push(questionData.incorrect_answer_3);

      shuffle(answers);
      questionData.answers = answers;

      questions.push(questionData);
      questionIndex++;

      setQuestion(questions[questionIndex]);
    }
    catch(e) {
      console.log(e);
    }
  }

  const handleAnswerClick = answer => {
    setAnswer(answer);

    setTimeout(nextQuestion, 3500);
  }

  const mapAnswers = () => {
    return question.answers.map(currAnswer => {
      let className =''

      if(answer && currAnswer == question.correct_answer) className = styles.correct;
      if(answer && currAnswer != question.correct_answer) className = styles.incorrect;

      return <Answer className={className} text={currAnswer} onClick={handleAnswerClick}/>
    })
  }

  useEffect(() => {
    nextQuestion();
  }, [])

  return (
    <div>
      <Header />
      {question ?
      <div className={styles.play}>

        <div className={styles.questionText}>
          {question.text}
        </div>
        <div className={styles.answers}>
          {mapAnswers()}
        </div>
      </div>
      : null}

      <Footer />
    </div>
  )
}