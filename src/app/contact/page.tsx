import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { siteConfig } from "@/lib/site.config"
import { Mail, Twitter, Github, Linkedin } from "lucide-react"

export const metadata = {
  title: "Contact",
  description: "Get in touch with us",
}

export default function ContactPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with us through any of these channels
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
                <CardDescription>
                  Send us an email for any inquiries or questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`mailto:${siteConfig.author.email}`}>
                    {siteConfig.author.email}
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Twitter className="h-5 w-5" />
                  Twitter
                </CardTitle>
                <CardDescription>
                  Follow us on Twitter for the latest updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
                    {siteConfig.author.twitter}
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub
                </CardTitle>
                <CardDescription>
                  Check out our projects and contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                    View GitHub Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </CardTitle>
                <CardDescription>
                  Connect with us on LinkedIn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                    View LinkedIn Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>Other Ways to Connect</h2>
            <p>
              We&apos;re always interested in hearing from our readers. Whether you have questions about 
              our content, suggestions for new topics, or just want to say hello, don&apos;t hesitate to reach out.
            </p>
            
            <h3>Response Time</h3>
            <p>
              We typically respond to emails within 24-48 hours. For urgent matters, Twitter DMs 
              might be the fastest way to get a response.
            </p>
            
            <h3>Collaboration</h3>
            <p>
              Interested in guest posting or collaboration? We&apos;d love to hear from you! 
              Send us an email with your ideas and we&apos;ll get back to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}