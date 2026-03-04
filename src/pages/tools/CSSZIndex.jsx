import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'

const CARDS = [
  { label: 'A', color: '#a855f7', defaultZ: 1 },
  { label: 'B', color: '#06b6d4', defaultZ: 2 },
  { label: 'C', color: '#f59e0b', defaultZ: 3 },
]

export default function CSSZIndex() {
  const [zValues, setZValues] = useState({ A: 1, B: 2, C: 3 })
  const [selected, setSelected] = useState('A')

  const setZ = (label, val) => setZValues(prev => ({ ...prev, [label]: val }))

  const declarations = CARDS.map(c => ({
    property: `.card-${c.label.toLowerCase()}`,
    value: `z-index: ${zValues[c.label]}`,
  }))

  const codeStr = CARDS.map(c =>
    `.card-${c.label.toLowerCase()} {\n  position: absolute;\n  z-index: ${zValues[c.label]};\n}`
  ).join('\n\n')

  return (
    <>
      <SEOMeta title="Z-Index" description="CSS z-index stacking context visualiser — compare overlapping elements." path="/tools/z-index" />
      <ToolLayout
        name="Z-Index"
        category="Positioning"
        description="Visualise CSS stacking order — drag z-index values and see layers update live"
        declarations={declarations}
        codeOverride={codeStr}
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 220, height: 160 }}>
              {CARDS.map((c, i) => (
                <div
                  key={c.label}
                  style={{
                    position: 'absolute',
                    top:  i * 24,
                    left: i * 24,
                    width: 120,
                    height: 80,
                    background: c.color,
                    opacity: 0.88,
                    borderRadius: 8,
                    zIndex: zValues[c.label],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 18,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                    outline: selected === c.label ? '2px solid white' : 'none',
                    transition: 'z-index 0s',
                  }}
                  onClick={() => setSelected(c.label)}
                >
                  {c.label}
                  <span style={{ position: 'absolute', bottom: 5, right: 8, fontSize: 10, opacity: 0.8 }}>
                    z: {zValues[c.label]}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {CARDS.map(c => (
                <button
                  key={c.label}
                  onClick={() => setSelected(c.label)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 5,
                    border: `1px solid ${selected === c.label ? c.color : 'var(--border)'}`,
                    background: selected === c.label ? `${c.color}22` : 'transparent',
                    color: selected === c.label ? c.color : 'var(--text-secondary)',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Card {c.label}
                </button>
              ))}
            </div>
          </div>
        }
      >
        {CARDS.map(c => (
          <Slider
            key={c.label}
            label={`Card ${c.label} — z-index`}
            min={-5}
            max={20}
            step={1}
            value={zValues[c.label]}
            onChange={v => setZ(c.label, v)}
          />
        ))}
        <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6, paddingTop: 4 }}>
          Higher z-index values stack on top of lower ones. Elements must have a position value other than <code style={{ fontFamily: 'var(--font-mono)' }}>static</code> for z-index to apply.
        </div>
      </ToolLayout>
    </>
  )
}
