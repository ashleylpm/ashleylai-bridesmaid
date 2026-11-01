import styles from './SnowPetals.module.css'

const PETALS = Array.from({ length: 25 }, (_, i) => {
  const s = 5 + (i * 11) % 16
  return {
    id: i,
    left: (i * 29 + 3) % 100,
    size: s,
    opacity: 0.7 + (i % 4) * 0.07,
    blur: s > 14 ? 1.5 : s > 9 ? 0.5 : 0,
    duration: 8 + (i * 5) % 12,
    delay: -((i * 1.7) % 20),
  }
})

export default function SnowPetals() {
  return (
    <div className={styles.container} aria-hidden="true">
      {PETALS.map((p) => (
        <div
          key={p.id}
          className={styles.petal}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
