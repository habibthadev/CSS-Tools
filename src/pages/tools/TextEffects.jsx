import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'
import ColorInput from '../../components/ColorInput'

const MODES = [
  { value: 'gradient', label: 'Gradient Text' },
  { value: 'stroke',   label: 'Text Stroke' },
  { value: 'neon',     label: 'Neon Glow' },
  { value: 'emboss',   label: 'Emboss' },
  { value: 'retro',    label: 'Retro 3D' },
]

const GRADIENTS = [
  { label: 'Purple → Cyan', from: '#a855f7', to: '#06b6d4' },
  { label: 'Sunset', from: '#f97316', to: '#ec4899' },
  { label: 'Gold', from: '#facc15', to: '#f97316' },
  { label: 'Ocean', from: '#3b82f6', to: '#06b6d4' },
  { label: 'Lime', from: '#84cc16', to: '#06b6d4' },
]

export default function TextEffects() {
  const [mode, setMode]             = useState('gradient')
  const [gradIdx, setGradIdx]       = useState(0)
  const [gradAngle, setGradAngle]   = useState(135)
  const [strokeW, setStrokeW]       = useState(2)
  const [strokeColor, setStrokeColor] = useState('#a855f7')
  const [neonColor, setNeonColor]   = useState('#a855f7')
  const [neonSpread, setNeonSpread] = useState(14)
  const [fontSize, setFontSize]     = useState(52)

  const g = GRADIENTS[gradIdx]

  const getStyle = () => {
    const base = {
      fontSize: `${fontSize}px`,
      fontWeight: 800,
      letterSpacing: '-1.5px',
      lineHeight: 1.1,
      display: 'inline-block',
    }
    switch (mode) {
      case 'gradient':
        return {
          ...base,
          background: `linear-gradient(${gradAngle}deg, ${g.from}, ${g.to})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }
      case 'stroke':
        return {
          ...base,
          color: 'transparent',
          WebkitTextStroke: `${strokeW}px ${strokeColor}`,
        }
      case 'neon':
        return {
          ...base,
          color: neonColor,
          textShadow: [
            `0 0 ${neonSpread * 0.4}px ${neonColor}`,
            `0 0 ${neonSpread}px ${neonColor}`,
            `0 0 ${neonSpread * 2}px ${neonColor}`,
            `0 0 ${neonSpread * 4}px ${neonColor}`,
          ].join(', '),
        }
      case 'emboss':
        return {
          ...base,
          color: 'rgba(255,255,255,0.9)',
          textShadow: `-1px -1px 0 rgba(0,0,0,0.4), 1px 1px 0 rgba(255,255,255,0.15), 2px 2px 4px rgba(0,0,0,0.5)`,
        }
      case 'retro':
        return {
          ...base,
          color: '#fff',
          textShadow: [
            '2px 2px 0 #a855f7',
            '4px 4px 0 #7c3aed',
            '6px 6px 0 #5b21b6',
            '8px 8px 12px rgba(0,0,0,0.6)',
          ].join(', '),
        }
      default:
        return base
    }
  }

  const buildCode = () => {
    switch (mode) {
      case 'gradient':
        return `.text {\n  background: linear-gradient(${gradAngle}deg, ${g.from}, ${g.to});\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}`
      case 'stroke':
        return `.text {\n  color: transparent;\n  -webkit-text-stroke: ${strokeW}px ${strokeColor};\n}`
      case 'neon': {
        const s = neonSpread
        const lines = [
          `  text-shadow:`,
          `    0 0 ${Math.round(s * 0.4)}px ${neonColor},`,
          `    0 0 ${s}px ${neonColor},`,
          `    0 0 ${s * 2}px ${neonColor},`,
          `    0 0 ${s * 4}px ${neonColor};`,
        ]
        return `.text {\n  color: ${neonColor};\n${lines.join('\n')}\n}`
      }
      case 'emboss':
        return `.text {\n  color: rgba(255,255,255,0.9);\n  text-shadow:\n    -1px -1px 0 rgba(0,0,0,0.4),\n    1px 1px 0 rgba(255,255,255,0.15),\n    2px 2px 4px rgba(0,0,0,0.5);\n}`
      case 'retro':
        return `.text {\n  color: #fff;\n  text-shadow:\n    2px 2px 0 #a855f7,\n    4px 4px 0 #7c3aed,\n    6px 6px 0 #5b21b6,\n    8px 8px 12px rgba(0,0,0,0.6);\n}`
      default:
        return ''
    }
  }

  return (
    <>
      <SEOMeta title="Text Effects" description="CSS advanced text effects — gradient text, text-stroke, neon glow, emboss, retro 3D shadow." path="/tools/text-effects" />
      <ToolLayout
        name="Text Effects"
        category="Typography"
        description="Craft advanced CSS text effects — gradient, stroke, neon, emboss, retro"
        declarations={[]}
        codeOverride={buildCode()}
        preview={
          <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120, background: mode === 'neon' ? 'rgba(0,0,0,0.35)' : 'transparent', borderRadius: 8 }}>
            <span style={getStyle()}>CSS Tools</span>
          </div>
        }
      >
        <ButtonGroup label="Effect Mode" options={MODES} value={mode} onChange={setMode} />
        <Slider label="Font Size" min={24} max={96} step={2} value={fontSize} onChange={setFontSize} unit="px" />
        {mode === 'gradient' && (
          <>
            <ButtonGroup
              label="Gradient Preset"
              options={GRADIENTS.map((g, i) => ({ value: String(i), label: g.label }))}
              value={String(gradIdx)}
              onChange={v => setGradIdx(Number(v))}
            />
            <Slider label="Angle" min={0} max={360} step={5} value={gradAngle} onChange={setGradAngle} unit="°" />
          </>
        )}
        {mode === 'stroke' && (
          <>
            <Slider label="Stroke Width" min={1} max={8} step={0.5} value={strokeW} onChange={setStrokeW} unit="px" />
            <ColorInput label="Stroke Color" value={strokeColor} onChange={setStrokeColor} />
          </>
        )}
        {mode === 'neon' && (
          <>
            <ColorInput label="Glow Color" value={neonColor} onChange={setNeonColor} />
            <Slider label="Glow Spread" min={4} max={40} step={2} value={neonSpread} onChange={setNeonSpread} unit="px" />
          </>
        )}
      </ToolLayout>
    </>
  )
}
