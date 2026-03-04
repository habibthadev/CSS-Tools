import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import ButtonGroup from '../../components/ButtonGroup'
import SEOMeta from '../../components/SEOMeta'

let nextId = 3

function GradientStop({ stop, onChange, onRemove, canRemove }) {
  return (
    <div className="stop-list__item">
      <div className="stop-list__item-color">
        <div className="stop-list__item-color-preview" style={{ backgroundColor: stop.color }} />
        <input type="color" value={stop.color} onChange={(e) => onChange({ ...stop, color: e.target.value })} />
      </div>
      <div className="stop-list__item-pos">
        <div className="slider-input">
          <input
            type="range"
            className="slider-input__range"
            min={0}
            max={100}
            value={stop.position}
            style={{ '--progress': `${stop.position}%` }}
            onChange={(e) => onChange({ ...stop, position: parseInt(e.target.value) })}
          />
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'right', marginTop: '2px' }}>
          {stop.position}%
        </div>
      </div>
      {canRemove && (
        <button className="stop-list__item-remove" onClick={onRemove} aria-label="Remove stop">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      )}
    </div>
  )
}

export default function RadialGradient() {
  const [stops, setStops] = useState([
    { id: 1, color: '#a855f7', position: 0 },
    { id: 2, color: '#0f0f17', position: 100 },
  ])
  const [shape, setShape] = useState('circle')
  const [position, setPosition] = useState('center')

  const updateStop = (id, updated) => setStops((s) => s.map((x) => (x.id === id ? updated : x)))
  const removeStop = (id) => setStops((s) => s.filter((x) => x.id !== id))
  const addStop = () => {
    const newId = nextId++
    setStops((s) => [...s, { id: newId, color: '#c084fc', position: 50 }])
  }

  const sortedStops = [...stops].sort((a, b) => a.position - b.position)
  const gradientValue = `radial-gradient(${shape} at ${position}, ${sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ')})`

  return (
    <>
      <SEOMeta
        title="Radial Gradient"
        description="Create CSS radial gradient effects with shape and position control. Live preview."
        path="/tools/radial-gradient"
      />
      <ToolLayout
        name="Radial Gradient"
        category="Background"
        description="Create radial gradient effects with shape and position control"
        declarations={[{ property: 'background', value: gradientValue }]}
        preview={
          <div className="preview-swatch" style={{ background: gradientValue }} />
        }
      >
        <ButtonGroup
          label="Shape"
          options={['circle', 'ellipse']}
          value={shape}
          onChange={setShape}
        />
        <ButtonGroup
          label="Position"
          options={['center', 'top', 'bottom', 'left', 'right']}
          value={position}
          onChange={setPosition}
        />
        <div>
          <div className="section-label">Color Stops</div>
          <div className="stop-list">
            {stops.map((stop) => (
              <GradientStop
                key={stop.id}
                stop={stop}
                onChange={(updated) => updateStop(stop.id, updated)}
                onRemove={() => removeStop(stop.id)}
                canRemove={stops.length > 2}
              />
            ))}
            {stops.length < 6 && (
              <button className="add-stop-btn" onClick={addStop}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                Add stop
              </button>
            )}
          </div>
        </div>
      </ToolLayout>
    </>
  )
}
