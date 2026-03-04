import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import ColorInput, { hexToRgb, rgbToHex } from '../../components/ColorInput'
import SEOMeta from '../../components/SEOMeta'

export default function BackgroundColor() {
  const [hex, setHex] = useState('#8b5cf6')
  const [r, setR] = useState(139)
  const [g, setG] = useState(92)
  const [b, setB] = useState(246)
  const [a, setA] = useState(1)

  const syncFromHex = (h) => {
    setHex(h)
    const rgb = hexToRgb(h)
    if (rgb) { setR(rgb.r); setG(rgb.g); setB(rgb.b) }
  }

  const syncFromRgb = (nr, ng, nb) => {
    setR(nr); setG(ng); setB(nb)
    setHex(rgbToHex(nr, ng, nb))
  }

  const value = a < 1
    ? `rgba(${r}, ${g}, ${b}, ${a})`
    : rgbToHex(r, g, b)

  return (
    <>
      <SEOMeta
        title="Background Color"
        description="Generate CSS background-color values with RGBA controls and hex picker. Copy ready CSS instantly."
        path="/tools/background-color"
      />
      <ToolLayout
        name="Background Color"
        category="Background"
        description="Generate CSS background-color with RGBA and hex controls"
        declarations={[{ property: 'background-color', value }]}
        preview={
          <div className="preview-swatch" style={{ backgroundColor: value }} />
        }
      >
        <ColorInput label="Color" value={hex} onChange={syncFromHex} />
        <Slider label="Red" min={0} max={255} step={1} value={r} onChange={(v) => syncFromRgb(v, g, b)} color="red" />
        <Slider label="Green" min={0} max={255} step={1} value={g} onChange={(v) => syncFromRgb(r, v, b)} color="green" />
        <Slider label="Blue" min={0} max={255} step={1} value={b} onChange={(v) => syncFromRgb(r, g, v)} color="blue" />
        <Slider label="Alpha" min={0} max={1} step={0.01} value={a} onChange={setA} displayValue={a.toFixed(2)} />
      </ToolLayout>
    </>
  )
}
