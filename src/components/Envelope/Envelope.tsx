import { useState } from 'react'
import styles from './Envelope.module.css'

type EnvStage = 'closed' | 'cracking' | 'open'

interface Props {
  name: string
  onOpen: () => void
  fading: boolean
  gone: boolean
}

const CRUMBS: [number, number][] = [[-46,34],[-30,58],[-8,66],[20,60],[44,40],[34,-6],[-40,8]]

export default function Envelope({ name, onOpen, fading, gone }: Props) {
  const [stage, setStage] = useState<EnvStage>('closed')

  function handleClick() {
    if (stage !== 'closed') return
    setStage('cracking')
    setTimeout(() => setStage('open'), 160)
    setTimeout(() => onOpen(), 400)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() }
  }

  if (gone) return null

  const cracking = stage === 'cracking'
  const open = stage === 'open'

  return (
    <div
      className={styles.wrapper}
      style={fading ? { opacity: 0, transform: 'translateY(60px) scale(0.96)', pointerEvents: 'none' } : undefined}
    >
      <div className={styles.forName}>{`for ${name}`}</div>

      <div
        className={styles.envelope}
        role="button"
        tabIndex={fading ? -1 : 0}
        aria-label="Open the envelope"
        onClick={handleClick}
        onKeyDown={handleKey}
      >
        {/* Body */}
        <div className={styles.body} />
        {/* Left triangle */}
        <div className={styles.leftFace} />
        {/* Right triangle */}
        <div className={styles.rightFace} />
        {/* Bottom triangle */}
        <div className={styles.bottomFace} />
        {/* Flap */}
        <div
          className={styles.flap}
          style={{ transform: `rotateX(${open ? 180 : 0}deg)`, zIndex: open ? 0 : 3 }}
        >
          <div className={styles.flapInner} />
        </div>

        {/* Wax seal */}
        <div
          className={styles.seal}
          style={{ transform: `scale(${cracking ? 0.9 : 1})` }}
        >
          <div className={styles.sealFace} />
          <div className={styles.sealRing} />
          <svg
            viewBox="0 0 24 24"
            className={styles.sealHeart}
            fill="#d98aa6"
          >
            <path d="M12.2 20.8C5.5 15.4 2.2 11.6 2.4 7.6 2.5 4.6 4.7 3 7.1 3.1c2.1.1 3.9 1.3 5 3.3 1.1-2.1 3.1-3.3 5.1-3.3 2.6 0 4.6 1.7 4.5 4.6-.1 4-3.6 7.6-9.5 13.1Z" />
          </svg>

          {/* Crumbs */}
          {CRUMBS.map(([x, y], i) => (
            <div
              key={i}
              className={styles.crumb}
              style={{
                width: 5 + (i % 3) * 2,
                height: 5 + (i % 3) * 2,
                opacity: cracking ? 1 : 0,
                transform: open ? `translate(${x}px, ${y}px)` : 'none',
              }}
            />
          ))}
        </div>

      </div>

      <div className={styles.tapHint} style={{ opacity: stage === 'closed' ? 1 : 0 }}>
        tap to open
      </div>
    </div>
  )
}
