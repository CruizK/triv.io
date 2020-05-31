import React, { useState, useEffect } from 'react'
import shuffle from 'shuffle-array'
import styles from './play.module.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Answer from '../components/Answer/Answer'
import Timer  from '../components/Timer/Timer'
import QuestionCounter from '../components/QuestionCounter/QuestionCounter'
import QuestionDisplay from '../components/QuestionDisplay/QuestionDisplay'

import { GetQuestion } from '../lib/questions'

class Play extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answer: null,
      totalQuestions: 0,
      amountCorrect: 0,
      time: 30,
      timerPlayState: 'running',
      animationClassName: ''
    }

    this.questions = [];
    this.questionIndex = -1;

    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.updateTimer = this.updateTimer.bind(this)
  }

  componentDidMount() {
    this.nextQuestion();
    setTimeout(this.updateTimer, 1000);
  }

  

  updateTimer() {
    if(this.state.answer == null && this.state.time > 0) {
      this.setState({time: this.state.time - 1});  
    }
    if(this.state.time <= 0 && this.state.answer == null) {
      this.handleAnswerClick('');
    }

    setTimeout(this.updateTimer, 1000)
  }

  async nextQuestion() {
    try {
      this.setState({answer: null, timerPlayState: 'restart'});
      const questionData = (await GetQuestion()).data;
      let answers = [questionData.correct_answer, questionData.incorrect_answer_1];
  
      if(questionData.incorrect_answer_2) answers.push(questionData.incorrect_answer_2);
      if(questionData.incorrect_answer_3) answers.push(questionData.incorrect_answer_3);

      shuffle(answers);
      questionData.answers = answers;

      this.questions.push(questionData);
      this.questionIndex++;
      console.log(questionData);
      this.setState({
        question: this.questions[this.questionIndex],
        timerPlayState: 'running',
        time: 30
      })

      this.setState({animationClassName: styles.leftToCenter})
      setTimeout(() => {
        this.setState({animationClassName: ''})
      }, 2000)
    }
    catch(e) {
      console.error(e);
    }
  }

  handleAnswerClick(answer) {
    let newAmountCorrect = this.state.amountCorrect;
    if(answer == this.state.question.correct_answer) {
      newAmountCorrect++;
    }

    
    
    this.setState({
      answer,
      totalQuestions: this.state.totalQuestions + 1,
      timerPlayState: this.state.time <= 0 ? 'restart' : 'paused',
      amountCorrect: newAmountCorrect
    })
    setTimeout(() => {
      this.setState({animationClassName: styles.centerToRight})
    }, 3000)
    setTimeout(this.nextQuestion, 3500);
  }

  

  render() {
    return (
      <div className={styles.play}>
        <Header title={"Triv.io"}/>
        <Timer time={this.state.time} timerPlayState={this.state.timerPlayState}/>
        <QuestionCounter amountCorrect={this.state.amountCorrect} totalQuestions={this.state.totalQuestions} />
        <QuestionDisplay className={`${this.state.animationClassName}`} 
          question={this.state.question} answer={this.state.answer} onAnswerClicked={this.handleAnswerClick}/>
  
        <Footer />
      </div>
    )
  }
}

export default Play;