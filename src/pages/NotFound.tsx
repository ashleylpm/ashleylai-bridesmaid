import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <span className={styles.flower} aria-hidden="true">🌸</span>
        <h1 className={styles.heading}>You need a link from Ashley</h1>
        <p className={styles.body}>
          This invitation is personal — check your messages for your own special link.
        </p>
      </div>
    </main>
  )
}
