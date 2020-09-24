import React from 'react'
import styles from './play.module.css'
import shuffle from 'shuffle-array'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Timer  from '../../components/Timer/Timer'
import QuestionCounter from '../../components/QuestionCounter/QuestionCounter'
import QuestionDisplay from '../../components/QuestionDisplay/QuestionDisplay'

import { GetQuestion, GetSeededQuestion } from '../../lib/questions'

import { useRouter } from 'next/router';

class Play extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      question: null,
      answer: null,
      totalQuestions: 0,
      amountCorrect: 0,
      totalTime: 15,
      time: 15,
      endTime: 0,
      timerPlayState: 'running',
      animationClassName: ''
    }

    this.questions = [];
    this.questionIndex = 0;

    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.updateTimer = this.updateTimer.bind(this)
  }


  componentDidMount() {
    console.log(this.props);
    this.nextQuestion();
    setTimeout(this.updateTimer, 100);
  }

  static getInitialProps({query}) {
    return {query}
  }

  

  updateTimer() {
    if(this.state.answer == null && this.state.time > 0) {
      this.setState({
        time: (this.state.endTime - Date.now()) / 1000
      });  
    }
    if(this.state.time <= 0 && this.state.answer == null) {
      this.handleAnswerClick('');
      setTimeout(this.updateTimer, 4000)
    }
    else {
      setTimeout(this.updateTimer, 100)
    }


  }

  async nextQuestion() {
    try {
      this.setState({answer: null, timerPlayState: 'restart'});
      const questionData = (await GetSeededQuestion(this.props.query.seed, this.questionIndex)).data;
      console.log(questionData);
      let answers = [questionData.correct_answer, questionData.incorrect_answer_1];
  
      if(questionData.incorrect_answer_2) answers.push(questionData.incorrect_answer_2);
      if(questionData.incorrect_answer_3) answers.push(questionData.incorrect_answer_3);

      shuffle(answers);
      questionData.answers = answers;

      this.questions.push(questionData);
      console.log(questionData);
      this.setState({
        question: this.questions[this.questionIndex],
        timerPlayState: 'running',
        endTime: Date.now() + 1000 * this.state.totalTime, // For 30 seconds
        time: this.state.totalTime
      })
      this.questionIndex++;
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
    if(this.state.answer != null) return;
    let newAmountCorrect = this.state.amountCorrect;
    if(answer == this.state.question.correct_answer) {
      newAmountCorrect++;
    }

    
    
    this.setState({
      answer,
      totalQuestions: this.state.totalQuestions + 1,
      timerPlayState: 'paused',
      amountCorrect: newAmountCorrect
    })
    setTimeout(() => {
      this.setState({animationClassName: styles.centerToRight})
    }, 3000)
    setTimeout(this.nextQuestion, 3500);
  }

  

  render() {
    return (
      <div className={styles.play} style={{backgroundColor: 'blue'}}>
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