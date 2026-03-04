import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

const PRESET_COLUMNS = ['1fr 1fr', '1fr 1fr 1fr', 'repeat(4, 1fr)', '1fr 2fr', '1fr 3fr 1fr', 'repeat(auto-fit, minmax(100px, 1fr))']
const PRESET_ROWS = ['auto', 'auto auto', 'repeat(3, auto)', '80px 1fr 80px']

export default function Grid() {
  const [columns, setColumns] = useState('1fr 1fr 1fr')
  const [rows, setRows] = useState('auto')
  const [gap, setGap] = useState(8)
  const [itemCount, setItemCount] = useState(9)

  const declarations = [
    { property: 'display', value: 'grid' },
    { property: 'grid-template-columns', value: columns },
    { property: 'grid-template-rows', value: rows },
    { property: 'gap', value: `${gap}px` },
  ]

  const previewStyle = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap: `${gap}px`,
    padding: '12px',
    width: '100%',
    background: 'var(--surface-overlay)',
    border: '1px solid var(--border-default)',
    borderRadius: '8px',
  }

  return (
    <>
      <SEOMeta title="Grid" description="CSS grid layout builder." path="/tools/grid" />
      <ToolLayout
        name="Grid"
        category="Layout"
        description="CSS grid layout builder with template control"
        declarations={declarations}
        preview={
          <div style={previewStyle}>
            {Array.from({ length: itemCount }, (_, i) => (
              <div key={i} className="grid-demo-container__item">{i + 1}</div>
            ))}
          </div>
        }
      >
        <div className="control-group">
          <div className="control-group__label"><span>Template Columns</span></div>
          <input
            type="text"
            className="text-input"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            spellCheck={false}
          />
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
            {PRESET_COLUMNS.map((p) => (
              <button
                key={p}
                className={`btn-group__btn${columns === p ? ' active' : ''}`}
                style={{ fontSize: '10px', padding: '3px 7px', fontFamily: 'var(--font-mono)', height: 'auto', flex: 'none' }}
                onClick={() => setColumns(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="control-group">
          <div className="control-group__label"><span>Template Rows</span></div>
          <input
            type="text"
            className="text-input"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            spellCheck={false}
          />
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
            {PRESET_ROWS.map((p) => (
              <button
                key={p}
                className={`btn-group__btn${rows === p ? ' active' : ''}`}
                style={{ fontSize: '10px', padding: '3px 7px', fontFamily: 'var(--font-mono)', height: 'auto', flex: 'none' }}
                onClick={() => setRows(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <Slider label="Gap" min={0} max={32} step={1} value={gap} onChange={setGap} unit="px" />
        <Slider label="Items" min={1} max={20} step={1} value={itemCount} onChange={setItemCount} displayValue={String(itemCount)} />
      </ToolLayout>
    </>
  )
}
