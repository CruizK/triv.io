import styles from './QuestionCounter.module.css'

const QuestionCounter = ({amountCorrect, totalQuestions}) => {

  return (
    <div className={styles.count}>
      Score: {amountCorrect}/{totalQuestions}
    </div>
  )
}

export default QuestionCounter;