import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

const UNITS = ['px', 'em', 'rem']

export default function LetterSpacing() {
  const [value, setValue] = useState(0)
  const [unit, setUnit] = useState('px')

  const rangeMap = { px: [-5, 20, 0.5], em: [-0.1, 0.5, 0.01], rem: [-0.1, 0.5, 0.01] }
  const [min, max, step] = rangeMap[unit]

  const cssValue = `${value}${unit}`

  return (
    <>
      <SEOMeta title="Letter Spacing" description="Fine-tune CSS letter-spacing." path="/tools/letter-spacing" />
      <ToolLayout
        name="Letter Spacing"
        category="Typography"
        description="Fine-tune letter-spacing for headings and body text"
        declarations={[{ property: 'letter-spacing', value: cssValue }]}
        preview={
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 600, letterSpacing: cssValue, color: 'var(--text-primary)' }}>
              HEADLINE TEXT
            </div>
            <div style={{ fontSize: '14px', letterSpacing: cssValue, color: 'var(--text-secondary)', marginTop: '12px' }}>
              The quick brown fox jumps
            </div>
          </div>
        }
      >
        <Slider label="Spacing" min={min} max={max} step={step} value={value} onChange={setValue} unit={unit} />
        <div className="control-group">
          <div className="control-group__label"><span>Unit</span></div>
          <div className="unit-selector">
            {UNITS.map((u) => (
              <button
                key={u}
                className={`unit-selector__btn${unit === u ? ' active' : ''}`}
                onClick={() => { setUnit(u); setValue(0) }}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </ToolLayout>
    </>
  )
}
