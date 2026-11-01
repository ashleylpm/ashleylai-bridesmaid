import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { type BridesmaidConfig, config } from '../config'
import Envelope from '../components/Envelope/Envelope'
import Letter from '../components/Letter/Letter'
import YesCard from '../components/YesCard/YesCard'
import SnowPetals from '../components/SnowPetals/SnowPetals'
import styles from './BridesmaidPage.module.css'

interface Props { bridesmaid: BridesmaidConfig }

// Total scroll pixels for the full envelope→letter transition
const SCROLL_RANGE = 500
// Fraction of scroll range dedicated to opening the flap (rest slides the letter in)
const FLAP_END = 0.5

export default function BridesmaidPage({ bridesmaid }: Props) {
  const [showYes, setShowYes] = useState(false)
  const [flapProgress, setFlapProgress] = useState(0)
  const progressRef = useRef(0)
  const flapProgressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const envelopeLayerRef = useRef<HTMLDivElement>(null)
  const letterLayerRef = useRef<HTMLDivElement>(null)
  const letterStartOffsetRef = useRef(0)
  const firstName = bridesmaid.name.split(' ')[0]

  useLayoutEffect(() => {
    if (letterLayerRef.current) {
      const cardH = letterLayerRef.current.scrollHeight
      letterStartOffsetRef.current = window.innerHeight / 2 + cardH / 2 + 24
      letterLayerRef.current.style.transform = `translateY(${letterStartOffsetRef.current}px)`
      letterLayerRef.current.style.pointerEvents = 'none'
    }
  }, [])

  function applyProgress(p: number) {
    progressRef.current = p

    // Phase 1 (0→FLAP_END): flap opens
    const fp = Math.min(1, p / FLAP_END)
    if (Math.abs(fp - flapProgressRef.current) > 0.005) {
      flapProgressRef.current = fp
      setFlapProgress(fp)
    }

    // Phase 2 (FLAP_END→1): letter rises, envelope drifts up and fades
    const lp = Math.max(0, (p - FLAP_END) / (1 - FLAP_END))

    if (envelopeLayerRef.current) {
      envelopeLayerRef.current.style.opacity = String(Math.max(0, 1 - lp * 1.5))
      envelopeLayerRef.current.style.transform = lp > 0 ? `translateY(${-80 * lp}px)` : 'none'
      envelopeLayerRef.current.style.pointerEvents = lp > 0.2 ? 'none' : 'auto'
    }
    if (letterLayerRef.current) {
      letterLayerRef.current.style.transform = lp >= 1
        ? 'none'
        : `translateY(${letterStartOffsetRef.current * (1 - lp)}px)`
      letterLayerRef.current.style.pointerEvents = lp >= 1 ? 'auto' : 'none'
    }
  }

  useEffect(() => {
    if (showYes) return
    let touchStartY = 0

    function applyDelta(delta: number) {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
      const clamped = Math.max(0, Math.min(SCROLL_RANGE, progressRef.current * SCROLL_RANGE + delta))
      applyProgress(clamped / SCROLL_RANGE)
    }

    function onWheel(e: WheelEvent) { applyDelta(e.deltaY) }
    function onTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY }
    function onTouchMove(e: TouchEvent) {
      const dy = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY
      applyDelta(dy * 2)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [showYes])

  // Tap on envelope: flap opens over ~700ms, then letter slides in over ~2000ms
  function handleEnvelopeTap() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const start = progressRef.current
    const t0 = performance.now()
    const flapDur = 600
    const letterDur = 1200

    function animate(now: number) {
      const elapsed = now - t0
      let p: number
      if (elapsed < flapDur) {
        const t = elapsed / flapDur
        const eased = 1 - Math.pow(1 - t, 2)
        p = start + (FLAP_END - start) * eased
      } else {
        const t = Math.min(1, (elapsed - flapDur) / letterDur)
        const eased = 1 - Math.pow(1 - t, 2)
        p = FLAP_END + (1 - FLAP_END) * eased
      }
      applyProgress(Math.min(1, p))
      if (elapsed < flapDur + letterDur) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }

  function handleYes() {
    setShowYes(true)
  }

  return (
    <main id="main-content" className={styles.root}>
      <SnowPetals />
      <div className={styles.center}>
        <div className={styles.grid}>
          {!showYes && (
            <>
              <div ref={envelopeLayerRef} className={styles.layer}>
                <Envelope
                  name={bridesmaid.name}
                  flapProgress={flapProgress}
                  onOpen={handleEnvelopeTap}
                />
              </div>
              <div ref={letterLayerRef} className={styles.layer}>
                <Letter
                  bridesmaid={bridesmaid}
                  partnerName={config.wedding.partner}
                  animated={true}
                  noLabel={config.proposal.noLabel}
                  onYes={handleYes}
                />
              </div>
            </>
          )}
          {showYes && (
            <YesCard firstName={firstName} venues={config.wedding.venues} />
          )}
        </div>
      </div>
    </main>
  )
}
