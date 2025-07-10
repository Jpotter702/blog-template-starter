import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/mdx"
import { PostHeader } from "@/components/blog/post-header"
import { MDXRemote } from "next-mdx-remote/rsc"
import { useMDXComponents } from "@/components/mdx-components"
import { siteConfig } from "@/lib/site.config"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {}
  }
  
  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.date).toISOString()
  
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author || siteConfig.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: [post.author || siteConfig.author.name],
      images: [
        {
          url: post.image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image || siteConfig.ogImage],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  const components = useMDXComponents({})
  
  return (
    <article className="container py-8">
      <div className="max-w-4xl mx-auto">
        <PostHeader post={post} />
        
        <div className="prose prose-neutral dark:prose-invert max-w-none mt-8">
          <MDXRemote
            source={post.content}
            components={components}
          />
        </div>
      </div>
    </article>
  )
}