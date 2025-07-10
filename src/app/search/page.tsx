'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchBox } from '@/components/search/search-box'
import { searchPosts, initializeSearch, type SearchResult, type SearchablePosts } from '@/lib/search-client'
import { formatDate } from '@/lib/utils'
import { Search, Clock, Calendar, Tag, ArrowLeft } from 'lucide-react'

function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

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

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || !isInitialized) return
    
    setIsLoading(true)
    setHasSearched(true)
    
    try {
      const searchResults = searchPosts(searchQuery, 50) // More results for dedicated page
      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [isInitialized])

  useEffect(() => {
    if (initialQuery && isInitialized) {
      performSearch(initialQuery)
    }
  }, [initialQuery, isInitialized, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  const highlightMatches = (text: string, matches?: unknown[]) => {
    if (!matches || matches.length === 0) return text
    
    // Simple highlighting - in a real app you'd want more sophisticated matching
    const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 1)
    let highlightedText = text
    
    queryWords.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi')
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>')
    })
    
    return highlightedText
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <Search className="h-8 w-8 text-muted-foreground" />
            <h1 className="text-3xl font-bold">Search Blog Posts</h1>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <Input
                type="search"
                placeholder="Search posts, tags, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>

          {/* Alternative: Use the SearchBox component */}
          <div className="mb-6">
            <SearchBox 
              className="w-full" 
              placeholder="Or use the live search above..."
              showButton={true}
            />
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {isLoading ? 'Searching...' : `Found ${results.length} result${results.length !== 1 ? 's' : ''}`}
                </span>
                {query && (
                  <span className="text-sm text-muted-foreground">
                    for &quot;<span className="font-medium text-foreground">{query}</span>&quot;
                  </span>
                )}
              </div>
              
              {results.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Sorted by relevance
                </div>
              )}
            </div>

            {/* Results List */}
            <div className="space-y-6">
              {results.length === 0 && !isLoading && hasSearched && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try different keywords or browse all posts
                  </p>
                  <Link href="/blog">
                    <Button variant="outline">Browse All Posts</Button>
                  </Link>
                </div>
              )}

              {results.map((result) => (
                <article key={result.post.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(result.post.date)}
                      </div>
                      {result.post.readingTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {result.post.readingTime?.text}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Match: {Math.round((1 - result.score) * 100)}%
                    </div>
                  </div>

                  <Link href={`/blog/${result.post.slug}`} className="group">
                    <h2 
                      className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatches(result.post.title, result.matches)
                      }}
                    />
                  </Link>

                  <p 
                    className="text-muted-foreground mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatches(result.post.description, result.matches)
                    }}
                  />

                  {/* Tags */}
                  {result.post.tags && result.post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {result.post.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {result.post.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{result.post.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Author */}
                  {result.post.author && (
                    <div className="text-sm text-muted-foreground">
                      by {result.post.author}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        {!hasSearched && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Search Blog Posts</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Search through all blog posts by title, content, tags, and categories. 
              Use the search box above to get started.
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">💡 <strong>Tips:</strong></p>
              <ul className="text-left max-w-md mx-auto space-y-1">
                <li>• Use specific keywords for better results</li>
                <li>• Search by tag names (e.g., &quot;react&quot;, &quot;tutorial&quot;)</li>
                <li>• Try different variations of your search terms</li>
                <li>• Use multiple words for more specific results</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}