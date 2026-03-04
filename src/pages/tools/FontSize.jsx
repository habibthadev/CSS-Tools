import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

const UNITS = ['px', 'rem', 'em', 'vw']

export default function FontSize() {
  const [value, setValue] = useState(16)
  const [unit, setUnit] = useState('px')

  const maxMap = { px: 96, rem: 6, em: 6, vw: 10 }
  const stepMap = { px: 1, rem: 0.125, em: 0.125, vw: 0.1 }

  const cssValue = `${value}${unit}`

  return (
    <>
      <SEOMeta title="Font Size" description="Set CSS font-size with px, rem, em, vw units." path="/tools/font-size" />
      <ToolLayout
        name="Font Size"
        category="Typography"
        description="Set font-size with px, rem, em, or vw units"
        declarations={[{ property: 'font-size', value: cssValue }]}
        preview={
          <div className="preview-text-demo" style={{ fontSize: unit === 'px' ? cssValue : `clamp(10px, ${cssValue}, 80px)` }}>
            The quick brown fox
          </div>
        }
      >
        <Slider
          label="Size"
          min={unit === 'px' ? 8 : 0.5}
          max={maxMap[unit]}
          step={stepMap[unit]}
          value={value}
          onChange={setValue}
          unit={unit}
        />
        <div className="control-group">
          <div className="control-group__label"><span>Unit</span></div>
          <div className="unit-selector">
            {UNITS.map((u) => (
              <button
                key={u}
                className={`unit-selector__btn${unit === u ? ' active' : ''}`}
                onClick={() => { setUnit(u); setValue(u === 'px' ? 16 : u === 'vw' ? 2 : 1) }}
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
