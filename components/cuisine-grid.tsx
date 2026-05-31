'use client'

import { CuisineCard } from './cuisine-card'
import type { Cuisine } from '@/lib/schemas'

interface CuisineGridProps {
  cuisines: Cuisine[]
  count: number
}

export function CuisineGrid({ cuisines, count }: CuisineGridProps) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-[#a7a7a7] mb-5 uppercase">
        {count} cucine disponibili
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cuisines.map((cuisine) => (
          <CuisineCard key={cuisine.id} cuisine={cuisine} />
        ))}
      </div>
    </div>
  )
}
