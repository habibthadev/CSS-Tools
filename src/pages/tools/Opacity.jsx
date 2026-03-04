import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

export default function Opacity() {
  const [value, setValue] = useState(0.8)

  return (
    <>
      <SEOMeta title="Opacity" description="CSS opacity generator." path="/tools/opacity" />
      <ToolLayout
        name="Opacity"
        category="Box Model"
        description="Control element transparency from 0 to 1"
        declarations={[{ property: 'opacity', value: value.toFixed(2) }]}
        preview={
          <div
            style={{
              width: '120px',
              height: '80px',
              background: 'var(--accent-muted)',
              border: '2px solid rgba(168,85,247,0.4)',
              borderRadius: '8px',
              opacity: value,
            }}
          />
        }
      >
        <Slider label="Opacity" min={0} max={1} step={0.01} value={value} onChange={setValue} displayValue={value.toFixed(2)} />
      </ToolLayout>
    </>
  )
}
