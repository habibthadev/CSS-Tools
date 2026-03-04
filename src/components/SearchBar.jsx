import { IconSearch, IconX } from '@tabler/icons-react'

export default function SearchBar({ value, onChange, placeholder = 'Search...', large = false }) {
  if (large) {
    return (
      <div className="search-bar-lg">
        <IconSearch size={16} className="search-bar-lg__icon" />
        <input
          type="text"
          className="search-bar-lg__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value ? (
          <button className="search-bar-lg__clear" onClick={() => onChange('')} aria-label="Clear search">
            <IconX size={10} />
          </button>
        ) : (
          <div className="search-bar-lg__kbd">
            <kbd>/</kbd>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="search-bar">
      <IconSearch size={13} className="search-bar__icon" />
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Clear">
          <IconX size={9} />
        </button>
      )}
    </div>
  )
}
