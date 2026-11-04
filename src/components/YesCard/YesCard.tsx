import { useState, useEffect } from 'react'
import styles from './YesCard.module.css'

const HEART_PATH = 'M12.2 20.8C5.5 15.4 2.2 11.6 2.4 7.6 2.5 4.6 4.7 3 7.1 3.1c2.1.1 3.9 1.3 5 3.3 1.1-2.1 3.1-3.3 5.1-3.3 2.6 0 4.6 1.7 4.5 4.6-.1 4-3.6 7.6-9.5 13.1Z'
const CONFETTI_COLORS = ['var(--color-confetti-a)', 'var(--color-confetti-b)', 'var(--color-confetti-c)', 'var(--color-confetti-d)', 'var(--color-confetti-e)']

interface ConfettiPiece {
  id: number
  l: number
  d: number
  w: number
  c: string
  r: number
  x: number
  dl: number
}

interface HeartProps {
  left?: number; right?: number; top?: number; bottom?: number
  size: number
  filled?: boolean
  delay?: number
  rotate?: string
}

function Heart({ left, right, top, bottom, size, filled, delay = 0, rotate = 'rotate(0deg)' }: HeartProps) {
  return (
    <div style={{ position: 'absolute', pointerEvents: 'none', left, right, top, bottom, width: size, height: size, transform: rotate }}>
      <svg
        viewBox="0 0 24 24"
        className="heart-pulse"
        style={{ width: '100%', height: '100%', animationDelay: `${delay}s` }}
        fill={filled ? '#f7d3e1' : 'none'}
        stroke="#dc93b0"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={HEART_PATH} />
      </svg>
    </div>
  )
}

interface Props {
  venues: { morning: string; morningLink?: string; night: string; nightLink?: string }
}

export default function YesCard({ venues }: Props) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const [fall, setFall] = useState(false)

  useEffect(() => {
    const pieces = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      l: Math.random() * 100,
      d: 2 + Math.random() * 2.5,
      w: 6 + Math.random() * 8,
      c: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      r: Math.random() * 720,
      x: (Math.random() - 0.5) * 20,
      dl: Math.random() * 0.6,
    }))
    setConfetti(pieces)
    const t1 = setTimeout(() => setFall(true), 60)
    const t2 = setTimeout(() => setConfetti([]), 6000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  function addToCalendar() {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'UID:ashley-julian-2027@wedding',
      'DTSTAMP:20261030T000000Z',
      'DTSTART;VALUE=DATE:20270501',
      'DTEND;VALUE=DATE:20270502',
      "SUMMARY:Ashley & Julian's Wedding",
      `LOCATION:DUMC Dream Center (morning) / Copper Mansion PJ (night)`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    a.download = 'ashley-julian-wedding.ics'
    a.click()
  }

  function messageAshley() {
    const text = encodeURIComponent(`YES! I would love to be your bridesmaid!`)
    window.open(`https://wa.me/60139321767?text=${text}`, '_blank')
  }

  return (
    <>
      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          style={{
            position: 'fixed',
            zIndex: 30,
            pointerEvents: 'none',
            left: `${c.l}%`,
            top: 0,
            width: c.w,
            height: c.w * 1.6,
            background: c.c,
            transform: fall
              ? `translateY(115vh) translateX(${c.x}vw) rotate(${c.r}deg)`
              : `translateY(-8vh) rotate(0deg)`,
            transition: `transform ${c.d}s ease-in ${c.dl}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className={styles.card} role="status" aria-live="polite">
        {/* Decorative hearts */}
        <Heart left={-14} top={-16} size={34} rotate="rotate(-18deg)" delay={0} />
        <Heart right={18} top={24} size={22} rotate="rotate(14deg)" delay={0.7} filled />
        <Heart right={-12} bottom={90} size={28} rotate="rotate(22deg)" delay={1.4} />
        <Heart left={16} bottom={150} size={20} rotate="rotate(-10deg)" delay={2.1} filled />

        <div className={styles.thankYou}>Thank you!</div>

        <h2 className={styles.headline}>
          You just made me the happiest bride-to-be.
        </h2>

        <p className={styles.saveDate}>
          Save the date, more details to follow very soon.
        </p>

        <div className={styles.venueSection}>
          <div className={styles.dateRow}>Saturday · 1 May 2027</div>
          <div className={styles.venueRow}>
            <span className={styles.venueLabel}>Morning</span>
            <span className={styles.venueName}>
              {venues.morning}
              {venues.morningLink && (
                <a href={venues.morningLink} target="_blank" rel="noopener noreferrer" className={styles.mapLink} aria-label="Open map">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </a>
              )}
            </span>
          </div>
          <div className={styles.venueRow}>
            <span className={styles.venueLabel}>Night</span>
            <span className={styles.venueName}>
              {venues.night}
              {venues.nightLink && (
                <a href={venues.nightLink} target="_blank" rel="noopener noreferrer" className={styles.mapLink} aria-label="Open map">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </a>
              )}
            </span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.calBtn} onClick={addToCalendar}>
            Add to calendar
          </button>
          <button className={styles.waBtn} onClick={messageAshley}>
            WhatsApp Ashley your answer
          </button>
        </div>

      </div>
    </>
  )
}
