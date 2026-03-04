import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import ButtonGroup from '../../components/ButtonGroup'

const WRITING_MODES = [
  { value: 'horizontal-tb', label: 'Horizontal TB' },
  { value: 'vertical-rl', label: 'Vertical RL' },
  { value: 'vertical-lr', label: 'Vertical LR' },
]

const TEXT_ORIENTATIONS = [
  { value: 'mixed', label: 'Mixed' },
  { value: 'upright', label: 'Upright' },
  { value: 'sideways', label: 'Sideways' },
]

const DIRECTIONS = [
  { value: 'ltr', label: 'LTR' },
  { value: 'rtl', label: 'RTL' },
]

export default function WritingMode() {
  const [mode, setMode] = useState('horizontal-tb')
  const [orientation, setOrientation] = useState('mixed')
  const [direction, setDirection] = useState('ltr')

  const isVertical = mode.startsWith('vertical')
  const declarations = [
    { property: 'writing-mode', value: mode },
    ...(isVertical ? [{ property: 'text-orientation', value: orientation }] : []),
    { property: 'direction', value: direction },
  ]

  const previewStyle = {
    writingMode: mode,
    textOrientation: isVertical ? orientation : undefined,
    direction,
    fontSize: 18,
    fontWeight: 600,
    color: 'var(--text-primary)',
    lineHeight: 1.6,
    padding: 16,
    maxHeight: 200,
    maxWidth: 280,
    transition: 'all 0.2s',
    letterSpacing: '-0.3px',
  }

  return (
    <>
      <SEOMeta title="Writing Mode" description="CSS writing-mode and text-orientation generator for vertical and RTL text layouts." path="/tools/writing-mode" />
      <ToolLayout
        name="Writing Mode"
        category="Advanced"
        description="Control text flow direction — horizontal, vertical, and bidirectional"
        declarations={declarations}
        preview={
          <div style={previewStyle}>
            The quick brown fox jumps over the lazy dog.
          </div>
        }
      >
        <ButtonGroup label="Writing Mode" options={WRITING_MODES} value={mode} onChange={setMode} />
        {isVertical && (
          <ButtonGroup label="Text Orientation" options={TEXT_ORIENTATIONS} value={orientation} onChange={setOrientation} />
        )}
        <ButtonGroup label="Direction" options={DIRECTIONS} value={direction} onChange={setDirection} />
      </ToolLayout>
    </>
  )
}
