import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import ButtonGroup from '../../components/ButtonGroup'
import Slider from '../../components/Slider'
import ColorInput from '../../components/ColorInput'

const LIST_TYPES = [
  { value: 'disc', label: 'disc' },
  { value: 'circle', label: 'circle' },
  { value: 'square', label: 'square' },
  { value: 'decimal', label: 'decimal' },
  { value: 'lower-alpha', label: 'lower-alpha' },
  { value: 'upper-alpha', label: 'upper-alpha' },
  { value: 'lower-roman', label: 'lower-roman' },
  { value: 'upper-roman', label: 'upper-roman' },
  { value: 'lower-greek', label: 'lower-greek' },
  { value: 'none', label: 'none' },
]
const POSITIONS = ['outside', 'inside']
const ITEMS = ['CSS Grid', 'Flexbox', 'Custom Properties', 'Cascade Layers', 'Container Queries']

export default function CSSLists() {
  const [type, setType]         = useState('disc')
  const [position, setPosition] = useState('outside')
  const [markerColor, setMarkerColor] = useState('#a855f7')
  const [gap, setGap]           = useState(6)
  const [fontSize, setFontSize] = useState(14)

  const declarations = [
    { property: 'list-style-type',     value: type },
    { property: 'list-style-position', value: position },
  ]

  const styleTag = `<style>.preview-list ::marker { color: ${markerColor}; }</style>`

  return (
    <>
      <SEOMeta title="CSS Lists" description="Style CSS lists — list-style-type, position, and marker color." path="/tools/lists" />
      <ToolLayout
        name="CSS Lists"
        category="Advanced"
        description="Control list markers — type, position, and ::marker color"
        declarations={declarations}
        codeOverride={`.list {\n  list-style-type: ${type};\n  list-style-position: ${position};\n}\n\n.list ::marker {\n  color: ${markerColor};\n}`}
        preview={
          <div style={{ padding: 8 }}>
            <style>{`.preview-list ::marker { color: ${markerColor}; font-size: ${fontSize * 0.9}px; }`}</style>
            <ul
              className="preview-list"
              style={{
                listStyleType: type,
                listStylePosition: position,
                padding: position === 'inside' ? '0 0 0 4px' : '0 0 0 24px',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: `${gap}px`,
              }}
            >
              {ITEMS.map(item => (
                <li
                  key={item}
                  style={{
                    fontSize: `${fontSize}px`,
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <ButtonGroup label="List Style Type" options={LIST_TYPES} value={type} onChange={setType} />
        <ButtonGroup label="List Style Position" options={POSITIONS} value={position} onChange={setPosition} />
        <ColorInput label="Marker Color" value={markerColor} onChange={setMarkerColor} />
        <Slider label="Row Gap" min={0} max={24} step={2} value={gap} onChange={setGap} unit="px" />
        <Slider label="Font Size" min={12} max={22} step={1} value={fontSize} onChange={setFontSize} unit="px" />
      </ToolLayout>
    </>
  )
}
