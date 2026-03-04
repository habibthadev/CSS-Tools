import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'
import SEOMeta from '../../components/SEOMeta'

export default function Rotate() {
  const [angle, setAngle] = useState(45)
  const [axis, setAxis] = useState('Z')

  const fnName = axis === 'Z' ? 'rotate' : `rotate${axis}`
  const value = `${fnName}(${angle}deg)`

  return (
    <>
      <SEOMeta title="Rotate" description="CSS transform rotate generator." path="/tools/rotate" />
      <ToolLayout
        name="Rotate"
        category="Transform"
        description="Rotate elements on X, Y, or Z axis"
        declarations={[{ property: 'transform', value }]}
        preview={
          <div className="transform-demo" style={{ transform: value, transition: 'transform 150ms ease' }}>
            rotate
          </div>
        }
      >
        <Slider label="Angle" min={-360} max={360} step={1} value={angle} onChange={setAngle} unit="deg" />
        <ButtonGroup label="Axis" options={['X', 'Y', 'Z']} value={axis} onChange={setAxis} />
      </ToolLayout>
    </>
  )
}
