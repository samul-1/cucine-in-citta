'use client'

export function ItalyMap() {
  return (
    <div className="w-64 h-80 opacity-30 flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/italy.svg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="w-full h-full object-contain"
      />
    </div>
  )
}
