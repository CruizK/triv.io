import styles from './Timer.module.css'

const Timer = ({time, timerPlayState}) => {

  

  return (
    <div className={styles.timer}>
    <div className={styles.timerText}>{time}</div>
    <svg className={styles.svg}>
      <circle r="27" cx="30" cy="30" className={styles.timerBackCircle}></circle>
      {timerPlayState == 'restart' ? null :
        <circle r="27" cx="30" cy="30" className={styles.timerCircle} style={{animationPlayState:timerPlayState}}></circle>
      }
    </svg>
  </div>
  )
}

export default Timer;