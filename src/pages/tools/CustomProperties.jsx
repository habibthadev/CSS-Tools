import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import ColorInput from '../../components/ColorInput'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'

const TYPES = [
  { value: 'color', label: 'Color' },
  { value: 'length', label: 'Length' },
  { value: 'number', label: 'Number' },
  { value: 'percentage', label: 'Percentage' },
  { value: 'string', label: 'String' },
]

let nextId = 4
export default function CustomProperties() {
  const [vars, setVars] = useState([
    { id: 1, name: 'primary', type: 'color', colorVal: '#a855f7', numVal: 16, unit: 'px', strVal: 'value' },
    { id: 2, name: 'spacing', type: 'length', colorVal: '#7c3aed', numVal: 16, unit: 'px', strVal: 'value' },
    { id: 3, name: 'radius', type: 'length', colorVal: '#8b5cf6', numVal: 8, unit: 'px', strVal: 'value' },
  ])

  const update = (id, key, val) => setVars(v => v.map(v2 => v2.id === id ? { ...v2, [key]: val } : v2))
  const remove = (id) => setVars(v => v.filter(v2 => v2.id !== id))
  const add = () => setVars(v => [...v, { id: nextId++, name: `var${nextId}`, type: 'color', colorVal: '#6d28d9', numVal: 16, unit: 'px', strVal: 'value' }])

  function getValue(v) {
    if (v.type === 'color') return v.colorVal
    if (v.type === 'length') return `${v.numVal}${v.unit}`
    if (v.type === 'number') return `${v.numVal}`
    if (v.type === 'percentage') return `${v.numVal}%`
    return v.strVal
  }

  const declarations = vars.map(v => ({ property: `--${v.name}`, value: getValue(v) }))

  const outputCSS = `:root {\n${vars.map(v => `  --${v.name}: ${getValue(v)};`).join('\n')}\n}`

  const preview = (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
      gap: 10,
      width: '100%',
    }}>
      {vars.map(v => (
        <div
          key={v.id}
          style={{
            padding: '10px',
            background: v.type === 'color' ? v.colorVal : 'var(--surface-overlay)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            overflow: 'hidden',
          }}
        >
          <div style={{ fontSize: 10, color: v.type === 'color' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            --{v.name}
          </div>
          <div style={{ fontSize: 11, color: v.type === 'color' ? 'white' : 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            {getValue(v)}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <SEOMeta title="Custom Properties" description="Build CSS custom properties (CSS variables) with a visual editor." path="/tools/custom-properties" />
      <ToolLayout
        name="Custom Properties"
        category="Advanced"
        description="Design your CSS variable system visually — colors, lengths, numbers and more"
        declarations={declarations}
        preview={preview}
        codeOverride={outputCSS}
      >
        <div className="stop-list">
          {vars.map((v, i) => (
            <div key={v.id} className="stop-item">
              <div className="stop-item__header">
                <span className="stop-item__label">Variable {i + 1}</span>
                {vars.length > 1 && (
                  <button className="stop-item__remove" onClick={() => remove(v.id)}>×</button>
                )}
              </div>
              <div className="control-group">
                <div className="control-group__label"><span>Name (without --)</span></div>
                <input
                  type="text"
                  value={v.name}
                  onChange={e => update(v.id, 'name', e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                  style={{
                    width: '100%',
                    height: 34,
                    padding: '0 10px',
                    background: 'var(--surface-control)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    fontFamily: 'var(--font-mono)',
                  }}
                />
              </div>
              <ButtonGroup label="Type" options={TYPES} value={v.type} onChange={val => update(v.id, 'type', val)} />
              {v.type === 'color' && <ColorInput label="Value" value={v.colorVal} onChange={val => update(v.id, 'colorVal', val)} />}
              {(v.type === 'length') && (
                <>
                  <Slider label="Value" min={0} max={200} step={1} value={v.numVal} onChange={val => update(v.id, 'numVal', val)} unit={v.unit} />
                  <ButtonGroup label="Unit" options={['px','rem','em','%','vw','vh']} value={v.unit} onChange={val => update(v.id, 'unit', val)} />
                </>
              )}
              {(v.type === 'number') && <Slider label="Value" min={0} max={100} step={0.1} value={v.numVal} onChange={val => update(v.id, 'numVal', val)} unit="" />}
              {(v.type === 'percentage') && <Slider label="Value" min={0} max={100} step={1} value={v.numVal} onChange={val => update(v.id, 'numVal', val)} unit="%" />}
              {v.type === 'string' && (
                <div className="control-group">
                  <div className="control-group__label"><span>Value</span></div>
                  <input
                    type="text"
                    value={v.strVal}
                    onChange={e => update(v.id, 'strVal', e.target.value)}
                    style={{
                      width: '100%',
                      height: 34,
                      padding: '0 10px',
                      background: 'var(--surface-control)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: 13,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="add-stop-btn" onClick={add}>+ Add Variable</button>
      </ToolLayout>
    </>
  )
}
