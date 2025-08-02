"use client"

import { useState, useEffect, useMemo } from "react"
import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { SearchBar } from "./SearchBar"
import { SearchBarWithSignIn } from "./SearchBarWithSignIn"
import { FounderCard } from "./FounderCard"
import { Users } from "lucide-react"
import { UpgradeButton } from "@/components/UpgradeButton"

interface Education {
  id: string
  school: string
  degree: string | null
}

interface Experience {
  id: string
  company: string
  title: string | null
}

interface FounderProfile {
  id: string
  company_name: string
  yc_batch: string
  founder_name: string
  linkedin_url: string
  yc_url: string
  founder_education?: Education[]
  founder_experience?: Experience[]
  created_at: string
}

interface SearchMatch {
  type: 'education' | 'experience'
  index: number
  field: 'school' | 'degree' | 'company' | 'title'
  value: string
}

interface FoundersGridProps {
  user: User | null
  hasAccess: boolean
  onGetAccessRequest?: () => void
}

const PAGE_SIZE = 24

export function FoundersGrid({ user, hasAccess, onGetAccessRequest }: FoundersGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [founders, setFounders] = useState<FounderProfile[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debounce search
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(handler)
  }, [searchQuery])

  // Fetch founders from API
  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/api/founders?search=${encodeURIComponent(debouncedQuery)}&page=${page}&pageSize=${PAGE_SIZE}`)
      .then(res => res.json())
      .then(data => {
        setFounders(data.founders)
        setTotalCount(data.totalCount)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load founders.")
        setLoading(false)
      })
  }, [debouncedQuery, page, user])

  // For non-authenticated users, fetch initial data without search
  useEffect(() => {
    if (!user) {
      setLoading(true)
      setError(null)
      fetch(`/api/founders?page=1&pageSize=${PAGE_SIZE}`)
        .then(res => res.json())
        .then(data => {
          setFounders(data.founders)
          setTotalCount(data.totalCount)
          setLoading(false)
        })
        .catch(() => {
          setError("Failed to load founders.")
          setLoading(false)
        })
    }
  }, [user])

  // Parse search query for plus sign logic
  const searchTerms = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    return debouncedQuery.split('+').map(term => term.trim().toLowerCase()).filter(term => term.length > 0)
  }, [debouncedQuery])

  // Find search matches for highlighting
  const getSearchMatches = (founder: FounderProfile): SearchMatch[] => {
    if (searchTerms.length === 0) return []
    const matches: SearchMatch[] = []
    if (founder.founder_education && Array.isArray(founder.founder_education)) {
      founder.founder_education.forEach((edu: Education, index: number) => {
        const school = (edu.school || "").toLowerCase()
        const degree = (edu.degree || "").toLowerCase()
        searchTerms.forEach(term => {
          if (school.includes(term)) {
            matches.push({ type: 'education', index, field: 'school', value: edu.school })
          }
          if (degree && degree.includes(term)) {
            matches.push({ type: 'education', index, field: 'degree', value: edu.degree! })
          }
        })
      })
    }
    if (founder.founder_experience && Array.isArray(founder.founder_experience)) {
      founder.founder_experience.forEach((exp: Experience, index: number) => {
        const company = (exp.company || "").toLowerCase()
        const title = (exp.title || "").toLowerCase()
        searchTerms.forEach(term => {
          if (company.includes(term)) {
            matches.push({ type: 'experience', index, field: 'company', value: exp.company })
          }
          if (title && title.includes(term)) {
            matches.push({ type: 'experience', index, field: 'title', value: exp.title! })
          }
        })
      })
    }
    return matches
  }

  const handleGetAccess = () => {
    if (onGetAccessRequest) {
      onGetAccessRequest()
    } else {
      window.location.href = "/signin"
    }
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div>
      {/* Search Header */}
      <div className="sticky top-16 bg-white/90 backdrop-blur-sm border-b border-slate-200 z-30 py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="space-y-4">
            {/* Search Bar or Upgrade Button */}
            <div className="relative">
              {user ? (
                hasAccess ? (
                  <SearchBar 
                    onSearch={setSearchQuery}
                    onClear={() => setSearchQuery("")}
                    placeholder="Search founders by school, company, or name... (use + for multiple terms)"
                    disabled={false}
                  />
                ) : (
                  <UpgradeButton />
                )
              ) : (
                <SearchBarWithSignIn 
                  onSearch={setSearchQuery}
                  onClear={() => setSearchQuery("")}
                  onGetAccessRequest={handleGetAccess}
                  placeholder="Search founders by school, company, or name... (use + for multiple terms)"
                />
              )}
            </div>
            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                {loading ? "Loading..." : `${totalCount} founder${totalCount === 1 ? '' : 's'}`}
              </p>
              {user && searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Clear search
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Founders Grid */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading founders...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : founders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {founders.map((founder) => (
                <FounderCard 
                  key={founder.id} 
                  founder={founder} 
                  searchMatches={getSearchMatches(founder)}
                />
              ))}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No founders found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search terms to find more results.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 