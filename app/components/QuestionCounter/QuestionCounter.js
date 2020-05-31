import styles from './QuestionCounter.module.css'

const QuestionCounter = ({amountCorrect, totalQuestions}) => {

  return (
    <div className={styles.count}>
      {amountCorrect}/{totalQuestions}
    </div>
  )
}

export default QuestionCounter;