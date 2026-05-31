'use client'

import { useRef, useState, useEffect } from 'react'
import { Search, Loader2, RefreshCw } from 'lucide-react'
import { useCitySearch } from '@/hooks/use-city-search'
import { SuggestionsList } from './suggestions-list'
import type { City } from '@/lib/schemas'

interface SearchBarProps {
  onCitySelect: (city: City) => void
}

export function SearchBar({ onCitySelect }: SearchBarProps) {
  const [term, setTerm] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: cities, isFetching, isTyping, isError, refetch } = useCitySearch(term)

  const showSuggestions = open && term.length >= 2

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(city: City) {
    setTerm('')
    setOpen(false)
    onCitySelect(city)
  }

  const isLoading = (isFetching || isTyping) && term.length >= 2

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border bg-[#0e0e0e] transition-colors ${
          open && term.length >= 2
            ? 'border-[#ff5c5c]'
            : 'border-[#252525] hover:border-[#3e4142]'
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 text-[#ff5c5c] shrink-0 animate-spin" aria-hidden />
        ) : (
          <Search className="w-5 h-5 text-[#ff5c5c] shrink-0" aria-hidden />
        )}
        <input
          type="text"
          role="combobox"
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
          aria-label="Cerca una città"
          placeholder="Cerca una città..."
          value={term}
          onChange={(e) => {
            setTerm(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          className="flex-1 bg-transparent text-white placeholder:text-[#a7a7a7] outline-none text-base"
        />
      </div>

      {showSuggestions && (
        <>
          {isLoading && !cities?.length && (
            <ul
              aria-label="Ricerca in corso"
              aria-busy="true"
              className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-[#252525] bg-[#0e0e0e] overflow-hidden shadow-xl z-50"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>
                  <div className="px-5 py-4">
                    <div className="h-3.5 w-32 rounded bg-[#1a1a1a] animate-pulse mb-4" />
                    <div className="h-2.5 w-48 rounded bg-[#1a1a1a] animate-pulse" />
                  </div>
                  {i < 3 && <div className="h-px bg-[#252525]" />}
                </li>
              ))}
            </ul>
          )}
          {!isLoading && isError && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-[#252525] bg-[#0e0e0e] px-5 py-4 shadow-xl z-50 flex items-center justify-between gap-3">
              <span className="text-[#a7a7a7] text-sm">Errore nella ricerca.</span>
              <button
                type="button"
                onClick={() => refetch()}
                className="flex items-center gap-1.5 text-sm text-white border border-[#252525] rounded-lg px-3 py-1.5 hover:border-[#3e4142] transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" aria-hidden />
                Riprova
              </button>
            </div>
          )}
          {!isLoading && !isError && cities && cities.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-[#252525] bg-[#0e0e0e] px-5 py-4 text-[#a7a7a7] text-sm shadow-xl z-50">
              Nessuna città trovata per &ldquo;{term}&rdquo;
            </div>
          )}
          {!isLoading && cities && cities.length > 0 && (
            <SuggestionsList cities={cities} onSelect={handleSelect} />
          )}
        </>
      )}
    </div>
  )
}
