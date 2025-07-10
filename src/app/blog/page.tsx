import { getPaginatedPosts } from "@/lib/mdx"
import { PostCard } from "@/components/blog/post-card"
import { Pagination } from "@/components/blog/pagination"
import { siteConfig } from "@/lib/site.config"

export const metadata = {
  title: "Blog",
  description: "Latest blog posts and articles",
}

export default async function BlogPage() {
  const { posts, pagination } = getPaginatedPosts(1, siteConfig.blog.postsPerPage)
  
  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Latest thoughts, tutorials, and insights
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