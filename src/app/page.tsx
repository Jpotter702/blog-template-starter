import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/blog/post-card"
import { getAllPosts, getFeaturedPosts } from "@/lib/mdx"
import { siteConfig } from "@/lib/site.config"
import { ArrowRight } from "lucide-react"

export default async function Home() {
  const featuredPosts = getFeaturedPosts()
  const recentPosts = getAllPosts().slice(0, 3)
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="container py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="text-primary">{siteConfig.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {siteConfig.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/blog">
                Read Blog Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="container py-12">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Featured Posts</h2>
              <p className="text-lg text-muted-foreground">
                Highlighted articles and tutorials
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="container py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
              <p className="text-lg text-muted-foreground">
                Recent articles and updates
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {recentPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
