import { useState } from 'react'
import { type BridesmaidConfig, config } from '../config'
import Envelope from '../components/Envelope/Envelope'
import Letter from '../components/Letter/Letter'
import YesCard from '../components/YesCard/YesCard'
import SnowPetals from '../components/SnowPetals/SnowPetals'
import styles from './BridesmaidPage.module.css'

type Stage = 'envelope' | 'letter' | 'yes'

interface Props {
  bridesmaid: BridesmaidConfig
}

export default function BridesmaidPage({ bridesmaid }: Props) {
  const [stage, setStage] = useState<Stage>('envelope')
  const [envGone, setEnvGone] = useState(false)
  const [letterIn, setLetterIn] = useState(false)
  const [letterSettled, setLetterSettled] = useState(false)

  function handleEnvelopeOpen() {
    setStage('letter')
    setTimeout(() => setLetterIn(true), 40)
    setTimeout(() => setEnvGone(true), 1000)
    setTimeout(() => setLetterSettled(true), 1300)
  }

  function handleYes() {
    window.scrollTo({ top: 0, left: 0 })
    setStage('yes')
  }

  const firstName = bridesmaid.name.split(' ')[0]

  return (
    <main id="main-content" className={styles.root}>
      <SnowPetals />
      <div className={styles.center}>
        <div className={styles.grid}>
          {stage !== 'yes' && (
            <Envelope
              name={bridesmaid.name}
              onOpen={handleEnvelopeOpen}
              fading={stage === 'letter'}
              gone={envGone}
            />
          )}
          {stage === 'letter' && (
            <Letter
              bridesmaid={bridesmaid}
              partnerName={config.wedding.partner}
              animated={letterIn}
              settled={letterSettled}
              noLabel={config.proposal.noLabel}
              onYes={handleYes}
            />
          )}
          {stage === 'yes' && (
            <YesCard
              firstName={firstName}
              venues={config.wedding.venues}
            />
          )}
        </div>
      </div>
    </main>
  )
}
