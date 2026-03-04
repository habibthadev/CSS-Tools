import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import ButtonGroup from '../../components/ButtonGroup'

const CURSORS = [
  { value: 'default', label: 'Default' },
  { value: 'pointer', label: 'Pointer' },
  { value: 'crosshair', label: 'Crosshair' },
  { value: 'move', label: 'Move' },
  { value: 'grab', label: 'Grab' },
  { value: 'grabbing', label: 'Grabbing' },
  { value: 'text', label: 'Text' },
  { value: 'wait', label: 'Wait' },
  { value: 'help', label: 'Help' },
  { value: 'not-allowed', label: 'Not Allowed' },
  { value: 'no-drop', label: 'No Drop' },
  { value: 'zoom-in', label: 'Zoom In' },
  { value: 'zoom-out', label: 'Zoom Out' },
  { value: 'col-resize', label: 'Col Resize' },
  { value: 'row-resize', label: 'Row Resize' },
  { value: 'e-resize', label: 'E Resize' },
  { value: 'n-resize', label: 'N Resize' },
  { value: 'ne-resize', label: 'NE Resize' },
  { value: 'nw-resize', label: 'NW Resize' },
  { value: 'all-scroll', label: 'All Scroll' },
  { value: 'cell', label: 'Cell' },
  { value: 'copy', label: 'Copy' },
  { value: 'context-menu', label: 'Context Menu' },
  { value: 'progress', label: 'Progress' },
  { value: 'none', label: 'None' },
]

export default function CSSCursor() {
  const [cursor, setCursor] = useState('pointer')

  const declarations = [{ property: 'cursor', value: cursor }]

  const previewStyle = {
    width: '100%',
    height: 140,
    background: 'var(--surface-overlay)',
    border: '1px dashed rgba(168,85,247,0.3)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor,
    fontSize: 14,
    color: 'var(--text-secondary)',
    userSelect: 'none',
    transition: 'cursor 0.1s',
  }

  return (
    <>
      <SEOMeta title="CSS Cursor" description="CSS cursor property generator — all 25+ cursor types with live preview." path="/tools/cursor" />
      <ToolLayout
        name="CSS Cursor"
        category="Advanced"
        description="Pick any CSS cursor value and see it instantly on the preview area"
        declarations={declarations}
        preview={<div style={previewStyle}>Move your cursor here</div>}
      >
        <ButtonGroup label="Cursor" options={CURSORS} value={cursor} onChange={setCursor} />
      </ToolLayout>
    </>
  )
}
