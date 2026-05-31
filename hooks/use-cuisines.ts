import { useQuery } from '@tanstack/react-query'
import { fetchCuisines } from '@/lib/api'

interface Coords {
  lat: number
  lng: number
}

export function useCuisines(coords: Coords | null) {
  return useQuery({
    queryKey: ['cuisines', coords?.lat, coords?.lng],
    queryFn: () => fetchCuisines(coords!.lat, coords!.lng),
    enabled: coords !== null,
    staleTime: 10 * 60 * 1000,
  })
}
