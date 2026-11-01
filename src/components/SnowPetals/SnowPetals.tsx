import styles from './SnowPetals.module.css'

const PETALS = Array.from({ length: 44 }, (_, i) => {
  const s = 4 + (i * 7) % 8
  return {
    id: i,
    left: (i * 29 + 3) % 100,
    size: s,
    opacity: 0.55 + (i % 4) * 0.1,
    blur: s > 8 ? 1.2 : 0.4,
    duration: 9 + (i * 5) % 11,
    delay: -((i * 1.7) % 18),
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
