import styles from './Answer.module.css'

export default function Answer({text, onClick, className}) {
  return (
    <div className={`${styles.answer} ${className != '' ? className : styles.color} ${className}`} onClick={() => onClick(text)}>
      <span className={styles.text}>{text}</span>
    </div>
  )
}