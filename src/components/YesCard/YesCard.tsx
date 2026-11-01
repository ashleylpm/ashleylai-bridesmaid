import { useState, useEffect } from 'react'
import styles from './YesCard.module.css'

const HEART_PATH = 'M12.2 20.8C5.5 15.4 2.2 11.6 2.4 7.6 2.5 4.6 4.7 3 7.1 3.1c2.1.1 3.9 1.3 5 3.3 1.1-2.1 3.1-3.3 5.1-3.3 2.6 0 4.6 1.7 4.5 4.6-.1 4-3.6 7.6-9.5 13.1Z'
const CONFETTI_COLORS = ['#f7c8d8', '#d9c3f0', '#fbdbe8', '#dc93b0', '#fff']

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
  firstName: string
  venues: { morning: string; night: string }
}

export default function YesCard({ firstName, venues }: Props) {
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
    const text = encodeURIComponent(`Hi Ashley, it is ${firstName}. YES, I would love to be your bridesmaid!`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
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
            top: fall ? '110%' : '-5%',
            left: `${c.l + (fall ? c.x : 0)}%`,
            width: c.w,
            height: c.w * 1.6,
            background: c.c,
            transform: `rotate(${fall ? c.r : 0}deg)`,
            transition: `top ${c.d}s ease-in ${c.dl}s, left ${c.d}s ${c.dl}s, transform ${c.d}s ${c.dl}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className={styles.card} role="status" aria-live="polite">
        {/* Decorative hearts */}
        <Heart style={{ left: -14, top: -16, width: 34, height: 34, transform: 'rotate(-18deg)' }} />
        <Heart style={{ right: 18, top: 24, width: 22, height: 22, transform: 'rotate(14deg)' }} filled />
        <Heart style={{ right: -12, bottom: 90, width: 28, height: 28, transform: 'rotate(22deg)' }} />
        <Heart style={{ left: 16, bottom: 150, width: 20, height: 20, transform: 'rotate(-10deg)' }} filled />

        <div className={styles.thankYou}>Thank you!</div>

        <h2 className={styles.headline}>
          You just made me the happiest bride-to-be, {firstName}.
        </h2>

        <p className={styles.saveDate}>
          I love you. Save the date, more details to follow very soon.
        </p>

        <div className={styles.venueSection}>
          <div className={styles.dateRow}>Saturday · 1 May 2027</div>
          <div className={styles.venueRow}>
            <span className={styles.venueLabel}>Morning</span>
            <span className={styles.venueName}>{venues.morning}</span>
          </div>
          <div className={styles.venueRow}>
            <span className={styles.venueLabel}>Night</span>
            <span className={styles.venueName}>{venues.night}</span>
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

        <div className={styles.signoff}>Ashley</div>
      </div>
    </>
  )
}
