import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import {
  IconAlignLeft, IconAlignCenter, IconAlignRight, IconAlignJustified,
} from '@tabler/icons-react'

const OPTIONS = [
  { value: 'left', label: 'Left', icon: IconAlignLeft },
  { value: 'center', label: 'Center', icon: IconAlignCenter },
  { value: 'right', label: 'Right', icon: IconAlignRight },
  { value: 'justify', label: 'Justify', icon: IconAlignJustified },
]

export default function TextAlign() {
  const [value, setValue] = useState('left')

  return (
    <>
      <SEOMeta title="Text Align" description="CSS text-align generator." path="/tools/text-align" />
      <ToolLayout
        name="Text Align"
        category="Typography"
        description="Align text content left, center, right, or justify"
        declarations={[{ property: 'text-align', value }]}
        preview={
          <div style={{ width: '100%', maxWidth: '300px', textAlign: value, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The quick brown fox jumps over the lazy dog. Good typography starts with proper alignment.
          </div>
        }
      >
        <div className="control-group">
          <div className="control-group__label"><span>Alignment</span></div>
          <div className="btn-group">
            {OPTIONS.map((opt) => {
              const Icon = opt.icon
              return (
                <button
                  key={opt.value}
                  className={`btn-group__btn${value === opt.value ? ' active' : ''}`}
                  onClick={() => setValue(opt.value)}
                  title={opt.label}
                >
                  <Icon size={14} />
                </button>
              )
            })}
          </div>
        </div>
      </ToolLayout>
    </>
  )
}
