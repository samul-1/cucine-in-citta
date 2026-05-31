import { CitiesResponseSchema, CuisinesResponseSchema, type City, type Cuisine } from './schemas'

const BASE_URL = 'https://api.bestiebite.com'

export async function fetchCities(term: string, signal?: AbortSignal): Promise<City[]> {
  const params = new URLSearchParams({ term, lang: 'it', limit: '8' })
  const res = await fetch(`${BASE_URL}/places/v2/autocomplete?${params}`, { signal })

  if (!res.ok) {
    throw new Error(`City search failed: ${res.status}`)
  }

  const json = await res.json()
  return CitiesResponseSchema.parse(json)
}

export async function fetchCuisines(lat: number, lng: number, signal?: AbortSignal): Promise<Cuisine[]> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lng: lng.toString(),
    type: 'cuisine',
  })
  const res = await fetch(`${BASE_URL}/places/labels/by-location-and-type?${params}`, { signal })

  if (!res.ok) {
    throw new Error(`Cuisines fetch failed: ${res.status}`)
  }

  const json = await res.json()
  const parsed = CuisinesResponseSchema.parse(json)
  return parsed.data
}
