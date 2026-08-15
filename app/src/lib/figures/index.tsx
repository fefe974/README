import type { ReactElement } from 'react'
import { CH1_FIGURES } from './ch1'
import { CH2_FIGURES } from './ch2'
import { Frame } from './kit'

const ALL: Record<string, () => ReactElement> = { ...CH1_FIGURES, ...CH2_FIGURES }

export function Figure({ id, cap }: { id: string; cap: string }) {
  const C = ALL[id]
  if (!C) return null
  return (
    <Frame cap={cap}>
      <C />
    </Frame>
  )
}
