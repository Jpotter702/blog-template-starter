import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, User } from "lucide-react"
import { Post, generateExcerpt } from "@/lib/mdx"
import { siteConfig } from "@/lib/site.config"

interface PostCardProps {
  post: Post
  showExcerpt?: boolean
  className?: string
}

export function PostCard({ post, showExcerpt = true, className }: PostCardProps) {
  const excerpt = post.excerpt || generateExcerpt(post.content, siteConfig.blog.excerptLength)
  
  return (
    <Card className={className}>
      {post.image && (
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex flex-wrap gap-1 mb-2">
          {post.tags?.map((tag) => (
            <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
              <Badge variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
        
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {showExcerpt && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            {siteConfig.blog.showAuthor && (
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={siteConfig.author.avatar} alt={post.author || siteConfig.author.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span>{post.author || siteConfig.author.name}</span>
              </div>
            )}
            
            {siteConfig.blog.showDate && (
              <div className="flex items-center space-x-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          
          {siteConfig.blog.showReadingTime && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime.text}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}