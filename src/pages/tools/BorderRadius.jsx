import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

const UNITS = ['px', '%', 'rem']

export default function BorderRadius() {
  const [tl, setTl] = useState(8)
  const [tr, setTr] = useState(8)
  const [br, setBr] = useState(8)
  const [bl, setBl] = useState(8)
  const [unit, setUnit] = useState('px')
  const [linked, setLinked] = useState(true)

  const setAll = (v) => { setTl(v); setTr(v); setBr(v); setBl(v) }

  const shorthand = () => {
    const a = `${tl}${unit}`, b = `${tr}${unit}`, c = `${br}${unit}`, d = `${bl}${unit}`
    if (a === b && b === c && c === d) return a
    if (a === c && b === d) return `${a} ${b}`
    return `${a} ${b} ${c} ${d}`
  }

  const maxVal = unit === 'px' ? 60 : unit === '%' ? 50 : 4

  return (
    <>
      <SEOMeta title="Border Radius" description="CSS border-radius generator." path="/tools/border-radius" />
      <ToolLayout
        name="Border Radius"
        category="Box Model"
        description="Round corners individually or uniformly"
        declarations={[{ property: 'border-radius', value: shorthand() }]}
        preview={
          <div style={{ width: '120px', height: '80px', borderRadius: shorthand(), background: 'var(--accent-muted)', border: '2px solid rgba(168,85,247,0.3)' }} />
        }
      >
        <div className="control-group">
          <div className="control-group__label">
            <span>Link corners</span>
            <label className={`toggle-switch${linked ? ' on' : ''}`} onClick={() => setLinked(!linked)}>
              <div className="toggle-switch__track" />
              <span className="toggle-switch__label">{linked ? 'Linked' : 'Independent'}</span>
            </label>
          </div>
        </div>
        <Slider label="Top Left" min={0} max={maxVal} step={unit === 'px' ? 1 : 0.5} value={tl} onChange={(v) => linked ? setAll(v) : setTl(v)} unit={unit} />
        {!linked && (
          <>
            <Slider label="Top Right" min={0} max={maxVal} step={unit === 'px' ? 1 : 0.5} value={tr} onChange={setTr} unit={unit} />
            <Slider label="Bottom Right" min={0} max={maxVal} step={unit === 'px' ? 1 : 0.5} value={br} onChange={setBr} unit={unit} />
            <Slider label="Bottom Left" min={0} max={maxVal} step={unit === 'px' ? 1 : 0.5} value={bl} onChange={setBl} unit={unit} />
          </>
        )}
        <div className="control-group">
          <div className="control-group__label"><span>Unit</span></div>
          <div className="unit-selector">
            {UNITS.map((u) => (
              <button key={u} className={`unit-selector__btn${unit === u ? ' active' : ''}`} onClick={() => { setUnit(u); setAll(u === 'px' ? 8 : 10) }}>
                {u}
              </button>
            ))}
          </div>
        </div>
      </ToolLayout>
    </>
  )
}
