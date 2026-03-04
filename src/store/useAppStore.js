import { create } from 'zustand'

const useAppStore = create((set) => ({
  searchQuery: '',
  setSearchQuery: (q) => set({ searchQuery: q }),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  expandedCategories: new Set(['Background', 'Typography', 'Box Model', 'Filters', 'Layout', 'Transform']),
  toggleCategory: (cat) =>
    set((s) => {
      const next = new Set(s.expandedCategories)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return { expandedCategories: next }
    }),

  copiedId: null,
  setCopied: (id) => {
    set({ copiedId: id })
    setTimeout(() => set((s) => (s.copiedId === id ? { copiedId: null } : {})), 2000)
  },
}))

export default useAppStore
