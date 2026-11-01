import { useState, useCallback, useRef } from 'react'
import { type BridesmaidConfig } from '../../config'
import styles from './Letter.module.css'

const HEART_PATH = 'M12.2 20.8C5.5 15.4 2.2 11.6 2.4 7.6 2.5 4.6 4.7 3 7.1 3.1c2.1.1 3.9 1.3 5 3.3 1.1-2.1 3.1-3.3 5.1-3.3 2.6 0 4.6 1.7 4.5 4.6-.1 4-3.6 7.6-9.5 13.1Z'

interface HeartProps {
  style: React.CSSProperties
  filled?: boolean
}

function Heart({ style, filled }: HeartProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      fill={filled ? '#f7d3e1' : 'none'}
      stroke="#dc93b0"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={HEART_PATH} />
    </svg>
  )
}

interface Props {
  bridesmaid: BridesmaidConfig
  partnerName: string
  animated: boolean
  noLabel: string
  onYes: () => void
}

export default function Letter({ bridesmaid, partnerName, animated, noLabel, onYes }: Props) {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 })
  const noOffsetRef = useRef({ x: 0, y: 0 })
  const noRef = useRef<HTMLButtonElement>(null)

  const firstName = bridesmaid.name.split(' ')[0]

  const dodge = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!noRef.current) return
    const rect = noRef.current.getBoundingClientRect()
    const margin = 20
    const angle = Math.random() * Math.PI * 2
    const dist = 140 + Math.random() * 160
    const cur = noOffsetRef.current
    const nx = Math.max(margin - rect.left + cur.x, Math.min(window.innerWidth - rect.right + cur.x - margin, cur.x + Math.cos(angle) * dist))
    const ny = Math.max(margin - rect.top + cur.y, Math.min(window.innerHeight - rect.bottom + cur.y - margin, cur.y + Math.sin(angle) * dist * 0.75))
    noOffsetRef.current = { x: nx, y: ny }
    setNoOffset({ x: nx, y: ny })
  }, [])

  const noStyle: React.CSSProperties = {
    transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
    transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1)',
  }

  return (
    <div
      className={styles.card}
      style={{
        opacity: animated ? 1 : 0,
        transform: animated ? 'none' : 'translateY(40px) scale(0.97)',
      }}
    >
      {/* Decorative hearts */}
      <Heart style={{ left: -14, top: -16, width: 34, height: 34, transform: 'rotate(-18deg)' }} />
      <Heart style={{ right: 18, top: 24, width: 22, height: 22, transform: 'rotate(14deg)' }} filled />
      <Heart style={{ right: -12, bottom: 90, width: 28, height: 28, transform: 'rotate(22deg)' }} />
      <Heart style={{ left: 16, bottom: 150, width: 20, height: 20, transform: 'rotate(-10deg)' }} filled />

      {/* Greeting */}
      <div className={styles.greeting}>Dear {firstName},</div>

      {/* Fixed wedding line */}
      <p className={styles.body}>
        {partnerName} and I are getting married on 1 May 2027, and would love to have you beside me.
      </p>

      {/* Personal intro */}
      <p className={styles.body}>{bridesmaid.intro}</p>

      {/* Polaroid photos */}
      <div className={styles.photos}>
        {bridesmaid.galleryPhotos.slice(0, 3).map((photo, i) => {
          const rotations = [-4, 2, -2]
          return (
            <div
              key={i}
              className={styles.polaroid}
              style={{ transform: `rotate(${rotations[i]}deg)` }}
            >
              <PhotoWithFallback src={photo.src} alt={photo.alt} initial={firstName[0]} />
            </div>
          )
        })}
      </div>

      {/* Bridesmaid question */}
      <div className={styles.questionBlock}>
        <p className={styles.questionIntro}>will you be my</p>
        <div className={styles.questionScript}>bridesmaid?</div>
      </div>

      {/* YES / NO */}
      <div className={styles.buttonRow}>
        <button className={styles.yesBtn} onClick={onYes}>
          Yes!
        </button>
        <div className={styles.noWrapper}>
          <button
            ref={noRef}
            className={styles.noBtn}
            style={noStyle}
            onMouseEnter={dodge}
            onTouchStart={dodge}
            onClick={(e) => e.preventDefault()}
            tabIndex={-1}
            aria-label={`${noLabel} (this button keeps moving away)`}
          >
            {noLabel}
          </button>
        </div>
      </div>

      {/* Sign-off */}
      <div className={styles.signoff}>with love, Ashley</div>
    </div>
  )
}

function PhotoWithFallback({ src, alt, initial }: { src: string; alt: string; initial: string }) {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div className={styles.photoPlaceholder}>
        <span>{initial}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={styles.photo}
      onError={() => setErrored(true)}
    />
  )
}
