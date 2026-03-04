import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

const UNITS = ['px', 'rem', 'em', '%']

export default function Margin() {
  const [top, setTop] = useState(16)
  const [right, setRight] = useState(16)
  const [bottom, setBottom] = useState(16)
  const [left, setLeft] = useState(16)
  const [unit, setUnit] = useState('px')
  const [linked, setLinked] = useState(true)

  const setAll = (v) => { setTop(v); setRight(v); setBottom(v); setLeft(v) }

  const shorthand = () => {
    const t = `${top}${unit}`, r = `${right}${unit}`, b = `${bottom}${unit}`, l = `${left}${unit}`
    if (t === r && r === b && b === l) return t
    if (t === b && r === l) return `${t} ${r}`
    if (r === l) return `${t} ${r} ${b}`
    return `${t} ${r} ${b} ${l}`
  }

  const maxVal = unit === 'px' ? 80 : unit === '%' ? 50 : 5

  return (
    <>
      <SEOMeta title="Margin" description="CSS margin generator with shorthand output." path="/tools/margin" />
      <ToolLayout
        name="Margin"
        category="Box Model"
        description="Set outer spacing and element positioning"
        declarations={[{ property: 'margin', value: shorthand() }]}
        preview={
          <div style={{ position: 'relative', padding: '20px' }}>
            <div
              style={{
                margin: shorthand(),
                background: 'var(--accent-muted)',
                border: '2px solid rgba(168,85,247,0.3)',
                borderRadius: '6px',
                padding: '12px 20px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent)',
                display: 'inline-block',
              }}
            >
              element
            </div>
          </div>
        }
      >
        <div className="control-group">
          <div className="control-group__label">
            <span>Link sides</span>
            <label className={`toggle-switch${linked ? ' on' : ''}`} onClick={() => setLinked(!linked)}>
              <div className="toggle-switch__track" />
              <span className="toggle-switch__label">{linked ? 'Linked' : 'Independent'}</span>
            </label>
          </div>
        </div>
        <Slider label="Top" min={0} max={maxVal} step={unit === 'px' ? 1 : 0.125} value={top} onChange={(v) => linked ? setAll(v) : setTop(v)} unit={unit} />
        {!linked && (
          <>
            <Slider label="Right" min={0} max={maxVal} step={unit === 'px' ? 1 : 0.125} value={right} onChange={setRight} unit={unit} />
            <Slider label="Bottom" min={0} max={maxVal} step={unit === 'px' ? 1 : 0.125} value={bottom} onChange={setBottom} unit={unit} />
            <Slider label="Left" min={0} max={maxVal} step={unit === 'px' ? 1 : 0.125} value={left} onChange={setLeft} unit={unit} />
          </>
        )}
        <div className="control-group">
          <div className="control-group__label"><span>Unit</span></div>
          <div className="unit-selector">
            {UNITS.map((u) => (
              <button key={u} className={`unit-selector__btn${unit === u ? ' active' : ''}`} onClick={() => { setUnit(u); setAll(u === 'px' ? 16 : 1) }}>
                {u}
              </button>
            ))}
          </div>
        </div>
      </ToolLayout>
    </>
  )
}
