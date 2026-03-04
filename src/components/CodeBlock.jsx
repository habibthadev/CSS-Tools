import { IconCheck, IconCopy, IconCode } from '@tabler/icons-react'
import useAppStore from '../store/useAppStore'

function tokenizeLine(line) {
  const trimmed = line.trim()
  if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
    return [{ text: line, color: 'var(--text-muted)' }]
  }
  if (trimmed.startsWith('@keyframes') || trimmed.startsWith('@media') || trimmed.startsWith('@')) {
    return [{ text: line, color: 'var(--accent)' }]
  }
  if (trimmed === '}' || trimmed.endsWith('{')) {
    return [{ text: line, color: 'rgba(255,255,255,0.5)' }]
  }
  const colonIdx = line.indexOf(':')
  if (colonIdx > -1) {
    const prop = line.slice(0, colonIdx)
    const rest = line.slice(colonIdx)
    return [
      { text: prop, color: 'var(--code-prop)' },
      { text: rest, color: 'var(--code-value)' },
    ]
  }
  return [{ text: line, color: 'var(--text-secondary)' }]
}

export default function CodeBlock({ declarations, codeOverride }) {
  const { copiedId, setCopied } = useAppStore()
  const id = codeOverride
    ? codeOverride.slice(0, 80)
    : declarations.map((d) => `${d.property}:${d.value}`).join(';')
  const isCopied = copiedId === id

  const copyText = codeOverride || declarations.map((d) => `${d.property}: ${d.value};`).join('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = copyText
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    })
    setCopied(id)
  }

  return (
    <div className="tool-page__code-card">
      <div className="tool-page__code-card-header">
        <div className="tool-page__code-card-header-left">
          <IconCode size={14} />
          <span>CSS Output</span>
        </div>
        <button className={`copy-btn${isCopied ? ' copied' : ''}`} onClick={handleCopy}>
          {isCopied ? <IconCheck size={13} /> : <IconCopy size={13} />}
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="tool-page__code-card-body">
        {codeOverride ? (
          codeOverride.split('\n').map((line, i) => {
            const tokens = tokenizeLine(line)
            return (
              <div key={i} className="code-block__line">
                {tokens.map((tok, j) => (
                  <span key={j} style={{ color: tok.color }}>{tok.text}</span>
                ))}
              </div>
            )
          })
        ) : (
          declarations.map((d, i) => (
            <div key={i} className="code-block__line">
              <span className="code-block__line-prop">{d.property}</span>
              <span className="code-block__line-colon">:</span>
              <span className="code-block__line-value"> {d.value}</span>
              <span className="code-block__line-semi">;</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
