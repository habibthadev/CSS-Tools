import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

export default function Skew() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const value = x === 0 && y === 0
    ? 'skew(0deg)'
    : y === 0
    ? `skewX(${x}deg)`
    : x === 0
    ? `skewY(${y}deg)`
    : `skew(${x}deg, ${y}deg)`

  return (
    <>
      <SEOMeta title="Skew" description="CSS transform skew generator." path="/tools/skew" />
      <ToolLayout
        name="Skew"
        category="Transform"
        description="Skew elements along X and Y axes"
        declarations={[{ property: 'transform', value }]}
        preview={
          <div className="transform-demo" style={{ transform: value, transition: 'transform 150ms ease' }}>
            skew
          </div>
        }
      >
        <Slider label="Skew X" min={-45} max={45} step={1} value={x} onChange={setX} unit="deg" />
        <Slider label="Skew Y" min={-45} max={45} step={1} value={y} onChange={setY} unit="deg" />
      </ToolLayout>
    </>
  )
}
