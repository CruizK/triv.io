import styles from './QuestionDisplay.module.css'
import Answer from '../Answer/Answer'

const QuestionDisplay = ({question, answer, onAnswerClicked, className}) => {

  const mapAnswers = () => {
    return question.answers.map(currAnswer => {
      let className =''
      
      if(answer != null && currAnswer == question.correct_answer) className = styles.correct;
      if(answer != null && currAnswer != question.correct_answer) className = styles.incorrect;

      return <Answer className={className} text={currAnswer} onClick={onAnswerClicked}/>
    })
  }


  if(question) {
    return (
      <div className={`${styles.questionDisplay} ${className}`}>
        <div className={styles.questionText}>
          {question.text}
        </div>
        <div className={styles.category}>
          Category: <span className={styles.categoryText}>{question.category_name}</span>
        </div>
        <div className={styles.answers}>
          {mapAnswers()}
        </div>
      </div>
    )
  }
  else {
    return (<div></div>)
  }
}

export default QuestionDisplay;