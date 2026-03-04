import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'
import ColorInput from '../../components/ColorInput'
import SEOMeta from '../../components/SEOMeta'

const STYLES = ['solid', 'dashed', 'dotted', 'double']

export default function Outline() {
  const [width, setWidth] = useState(2)
  const [style, setStyle] = useState('solid')
  const [color, setColor] = useState('#a855f7')
  const [offset, setOffset] = useState(2)

  const value = `${width}px ${style} ${color}`

  return (
    <>
      <SEOMeta title="Outline" description="CSS outline generator." path="/tools/outline" />
      <ToolLayout
        name="Outline"
        category="Box Model"
        description="Style element outlines without affecting layout"
        declarations={[
          { property: 'outline', value },
          { property: 'outline-offset', value: `${offset}px` },
        ]}
        preview={
          <div style={{ width: '120px', height: '80px', outline: value, outlineOffset: `${offset}px`, borderRadius: '6px', background: 'var(--surface-overlay)', border: '1px solid var(--border-subtle)' }} />
        }
      >
        <Slider label="Width" min={0} max={12} step={1} value={width} onChange={setWidth} unit="px" />
        <Slider label="Offset" min={-8} max={16} step={1} value={offset} onChange={setOffset} unit="px" />
        <ButtonGroup label="Style" options={STYLES} value={style} onChange={setStyle} />
        <ColorInput label="Color" value={color} onChange={setColor} />
      </ToolLayout>
    </>
  )
}
