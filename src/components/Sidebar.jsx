import { Link, useLocation } from 'react-router-dom'
import { IconCode, IconBrandGithub, IconBrandX, IconLayoutGrid } from '@tabler/icons-react'
import { toolCategories } from '../data/tools'
import useAppStore from '../store/useAppStore'
import SearchBar from './SearchBar'

export default function Sidebar() {
  const location = useLocation()
  const { expandedCategories, toggleCategory, searchQuery, setSearchQuery, sidebarOpen } = useAppStore()

  const filtered = searchQuery.trim()
    ? toolCategories
        .map((cat) => ({
          ...cat,
          tools: cat.tools.filter((t) =>
            t.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.tools.length > 0)
    : toolCategories

  const isToolActive = (slug) => location.pathname === `/tools/${slug}`
  const isHome = location.pathname === '/'

  return (
    <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
      <Link to="/" className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <IconCode size={16} strokeWidth={2.5} />
        </div>
        <div className="sidebar__brand-text">
          <div className="sidebar__brand-text-name">CSS Tools</div>
          <div className="sidebar__brand-text-tagline">Interactive generator</div>
        </div>
      </Link>

      <div className="sidebar__search">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search tools..." />
      </div>

      <nav className="sidebar__nav">
        <Link to="/" className={`sidebar__all-tools${isHome ? ' active' : ''}`}>
          <IconLayoutGrid size={15} />
          All Tools
        </Link>
        <div className="sidebar__separator" />

        {filtered.map((cat) => {
          const CatIcon = cat.icon
          const isExpanded = searchQuery.trim() ? true : expandedCategories.has(cat.category)

          return (
            <div key={cat.slug} className="sidebar__category">
              <div
                className={`sidebar__category-header${isExpanded ? ' open' : ''}`}
                onClick={() => toggleCategory(cat.category)}
              >
                <div className="sidebar__category-header-left">
                  <CatIcon size={14} />
                  <span>{cat.category}</span>
                </div>
                <span className="sidebar__category-header-count">{cat.tools.length}</span>
              </div>
              <div
                className="sidebar__category-items"
                style={{ maxHeight: isExpanded ? `${cat.tools.length * 34}px` : '0' }}
              >
                {cat.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to={`/tools/${tool.slug}`}
                    className={`sidebar__tool-link${isToolActive(tool.slug) ? ' active' : ''}`}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__footer-links">
          <a href="https://github.com/habibthadev/css-tools" target="_blank" rel="noopener noreferrer" className="sidebar__footer-link" title="GitHub">
            <IconBrandGithub size={16} />
          </a>
          <a href="https://x.com/habibthadev" target="_blank" rel="noopener noreferrer" className="sidebar__footer-link" title="X / Twitter">
            <IconBrandX size={16} />
          </a>
        </div>
        <span className="sidebar__footer-badge">v2.0</span>
      </div>
    </aside>
  )
}
