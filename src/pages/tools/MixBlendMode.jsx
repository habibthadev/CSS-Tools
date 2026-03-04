import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import ButtonGroup from '../../components/ButtonGroup'
import ColorInput from '../../components/ColorInput'

const MODES = [
  { value: 'normal', label: 'Normal' },
  { value: 'multiply', label: 'Multiply' },
  { value: 'screen', label: 'Screen' },
  { value: 'overlay', label: 'Overlay' },
  { value: 'darken', label: 'Darken' },
  { value: 'lighten', label: 'Lighten' },
  { value: 'color-dodge', label: 'Color Dodge' },
  { value: 'color-burn', label: 'Color Burn' },
  { value: 'hard-light', label: 'Hard Light' },
  { value: 'soft-light', label: 'Soft Light' },
  { value: 'difference', label: 'Difference' },
  { value: 'exclusion', label: 'Exclusion' },
  { value: 'hue', label: 'Hue' },
  { value: 'saturation', label: 'Saturation' },
  { value: 'color', label: 'Color' },
  { value: 'luminosity', label: 'Luminosity' },
]

export default function MixBlendMode() {
  const [mode, setMode] = useState('multiply')
  const [topColor, setTopColor] = useState('#a855f7')
  const [bottomColor, setBottomColor] = useState('#06b6d4')

  const declarations = [{ property: 'mix-blend-mode', value: mode }]

  const preview = (
    <div style={{ position: 'relative', width: 200, height: 150, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: bottomColor }} />
      <div style={{
        position: 'absolute',
        top: '20%', left: '20%',
        width: '70%', height: '70%',
        background: topColor,
        borderRadius: '50%',
        mixBlendMode: mode,
        transition: 'mix-blend-mode 0.15s',
      }} />
    </div>
  )

  return (
    <>
      <SEOMeta title="Mix Blend Mode" description="Visualize all 16 CSS mix-blend-mode values with live preview." path="/tools/mix-blend-mode" />
      <ToolLayout
        name="Mix Blend Mode"
        category="Effects"
        description="Explore all 16 CSS blend modes with interactive color layers"
        declarations={declarations}
        preview={preview}
      >
        <ColorInput label="Bottom Layer" value={bottomColor} onChange={setBottomColor} />
        <ColorInput label="Top Layer (blended)" value={topColor} onChange={setTopColor} />
        <ButtonGroup label="Blend Mode" options={MODES} value={mode} onChange={setMode} />
      </ToolLayout>
    </>
  )
}
