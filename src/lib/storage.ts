export interface MockupHistoryEntry {
  id: string
  trackUrl: string
  timestamp: number
  metadata: {
    title: string
    artist: string
    albumArt: string
  }
}

const STORAGE_KEY = 'mockuppro_history'

export const historyStorage = {
  save: (entry: MockupHistoryEntry) => {
    const history = historyStorage.getAll()
    const updatedHistory = [entry, ...history]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  },

  getAll: (): MockupHistoryEntry[] => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse history', e)
      return []
    }
  },

  remove: (id: string) => {
    const history = historyStorage.getAll()
    const updatedHistory = history.filter((entry) => entry.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  },

  clear: () => {
    localStorage.removeItem(STORAGE_KEY)
  },
}
