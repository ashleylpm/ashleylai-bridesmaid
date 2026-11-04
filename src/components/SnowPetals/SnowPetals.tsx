import styles from './SnowPetals.module.css'

const PETALS = Array.from({ length: 18 }, (_, i) => {
  const s = 7 + (i * 11) % 20
  return {
    id: i,
    left: (i * 29 + 3) % 100,
    size: s,
    opacity: 0.85 + (i % 4) * 0.04,
    blur: s > 18 ? 1.5 : s > 12 ? 0.5 : 0,
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
