function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean
  if (full.length !== 6) return null
  const n = parseInt(full, 16)
  if (isNaN(n)) return null
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
}

export { hexToRgb, rgbToHex }

export default function ColorInput({ label, value, onChange }) {
  const handleHexChange = (raw) => {
    const v = raw.startsWith('#') ? raw : `#${raw}`
    onChange(v)
  }

  return (
    <div className="control-group">
      {label && <div className="control-group__label"><span>{label}</span></div>}
      <div className="color-input-group">
        <div className="color-input-group__swatch">
          <div
            className="color-input-group__swatch-preview"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value.length === 7 ? value : '#8b5cf6'}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <input
          type="text"
          className="color-input-group__hex"
          value={value}
          onChange={(e) => handleHexChange(e.target.value)}
          spellCheck={false}
          maxLength={9}
        />
      </div>
    </div>
  )
}
