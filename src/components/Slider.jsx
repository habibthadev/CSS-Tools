export default function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = '',
  color = 'default',
  displayValue,
}) {
  const progress = `${((value - min) / (max - min)) * 100}%`

  return (
    <div className="control-group">
      <div className="control-group__label">
        <span>{label}</span>
        <span className="control-group__label-value">
          {displayValue !== undefined ? displayValue : `${value}${unit}`}
        </span>
      </div>
      <div className="slider-input">
        <div className="slider-input__track">
          <input
            type="range"
            className={`slider-input__range ${color}`}
            min={min}
            max={max}
            step={step}
            value={value}
            style={{ '--progress': progress }}
            onChange={(e) => onChange(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
