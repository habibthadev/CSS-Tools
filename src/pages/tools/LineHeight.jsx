import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

const UNITS = ['', 'px', 'em', 'rem']

export default function LineHeight() {
  const [value, setValue] = useState(1.5)
  const [unit, setUnit] = useState('')

  const maxMap = { '': 3, px: 60, em: 3, rem: 3 }
  const stepMap = { '': 0.05, px: 1, em: 0.05, rem: 0.05 }
  const minMap = { '': 0.8, px: 10, em: 0.8, rem: 0.8 }

  const cssValue = `${value}${unit}`

  return (
    <>
      <SEOMeta title="Line Height" description="Adjust CSS line-height for optimal text readability." path="/tools/line-height" />
      <ToolLayout
        name="Line Height"
        category="Typography"
        description="Adjust line-height for optimal text readability"
        declarations={[{ property: 'line-height', value: cssValue }]}
        preview={
          <div style={{ maxWidth: '280px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: unit === 'px' ? cssValue : value }}>
            The quick brown fox jumps over the lazy dog. Good typography makes text comfortable to read.
            Line height affects readability and visual rhythm.
          </div>
        }
      >
        <Slider
          label="Line Height"
          min={minMap[unit]}
          max={maxMap[unit]}
          step={stepMap[unit]}
          value={value}
          onChange={setValue}
          unit={unit}
          displayValue={`${value}${unit}`}
        />
        <div className="control-group">
          <div className="control-group__label"><span>Unit</span></div>
          <div className="unit-selector">
            {UNITS.map((u) => (
              <button
                key={u || 'none'}
                className={`unit-selector__btn${unit === u ? ' active' : ''}`}
                onClick={() => { setUnit(u); setValue(u === 'px' ? 24 : 1.5) }}
              >
                {u || 'none'}
              </button>
            ))}
          </div>
        </div>
      </ToolLayout>
    </>
  )
}
