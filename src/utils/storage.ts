// Local storage utility for saving user data

export interface SavedContext {
  id: string
  name: string
  description: string
  content: string
  tokens: number
  priority: 'high' | 'medium' | 'low'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface SavedPrompt {
  id: string
  name: string
  content: string
  category: string
  tokens: number
  quality: number
  createdAt: string
}

export interface UserSettings {
  apiKey: string
  model: string
  temperature: number
  maxTokens: number
  defaultContextSize: number
  alertThreshold: number
  autoOptimize: boolean
}

export interface TestResult {
  id: string
  prompt: string
  response: string
  tokens: {
    input: number
    output: number
    total: number
  }
  responseTime: number
  quality: number
  timestamp: string
}

// Storage keys
const STORAGE_KEYS = {
  CONTEXTS: 'context-engineering-contexts',
  PROMPTS: 'context-engineering-prompts',
  SETTINGS: 'context-engineering-settings',
  TEST_RESULTS: 'context-engineering-test-results',
  STATS: 'context-engineering-stats'
}

// Generic storage functions
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save to storage:', error)
  }
}

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Failed to load from storage:', error)
    return defaultValue
  }
}

// Context management
export const saveContexts = (contexts: SavedContext[]): void => {
  saveToStorage(STORAGE_KEYS.CONTEXTS, contexts)
}

export const loadContexts = (): SavedContext[] => {
  return loadFromStorage(STORAGE_KEYS.CONTEXTS, [])
}

export const addContext = (context: Omit<SavedContext, 'id' | 'createdAt' | 'updatedAt'>): SavedContext => {
  const contexts = loadContexts()
  const newContext: SavedContext = {
    ...context,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  contexts.push(newContext)
  saveContexts(contexts)
  return newContext
}

export const updateContext = (id: string, updates: Partial<SavedContext>): SavedContext | null => {
  const contexts = loadContexts()
  const index = contexts.findIndex(c => c.id === id)
  
  if (index === -1) return null
  
  contexts[index] = {
    ...contexts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  saveContexts(contexts)
  return contexts[index]
}

export const deleteContext = (id: string): boolean => {
  const contexts = loadContexts()
  const filtered = contexts.filter(c => c.id !== id)
  
  if (filtered.length === contexts.length) return false
  
  saveContexts(filtered)
  return true
}

// Settings management
export const saveSettings = (settings: UserSettings): void => {
  saveToStorage(STORAGE_KEYS.SETTINGS, settings)
}

export const loadSettings = (): UserSettings => {
  return loadFromStorage(STORAGE_KEYS.SETTINGS, {
    apiKey: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    defaultContextSize: 4096,
    alertThreshold: 80,
    autoOptimize: true
  })
}

// Test results management
export const saveTestResult = (result: Omit<TestResult, 'id' | 'timestamp'>): TestResult => {
  const results = loadTestResults()
  const newResult: TestResult = {
    ...result,
    id: Date.now().toString(),
    timestamp: new Date().toISOString()
  }
  
  results.unshift(newResult) // Add to beginning
  
  // Keep only last 100 results
  if (results.length > 100) {
    results.splice(100)
  }
  
  saveToStorage(STORAGE_KEYS.TEST_RESULTS, results)
  return newResult
}

export const loadTestResults = (): TestResult[] => {
  return loadFromStorage(STORAGE_KEYS.TEST_RESULTS, [])
}

// Stats management
export const updateStats = (newStats: any): void => {
  const stats = loadFromStorage(STORAGE_KEYS.STATS, {
    totalTests: 0,
    totalTokens: 0,
    avgResponseTime: 0,
    avgQuality: 0,
    lastUpdated: new Date().toISOString()
  })
  
  const updatedStats = {
    ...stats,
    ...newStats,
    lastUpdated: new Date().toISOString()
  }
  
  saveToStorage(STORAGE_KEYS.STATS, updatedStats)
}

export const loadStats = () => {
  return loadFromStorage(STORAGE_KEYS.STATS, {
    totalTests: 0,
    totalTokens: 0,
    avgResponseTime: 0,
    avgQuality: 0,
    lastUpdated: new Date().toISOString()
  })
} 