import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import ColorInput from '../../components/ColorInput'
import SEOMeta from '../../components/SEOMeta'

export default function DropShadow() {
  const [x, setX] = useState(4)
  const [y, setY] = useState(4)
  const [blur, setBlur] = useState(8)
  const [color, setColor] = useState('#000000')

  const value = `drop-shadow(${x}px ${y}px ${blur}px ${color})`

  return (
    <>
      <SEOMeta title="Drop Shadow" description="CSS filter drop-shadow generator." path="/tools/drop-shadow" />
      <ToolLayout
        name="Drop Shadow"
        category="Filters"
        description="Apply drop shadow filter to elements and SVGs"
        declarations={[{ property: 'filter', value }]}
        preview={
          <div style={{ filter: value }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--accent-muted)', border: '2px solid rgba(168,85,247,0.4)', borderRadius: '12px' }} />
          </div>
        }
      >
        <Slider label="X Offset" min={-20} max={20} step={1} value={x} onChange={setX} unit="px" />
        <Slider label="Y Offset" min={-20} max={20} step={1} value={y} onChange={setY} unit="px" />
        <Slider label="Blur Radius" min={0} max={40} step={1} value={blur} onChange={setBlur} unit="px" />
        <ColorInput label="Color" value={color} onChange={setColor} />
      </ToolLayout>
    </>
  )
}
