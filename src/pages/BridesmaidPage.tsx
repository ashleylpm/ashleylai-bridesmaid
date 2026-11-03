import { useState, useLayoutEffect, useRef, useEffect } from 'react'
import { type BridesmaidConfig, config } from '../config'
import Envelope from '../components/Envelope/Envelope'
import Letter from '../components/Letter/Letter'
import YesCard from '../components/YesCard/YesCard'
import SnowPetals from '../components/SnowPetals/SnowPetals'
import styles from './BridesmaidPage.module.css'

interface Props { bridesmaid: BridesmaidConfig }

const FLAP_END = 0.5

export default function BridesmaidPage({ bridesmaid }: Props) {
  const [showYes, setShowYes] = useState(false)
  const [flapProgress, setFlapProgress] = useState(0)
  const [letterOpen, setLetterOpen] = useState(false)
  const progressRef = useRef(0)
  const flapProgressRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const envelopeLayerRef = useRef<HTMLDivElement>(null)
  const letterLayerRef = useRef<HTMLDivElement>(null)
  const letterStartOffsetRef = useRef(0)
  const letterEndOffsetRef = useRef(0)

  useEffect(() => {
    if (letterOpen) {
      document.body.style.overflowY = 'auto'
      window.scrollTo({ top: 0 })
    }
    return () => {
      document.body.style.overflowY = ''
    }
  }, [letterOpen])

  useLayoutEffect(() => {
    if (letterLayerRef.current) {
      const cardH = letterLayerRef.current.scrollHeight
      const start = window.innerHeight / 2 + cardH / 2 + 24
      letterStartOffsetRef.current = start
      // On mobile the grid is taller than the viewport, so the letter's natural top sits above
      // the viewport. Animate to a translateY that lands the letter's top at 24px (rootOpen
      // padding-top) instead of at the invisible-above-viewport natural position.
      // 56 = rootOpen padding-top on mobile. Formula lands letter top at that y-coordinate.
      letterEndOffsetRef.current = window.innerWidth <= 600 ? start - window.innerHeight + 56 - 24 : 0
      letterLayerRef.current.style.transform = `translateY(${start}px)`
      letterLayerRef.current.style.opacity = '0'
      letterLayerRef.current.style.pointerEvents = 'none'
    }
  }, [])

  // After rootOpen reflows the layout, reset transform before paint so there is no jump.
  // On mobile the new natural top (24px via rootOpen padding) matches the animation endpoint.
  useLayoutEffect(() => {
    if (letterOpen && letterLayerRef.current) {
      letterLayerRef.current.style.transform = 'none'
    }
  }, [letterOpen])

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
      const end = letterEndOffsetRef.current
      const translateY = letterStartOffsetRef.current + (end - letterStartOffsetRef.current) * lp
      letterLayerRef.current.style.transform = `translateY(${translateY}px)`
      letterLayerRef.current.style.opacity = String(Math.min(1, lp * 2))
      letterLayerRef.current.style.pointerEvents = lp >= 1 ? 'auto' : 'none'
    }
  }

  // Tap on envelope: flap opens over ~700ms, then letter slides in over ~2000ms
  function handleEnvelopeTap() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const start = progressRef.current
    const t0 = performance.now()
    const flapDur = 600
    const letterDur = 700

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
        setLetterOpen(true)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }

  function handleYes() {
    window.scrollTo({ top: 0 })
    setShowYes(true)
  }

  return (
    <main id="main-content" className={`${styles.root}${letterOpen ? ` ${styles.rootOpen}` : ''}`}>
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
            <YesCard venues={config.wedding.venues} />
          )}
        </div>
      </div>
    </main>
  )
}
