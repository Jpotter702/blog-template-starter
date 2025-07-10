import { notFound } from "next/navigation"
import { getAllCategories, getPostsByCategory } from "@/lib/mdx"
import { PostCard } from "@/components/blog/post-card"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/site.config"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  
  return {
    title: `Posts in "${decodedCategory}" category`,
    description: `All blog posts in the ${decodedCategory} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const posts = getPostsByCategory(decodedCategory)
  
  if (posts.length === 0) {
    notFound()
  }
  
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Category:</h1>
            <Badge variant="default" className="text-lg px-3 py-1">
              {decodedCategory}
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              showExcerpt={siteConfig.blog.showExcerpt}
            />
          ))}
        </div>
      </div>
    </div>
  )
}