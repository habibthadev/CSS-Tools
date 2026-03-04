export default function ButtonGroup({ label, options, value, onChange, icons = false }) {
  return (
    <div className="control-group">
      {label && <div className="control-group__label"><span>{label}</span></div>}
      <div className="btn-group">
        {options.map((opt) => {
          const optValue = typeof opt === 'string' ? opt : opt.value
          const optLabel = typeof opt === 'string' ? opt : opt.label
          const OptIcon = typeof opt === 'object' ? opt.icon : null
          return (
            <button
              key={optValue}
              className={`btn-group__btn${value === optValue ? ' active' : ''}`}
              onClick={() => onChange(optValue)}
              title={optLabel}
            >
              {OptIcon && <OptIcon size={13} />}
              {!icons && optLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}
