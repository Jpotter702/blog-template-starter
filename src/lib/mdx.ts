import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface FrontMatter {
  title: string
  description: string
  date: string
  author?: string
  tags?: string[]
  categories?: string[]
  image?: string
  featured?: boolean
  draft?: boolean
  excerpt?: string
  slug?: string
}

export interface Post extends FrontMatter {
  slug: string
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'))
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const stats = readingTime(content)
  
  return {
    ...data,
    slug: realSlug,
    content,
    readingTime: stats,
  } as Post
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.draft)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  
  return posts
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.tags?.includes(tag))
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.categories?.includes(category))
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    post.categories?.forEach(category => categories.add(category))
  })
  
  return Array.from(categories).sort()
}

export function getFeaturedPosts(): Post[] {
  const posts = getAllPosts()
  return posts.filter(post => post.featured)
}

export function getRecentPosts(limit: number = 5): Post[] {
  const posts = getAllPosts()
  return posts.slice(0, limit)
}

export function getPaginatedPosts(page: number, limit: number = 6) {
  const posts = getAllPosts()
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  return {
    posts: posts.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(posts.length / limit),
      totalPosts: posts.length,
      hasNextPage: endIndex < posts.length,
      hasPreviousPage: page > 1,
    }
  }
}

export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove MDX/markdown syntax
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/`{1,3}.*?`{1,3}/g, '') // Remove code blocks
    .replace(/[#*_~]/g, '') // Remove formatting
    .replace(/\n\s*\n/g, ' ') // Replace double newlines with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  const truncated = plainText.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  if (lastSpaceIndex === -1) {
    return truncated + '...'
  }
  
  return truncated.substring(0, lastSpaceIndex) + '...'
}