import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, User } from "lucide-react"
import { Post } from "@/lib/mdx"
import { siteConfig } from "@/lib/site.config"

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Featured Image */}
      {post.image && (
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Title */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          {post.title}
        </h1>
        
        {post.description && (
          <p className="text-xl text-muted-foreground">
            {post.description}
          </p>
        )}
      </div>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Meta Information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Author */}
          {siteConfig.blog.showAuthor && (
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={siteConfig.author.avatar} alt={post.author || siteConfig.author.name} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {post.author || siteConfig.author.name}
              </span>
            </div>
          )}
          
          {/* Date */}
          {siteConfig.blog.showDate && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        
        {/* Reading Time */}
        {siteConfig.blog.showReadingTime && (
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime.text}</span>
          </div>
        )}
      </div>
      
      <Separator />
    </div>
  )
}