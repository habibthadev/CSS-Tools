import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'

export default function BackdropFilter() {
  const [blur, setBlur] = useState(10)
  const [brightness, setBrightness] = useState(100)
  const [saturate, setSaturate] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [hueRotate, setHueRotate] = useState(0)

  const parts = []
  if (blur > 0) parts.push(`blur(${blur}px)`)
  if (brightness !== 100) parts.push(`brightness(${brightness}%)`)
  if (saturate !== 100) parts.push(`saturate(${saturate}%)`)
  if (contrast !== 100) parts.push(`contrast(${contrast}%)`)
  if (hueRotate !== 0) parts.push(`hue-rotate(${hueRotate}deg)`)
  const value = parts.length ? parts.join(' ') : 'none'

  const declarations = [
    { property: 'backdrop-filter', value },
    { property: '-webkit-backdrop-filter', value },
  ]

  const preview = (
    <div style={{ position: 'relative', width: '100%', height: '180px', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 50%, #f59e0b 100%)',
        backgroundSize: '200% 200%',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%', height: '70%',
        backdropFilter: value,
        WebkitBackdropFilter: value,
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 600,
        fontSize: '14px',
        letterSpacing: '-0.3px',
        transition: 'backdrop-filter 0.15s ease',
      }}>
        Frosted Glass
      </div>
    </div>
  )

  return (
    <>
      <SEOMeta title="Backdrop Filter" description="Create frosted glass and backdrop filter CSS effects with live preview." path="/tools/backdrop-filter" />
      <ToolLayout
        name="Backdrop Filter"
        category="Effects"
        description="Build frosted glass and advanced backdrop filter effects"
        declarations={declarations}
        preview={preview}
      >
        <Slider label="Blur" min={0} max={40} step={1} value={blur} onChange={setBlur} unit="px" />
        <Slider label="Brightness" min={0} max={200} step={1} value={brightness} onChange={setBrightness} unit="%" />
        <Slider label="Saturate" min={0} max={300} step={1} value={saturate} onChange={setSaturate} unit="%" />
        <Slider label="Contrast" min={0} max={200} step={1} value={contrast} onChange={setContrast} unit="%" />
        <Slider label="Hue Rotate" min={0} max={360} step={1} value={hueRotate} onChange={setHueRotate} unit="deg" />
      </ToolLayout>
    </>
  )
}
