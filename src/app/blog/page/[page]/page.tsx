import { notFound } from "next/navigation"
import { getPaginatedPosts } from "@/lib/mdx"
import { PostCard } from "@/components/blog/post-card"
import { Pagination } from "@/components/blog/pagination"
import { siteConfig } from "@/lib/site.config"

interface BlogPageProps {
  params: Promise<{
    page: string
  }>
}

export async function generateStaticParams() {
  const { pagination } = getPaginatedPosts(1, siteConfig.blog.postsPerPage)
  const pages = []
  
  for (let i = 2; i <= pagination.totalPages; i++) {
    pages.push({ page: i.toString() })
  }
  
  return pages
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { page } = await params
  const pageNumber = parseInt(page)
  
  return {
    title: `Blog - Page ${pageNumber}`,
    description: `Blog posts page ${pageNumber}`,
  }
}

export default async function BlogPaginatedPage({ params }: BlogPageProps) {
  const { page } = await params
  const pageNumber = parseInt(page)
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }
  
  const { posts, pagination } = getPaginatedPosts(pageNumber, siteConfig.blog.postsPerPage)
  
  if (pageNumber > pagination.totalPages) {
    notFound()
  }
  
  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Blog - Page {pageNumber}
          </h1>
          <p className="text-xl text-muted-foreground">
            Showing {posts.length} of {pagination.totalPosts} posts
          </p>
        </div>
        
        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  showExcerpt={siteConfig.blog.showExcerpt}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              baseUrl="/blog"
              className="mt-12"
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}