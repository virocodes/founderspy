"use client"

import { useState, useRef } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface SearchBarWithSignInProps {
  onSearch: (query: string) => void
  onClear: () => void
  onGetAccessRequest: () => void
  placeholder?: string
}

export function SearchBarWithSignIn({ 
  onSearch, 
  onClear, 
  onGetAccessRequest, 
  placeholder = "Search founders by school, company, or name... (use + for multiple terms)" 
}: SearchBarWithSignInProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    // If user starts typing, trigger get access modal
    if (value.length > 0) {
      onGetAccessRequest()
      return
    }
    
    onSearch(value)
  }

  const handleClear = () => {
    setQuery("")
    onClear()
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (query.length > 0) {
        onGetAccessRequest()
      } else {
        onSearch(query)
      }
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pl-10 pr-10 h-12 text-base border-slate-300 focus:border-slate-400 focus:ring-slate-400"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-slate-600 mb-3">Try searching for:</p>
          <div className="flex flex-wrap gap-2">
            {["Stanford", "Berkeley", "Apple", "Google", "Microsoft", "PhD", "MBA"].map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => {
                  setQuery(suggestion)
                  onGetAccessRequest()
                }}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 