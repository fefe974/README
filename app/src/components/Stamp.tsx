import { useRef } from 'react'
import { FULL, gsap, REDUCED, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/* The signature element. Completing an article stamps it certified —
   the gesture the whole subject turns on, since a government's books
   only mean anything once someone certifies them for the public.
   Motion tier "Standard" per the skill: back.out easing, ~400ms. */

export function Stamp({
  roman,
  animate = false,
  size = 'md',
  className,
}: {
  roman: string
  animate?: boolean
  size?: 'sm' | 'md'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!animate) return
      const mm = gsap.matchMedia()

      // Motion off: land the stamp, don't perform it.
      mm.add(REDUCED, () => {
        gsap.set(ref.current, { opacity: 1, scale: 1, rotate: -4 })
      })

      // Standard tier: back.out to land it, then a short press.
      mm.add(FULL, () => {
        gsap
          .timeline()
          .fromTo(
            ref.current,
            { opacity: 0, scale: 1.75, rotate: -16 },
            { opacity: 1, scale: 1, rotate: -4, duration: 0.42, ease: 'back.out(1.6)' },
          )
          .to(ref.current, { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.inOut' })
      })

      return () => mm.revert()
    },
    { dependencies: [animate], scope: ref },
  )

  const sm = size === 'sm'
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={animate ? { opacity: 0 } : { transform: 'rotate(-4deg)' }}
      className={cn(
        'pointer-events-none select-none border-[2.5px] border-double border-seal text-seal',
        sm ? 'rounded-[5px] px-2 py-1' : 'rounded-md px-3 py-1.5',
        className,
      )}
    >
      <div className={cn('font-mono uppercase leading-none tracking-[0.14em]', sm ? 'text-[8px]' : 'text-[9px]')}>
        Artículo {roman}
      </div>
      <div className={cn('font-mono font-medium uppercase leading-tight tracking-[0.1em]', sm ? 'text-[9px]' : 'text-[11px]')}>
        Certificado
      </div>
    </div>
  )
}
