import type { ReactNode } from 'react'

/* Shared drawing kit. Colours come from the token variables so both
   themes resolve; nothing here depends on a raw hex. */

export const INK = 'rgb(var(--ink))'
export const MUT = 'rgb(var(--muted))'
export const SEAL = 'rgb(var(--seal))'
export const SEALS = 'rgb(var(--seal-soft))'
export const RULE = 'rgb(var(--rule-2))'
export const SHEET = 'rgb(var(--sheet))'
export const SUNK = 'rgb(var(--sunk))'
export const NO = 'rgb(var(--no))'
export const NOS = 'rgb(var(--no-soft))'
export const OK = 'rgb(var(--ok))'
export const OKS = 'rgb(var(--ok-soft))'

export function Defs() {
  return (
    <defs>
      <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={INK} />
      </marker>
      <marker id="ars" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={SEAL} />
      </marker>
      <marker id="arn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={NO} />
      </marker>
    </defs>
  )
}

export type BoxProps = {
  x: number; y: number; w: number; h: number
  a: string; b?: string
  stroke?: string; fill?: string; text?: string; sub?: string
}
export function Box({ x, y, w, h, a, b, stroke = RULE, fill = SHEET, text = INK, sub = MUT }: BoxProps) {
  const cx = x + w / 2
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={fill} stroke={stroke} strokeWidth="1.2" />
      {b ? (
        <>
          <text x={cx} y={y + h / 2 - 3} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={text}>{a}</text>
          <text x={cx} y={y + h / 2 + 11} textAnchor="middle" fontSize="10" fill={sub}>{b}</text>
        </>
      ) : (
        <text x={cx} y={y + h / 2 + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={text}>{a}</text>
      )}
    </>
  )
}

export const svgProps = (label: string, h: number) => ({
  viewBox: `0 0 360 ${h}`,
  role: 'img' as const,
  'aria-label': label,
  className: 'block h-auto w-full min-w-[320px]',
})


export function Frame({ children, cap }: { children: ReactNode; cap: string }) {
  return (
    <figure className="mt-5 rounded-xl border border-rule bg-sheet p-4 pb-3 shadow-[var(--shadow-sm)]">
      <div className="overflow-x-auto">{children}</div>
      <figcaption className="mt-3 border-t border-rule pt-3 text-[13px] leading-snug text-muted">{cap}</figcaption>
    </figure>
  )
}
