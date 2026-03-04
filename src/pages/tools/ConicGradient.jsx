import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ColorInput from '../../components/ColorInput'

let nextId = 5
export default function ConicGradient() {
  const [fromAngle, setFromAngle] = useState(0)
  const [atX, setAtX] = useState(50)
  const [atY, setAtY] = useState(50)
  const [stops, setStops] = useState([
    { id: 1, color: '#a855f7', position: 0 },
    { id: 2, color: '#06b6d4', position: 25 },
    { id: 3, color: '#f59e0b', position: 50 },
    { id: 4, color: '#a855f7', position: 100 },
  ])

  const sorted = [...stops].sort((a, b) => a.position - b.position)
  const stopStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ')
  const value = `conic-gradient(from ${fromAngle}deg at ${atX}% ${atY}%, ${stopStr})`
  const declarations = [{ property: 'background', value }]

  const update = (id, key, val) => setStops(s => s.map(st => st.id === id ? { ...st, [key]: val } : st))
  const add = () => setStops(s => [...s, { id: nextId++, color: '#8b5cf6', position: 75 }])
  const remove = (id) => setStops(s => s.filter(st => st.id !== id))

  const previewStyle = {
    width: 180,
    height: 180,
    borderRadius: '50%',
    background: value,
    transition: 'background 0.15s',
  }

  return (
    <>
      <SEOMeta title="Conic Gradient" description="Build CSS conic-gradient with multiple color stops, rotation, and center position." path="/tools/conic-gradient" />
      <ToolLayout
        name="Conic Gradient"
        category="Backgrounds"
        description="Design conic gradients with full control over stops, angle, and origin"
        declarations={declarations}
        preview={<div style={previewStyle} />}
      >
        <Slider label="Start Angle" min={0} max={360} step={1} value={fromAngle} onChange={setFromAngle} unit="deg" />
        <Slider label="Center X" min={0} max={100} step={1} value={atX} onChange={setAtX} unit="%" />
        <Slider label="Center Y" min={0} max={100} step={1} value={atY} onChange={setAtY} unit="%" />
        <div className="stop-list">
          {stops.map((st, i) => (
            <div key={st.id} className="stop-item">
              <div className="stop-item__header">
                <span className="stop-item__label">Stop {i + 1}</span>
                {stops.length > 2 && (
                  <button className="stop-item__remove" onClick={() => remove(st.id)}>×</button>
                )}
              </div>
              <ColorInput label="Color" value={st.color} onChange={v => update(st.id, 'color', v)} />
              <Slider label="Position" min={0} max={100} step={1} value={st.position} onChange={v => update(st.id, 'position', v)} unit="%" />
            </div>
          ))}
        </div>
        <button className="add-stop-btn" onClick={add}>+ Add Color Stop</button>
      </ToolLayout>
    </>
  )
}
