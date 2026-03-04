import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import ButtonGroup from '../../components/ButtonGroup'

const FIT_OPTIONS = ['fill', 'contain', 'cover', 'none', 'scale-down']
const POSITION_OPTIONS = [
  'center', 'top', 'bottom', 'left', 'right',
  'top left', 'top right', 'bottom left', 'bottom right',
]

export default function ObjectFit() {
  const [fit, setFit]           = useState('cover')
  const [position, setPosition] = useState('center')

  const declarations = [
    { property: 'object-fit',      value: fit },
    { property: 'object-position', value: position },
  ]

  const preview = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div
        style={{
          width: 260,
          height: 170,
          border: '1px solid rgba(168,85,247,0.3)',
          borderRadius: 10,
          overflow: 'hidden',
          background: 'var(--surface-overlay)',
          position: 'relative',
        }}
      >
        <img
          src="https://picsum.photos/seed/csstool/600/400"
          alt="object-fit preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit,
            objectPosition: position,
            display: 'block',
            transition: 'object-fit 0.2s, object-position 0.2s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(4px)',
            borderRadius: 4,
            padding: '2px 7px',
            fontSize: 10,
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.2px',
          }}
        >
          {fit}
        </div>
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
        260 × 170 container · natural image is 600 × 400
      </p>
    </div>
  )

  return (
    <>
      <SEOMeta title="Object Fit" description="CSS object-fit and object-position generator for images and replaced elements." path="/tools/object-fit" />
      <ToolLayout
        name="Object Fit"
        category="Layout"
        description="Control how replaced elements like images fill their container"
        declarations={declarations}
        preview={preview}
      >
        <ButtonGroup label="Object Fit" options={FIT_OPTIONS} value={fit} onChange={setFit} />
        <ButtonGroup label="Object Position" options={POSITION_OPTIONS} value={position} onChange={setPosition} />
      </ToolLayout>
    </>
  )
}
