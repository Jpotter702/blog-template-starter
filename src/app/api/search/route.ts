import { NextResponse } from 'next/server'
import { getSearchablePostsData } from '@/lib/search-data'

// GET /api/search - Return searchable posts data
export async function GET() {
  try {
    const posts = getSearchablePostsData()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts for search:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}