import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import ColorInput, { hexToRgb, rgbToHex } from '../../components/ColorInput'
import SEOMeta from '../../components/SEOMeta'

export default function TextColor() {
  const [hex, setHex] = useState('#f4f4f8')
  const [r, setR] = useState(244)
  const [g, setG] = useState(244)
  const [b, setB] = useState(248)
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

  const value = a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : hex

  return (
    <>
      <SEOMeta title="Text Color" description="Generate CSS color values for text." path="/tools/text-color" />
      <ToolLayout
        name="Text Color"
        category="Typography"
        description="Generate CSS color values with full color control"
        declarations={[{ property: 'color', value }]}
        preview={
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, color: value, letterSpacing: '-0.02em' }}>
              The quick brown fox
            </div>
            <div style={{ fontSize: '14px', color: value, opacity: 0.7, marginTop: '8px' }}>
              jumps over the lazy dog
            </div>
          </div>
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
