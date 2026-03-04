import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

const UNITS = ['px', '%', 'rem']

export default function Translate() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [unit, setUnit] = useState('px')

  const value = `translate(${x}${unit}, ${y}${unit})`

  const maxVal = unit === 'px' ? 100 : unit === '%' ? 100 : 6

  return (
    <>
      <SEOMeta title="Translate" description="CSS transform translate generator." path="/tools/translate" />
      <ToolLayout
        name="Translate"
        category="Transform"
        description="Move elements along X and Y axes"
        declarations={[{ property: 'transform', value }]}
        preview={
          <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="transform-demo" style={{ transform: `translate(${Math.min(x, 40)}px, ${Math.min(y, 40)}px)`, transition: 'transform 150ms ease' }}>
              move
            </div>
          </div>
        }
      >
        <Slider label="X" min={-maxVal} max={maxVal} step={unit === 'px' ? 1 : 1} value={x} onChange={setX} unit={unit} />
        <Slider label="Y" min={-maxVal} max={maxVal} step={unit === 'px' ? 1 : 1} value={y} onChange={setY} unit={unit} />
        <div className="control-group">
          <div className="control-group__label"><span>Unit</span></div>
          <div className="unit-selector">
            {UNITS.map((u) => (
              <button key={u} className={`unit-selector__btn${unit === u ? ' active' : ''}`} onClick={() => { setUnit(u); setX(0); setY(0) }}>
                {u}
              </button>
            ))}
          </div>
        </div>
      </ToolLayout>
    </>
  )
}
