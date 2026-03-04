import { useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { IconMenu2, IconX, IconBrandGithub, IconSun, IconMoon } from '@tabler/icons-react'
import Sidebar from './Sidebar'
import useAppStore from '../store/useAppStore'
import useTheme from '../store/useTheme'
import { allTools } from '../data/tools'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__credit">
        Built with
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
        </svg>
        by{' '}
        <a href="https://habibthade.tech" target="_blank" rel="noopener noreferrer">
          Habib Adebayo
        </a>
      </div>
      <div className="site-footer__links">
        <a href="https://github.com/habib-0007" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a>
      </div>
    </footer>
  )
}

function Topbar() {
  const location = useLocation()
  const { sidebarOpen, toggleSidebar } = useAppStore()
  const { theme, toggle } = useTheme()
  const isHome = location.pathname === '/'
  const currentTool = allTools.find((t) => location.pathname === `/tools/${t.slug}`)

  return (
    <header className="topbar">
      <button className="topbar__menu-btn" onClick={toggleSidebar} aria-label="Toggle navigation">
        {sidebarOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
      </button>
      <div className="topbar__breadcrumb">
        {isHome ? (
          <span className="topbar__breadcrumb-current">Dashboard</span>
        ) : (
          <>
            <Link to="/" className="topbar__breadcrumb-home">CSS Tools</Link>
            <span className="topbar__breadcrumb-sep">/</span>
            {currentTool && (
              <span className="topbar__breadcrumb-current">{currentTool.name}</span>
            )}
          </>
        )}
      </div>
      <div className="topbar__actions">
        <button className="topbar__theme-btn" onClick={toggle} aria-label="Toggle theme" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
        </button>
        <a
          href="https://github.com/habibthadev/css-tools"
          target="_blank"
          rel="noopener noreferrer"
          className="topbar__action-btn"
        >
          <IconBrandGithub size={14} />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  )
}

export default function Layout({ children }) {
  const { sidebarOpen, setSidebarOpen } = useAppStore()
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname, setSidebarOpen])

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  return (
    <div className="app-shell">
      <div
        className={`sidebar-backdrop${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
      <Sidebar />
      <main className="main-content">
        <Topbar />
        <div className="page-container">{children}</div>
        <Footer />
      </main>
    </div>
  )
}
