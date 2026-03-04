import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'

const FLOAT_OPTS = ['left', 'right', 'none']
const CLEAR_OPTS = ['none', 'left', 'right', 'both']

const LOREM = 'The float CSS property places an element on the left or right side of its container, allowing text and inline elements to wrap around it. A floated element is taken out of the normal document flow, though it still remains part of the flow. Text and other inline content will flow alongside the floated element, creating classic editorial layouts.'

export default function CSSFloat() {
  const [float, setFloat]   = useState('left')
  const [width, setWidth]   = useState(100)
  const [margin, setMargin] = useState(14)
  const [clear, setClear]   = useState('none')

  const declarations = [
    { property: 'float', value: float },
    ...(clear !== 'none' ? [{ property: 'clear', value: clear }] : []),
  ]

  return (
    <>
      <SEOMeta title="CSS Float" description="CSS float and clear property builder with live text-wrap preview." path="/tools/float" />
      <ToolLayout
        name="CSS Float"
        category="Positioning"
        description="Float elements left or right and see text flow around them in real time"
        declarations={declarations}
        preview={
          <div
            style={{
              maxWidth: 320,
              width: '100%',
              background: 'rgba(168,85,247,0.04)',
              border: '1px solid rgba(168,85,247,0.15)',
              borderRadius: 8,
              padding: 16,
              fontSize: 12,
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              overflow: 'hidden',
            }}
          >
            {float !== 'none' && (
              <div
                style={{
                  float,
                  width: `${width}px`,
                  height: 80,
                  background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  borderRadius: 6,
                  marginRight: float === 'left'  ? margin : 0,
                  marginLeft:  float === 'right' ? margin : 0,
                  marginBottom: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 11,
                  boxShadow: '0 2px 12px rgba(168,85,247,0.35)',
                }}
              >
                float: {float}
              </div>
            )}
            <p style={{ margin: 0 }}>{LOREM}</p>
            {clear !== 'none' && (
              <div
                style={{
                  clear,
                  borderTop: '1px dashed rgba(168,85,247,0.3)',
                  marginTop: 8,
                  paddingTop: 8,
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                clear: {clear}
              </div>
            )}
          </div>
        }
      >
        <ButtonGroup label="Float" options={FLOAT_OPTS} value={float} onChange={setFloat} />
        {float !== 'none' && (
          <>
            <Slider label="Float Width" min={60} max={180} step={4} value={width}  onChange={setWidth}  unit="px" />
            <Slider label="Margin"      min={0}  max={32}  step={2} value={margin} onChange={setMargin} unit="px" />
          </>
        )}
        <ButtonGroup label="Clear" options={CLEAR_OPTS} value={clear} onChange={setClear} />
      </ToolLayout>
    </>
  )
}
