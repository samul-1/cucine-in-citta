'use client'

import { useState } from 'react'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { SearchBar } from './search-bar'
import { CuisineGrid } from './cuisine-grid'
import { CuisineCardSkeleton } from './cuisine-card'
import { ItalyMap } from './italy-map'
import { useCuisines } from '@/hooks/use-cuisines'
import type { City } from '@/lib/schemas'

function SiteHeader() {
  return (
    <header className="border-b border-[#252525] px-6 py-4 flex items-center justify-between">
      <span className="text-lg font-bold text-white tracking-tight">Bestie Bite</span>
      <nav aria-label="Navigazione principale" className="flex items-center gap-6 text-sm text-[#a7a7a7]">
        <a href="#" className="hover:text-white transition-colors">Per ristoranti</a>
        <a href="#" className="hover:text-white transition-colors">Accedi</a>
      </nav>
    </header>
  )
}

function CuisinesSkeleton() {
  return (
    <div aria-label="Caricamento cucine in corso" aria-busy="true">
      <div className="h-3 w-36 rounded bg-[#1a1a1a] animate-pulse mb-5" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CuisineCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function CucineInCitta() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  const coords = selectedCity
    ? { lat: selectedCity.latitude, lng: selectedCity.longitude }
    : null

  const { data: cuisines, isFetching, isError, refetch } = useCuisines(coords)

  if (selectedCity) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="max-w-5xl mx-auto px-6 py-10">
          <button
            type="button"
            onClick={() => setSelectedCity(null)}
            className="flex items-center gap-2 text-[#ff5c5c] text-sm mb-8 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Cucine in città
          </button>

          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-1 leading-none">
              {selectedCity.structured_formatting.main_text}
            </h1>
            <div className="h-0.5 w-10 bg-[#ff5c5c] mt-2 mb-2" aria-hidden />
            <p className="text-[#a7a7a7] text-sm">
              {selectedCity.structured_formatting.secondary_text}
            </p>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {isFetching && <CuisinesSkeleton />}

            {isError && (
              <div className="flex flex-col items-center gap-4 py-16 text-center" role="alert">
                <p className="text-[#a7a7a7]">Errore nel caricamento delle cucine.</p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#252525] text-sm text-white hover:border-[#3e4142] transition-colors"
                >
                  <RefreshCw className="w-4 h-4" aria-hidden />
                  Riprova
                </button>
              </div>
            )}

            {!isFetching && !isError && cuisines && cuisines.length === 0 && (
              <p className="text-[#a7a7a7] py-16 text-center">
                Nessuna cucina disponibile per questa città.
              </p>
            )}

            {!isFetching && !isError && cuisines && cuisines.length > 0 && (
              <CuisineGrid cuisines={cuisines} count={cuisines.length} />
            )}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex flex-col items-center px-6 pt-24 pb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-3">
          Cucine in città
        </h1>
        <p className="text-[#a7a7a7] text-center mb-10 text-lg">
          Scopri cosa si mangia ovunque nel mondo, in pochi click
        </p>

        <SearchBar onCitySelect={setSelectedCity} />

        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <ItalyMap />
          <p className="text-[#a7a7a7] text-sm">
            inizia a cercare una città per scoprire le cucine disponibili
          </p>
        </div>
      </main>
    </div>
  )
}
