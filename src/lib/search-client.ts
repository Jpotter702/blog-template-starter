'use client'

import Fuse from 'fuse.js'

export interface SearchablePosts {
  slug: string
  title: string
  description: string
  content: string
  date: string
  author?: string
  tags?: string[]
  categories?: string[]
  image?: string
  featured?: boolean
  readingTime?: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

// Search configuration
const searchOptions = {
  keys: [
    { name: 'title', weight: 0.7 },        // Title matches are most important
    { name: 'description', weight: 0.3 },  // Description matches are important
    { name: 'tags', weight: 0.2 },         // Tag matches are relevant
    { name: 'content', weight: 0.1 },      // Content matches are least important
    { name: 'author', weight: 0.1 },       // Author matches
  ],
  threshold: 0.3,           // Lower = more strict matching (0.0 = exact, 1.0 = everything)
  includeScore: true,       // Include search score for ranking
  includeMatches: true,     // Include match information for highlighting
  minMatchCharLength: 2,    // Minimum characters to match
  findAllMatches: true,     // Find all matches, not just first
}

// Singleton Fuse instance for performance
let fuseInstance: Fuse<SearchablePosts> | null = null
let postsData: SearchablePosts[] = []

// Initialize search with posts data
export function initializeSearch(posts: SearchablePosts[]) {
  postsData = posts
  fuseInstance = new Fuse(posts, searchOptions)
}

export interface SearchResult {
  post: SearchablePosts
  score: number
  matches?: unknown[]
}

export function searchPosts(query: string, limit: number = 10): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  if (!fuseInstance) {
    return []
  }

  const results = fuseInstance.search(query.trim(), { limit })

  return results.map(result => ({
    post: result.item,
    score: result.score || 0,
    matches: result.matches ? [...result.matches] : undefined,
  }))
}

export function getSearchSuggestions(query: string, limit: number = 5): SearchResult[] {
  return searchPosts(query, limit)
}

// Reset the Fuse instance (useful when posts change)
export function resetSearchIndex(): void {
  fuseInstance = null
}

// Get all unique tags for search suggestions
export function getSearchableTags(): string[] {
  const tags = new Set<string>()
  
  postsData.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

// Get all unique categories for search suggestions
export function getSearchableCategories(): string[] {
  const categories = new Set<string>()
  
  postsData.forEach(post => {
    post.categories?.forEach(category => categories.add(category))
  })
  
  return Array.from(categories).sort()
}