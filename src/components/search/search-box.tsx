'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { searchPosts, initializeSearch, type SearchResult, type SearchablePosts } from '@/lib/search-client'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  className?: string
  placeholder?: string
  showButton?: boolean
}

export function SearchBox({ className, placeholder = "Search posts...", showButton = true }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isInitialized, setIsInitialized] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Initialize search data
  useEffect(() => {
    async function loadSearchData() {
      try {
        const response = await fetch('/api/search')
        const posts: SearchablePosts[] = await response.json()
        initializeSearch(posts)
        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to load search data:', error)
      }
    }

    loadSearchData()
  }, [])

  // Search functionality
  useEffect(() => {
    if (!isInitialized || query.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchResults = searchPosts(query, 8)
    setResults(searchResults)
    setIsOpen(searchResults.length > 0)
    setSelectedIndex(-1)
  }, [query, isInitialized])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            const selectedPost = results[selectedIndex].post
            router.push(`/blog/${selectedPost.slug}`)
            handleClose()
          } else if (query.trim()) {
            // Navigate to search results page
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
            handleClose()
          }
          break
        case 'Escape':
          handleClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, query, router])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClose = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  const handleResultClick = (post: SearchablePosts) => {
    router.push(`/blog/${post.slug}`)
    handleClose()
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(results.length > 0)}
            className="w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {showButton && (
          <Button 
            className="ml-2"
            onClick={() => {
              if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`)
                handleClose()
              }
            }}
          >
            Search
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-auto rounded-md border bg-popover shadow-md"
        >
          <div className="p-2">
            {results.map((result, index) => (
              <button
                key={result.post.slug}
                onClick={() => handleResultClick(result.post)}
                className={cn(
                  "w-full text-left p-3 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                  selectedIndex === index && "bg-accent text-accent-foreground"
                )}
              >
                <div className="font-medium line-clamp-1">
                  {result.post.title}
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {result.post.description}
                </div>
                {result.post.tags && result.post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {result.post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
            
            {results.length >= 8 && (
              <button
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`)
                  handleClose()
                }}
                className="w-full p-3 text-center text-sm text-muted-foreground hover:text-foreground transition-colors border-t"
              >
                View all results for &quot;{query}&quot;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}