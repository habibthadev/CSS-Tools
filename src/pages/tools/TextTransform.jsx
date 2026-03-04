import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import ButtonGroup from '../../components/ButtonGroup'
import SEOMeta from '../../components/SEOMeta'

const OPTIONS = ['none', 'uppercase', 'lowercase', 'capitalize']

export default function TextTransform() {
  const [value, setValue] = useState('none')

  return (
    <>
      <SEOMeta title="Text Transform" description="CSS text-transform generator." path="/tools/text-transform" />
      <ToolLayout
        name="Text Transform"
        category="Typography"
        description="Transform text casing with uppercase, lowercase, capitalize"
        declarations={[{ property: 'text-transform', value }]}
        preview={
          <div style={{ fontSize: '24px', fontWeight: 600, textTransform: value, color: 'var(--text-primary)', textAlign: 'center', letterSpacing: value === 'uppercase' ? '0.05em' : 'normal' }}>
            The Quick Brown Fox
          </div>
        }
      >
        <ButtonGroup label="Transform" options={OPTIONS} value={value} onChange={setValue} />
      </ToolLayout>
    </>
  )
}
