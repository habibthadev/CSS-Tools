import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import ColorInput from '../../components/ColorInput'
import SEOMeta from '../../components/SEOMeta'

let nextShadowId = 2

function ShadowLayer({ shadow, onChange, onRemove, canRemove }) {
  return (
    <div style={{ padding: '12px', background: 'var(--surface-overlay)', borderRadius: '8px', border: '1px solid var(--border-faint)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Layer</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <label className={`toggle-switch${shadow.inset ? ' on' : ''}`} onClick={() => onChange({ ...shadow, inset: !shadow.inset })}>
            <div className="toggle-switch__track" />
            <span className="toggle-switch__label">Inset</span>
          </label>
          {canRemove && (
            <button className="stop-list__item-remove" onClick={onRemove}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          )}
        </div>
      </div>
      <Slider label="X Offset" min={-40} max={40} step={1} value={shadow.x} onChange={(v) => onChange({ ...shadow, x: v })} unit="px" />
      <Slider label="Y Offset" min={-40} max={40} step={1} value={shadow.y} onChange={(v) => onChange({ ...shadow, y: v })} unit="px" />
      <Slider label="Blur" min={0} max={80} step={1} value={shadow.blur} onChange={(v) => onChange({ ...shadow, blur: v })} unit="px" />
      <Slider label="Spread" min={-20} max={40} step={1} value={shadow.spread} onChange={(v) => onChange({ ...shadow, spread: v })} unit="px" />
      <ColorInput label="Color" value={shadow.color} onChange={(v) => onChange({ ...shadow, color: v })} />
    </div>
  )
}

function shadowToString(s) {
  return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`
}

export default function BoxShadow() {
  const [shadows, setShadows] = useState([
    { id: 1, x: 0, y: 4, blur: 16, spread: 0, color: '#000000', inset: false },
  ])

  const updateShadow = (id, updated) => setShadows((s) => s.map((x) => (x.id === id ? updated : x)))
  const removeShadow = (id) => setShadows((s) => s.filter((x) => x.id !== id))
  const addShadow = () => {
    setShadows((s) => [...s, { id: nextShadowId++, x: 4, y: 4, blur: 12, spread: 0, color: '#000000', inset: false }])
  }

  const value = shadows.map(shadowToString).join(', ')

  return (
    <>
      <SEOMeta title="Box Shadow" description="CSS box-shadow generator with multiple layers." path="/tools/box-shadow" />
      <ToolLayout
        name="Box Shadow"
        category="Box Model"
        description="Build layered box shadows with full control"
        declarations={[{ property: 'box-shadow', value }]}
        preview={
          <div className="shadow-demo-box" style={{ boxShadow: value }} />
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {shadows.map((s) => (
            <ShadowLayer
              key={s.id}
              shadow={s}
              onChange={(updated) => updateShadow(s.id, updated)}
              onRemove={() => removeShadow(s.id)}
              canRemove={shadows.length > 1}
            />
          ))}
          {shadows.length < 5 && (
            <button className="add-stop-btn" onClick={addShadow}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              Add layer
            </button>
          )}
        </div>
      </ToolLayout>
    </>
  )
}
