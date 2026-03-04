import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'
import ColorInput from '../../components/ColorInput'
import SEOMeta from '../../components/SEOMeta'

const STYLES = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset']

export default function Border() {
  const [width, setWidth] = useState(2)
  const [style, setStyle] = useState('solid')
  const [color, setColor] = useState('#a855f7')

  const value = `${width}px ${style} ${color}`

  return (
    <>
      <SEOMeta title="Border" description="CSS border generator with width, style, and color controls." path="/tools/border" />
      <ToolLayout
        name="Border"
        category="Box Model"
        description="Style element borders with width, style, and color"
        declarations={[{ property: 'border', value }]}
        preview={
          <div style={{ width: '120px', height: '80px', border: value, borderRadius: '6px', background: 'var(--surface-overlay)' }} />
        }
      >
        <Slider label="Width" min={0} max={16} step={1} value={width} onChange={setWidth} unit="px" />
        <ButtonGroup label="Style" options={STYLES} value={style} onChange={setStyle} />
        <ColorInput label="Color" value={color} onChange={setColor} />
      </ToolLayout>
    </>
  )
}
