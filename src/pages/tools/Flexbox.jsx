import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import ButtonGroup from '../../components/ButtonGroup'
import Slider from '../../components/Slider'
import SEOMeta from '../../components/SEOMeta'

const ITEM_COUNT = 5

export default function Flexbox() {
  const [direction, setDirection] = useState('row')
  const [wrap, setWrap] = useState('nowrap')
  const [justifyContent, setJustifyContent] = useState('flex-start')
  const [alignItems, setAlignItems] = useState('stretch')
  const [gap, setGap] = useState(8)

  const declarations = [
    { property: 'display', value: 'flex' },
    { property: 'flex-direction', value: direction },
    { property: 'flex-wrap', value: wrap },
    { property: 'justify-content', value: justifyContent },
    { property: 'align-items', value: alignItems },
    { property: 'gap', value: `${gap}px` },
  ]

  const previewStyle = {
    display: 'flex',
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent,
    alignItems,
    gap: `${gap}px`,
    padding: '16px',
    minHeight: '140px',
    width: '100%',
    background: 'var(--surface-overlay)',
    border: '1px solid var(--border-default)',
    borderRadius: '8px',
  }

  return (
    <>
      <SEOMeta title="Flexbox" description="Visual CSS flexbox builder." path="/tools/flexbox" />
      <ToolLayout
        name="Flexbox"
        category="Layout"
        description="Visual CSS flexbox builder with all properties"
        declarations={declarations}
        preview={
          <div style={previewStyle}>
            {Array.from({ length: ITEM_COUNT }, (_, i) => (
              <div key={i} className="flex-demo-container__item">
                {i + 1}
              </div>
            ))}
          </div>
        }
      >
        <ButtonGroup label="Direction" options={['row', 'row-reverse', 'column', 'column-reverse']} value={direction} onChange={setDirection} />
        <ButtonGroup label="Wrap" options={['nowrap', 'wrap', 'wrap-reverse']} value={wrap} onChange={setWrap} />
        <ButtonGroup
          label="Justify Content"
          options={['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']}
          value={justifyContent}
          onChange={setJustifyContent}
        />
        <ButtonGroup
          label="Align Items"
          options={['flex-start', 'flex-end', 'center', 'baseline', 'stretch']}
          value={alignItems}
          onChange={setAlignItems}
        />
        <Slider label="Gap" min={0} max={40} step={1} value={gap} onChange={setGap} unit="px" />
      </ToolLayout>
    </>
  )
}
