import styles from './Answer.module.css'

export default function Answer({text, onClick, className}) {
  console.log(styles);
  return (
    <div className={`${styles.answer} ${className}`} onClick={() => onClick(text)}>
      {text}
    </div>
  )
}