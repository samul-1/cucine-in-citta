'use client'

import { ChevronRight } from 'lucide-react'
import type { City } from '@/lib/schemas'

interface SuggestionsListProps {
  cities: City[]
  onSelect: (city: City) => void
}

export function SuggestionsList({ cities, onSelect }: SuggestionsListProps) {
  return (
    <ul
      role="listbox"
      className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-[#252525] bg-[#0e0e0e] overflow-hidden shadow-xl z-50"
    >
      {cities.map((city, index) => (
        <li key={city.id} role="option" aria-selected={false}>
          <button
            type="button"
            onClick={() => onSelect(city)}
            className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-[#1a1212] transition-colors group"
            style={
              index === 0
                ? { background: 'rgba(139, 69, 30, 0.25)' }
                : undefined
            }
          >
            <span>
              <span className="block font-semibold text-white">
                {city.structured_formatting.main_text}
              </span>
              <span className="block text-sm text-[#a7a7a7]">
                {city.structured_formatting.secondary_text}
              </span>
            </span>
            {index === 0 && (
              <ChevronRight className="w-4 h-4 text-[#a7a7a7]" aria-hidden />
            )}
          </button>
          {index < cities.length - 1 && (
            <div className="h-px bg-[#252525] mx-0" />
          )}
        </li>
      ))}
    </ul>
  )
}
