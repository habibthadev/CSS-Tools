import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ColorInput from '../../components/ColorInput'

function ShadowLayer({ layer, index, onChange, onRemove, canRemove }) {
  return (
    <div className="stop-item">
      <div className="stop-item__header">
        <span className="stop-item__label">Shadow {index + 1}</span>
        {canRemove && (
          <button className="stop-item__remove" onClick={onRemove} aria-label="Remove shadow">×</button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Slider label="X Offset" min={-40} max={40} step={1} value={layer.x} onChange={v => onChange({ ...layer, x: v })} unit="px" />
        <Slider label="Y Offset" min={-40} max={40} step={1} value={layer.y} onChange={v => onChange({ ...layer, y: v })} unit="px" />
        <Slider label="Blur" min={0} max={40} step={1} value={layer.blur} onChange={v => onChange({ ...layer, blur: v })} unit="px" />
        <ColorInput label="Color" value={layer.color} onChange={v => onChange({ ...layer, color: v })} />
      </div>
    </div>
  )
}

let nextId = 4
export default function TextShadow() {
  const [shadows, setShadows] = useState([
    { id: 1, x: 2, y: 2, blur: 4, color: '#a855f7' },
  ])

  const update = (id, val) => setShadows(s => s.map(sh => sh.id === id ? val : sh))
  const remove = (id) => setShadows(s => s.filter(sh => sh.id !== id))
  const add = () => setShadows(s => [...s, { id: nextId++, x: 0, y: 4, blur: 8, color: '#7c3aed' }])

  const value = shadows.map(s => `${s.x}px ${s.y}px ${s.blur}px ${s.color}`).join(', ')
  const declarations = [{ property: 'text-shadow', value }]

  const previewStyle = {
    textShadow: value,
    fontSize: '52px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '-1px',
    lineHeight: 1.1,
    userSelect: 'none',
  }

  return (
    <>
      <SEOMeta title="Text Shadow" description="Build layered CSS text-shadow effects with live preview." path="/tools/text-shadow" />
      <ToolLayout
        name="Text Shadow"
        category="Typography"
        description="Compose layered text shadows with full control over offset, blur, and color"
        declarations={declarations}
        preview={<span style={previewStyle}>Shadow</span>}
      >
        <div className="stop-list">
          {shadows.map((sh, i) => (
            <ShadowLayer
              key={sh.id}
              layer={sh}
              index={i}
              onChange={v => update(sh.id, v)}
              onRemove={() => remove(sh.id)}
              canRemove={shadows.length > 1}
            />
          ))}
        </div>
        <button className="add-stop-btn" onClick={add}>+ Add Shadow Layer</button>
      </ToolLayout>
    </>
  )
}
