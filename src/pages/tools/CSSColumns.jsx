import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import Slider from '../../components/Slider'
import ButtonGroup from '../../components/ButtonGroup'
import ColorInput from '../../components/ColorInput'

const RULE_STYLES = ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge']

const LOREM = 'CSS multi-column layout lets text flow naturally across columns like a newspaper. Content balances automatically between columns giving your layout a polished editorial feel without JavaScript. Use column-gap and column-rule to control spacing and separation between columns. Perfect for article text, card content, and reading-optimized layouts that feel structured yet natural.'

export default function CSSColumns() {
  const [count, setCount] = useState(2)
  const [gap, setGap] = useState(24)
  const [ruleWidth, setRuleWidth] = useState(1)
  const [ruleStyle, setRuleStyle] = useState('solid')
  const [ruleColor, setRuleColor] = useState('#a855f7')

  const ruleVal = ruleStyle === 'none' ? 'none' : `${ruleWidth}px ${ruleStyle} ${ruleColor}`
  const declarations = [
    { property: 'column-count', value: `${count}` },
    { property: 'column-gap', value: `${gap}px` },
    { property: 'column-rule', value: ruleVal },
  ]

  const previewStyle = {
    columnCount: count,
    columnGap: `${gap}px`,
    columnRule: ruleVal,
    fontSize: '13px',
    lineHeight: 1.7,
    color: 'var(--text-secondary)',
    transition: 'all 0.2s',
    width: '100%',
  }

  return (
    <>
      <SEOMeta title="CSS Columns" description="CSS multi-column layout generator with column-count, gap, and column-rule." path="/tools/columns" />
      <ToolLayout
        name="CSS Columns"
        category="Layout"
        description="Build multi-column layouts like newspapers and magazines"
        declarations={declarations}
        preview={<div style={previewStyle}>{LOREM}</div>}
      >
        <Slider label="Column Count" min={1} max={6} step={1} value={count} onChange={setCount} unit="" />
        <Slider label="Column Gap" min={0} max={80} step={2} value={gap} onChange={setGap} unit="px" />
        <ButtonGroup label="Rule Style" options={RULE_STYLES} value={ruleStyle} onChange={setRuleStyle} />
        {ruleStyle !== 'none' && (
          <>
            <Slider label="Rule Width" min={1} max={8} step={1} value={ruleWidth} onChange={setRuleWidth} unit="px" />
            <ColorInput label="Rule Color" value={ruleColor} onChange={setRuleColor} />
          </>
        )}
      </ToolLayout>
    </>
  )
}
