import { siteConfig } from "@/lib/site.config"

export const metadata = {
  title: "About",
  description: "Learn more about this blog and its author",
}

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About</h1>
            <p className="text-xl text-muted-foreground">
              Learn more about this blog and its creator
            </p>
          </div>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>Welcome to {siteConfig.name}</h2>
            <p>
              This is a modern blog template built with cutting-edge technologies including Next.js 14, 
              MDX, Tailwind CSS 4, and shadcn/ui components. It&apos;s designed to be fast, accessible, 
              and easy to customize.
            </p>
            
            <h3>Features</h3>
            <ul>
              <li>✅ Next.js 14 with App Router</li>
              <li>✅ MDX for content with React components</li>
              <li>✅ Tailwind CSS 4 for styling</li>
              <li>✅ shadcn/ui for beautiful components</li>
              <li>✅ SEO optimized with metadata</li>
              <li>✅ Open Graph and Twitter Cards</li>
              <li>✅ Reading time calculation</li>
              <li>✅ Tags and categories</li>
              <li>✅ Responsive design</li>
              <li>✅ Dark mode support</li>
            </ul>
            
            <h3>About the Author</h3>
            <p>
              This template was created to showcase modern web development practices and provide 
              a solid foundation for building content-focused websites. You can customize all 
              the content, styling, and configuration to match your needs.
            </p>
            
            <h3>Getting Started</h3>
            <p>
              To customize this blog for your own use:
            </p>
            <ol>
              <li>Update the site configuration in <code>src/lib/site.config.ts</code></li>
              <li>Replace the sample blog posts in <code>content/posts/</code></li>
              <li>Update the styling and colors to match your brand</li>
              <li>Add your own content and pages</li>
            </ol>
            
            <h3>Contact</h3>
            <p>
              You can reach out via the social links in the footer or customize this section 
              with your own contact information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}