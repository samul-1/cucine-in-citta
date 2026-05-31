'use client'

import type { Cuisine } from '@/lib/schemas'

export function CuisineCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[#252525] bg-[#0e0e0e] p-5">
      <div className="w-20 h-20 rounded-full bg-[#1a1a1a] animate-pulse shrink-0" />
      <div className="h-3.5 w-16 rounded bg-[#1a1a1a] animate-pulse" />
    </div>
  )
}

interface CuisineCardProps {
  cuisine: Cuisine
  isSelected: boolean
  onSelect: (id: number) => void
}

export function CuisineCard({ cuisine, isSelected, onSelect }: CuisineCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(cuisine.id)}
      className={`flex flex-col items-center gap-3 rounded-xl border bg-[#0e0e0e] p-5 w-full transition-colors text-left ${
        isSelected
          ? 'border-[#ff5c5c]'
          : 'border-[#252525] hover:border-[#3e4142]'
      }`}
      aria-pressed={isSelected}
      aria-label={cuisine.name_it}
    >
      <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cuisine.image_emoji}
          alt=""
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <span className="text-sm font-semibold text-white text-center leading-tight">
        {cuisine.name_it}
      </span>
    </button>
  )
}
