import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import ButtonGroup from '../../components/ButtonGroup'
import Slider from '../../components/Slider'

const PRESETS = [
  { value: '1 / 1', label: '1:1' },
  { value: '4 / 3', label: '4:3' },
  { value: '16 / 9', label: '16:9' },
  { value: '21 / 9', label: '21:9' },
  { value: '3 / 4', label: '3:4' },
  { value: '9 / 16', label: '9:16' },
  { value: 'auto', label: 'Auto' },
  { value: 'custom', label: 'Custom' },
]

export default function AspectRatio() {
  const [preset, setPreset] = useState('16 / 9')
  const [customW, setCustomW] = useState(16)
  const [customH, setCustomH] = useState(9)

  const isCustom = preset === 'custom'
  const value = isCustom ? `${customW} / ${customH}` : preset
  const declarations = [{ property: 'aspect-ratio', value }]

  const previewStyle = {
    aspectRatio: value,
    maxWidth: 280,
    maxHeight: 200,
    width: '100%',
    background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(109,40,217,0.3))',
    border: '1px solid rgba(168,85,247,0.3)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent)',
    fontFamily: 'var(--font-mono)',
    fontSize: 14,
    fontWeight: 500,
    transition: 'aspect-ratio 0.2s ease',
  }

  return (
    <>
      <SEOMeta title="Aspect Ratio" description="CSS aspect-ratio generator with common presets and custom values." path="/tools/aspect-ratio" />
      <ToolLayout
        name="Aspect Ratio"
        category="Layout"
        description="Set responsive aspect ratios with common presets or custom numerator/denominator"
        declarations={declarations}
        preview={<div style={previewStyle}>{value}</div>}
      >
        <ButtonGroup label="Preset" options={PRESETS} value={preset} onChange={setPreset} />
        {isCustom && (
          <>
            <Slider label="Width (numerator)" min={1} max={32} step={1} value={customW} onChange={setCustomW} unit="" />
            <Slider label="Height (denominator)" min={1} max={32} step={1} value={customH} onChange={setCustomH} unit="" />
          </>
        )}
      </ToolLayout>
    </>
  )
}
