import { IconSettings2 } from '@tabler/icons-react'
import CodeBlock from './CodeBlock'

export default function ToolLayout({ name, category, description, declarations, preview, children, codeOverride }) {
  return (
    <div className="tool-page">
      <div className="tool-page__header">
        <div className="tool-page__header-eyebrow">{category}</div>
        <h1 className="tool-page__header-title">{name}</h1>
        <p className="tool-page__header-desc">{description}</p>
      </div>
      <div className="tool-page__body">
        <div className="tool-page__controls-panel">
          <div className="tool-page__controls-panel-header">
            <IconSettings2 size={14} />
            <span>Controls</span>
          </div>
          <div className="tool-page__controls-panel-body">{children}</div>
        </div>
        <div className="tool-page__output-panel">
          <div className="tool-page__preview-card">
            <div className="tool-page__preview-card-header">
              <div className="tool-page__preview-card-header-dots">
                <span /><span /><span />
              </div>
              <span>Preview</span>
            </div>
            <div className="tool-page__preview-card-body">{preview}</div>
          </div>
          <CodeBlock declarations={declarations} codeOverride={codeOverride} />
        </div>
      </div>
    </div>
  )
}
