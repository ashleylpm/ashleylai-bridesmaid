import { useState, useEffect, useRef } from 'react'
import styles from './Envelope.module.css'

interface Props {
  name: string
  flapProgress: number  // 0 = closed, 1 = fully open
  onOpen?: () => void
}

const RAYS = 8
const RAY_ANGLES = Array.from({ length: RAYS }, (_, i) => i * (360 / RAYS))

const SPARKS: { angle: number; dist: number }[] = [
  { angle: 20,  dist: 44 },
  { angle: 80,  dist: 38 },
  { angle: 140, dist: 50 },
  { angle: 200, dist: 42 },
  { angle: 260, dist: 48 },
  { angle: 320, dist: 40 },
]

export default function Envelope({ name, flapProgress, onOpen }: Props) {
  const flapAngle = 180 * flapProgress
  const sealScale = Math.max(0.82, 1 - flapProgress * 0.22)
  const [burstKey, setBurstKey] = useState(0)
  const prevProgressRef = useRef(0)

  // Trigger burst once each time flapProgress crosses the crack threshold going up
  useEffect(() => {
    const prev = prevProgressRef.current
    prevProgressRef.current = flapProgress
    if (prev < 0.18 && flapProgress >= 0.18) {
      setBurstKey(k => k + 1)
    }
  }, [flapProgress])

  function handleClick() { onOpen?.() }
  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.forName}>{`for ${name}`}</div>

      <div
        className={styles.envelope}
        role="button"
        tabIndex={0}
        aria-label="Open the envelope"
        onClick={handleClick}
        onKeyDown={handleKey}
      >
        <div className={styles.body} />
        <div className={styles.leftFace} />
        <div className={styles.rightFace} />
        <div className={styles.bottomFace} />

        <div
          className={styles.flap}
          style={{
            transform: `rotateX(${flapAngle}deg)`,
            zIndex: flapProgress < 0.5 ? 3 : 0,
          }}
        >
          <div className={styles.flapInner} />
        </div>

        {/* Light burst — behind the seal (z-index 3 vs seal's 4) */}
        {burstKey > 0 && (
          <div key={burstKey} className={styles.burst}>
            <div className={styles.burstFlash} />
            {RAY_ANGLES.map((angle, i) => (
              <div
                key={i}
                className={styles.burstRay}
                style={{
                  transform: `rotate(${angle}deg)`,
                  animationDelay: `${i * 18}ms`,
                }}
              />
            ))}
            {SPARKS.map((s, i) => {
              const rad = (s.angle * Math.PI) / 180
              const tx = Math.cos(rad) * s.dist * 1.6
              const ty = Math.sin(rad) * s.dist * 1.6
              return (
                <div
                  key={i}
                  className={styles.burstSpark}
                  style={{
                    '--spark-end': `translate(${tx}px, ${ty}px) scale(0)`,
                    animationDelay: `${i * 25}ms`,
                  } as React.CSSProperties}
                />
              )
            })}
          </div>
        )}

        {/* Wax seal */}
        <div className={styles.seal} style={{ transform: `scale(${sealScale})` }}>
          <div className={styles.sealFace} />
          <div className={styles.sealRing} />
          <svg viewBox="0 0 24 24" className={styles.sealHeart} fill="#d98aa6">
            <path d="M12.2 20.8C5.5 15.4 2.2 11.6 2.4 7.6 2.5 4.6 4.7 3 7.1 3.1c2.1.1 3.9 1.3 5 3.3 1.1-2.1 3.1-3.3 5.1-3.3 2.6 0 4.6 1.7 4.5 4.6-.1 4-3.6 7.6-9.5 13.1Z" />
          </svg>
        </div>
      </div>

      <div className={styles.tapHint} style={{ opacity: flapProgress < 0.05 ? 1 : 0 }}>
        scroll to open
      </div>
    </div>
  )
}
