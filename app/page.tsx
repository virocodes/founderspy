"use client"

import { useState, useEffect } from "react"
import { User } from "@supabase/supabase-js"
import { FoundersGrid } from "@/components/FoundersGrid"
import { DashboardNav } from "@/components/DashboardNav"
import { SignInModal } from "@/components/SignInModal"
import { GetAccessModal } from "@/components/GetAccessModal"
import { ContactModal } from "@/components/ContactModal"

// Import the auth action
async function getUserAndAccess() {
  const response = await fetch('/api/auth/user', {
    method: 'GET',
  })
  if (!response.ok) {
    return { user: null, hasAccess: false }
  }
  return response.json()
}

export default function Landing() {
  const [user, setUser] = useState<User | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [signInModalOpen, setSignInModalOpen] = useState(false)
  const [getAccessModalOpen, setGetAccessModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)

  useEffect(() => {
    const loadUserData = async () => {
      const { user, hasAccess } = await getUserAndAccess()
      setUser(user)
      setHasAccess(hasAccess)
      setIsInitialLoading(false)
    }

    loadUserData()
  }, [])

  // Check for payment success and refresh access status
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentStatus = urlParams.get('payment')
    
    if (paymentStatus === 'success') {
      // Remove the payment parameter from URL
      const newUrl = window.location.pathname
      window.history.replaceState({}, '', newUrl)
      
      // Refresh user data to check for updated access with retry mechanism
      const refreshUserData = async (retryCount = 0) => {
        const { user, hasAccess } = await getUserAndAccess()
        setUser(user)
        setHasAccess(hasAccess)
        
        // If user still doesn't have access and we haven't retried too many times, try again
        if (!hasAccess && retryCount < 3) {
          setTimeout(() => {
            refreshUserData(retryCount + 1)
          }, 2000) // Wait 2 seconds before retrying
        }
      }
      
      // Add a small delay to allow webhook to process
      setTimeout(() => {
        refreshUserData()
      }, 1000)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <DashboardNav 
        user={user} 
        hasAccess={hasAccess} 
        isInitialLoading={isInitialLoading} 
      />

      {/* Hero + Search Section */}
      <section className="pt-28 pb-4 bg-white relative">
        <div className="container mx-auto max-w-3xl flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 pt-2">
            Meet the Founders
                </h1>
          <p className="text-lg text-slate-600 mb-6 max-w-2xl">
            Discover the brilliant minds behind successful companies. Search founders by school, company, or name.
          </p>
        </div>
        
        {/* Contact Link */}
        <div className="absolute top-20 right-24">
          <button 
            onClick={() => setContactModalOpen(true)}
            className="text-xs text-slate-500 hover:text-slate-700 underline cursor-pointer bg-white/80 backdrop-blur-sm px-2 py-1 rounded"
          >
            Interested in this data?
          </button>
        </div>
      </section>

      {/* Founders Grid (includes search bar and count) */}
      <section className="pb-20">
        <FoundersGrid 
          user={user} 
          hasAccess={hasAccess} 
          onGetAccessRequest={() => setGetAccessModalOpen(true)}
        />
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-200 bg-white/90">
        <div className="container mx-auto max-w-6xl text-center space-y-2">
          <p className="text-sm text-slate-600">
            © 2025 founderspy. Connecting the startup ecosystem.
          </p>
          <p className="text-xs text-slate-500">
            Not affiliated with YC. Data gathered from public sources.
          </p>
        </div>
      </footer>
      
      {/* Sign In Modal */}
      <SignInModal open={signInModalOpen} onOpenChange={setSignInModalOpen} />
      {/* Get Access Modal */}
      <GetAccessModal open={getAccessModalOpen} onOpenChange={setGetAccessModalOpen} />
      {/* Contact Modal */}
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </div>
  )
}