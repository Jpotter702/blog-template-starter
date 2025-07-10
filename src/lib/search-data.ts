import { getAllPosts } from './mdx'
import type { SearchablePosts } from './search-client'

// Server-side function to get searchable posts data
export function getSearchablePostsData(): SearchablePosts[] {
  const posts = getAllPosts()
  
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    date: post.date,
    author: post.author,
    tags: post.tags,
    categories: post.categories,
    image: post.image,
    featured: post.featured,
    readingTime: post.readingTime,
  }))
}