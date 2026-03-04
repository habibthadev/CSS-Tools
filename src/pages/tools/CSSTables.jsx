import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'
import ColorInput from '../../components/ColorInput'

const COLLAPSE_OPTS  = ['collapse', 'separate']
const LAYOUT_OPTS    = ['auto', 'fixed']
const CAPTION_OPTS   = ['top', 'bottom']

const HEADERS = ['Property', 'Value', 'Support']
const ROWS = [
  ['border-collapse', 'collapse', '✓ All'],
  ['table-layout',    'fixed',    '✓ All'],
  ['border-spacing',  '8px',      '✓ All'],
]

export default function CSSTables() {
  const [collapse,     setCollapse]     = useState('collapse')
  const [layout,       setLayout]       = useState('auto')
  const [caption,      setCaption]      = useState('top')
  const [spacing,      setSpacing]      = useState(8)
  const [cellPad,      setCellPad]      = useState(10)
  const [headerBg,     setHeaderBg]     = useState('#a855f7')
  const [stripedBg,    setStripedBg]    = useState('#1e1033')

  const declarations = [
    { property: 'border-collapse', value: collapse },
    { property: 'table-layout',    value: layout },
    ...(collapse === 'separate' ? [{ property: 'border-spacing', value: `${spacing}px` }] : []),
  ]

  return (
    <>
      <SEOMeta title="CSS Tables" description="CSS table styling — border-collapse, border-spacing, table-layout, and caption-side." path="/tools/tables" />
      <ToolLayout
        name="CSS Tables"
        category="Advanced"
        description="Style HTML tables with collapse, spacing, layout, and caption controls"
        declarations={declarations}
        preview={
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: collapse,
                tableLayout: layout,
                ...(collapse === 'separate' ? { borderSpacing: `${spacing}px` } : {}),
                fontSize: 12,
              }}
            >
              <caption
                style={{
                  captionSide: caption,
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  paddingBottom: caption === 'top' ? 6 : 0,
                  paddingTop: caption === 'bottom' ? 6 : 0,
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'left',
                }}
              >
                css-table-example
              </caption>
              <thead>
                <tr>
                  {HEADERS.map(h => (
                    <th key={h}
                      style={{
                        background: headerBg,
                        color: 'white',
                        fontWeight: 600,
                        padding: `${cellPad}px ${cellPad + 4}px`,
                        textAlign: 'left',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: 11,
                        letterSpacing: '0.3px',
                      }}
                    >{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}
                        style={{
                          padding: `${cellPad}px ${cellPad + 4}px`,
                          background: i % 2 === 0 ? 'transparent' : stripedBg,
                          color: j === 0 ? 'var(--accent)' : 'var(--text-secondary)',
                          fontFamily: j < 2 ? 'var(--font-mono)' : undefined,
                          fontSize: 11,
                          border: '1px solid var(--border)',
                        }}
                      >{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      >
        <ButtonGroup label="Border Collapse" options={COLLAPSE_OPTS} value={collapse} onChange={setCollapse} />
        {collapse === 'separate' && (
          <Slider label="Border Spacing" min={0} max={24} step={2} value={spacing} onChange={setSpacing} unit="px" />
        )}
        <ButtonGroup label="Table Layout" options={LAYOUT_OPTS} value={layout} onChange={setLayout} />
        <ButtonGroup label="Caption Side" options={CAPTION_OPTS} value={caption} onChange={setCaption} />
        <Slider label="Cell Padding" min={4} max={24} step={2} value={cellPad} onChange={setCellPad} unit="px" />
        <ColorInput label="Header Color" value={headerBg} onChange={setHeaderBg} />
        <ColorInput label="Stripe Color" value={stripedBg} onChange={setStripedBg} />
      </ToolLayout>
    </>
  )
}
