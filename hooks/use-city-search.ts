import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce'
import { fetchCities } from '@/lib/api'

export function useCitySearch(term: string) {
  const [debouncedTerm] = useDebounce(term, 250)

  const query = useQuery({
    queryKey: ['cities', debouncedTerm],
    queryFn: () => fetchCities(debouncedTerm),
    enabled: debouncedTerm.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
  })

  const isTyping = term !== debouncedTerm && term.length >= 2

  return { ...query, isTyping }
}
