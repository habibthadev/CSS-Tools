import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import ButtonGroup from '../../components/ButtonGroup'
import ColorInput from '../../components/ColorInput'
import SEOMeta from '../../components/SEOMeta'

export default function TextDecoration() {
  const [line, setLine] = useState('underline')
  const [style, setStyle] = useState('solid')
  const [color, setColor] = useState('#a855f7')

  const value = `${line} ${style} ${color}`

  return (
    <>
      <SEOMeta title="Text Decoration" description="CSS text-decoration generator." path="/tools/text-decoration" />
      <ToolLayout
        name="Text Decoration"
        category="Typography"
        description="Add underline, overline, or line-through decoration"
        declarations={[{ property: 'text-decoration', value }]}
        preview={
          <div style={{ fontSize: '22px', fontWeight: 500, textDecoration: value, color: 'var(--text-primary)', textAlign: 'center' }}>
            The quick brown fox
          </div>
        }
      >
        <ButtonGroup label="Line" options={['none', 'underline', 'overline', 'line-through']} value={line} onChange={setLine} />
        <ButtonGroup label="Style" options={['solid', 'dotted', 'dashed', 'wavy', 'double']} value={style} onChange={setStyle} />
        <ColorInput label="Color" value={color} onChange={setColor} />
      </ToolLayout>
    </>
  )
}
