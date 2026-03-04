import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { IconSearch } from '@tabler/icons-react'
import { toolCategories, allTools, totalToolCount } from '../data/tools'
import SEOMeta from '../components/SEOMeta'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return toolCategories
    return toolCategories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q) ||
            cat.category.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.tools.length > 0)
  }, [query])

  const categoryCount = toolCategories.length

  return (
    <>
      <SEOMeta
        title={null}
        description="Free interactive CSS generator. Build gradients, shadows, filters, flexbox, grid, transforms and more with live preview."
        path="/"
      />
      <div className="home">
        <div className="home__hero">
          <div className="home__hero-eyebrow">
            <IconSearch size={11} />
            {totalToolCount} tools available
          </div>
          <h1 className="home__hero-title">
            Generate <span>CSS</span> without<br />the guesswork
          </h1>
          <p className="home__hero-sub">
            Interactive controls with live preview and instant code output.
            Copy-ready CSS for every property you need.
          </p>
        </div>

        <div className="home__stats">
          <div className="home__stats-item">
            <span className="home__stats-item-value">{totalToolCount}</span>
            <span className="home__stats-item-label">Tools</span>
          </div>
          <div className="home__stats-divider" />
          <div className="home__stats-item">
            <span className="home__stats-item-value">{categoryCount}</span>
            <span className="home__stats-item-label">Categories</span>
          </div>
          <div className="home__stats-divider" />
          <div className="home__stats-item">
            <span className="home__stats-item-value">Free</span>
            <span className="home__stats-item-label">Forever</span>
          </div>
        </div>

        <div className="home__search-wrap">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search tools — gradients, shadows, flex..."
            large
          />
        </div>

        {filtered.length === 0 ? (
          <div className="home__empty">
            <div className="home__empty-icon">
              <IconSearch size={22} />
            </div>
            <div className="home__empty-title">No tools found</div>
            <div className="home__empty-sub">Try a different search term</div>
          </div>
        ) : (
          filtered.map((cat) => {
            const CatIcon = cat.icon
            return (
              <div key={cat.slug} className="home__section">
                <div className="home__section-header">
                  <CatIcon size={16} />
                  <h2>{cat.category}</h2>
                  <span>{cat.tools.length}</span>
                </div>
                <div className="home__grid">
                  {cat.tools.map((tool) => {
                    const ToolIcon = tool.icon
                    return (
                      <Link
                        key={tool.slug}
                        to={`/tools/${tool.slug}`}
                        className="home__tool-card"
                        title={tool.description}
                      >
                        <div className="home__tool-card-icon">
                          <ToolIcon size={14} />
                        </div>
                        <span className="home__tool-card-name">{tool.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}
