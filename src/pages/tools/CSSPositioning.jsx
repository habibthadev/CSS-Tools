import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'

const POSITIONS = ['static', 'relative', 'absolute', 'fixed', 'sticky']

export default function CSSPositioning() {
  const [position, setPosition] = useState('absolute')
  const [top, setTop]           = useState(20)
  const [right, setRight]       = useState(20)
  const [bottom, setBotom]      = useState(20)
  const [left, setLeft]         = useState(20)
  const [sides, setSides]       = useState(['top', 'left'])

  const toggleSide = s => setSides(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  )

  const offsets = {}
  if (position !== 'static') {
    if (sides.includes('top'))    offsets.top    = top
    if (sides.includes('right'))  offsets.right  = right
    if (sides.includes('bottom')) offsets.bottom = bottom
    if (sides.includes('left'))   offsets.left   = left
  }

  const declarations = [
    { property: 'position', value: position },
    ...Object.entries(offsets).map(([k, v]) => ({ property: k, value: `${v}px` })),
  ]

  const infoMap = {
    static:   'Default flow. top/right/bottom/left have no effect.',
    relative: 'Offset from its normal position. Surrounding elements are unaffected.',
    absolute: 'Removed from flow. Positioned relative to nearest positioned ancestor.',
    fixed:    'Removed from flow. Positioned relative to the viewport.',
    sticky:   'Flows normally until it hits the offset threshold, then sticks.',
  }

  return (
    <>
      <SEOMeta title="CSS Positioning" description="Visual CSS position property builder — static, relative, absolute, fixed, sticky." path="/tools/positioning" />
      <ToolLayout
        name="CSS Positioning"
        category="Positioning"
        description="Understand and build CSS position declarations with offset controls"
        declarations={declarations}
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', width: '100%' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 320,
                height: 200,
                background: 'rgba(168,85,247,0.06)',
                border: '1px dashed rgba(168,85,247,0.25)',
                borderRadius: 8,
                overflow: position === 'fixed' ? 'hidden' : 'visible',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  positioned ancestor
                </span>
              </div>
              <div
                style={{
                  position: position === 'fixed' ? 'absolute' : position,
                  ...(position !== 'static' ? Object.fromEntries(
                    Object.entries(offsets).map(([k, v]) => [k, `${v}px`])
                  ) : {}),
                  width: 80,
                  height: 48,
                  background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(168,85,247,0.4)',
                  zIndex: 2,
                }}
              >
                {position}
              </div>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, maxWidth: 300, textAlign: 'center', lineHeight: 1.5 }}>
              {infoMap[position]}
            </p>
          </div>
        }
      >
        <ButtonGroup label="Position" options={POSITIONS} value={position} onChange={setPosition} />
        {position !== 'static' && (
          <>
            <div className="control-group">
              <div className="control-group__label"><span>Active Offsets</span></div>
              <div className="btn-group" style={{ flexWrap: 'wrap', gap: 6 }}>
                {['top','right','bottom','left'].map(s => (
                  <button
                    key={s}
                    className={`btn-group__btn${sides.includes(s) ? ' active' : ''}`}
                    onClick={() => toggleSide(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {sides.includes('top')    && <Slider label="Top"    min={-100} max={200} step={2} value={top}    onChange={setTop}    unit="px" />}
            {sides.includes('right')  && <Slider label="Right"  min={-100} max={200} step={2} value={right}  onChange={setRight}  unit="px" />}
            {sides.includes('bottom') && <Slider label="Bottom" min={-100} max={200} step={2} value={bottom} onChange={setBotom}  unit="px" />}
            {sides.includes('left')   && <Slider label="Left"   min={-100} max={200} step={2} value={left}   onChange={setLeft}   unit="px" />}
          </>
        )}
      </ToolLayout>
    </>
  )
}
