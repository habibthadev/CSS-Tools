import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'

const WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900]
const WEIGHT_LABELS = { 100: 'Thin', 200: 'ExtraLight', 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold', 900: 'Black' }

export default function FontWeight() {
  const [value, setValue] = useState(400)

  return (
    <>
      <SEOMeta title="Font Weight" description="CSS font-weight generator." path="/tools/font-weight" />
      <ToolLayout
        name="Font Weight"
        category="Typography"
        description="Set font-weight from thin to heavy"
        declarations={[{ property: 'font-weight', value: String(value) }]}
        preview={
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: value, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {WEIGHT_LABELS[value]}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
              font-weight: {value}
            </div>
          </div>
        }
      >
        <div className="control-group">
          <div className="control-group__label">
            <span>Weight</span>
            <span className="control-group__label-value">{value} — {WEIGHT_LABELS[value]}</span>
          </div>
          <div className="btn-group" style={{ flexWrap: 'wrap' }}>
            {WEIGHTS.map((w) => (
              <button
                key={w}
                className={`btn-group__btn${value === w ? ' active' : ''}`}
                onClick={() => setValue(w)}
                style={{ fontWeight: w, minWidth: '36px' }}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </ToolLayout>
    </>
  )
}
