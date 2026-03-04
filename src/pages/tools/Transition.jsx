import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'

const PROPERTIES = [
  { value: 'all', label: 'all' },
  { value: 'opacity', label: 'opacity' },
  { value: 'transform', label: 'transform' },
  { value: 'background-color', label: 'background' },
  { value: 'border-radius', label: 'border-radius' },
  { value: 'box-shadow', label: 'box-shadow' },
  { value: 'color', label: 'color' },
  { value: 'width', label: 'width' },
]

const EASINGS = [
  { value: 'ease', label: 'ease' },
  { value: 'ease-in', label: 'ease-in' },
  { value: 'ease-out', label: 'ease-out' },
  { value: 'ease-in-out', label: 'ease-in-out' },
  { value: 'linear', label: 'linear' },
  { value: 'cubic-bezier(0.34,1.56,0.64,1)', label: 'spring' },
  { value: 'cubic-bezier(0.87,0,0.13,1)', label: 'heavy' },
  { value: 'steps(4,end)', label: 'steps' },
]

export default function Transition() {
  const [property, setProperty] = useState('all')
  const [duration, setDuration] = useState(400)
  const [easing, setEasing] = useState('ease-in-out')
  const [delay, setDelay] = useState(0)
  const [active, setActive] = useState(false)

  const transitionValue = `${property} ${duration}ms ${easing}${delay > 0 ? ` ${delay}ms` : ''}`
  const declarations = [{ property: 'transition', value: transitionValue }]

  const boxStyle = {
    width: active ? 180 : 120,
    height: 80,
    borderRadius: active ? '40px' : '12px',
    background: active
      ? 'linear-gradient(135deg, #a855f7, #6d28d9)'
      : 'rgba(168,85,247,0.12)',
    boxShadow: active
      ? '0 12px 40px rgba(168,85,247,0.45)'
      : '0 2px 8px rgba(0,0,0,0.2)',
    opacity: active ? 1 : 0.55,
    transform: active ? 'scale(1.05)' : 'scale(1)',
    transition: transitionValue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: active ? 'white' : 'var(--accent)',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '-0.2px',
    border: `1px solid ${active ? 'transparent' : 'rgba(168,85,247,0.25)'}`,
    cursor: 'pointer',
    userSelect: 'none',
  }

  return (
    <>
      <SEOMeta title="CSS Transition" description="Build CSS transitions with duration, easing function, property, and delay." path="/tools/transition" />
      <ToolLayout
        name="CSS Transition"
        category="Animation"
        description="Compose transition declarations — click the preview to see them in action"
        declarations={declarations}
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div
              style={boxStyle}
              onClick={() => setActive(a => !a)}
              onPointerEnter={() => setActive(true)}
              onPointerLeave={() => setActive(false)}
              role="button"
              aria-label="Toggle transition preview"
            >
              {active ? 'Active' : 'Hover / Click'}
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
              Hover or click the element above
            </p>
          </div>
        }
      >
        <ButtonGroup label="Property" options={PROPERTIES} value={property} onChange={setProperty} />
        <Slider label="Duration" min={50} max={2000} step={50} value={duration} onChange={setDuration} unit="ms" />
        <Slider label="Delay" min={0} max={1000} step={50} value={delay} onChange={setDelay} unit="ms" />
        <ButtonGroup label="Easing" options={EASINGS} value={easing} onChange={setEasing} />
      </ToolLayout>
    </>
  )
}
