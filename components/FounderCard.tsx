"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Linkedin } from "lucide-react"

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

interface FounderCardProps {
  founder: FounderProfile
  searchMatches?: SearchMatch[]
}

export function FounderCard({ founder, searchMatches = [] }: FounderCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-slate-200 hover:border-slate-300 bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
              {founder.founder_name}
            </CardTitle>
            <p className="text-sm font-medium text-slate-600">
              {founder.company_name}
            </p>
          </div>
          <Badge variant="outline" className="text-xs font-medium border-slate-300 text-slate-600">
            {founder.yc_batch}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Education */}
        {founder.founder_education && Array.isArray(founder.founder_education) && founder.founder_education.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>🎓</span>
              <span>Education</span>
            </div>
            <div className="space-y-1">
              {(() => {
                // Reorder education items to prioritize matches
                const educationWithMatches = founder.founder_education.map((edu: Education, index: number) => {
                  const isMatched = searchMatches.some(match => 
                    match.type === 'education' && match.index === index
                  )
                  return { edu, index, isMatched }
                })
                
                // Sort: matched items first, then by original order
                const sortedEducation = educationWithMatches.sort((a, b) => {
                  if (a.isMatched && !b.isMatched) return -1
                  if (!a.isMatched && b.isMatched) return 1
                  return a.index - b.index
                })
                
                // Show up to 3 items if there are matches, otherwise 2
                const maxItems = searchMatches.some(match => match.type === 'education') ? 3 : 2
                const itemsToShow = sortedEducation.slice(0, maxItems)
                
                return (
                  <>
                    {itemsToShow.map(({ edu, index, isMatched }) => {
                      const schoolMatch = searchMatches.find(match => 
                        match.type === 'education' && match.index === index && match.field === 'school'
                      )
                      const degreeMatch = searchMatches.find(match => 
                        match.type === 'education' && match.index === index && match.field === 'degree'
                      )
                      
                      return (
                        <div 
                          key={index} 
                          className={`text-xs ${
                            isMatched 
                              ? 'bg-yellow-50 border border-yellow-200 rounded px-2 py-1 text-yellow-800 font-medium' 
                              : 'text-slate-700'
                          }`}
                        >
                          {degreeMatch ? (
                            <span className="bg-yellow-200 px-1 rounded">{edu.degree || 'N/A'}</span>
                          ) : (
                            edu.degree || 'N/A'
                          )} • {schoolMatch ? (
                            <span className="bg-yellow-200 px-1 rounded">{edu.school}</span>
                          ) : (
                            edu.school
                          )}
                        </div>
                      )
                    })}
                    {founder.founder_education.length > maxItems && (
                      <div className="text-xs text-slate-500">
                        +{founder.founder_education.length - maxItems} more
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        )}

        {/* Experience */}
        {founder.founder_experience && Array.isArray(founder.founder_experience) && founder.founder_experience.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>💼</span>
              <span>Experience</span>
            </div>
            <div className="space-y-1">
              {(() => {
                // Reorder experience items to prioritize matches
                const experienceWithMatches = founder.founder_experience.map((exp: Experience, index: number) => {
                  const isMatched = searchMatches.some(match => 
                    match.type === 'experience' && match.index === index
                  )
                  return { exp, index, isMatched }
                })
                
                // Sort: matched items first, then by original order
                const sortedExperience = experienceWithMatches.sort((a, b) => {
                  if (a.isMatched && !b.isMatched) return -1
                  if (!a.isMatched && b.isMatched) return 1
                  return a.index - b.index
                })
                
                // Show up to 3 items if there are matches, otherwise 2
                const maxItems = searchMatches.some(match => match.type === 'experience') ? 3 : 2
                const itemsToShow = sortedExperience.slice(0, maxItems)
                
                return (
                  <>
                    {itemsToShow.map(({ exp, index, isMatched }) => {
                      const companyMatch = searchMatches.find(match => 
                        match.type === 'experience' && match.index === index && match.field === 'company'
                      )
                      const titleMatch = searchMatches.find(match => 
                        match.type === 'experience' && match.index === index && match.field === 'title'
                      )
                      
                      return (
                        <div 
                          key={index} 
                          className={`text-xs ${
                            isMatched 
                              ? 'bg-yellow-50 border border-yellow-200 rounded px-2 py-1 text-yellow-800 font-medium' 
                              : 'text-slate-700'
                          }`}
                        >
                          {titleMatch ? (
                            <span className="bg-yellow-200 px-1 rounded">{exp.title || 'N/A'}</span>
                          ) : (
                            exp.title || 'N/A'
                          )} at {companyMatch ? (
                            <span className="bg-yellow-200 px-1 rounded">{exp.company}</span>
                          ) : (
                            exp.company
                          )}
                        </div>
                      )
                    })}
                    {founder.founder_experience.length > maxItems && (
                      <div className="text-xs text-slate-500">
                        +{founder.founder_experience.length - maxItems} more
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400"
            onClick={() => window.open(founder.linkedin_url, '_blank')}
          >
            <Linkedin className="w-3 h-3 mr-2" />
            LinkedIn
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs border-slate-300 text-slate-600 hover:bg-slate-50 hover:border-slate-400"
            onClick={() => window.open(founder.yc_url, '_blank')}
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            Company
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 