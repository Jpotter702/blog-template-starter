import { notFound } from "next/navigation"
import { getAllTags, getPostsByTag } from "@/lib/mdx"
import { PostCard } from "@/components/blog/post-card"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/site.config"

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  
  return {
    title: `Posts tagged with "${decodedTag}"`,
    description: `All blog posts tagged with ${decodedTag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)
  
  if (posts.length === 0) {
    notFound()
  }
  
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold tracking-tight">Posts tagged with</h1>
            <Badge variant="default" className="text-lg px-3 py-1">
              {decodedTag}
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