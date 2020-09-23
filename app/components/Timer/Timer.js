import styles from './Timer.module.css'

const Timer = ({time, timerPlayState}) => {

  

  return (
    <div className={styles.timer}>
    <div className={styles.timerText}>{Math.round(time)}</div>
    <svg className={styles.svg}>
      <circle r="27" cx="30" cy="30" className={styles.timerBackCircle}></circle>
      {timerPlayState == 'restart' ? null : 
      <circle r="27" cx="30" cy="30" className={styles.timerCircle} 
        style={{animationPlayState:timerPlayState, strokeDashoffset:`${Math.floor(170 * (1-time/30))}px`}}></circle>
      }
    </svg>
  </div>
  )
}

export default Timer;