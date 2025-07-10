# Modern Blog Template

A comprehensive blog starter template built with Next.js 14, MDX, Tailwind CSS 4, and shadcn/ui components.

## Features

### ✨ Core Features
- **Next.js 14** with App Router for optimal performance
- **MDX** support for writing content with React components
- **Tailwind CSS 4** with Typography plugin for beautiful styling
- **shadcn/ui** components for consistent, accessible UI
- **TypeScript** for type safety and better developer experience

### 📝 Content Management
- **Frontmatter** support for post metadata
- **Reading time** calculation
- **Tags and categories** system with dedicated pages
- **Featured posts** functionality
- **Excerpt generation** with customizable length
- **Draft posts** support

### 🎨 Design & Customization
- **Fully customizable** theme via configuration file
- **Responsive design** that works on all devices
- **Dark mode** support with system preference detection
- **Typography customization** for headings, paragraphs, and code
- **Color system** with CSS custom properties

### 🔍 SEO & Performance
- **SEO optimized** with proper meta tags
- **Open Graph** and **Twitter Cards** support
- **Structured data** for better search engine understanding
- **Sitemap.xml** and **robots.txt** generation
- **RSS/Atom feeds** for content syndication
- **Optimized images** with Next.js Image component

### 📱 User Experience
- **Pagination** for blog posts
- **Fast navigation** with client-side routing
- **Loading states** and error handling
- **Accessibility** compliant components
- **Mobile-first** responsive design

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation & Setup

1. **Navigate to the project directory**
   ```bash
   cd blog-template-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

You should see:
- Home page with featured and recent posts
- Navigation menu with Blog, About, Contact links
- Sample blog posts with proper styling

### If the blog doesn't appear:

1. **Check the server is running**
   - Look for "Ready in XXXXms" message in terminal
   - Server should be running at http://localhost:3000

2. **Check for errors**
   ```bash
   # Kill any existing processes
   pkill -f "next dev"
   
   # Restart the server
   npm run dev
   ```

3. **Clear cache and restart**
   ```bash
   # Remove build cache
   rm -rf .next
   
   # Reinstall dependencies
   npm install
   
   # Start fresh
   npm run dev
   ```

4. **Check browser console**
   - Open Developer Tools (F12)
   - Look for any JavaScript errors in Console tab

## Configuration

### Site Configuration

Customize your blog by editing `src/lib/site.config.ts`:

```typescript
export const siteConfig = {
  name: "Your Blog Name",
  description: "Your blog description",
  url: "https://yourblog.com",
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    twitter: "@yourusername",
  },
  // ... more configuration options
}
```

### Theme Customization

The template includes a comprehensive theme system that allows you to customize:

- **Colors**: Primary, secondary, accent colors with dark mode variants
- **Typography**: Font families, sizes, and line heights
- **Spacing**: Layout spacing and component spacing
- **Border radius**: Consistent border radius across components
- **Shadows**: Consistent shadow system

### Blog Settings

Configure blog-specific settings:

```typescript
blog: {
  postsPerPage: 6,
  showReadingTime: true,
  showAuthor: true,
  showDate: true,
  showTags: true,
  showExcerpt: true,
  excerptLength: 160,
}
```

## Writing Content

### Creating Blog Posts

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
description: "Brief description of your post"
date: "2024-01-15"
author: "Your Name"
tags: ["tag1", "tag2"]
categories: ["category1"]
featured: false
image: "/images/your-image.jpg"
---

Your content here...
```

### Available Frontmatter Fields

- `title` (required): Post title
- `description` (required): Post description for SEO
- `date` (required): Publication date (YYYY-MM-DD)
- `author`: Post author (defaults to site author)
- `tags`: Array of tags
- `categories`: Array of categories
- `featured`: Whether to show in featured posts
- `image`: Featured image path
- `draft`: Set to true to hide from production
- `excerpt`: Custom excerpt (auto-generated if not provided)

### MDX Features

- Standard Markdown syntax
- React components in content
- Syntax highlighting for code blocks
- Custom components via `mdx-components.tsx`
- Typography styles via Tailwind Typography

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Individual blog posts
│   │   ├── page/[page]/   # Paginated blog pages
│   │   ├── tag/[tag]/     # Tag pages
│   │   └── category/[category]/ # Category pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── blog/             # Blog-specific components
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   ├── mdx.ts           # MDX utilities
│   ├── site.config.ts   # Site configuration
│   └── utils.ts         # General utilities
content/
└── posts/               # Blog post content
```

## Deployment

### 🚀 Vercel (Recommended - One-Click Deploy)

#### Option 1: Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJpotter702%2Fblog-template-starter&project-name=my-blog&repository-name=my-blog)

#### Option 2: Manual Deployment
1. **Fork or clone this repository**
2. **Push to your GitHub account**
3. **Go to [vercel.com](https://vercel.com)**
4. **Click "New Project"**
5. **Import your repository**
6. **Configure environment variables** (optional):
   ```
   NEXT_PUBLIC_SITE_URL=https://yourblog.com
   ```
7. **Deploy!** 🎉

#### Environment Variables for Vercel
```bash
# Required for production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics
```

### 🔧 Build Configuration

The template includes:
- ✅ **vercel.json** - Optimized Vercel configuration
- ✅ **Auto-redirects** - SEO-friendly URL redirects
- ✅ **Headers** - Security and caching headers
- ✅ **Static generation** - Maximum performance
- ✅ **RSS/Sitemap** - Proper content type headers

### 🌐 Other Platforms

#### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out` (if using static export)

#### GitHub Pages
```bash
npm run build
npm run export
# Deploy the `out` folder
```

#### Railway/Render
- Automatically detects Next.js
- Zero configuration needed
- Just connect your repository

### 📊 Performance Optimizations

The template includes:
- **Static generation** where possible
- **Image optimization** 
- **RSS feed caching**
- **SEO optimizations**
- **Security headers**
- **Automatic sitemap generation**

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- Create an issue for bug reports
- Submit feature requests via issues
- Check the documentation for common questions

---

Built with ❤️ using Next.js, MDX, Tailwind CSS, and shadcn/ui.