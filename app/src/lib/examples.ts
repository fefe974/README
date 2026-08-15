import type { Example } from './types'
import { CH1_EXAMPLES } from './chapters/ch1-examples'
import { CH2_EXAMPLES } from './chapters/ch2-examples'

const ALL: Record<string, Example> = { ...CH1_EXAMPLES, ...CH2_EXAMPLES }

/* Key is `${articleId}-${stepIndex}`. */
export const exampleFor = (articleId: string, step: number): Example | null =>
  ALL[`${articleId}-${step}`] ?? null

export const EXAMPLE_KEYS = Object.keys(ALL)
