import { Feed } from 'feed'
import { getAllPosts } from '@/lib/mdx'
import { siteConfig } from '@/lib/site.config'

export async function GET() {
  const posts = getAllPosts()
  
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'en',
    image: siteConfig.ogImage,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author.name}`,
    updated: new Date(posts[0]?.date || new Date()),
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${siteConfig.url}/rss.xml`,
      json: `${siteConfig.url}/rss.json`,
      atom: `${siteConfig.url}/atom.xml`,
    },
    author: {
      name: siteConfig.author.name,
      email: siteConfig.author.email,
      link: siteConfig.url,
    },
  })
  
  posts.forEach((post) => {
    const url = `${siteConfig.url}/blog/${post.slug}`
    
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.content,
      author: [
        {
          name: post.author || siteConfig.author.name,
          email: siteConfig.author.email,
        },
      ],
      date: new Date(post.date),
      image: post.image ? `${siteConfig.url}${post.image}` : undefined,
      category: post.categories?.map(cat => ({ name: cat })) || [],
    })
  })
  
  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}