import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import Slider from '../../components/Slider'
import ColorInput from '../../components/ColorInput'
import SEOMeta from '../../components/SEOMeta'

function FilterPreview({ filterValue }) {
  return (
    <div
      className="preview-filter-img"
      style={{ filter: filterValue }}
    />
  )
}

function createFilterTool({ name, slug, description, filterFn, sliders, seo }) {
  return function FilterTool() {
    const initState = {}
    sliders.forEach((s) => { initState[s.key] = s.default })
    const [state, setState] = useState(initState)

    const set = (key) => (v) => setState((prev) => ({ ...prev, [key]: v }))

    const filterValue = filterFn(state)

    return (
      <>
        <SEOMeta title={name} description={seo} path={`/tools/${slug}`} />
        <ToolLayout
          name={name}
          category="Filters"
          description={description}
          declarations={[{ property: 'filter', value: filterValue }]}
          preview={<FilterPreview filterValue={filterValue} />}
        >
          {sliders.map((s) => (
            <Slider
              key={s.key}
              label={s.label}
              min={s.min}
              max={s.max}
              step={s.step}
              value={state[s.key]}
              onChange={set(s.key)}
              unit={s.unit || ''}
              displayValue={s.displayValue ? s.displayValue(state[s.key]) : undefined}
            />
          ))}
        </ToolLayout>
      </>
    )
  }
}

export const Blur = createFilterTool({
  name: 'Blur',
  slug: 'blur',
  description: 'Apply Gaussian blur filter',
  seo: 'CSS filter blur generator with live preview.',
  filterFn: ({ v }) => `blur(${v}px)`,
  sliders: [{ key: 'v', label: 'Blur Radius', min: 0, max: 20, step: 0.5, default: 4, unit: 'px' }],
})

export const Brightness = createFilterTool({
  name: 'Brightness',
  slug: 'brightness',
  description: 'Adjust brightness level',
  seo: 'CSS filter brightness generator.',
  filterFn: ({ v }) => `brightness(${v}%)`,
  sliders: [{ key: 'v', label: 'Brightness', min: 0, max: 300, step: 1, default: 100, unit: '%' }],
})

export const Contrast = createFilterTool({
  name: 'Contrast',
  slug: 'contrast',
  description: 'Adjust contrast level',
  seo: 'CSS filter contrast generator.',
  filterFn: ({ v }) => `contrast(${v}%)`,
  sliders: [{ key: 'v', label: 'Contrast', min: 0, max: 300, step: 1, default: 100, unit: '%' }],
})

export const Grayscale = createFilterTool({
  name: 'Grayscale',
  slug: 'grayscale',
  description: 'Convert colors to grayscale',
  seo: 'CSS filter grayscale generator.',
  filterFn: ({ v }) => `grayscale(${v}%)`,
  sliders: [{ key: 'v', label: 'Amount', min: 0, max: 100, step: 1, default: 0, unit: '%' }],
})

export const HueRotate = createFilterTool({
  name: 'Hue Rotate',
  slug: 'hue-rotate',
  description: 'Rotate hue around the color wheel',
  seo: 'CSS filter hue-rotate generator.',
  filterFn: ({ v }) => `hue-rotate(${v}deg)`,
  sliders: [{ key: 'v', label: 'Angle', min: 0, max: 360, step: 1, default: 0, unit: 'deg' }],
})

export const Invert = createFilterTool({
  name: 'Invert',
  slug: 'invert',
  description: 'Invert color values',
  seo: 'CSS filter invert generator.',
  filterFn: ({ v }) => `invert(${v}%)`,
  sliders: [{ key: 'v', label: 'Amount', min: 0, max: 100, step: 1, default: 0, unit: '%' }],
})

export const Saturate = createFilterTool({
  name: 'Saturate',
  slug: 'saturate',
  description: 'Boost or reduce color saturation',
  seo: 'CSS filter saturate generator.',
  filterFn: ({ v }) => `saturate(${v}%)`,
  sliders: [{ key: 'v', label: 'Saturation', min: 0, max: 400, step: 1, default: 100, unit: '%' }],
})

export const Sepia = createFilterTool({
  name: 'Sepia',
  slug: 'sepia',
  description: 'Apply vintage sepia effect',
  seo: 'CSS filter sepia generator.',
  filterFn: ({ v }) => `sepia(${v}%)`,
  sliders: [{ key: 'v', label: 'Amount', min: 0, max: 100, step: 1, default: 0, unit: '%' }],
})
