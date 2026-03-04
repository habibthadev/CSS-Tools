import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import SEOMeta from '../../components/SEOMeta'
import ButtonGroup from '../../components/ButtonGroup'
import Slider from '../../components/Slider'

const SHAPES = [
  { value: 'circle', label: 'Circle' },
  { value: 'ellipse', label: 'Ellipse' },
  { value: 'inset', label: 'Inset' },
  { value: 'polygon-triangle', label: 'Triangle' },
  { value: 'polygon-diamond', label: 'Diamond' },
  { value: 'polygon-hexagon', label: 'Hexagon' },
  { value: 'polygon-arrow', label: 'Arrow' },
]

function buildClipPath(shape, params) {
  switch (shape) {
    case 'circle':
      return `circle(${params.circleR}% at ${params.circleX}% ${params.circleY}%)`
    case 'ellipse':
      return `ellipse(${params.ellipseRx}% ${params.ellipseRy}% at ${params.ellipseX}% ${params.ellipseY}%)`
    case 'inset':
      return `inset(${params.insetTop}% ${params.insetRight}% ${params.insetBottom}% ${params.insetLeft}% round ${params.insetRadius}px)`
    case 'polygon-triangle':
      return `polygon(50% 0%, 0% 100%, 100% 100%)`
    case 'polygon-diamond':
      return `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`
    case 'polygon-hexagon':
      return `polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`
    case 'polygon-arrow':
      return `polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)`
    default:
      return 'none'
  }
}

export default function ClipPath() {
  const [shape, setShape] = useState('circle')
  const [params, setParams] = useState({
    circleR: 50, circleX: 50, circleY: 50,
    ellipseRx: 50, ellipseRy: 40, ellipseX: 50, ellipseY: 50,
    insetTop: 10, insetRight: 10, insetBottom: 10, insetLeft: 10, insetRadius: 0,
  })

  const set = (key, val) => setParams(p => ({ ...p, [key]: val }))
  const value = buildClipPath(shape, params)
  const declarations = [{ property: 'clip-path', value }]

  const boxStyle = {
    width: 160,
    height: 160,
    background: 'linear-gradient(135deg, #a855f7, #6d28d9)',
    clipPath: value,
    transition: 'clip-path 0.2s ease',
  }

  return (
    <>
      <SEOMeta title="Clip Path" description="Visual CSS clip-path generator for circles, ellipses, insets and polygons." path="/tools/clip-path" />
      <ToolLayout
        name="Clip Path"
        category="Effects"
        description="Visual clip-path builder — circle, ellipse, inset, and polygon presets"
        declarations={declarations}
        preview={<div style={boxStyle} />}
      >
        <ButtonGroup label="Shape" options={SHAPES} value={shape} onChange={setShape} />
        {shape === 'circle' && (
          <>
            <Slider label="Radius" min={10} max={80} step={1} value={params.circleR} onChange={v => set('circleR', v)} unit="%" />
            <Slider label="Center X" min={0} max={100} step={1} value={params.circleX} onChange={v => set('circleX', v)} unit="%" />
            <Slider label="Center Y" min={0} max={100} step={1} value={params.circleY} onChange={v => set('circleY', v)} unit="%" />
          </>
        )}
        {shape === 'ellipse' && (
          <>
            <Slider label="Radius X" min={10} max={80} step={1} value={params.ellipseRx} onChange={v => set('ellipseRx', v)} unit="%" />
            <Slider label="Radius Y" min={10} max={80} step={1} value={params.ellipseRy} onChange={v => set('ellipseRy', v)} unit="%" />
            <Slider label="Center X" min={0} max={100} step={1} value={params.ellipseX} onChange={v => set('ellipseX', v)} unit="%" />
            <Slider label="Center Y" min={0} max={100} step={1} value={params.ellipseY} onChange={v => set('ellipseY', v)} unit="%" />
          </>
        )}
        {shape === 'inset' && (
          <>
            <Slider label="Top" min={0} max={45} step={1} value={params.insetTop} onChange={v => set('insetTop', v)} unit="%" />
            <Slider label="Right" min={0} max={45} step={1} value={params.insetRight} onChange={v => set('insetRight', v)} unit="%" />
            <Slider label="Bottom" min={0} max={45} step={1} value={params.insetBottom} onChange={v => set('insetBottom', v)} unit="%" />
            <Slider label="Left" min={0} max={45} step={1} value={params.insetLeft} onChange={v => set('insetLeft', v)} unit="%" />
            <Slider label="Border Radius" min={0} max={80} step={1} value={params.insetRadius} onChange={v => set('insetRadius', v)} unit="px" />
          </>
        )}
      </ToolLayout>
    </>
  )
}
