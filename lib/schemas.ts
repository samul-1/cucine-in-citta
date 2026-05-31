import { z } from 'zod'

const StructuredFormattingSchema = z.object({
  main_text: z.string(),
  secondary_text: z.string(),
})

export const CitySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  country_code: z.string(),
  structured_formatting: StructuredFormattingSchema,
})

export const CitiesResponseSchema = z.array(CitySchema)

export type City = z.infer<typeof CitySchema>

export const CuisineSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_it: z.string(),
  name_eng: z.string().optional(),
  color: z.string().optional(),
  image_emoji: z.string().url(),
  type: z.literal('cuisine'),
  eng_label: z.string(),
})

export const CuisinesResponseSchema = z.object({
  length: z.number(),
  data: z.array(CuisineSchema),
})

export type Cuisine = z.infer<typeof CuisineSchema>
export type CuisinesResponse = z.infer<typeof CuisinesResponseSchema>
