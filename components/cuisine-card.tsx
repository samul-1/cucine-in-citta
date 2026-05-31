'use client'

import Image from 'next/image'
import type { Cuisine } from '@/lib/schemas'

interface CuisineCardProps {
  cuisine: Cuisine
}

export function CuisineCard({ cuisine }: CuisineCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[#252525] bg-[#0e0e0e] p-5 hover:border-[#3e4142] transition-colors">
      <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden shrink-0">
        <Image
          src={cuisine.image_emoji}
          alt={cuisine.name_it}
          width={64}
          height={64}
          className="object-contain"
          unoptimized
        />
      </div>
      <span className="text-sm font-semibold text-white text-center leading-tight">
        {cuisine.name_it}
      </span>
    </div>
  )
}
