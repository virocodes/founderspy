"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl flex items-center gap-2">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 19 22 12 13 5 13 19" />
              <polygon points="2 19 11 12 2 5 2 19" />
            </svg>
            quik
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <Button variant="ghost" onClick={() => {
              window.location.href = "/signin"
            }}>Sign In</Button>
            <Button onClick={() => {
              window.location.href = "/signin"
            }}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">🚀 Launch Your SaaS Faster</Badge>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  Build Your SaaS in Hours, Not Months
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A complete Next.js template with Supabase and Stripe integration. Get your first SaaS product up and running in record time, without the hassle of complex integrations.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto" onClick={() => {
                  window.location.href = "/signin"
                }}>
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {String.fromCharCode(64 + i)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">10,000+</span> happy users this week
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-muted/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                <div className="absolute inset-0 p-10 font-mono text-lg">
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-500" />
                      <div className="w-4 h-4 rounded-full bg-yellow-500" />
                      <div className="w-4 h-4 rounded-full bg-green-500" />
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="text-green-400">$</span>
                        <span className="text-foreground">git clone quik</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400">$</span>
                        <span className="text-foreground">cd quik</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400">$</span>
                        <span className="text-foreground">npm install</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400">$</span>
                        <span className="text-foreground">npm run dev</span>
                      </div>
                      <div className="text-muted-foreground mt-8">
                        <span className="text-green-400">✓</span> Server running at http://localhost:3000
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold mb-4">Everything you need to launch your SaaS</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built-in integrations and features to get your SaaS business running quickly.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Supabase Integration",
                description: "Ready-to-use authentication, database, and storage solutions with Supabase.",
                icon: "🔐"
              },
              {
                title: "Stripe Payments",
                description: "Complete subscription and payment system integration with Stripe.",
                icon: "💳"
              },
              {
                title: "Modern Stack",
                description: "Built with Next.js, TypeScript, and Tailwind CSS for a modern development experience.",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors text-2xl">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold mb-4">Three simple steps to launch your SaaS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Clone & Deploy",
                description: "Clone the repository and deploy to your preferred hosting platform."
              },
              {
                step: "2",
                title: "Configure Services",
                description: "Add your Supabase and Stripe credentials to get started."
              },
              {
                step: "3",
                title: "Customize & Launch",
                description: "Customize the template to your needs and launch your SaaS."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <Card className="pt-8">
                  <CardHeader>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold mb-4">Start Building Today</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              One simple price to get your SaaS up and running.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">quik Template</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">$50</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
                <p className="text-muted-foreground">Everything you need to launch your SaaS</p>
              </div>
              <Button size="lg" className="w-full md:w-auto">
                Get Started
              </Button>
              <p className="text-sm text-muted-foreground">
                One-time payment. No hidden fees. Instant access.
              </p>
            </div>
            <Card className="p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Full template access",
                  "Next.js + TypeScript",
                  "Supabase integration",
                  "Stripe payments",
                  "Authentication system",
                  "User dashboard",
                  "Admin panel",
                  "Email templates",
                  "Deployment guide",
                  "Lifetime updates"
                ].map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-primary text-primary-foreground overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
            <div className="relative z-10">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mb-4 w-fit mx-auto">Get Started</Badge>
                <CardTitle className="text-4xl mb-4">Ready to launch your SaaS?</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-lg mb-8">
                  Join hundreds of founders who are already building successful SaaS businesses with our template.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Start Free Trial
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Tutorials</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">License</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-lg">⚡</span>
              </div>
              <p className="text-sm text-muted-foreground">© 2024 EZ-SaaS. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Instagram</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">TikTok</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}