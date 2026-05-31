import { describe, it, expect } from 'vitest'
import {
  CitiesResponseSchema,
  CuisinesResponseSchema,
  CitySchema,
  CuisineSchema,
} from '../lib/schemas'

const validCity = {
  id: 8047,
  name: 'Milano',
  description: 'Milano, Lombardia, Italia',
  latitude: 45.4612939,
  longitude: 9.172356,
  country_code: 'IT',
  structured_formatting: {
    main_text: 'Milano',
    secondary_text: 'Lombardia, Italia',
  },
}

const validCuisine = {
  id: 52,
  name: 'Cinese',
  name_it: 'Cinese',
  name_eng: 'Chinese',
  color: '#5B50A1',
  image_emoji: 'https://firebasestorage.googleapis.com/v0/b/example/cuisine.png',
  type: 'cuisine' as const,
  eng_label: 'chinese',
}

describe('CitySchema', () => {
  it('parses a valid city', () => {
    const result = CitySchema.safeParse(validCity)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Milano')
      expect(result.data.latitude).toBe(45.4612939)
    }
  })

  it('rejects a city missing required fields', () => {
    const { latitude: _lat, ...withoutLat } = validCity
    const result = CitySchema.safeParse(withoutLat)
    expect(result.success).toBe(false)
  })

  it('rejects a city with wrong types', () => {
    const result = CitySchema.safeParse({ ...validCity, id: 'not-a-number' })
    expect(result.success).toBe(false)
  })
})

describe('CitiesResponseSchema', () => {
  it('parses an array of cities', () => {
    const result = CitiesResponseSchema.safeParse([validCity])
    expect(result.success).toBe(true)
    if (result.success) expect(result.data).toHaveLength(1)
  })

  it('parses an empty array (no-results case)', () => {
    const result = CitiesResponseSchema.safeParse([])
    expect(result.success).toBe(true)
    if (result.success) expect(result.data).toHaveLength(0)
  })
})

describe('CuisineSchema', () => {
  it('parses a valid cuisine', () => {
    const result = CuisineSchema.safeParse(validCuisine)
    expect(result.success).toBe(true)
  })

  it('validates image_emoji as a URL', () => {
    const result = CuisineSchema.safeParse({ ...validCuisine, image_emoji: 'not-a-url' })
    expect(result.success).toBe(false)
  })

  it('rejects a non-cuisine type', () => {
    const result = CuisineSchema.safeParse({ ...validCuisine, type: 'neighborhood' })
    expect(result.success).toBe(false)
  })

  it('allows optional color field to be absent', () => {
    const { color: _color, ...withoutColor } = validCuisine
    const result = CuisineSchema.safeParse(withoutColor)
    expect(result.success).toBe(true)
  })
})

describe('CuisinesResponseSchema', () => {
  it('parses a valid cuisines response', () => {
    const result = CuisinesResponseSchema.safeParse({
      length: 1,
      data: [validCuisine],
    })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.data).toHaveLength(1)
  })

  it('rejects missing data field', () => {
    const result = CuisinesResponseSchema.safeParse({ length: 0 })
    expect(result.success).toBe(false)
  })
})
