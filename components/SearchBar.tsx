"use client"

import { useState, useRef } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear: () => void
  placeholder?: string
  disabled?: boolean
}

export function SearchBar({ onSearch, onClear, placeholder = "Search founders by school, company, or name... (use + for multiple terms)", disabled = false }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch(searchQuery)
  }

  const handleClear = () => {
    setQuery("")
    onClear()
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(query)
    }
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
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className={`pl-10 pr-10 h-12 text-base border-slate-300 focus:border-slate-400 focus:ring-slate-400 ${disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : ''}`}
          disabled={disabled}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
            disabled={disabled}
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
                onClick={() => handleSearch(suggestion)}
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