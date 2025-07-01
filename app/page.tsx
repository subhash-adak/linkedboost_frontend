

"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, MessageSquare, Users, Shield, Clock, Settings, Menu, X, CheckCircle, Play } from "lucide-react"
import { useRouter } from "next/navigation"; // ✅ for App Router (Next.js 13+)
// In your header nav section, add the ThemeToggle component:
import { ThemeToggle } from "@/components/theme-toggle"

// import router from "next/router";

// Automation Animation Component
const AutomationAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    { icon: Users, text: "Sending connection request...", color: "purple" },
    { icon: MessageSquare, text: "Sending personalized message...", color: "blue" },
    { icon: BarChart3, text: "Tracking engagement...", color: "green" }
  ]



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="relative w-full max-w-md lg:max-w-lg mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 lg:p-8 transform hover:scale-105 transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Bot Active</span>
          </div>
          
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              return (
                <div 
                  key={index}
                  className={`p-3 rounded-lg transition-all duration-500 ${
                    isActive 
                      ? step.color === 'purple' ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 scale-105' 
                      : step.color === 'blue' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 scale-105'
                      : 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 scale-105'
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${
                      isActive 
                        ? step.color === 'purple' ? 'text-purple-600' 
                        : step.color === 'blue' ? 'text-blue-600' 
                        : 'text-green-600'
                        : 'text-gray-400'
                    } ${isActive ? 'animate-pulse' : ''}`} />
                    <span className={`text-sm ${isActive ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                      {step.text}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Today's Results :</span>
              <span className="font-semibold text-gray-900 dark:text-white">47 new connections</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  )
}

// Feature Card Component
type FeatureCardProps = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  gradient: string
}

const FeatureCard = ({ icon: Icon, title, description, gradient }: FeatureCardProps) => (
  <div className={`group ${gradient} p-6 lg:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </div>
)

// Stats Component
const StatsBar = () => {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "Support" }
  ]

  return (
    <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

// Main Component
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter(); // Add this line

  const features = [
    {
      icon: Users,
      title: "Smart Auto Connect",
      description: "Automatically connect with targeted prospects based on advanced search criteria and AI-powered matching.",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900/20"
    },
    {
      icon: MessageSquare,
      title: "Personalized Messages",
      description: "Create dynamic message templates with AI personalization for 10x higher response rates.",
      gradient: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-blue-900/20"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance with detailed analytics, A/B testing, and ROI measurement tools.",
      gradient: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-green-900/20"
    },
    {
      icon: Shield,
      title: "LinkedIn Safe",
      description: "Built-in safety features and human-like behavior patterns to keep your account secure.",
      gradient: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-orange-900/20"
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "Optimize outreach timing based on prospect activity patterns and time zones.",
      gradient: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-yellow-900/20"
    },
    {
      icon: Settings,
      title: "Easy Integration",
      description: "Seamlessly integrates with your CRM, email tools, and existing workflow systems.",
      gradient: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-indigo-900/20"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
   {/* Header */}
    <header className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16 lg:h-20">
      {/* Logo - Left Side */}
      {/* <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">L</span>
        </div>
        <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          LinkedBoost
        </span>
      </Link> */}
      <div className="flex items-center space-x-4">
       <div
      onClick={() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }}
  className="flex items-center space-x-2 flex-shrink-0 cursor-pointer"
>
  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
    <span className="text-white font-bold text-sm">L</span>
  </div>
  <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
    LinkedBoost
  </span>
   
</div>
<ThemeToggle />
</div>
     
      {/* Desktop Navigation - Right Side */}
      <nav className="hidden md:flex items-center space-x-6">
        

{["Features", "Pricing"].map((item) => (
  <Link
    key={item}
    href={`/#${item.toLowerCase()}`}
    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
  >
    {item}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
  </Link>
))}

<Link
  href="/login"
  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
>
  Login
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
</Link>

<Link
  href="/register"
  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 relative group"
>
  Get Started
  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
</Link>

      </nav>
     
      {/* Mobile Menu Button - Right Side */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
   
    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 mt-4">
        <div className="flex flex-row justify-between items-center gap-2 pt-4 px-2">
          {/* <ThemeToggle /> */}

{[
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Login", href: "/login" },
  { label: "Get Started", href: "/register" },
].map(({ label, href }) => (
  <Link
    key={label}
    href={href}
    className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-2 px-2 text-center relative group"
  >
    {label}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
  </Link>
))}

        </div>
      </div>
    )}
  </div>
</header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/20 py-12 md:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left space-y-6 lg:space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                    Automate Your{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      LinkedIn Growth
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                    Connect with more prospects, send personalized messages, and track your results with our powerful
                    LinkedIn automation platform.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/register">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto hover:text-purple-900 ">
                      <span>Get Started Free</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <button className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-all duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto">
                    <Play className="w-5 h-5" />
                    <span>Watch Demo</span>
                  </button>
                </div>
                
                <StatsBar />
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <AutomationAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 lg:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Powerful Automation Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to scale your LinkedIn outreach and grow your network efficiently.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6 lg:space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold text-white">
                Ready to <span className="underline decoration-white/30">10x</span> Your LinkedIn Growth?
              </h2>
              <p className="text-xl text-purple-100 leading-relaxed">
                Join over 10,000 professionals who are already automating their LinkedIn outreach and seeing incredible results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/register">
                  <button className="bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <div className="flex items-center space-x-4 text-purple-100 text-sm">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LinkedBoost
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed max-w-xs">
                The most powerful LinkedIn automation platform for modern professionals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500  transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500  transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">API</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500  transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500  transition-colors">Status</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500  transition-colors">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500  transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500  transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500  transition-colors">GDPR</Link></li>
                <li><Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} LinkedBoost. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {/* <Link href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link> */}
              {/* <Link href="https://www.linkedin.com/in/adaksubhash" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </Link> */}
              <Link
  href="https://www.linkedin.com/in/adaksubhash"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
>
  <span className="sr-only">LinkedIn</span>
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
      clipRule="evenodd"
    />
  </svg>
</Link>

              {/* <Link href="https://github.com/subhash-adak" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </Link> */}
               <Link
  href="https://github.com/subhash-adak"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
>
  <span className="sr-only">GitHub</span>
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"
    />
  </svg>
</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}