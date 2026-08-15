import { useEffect, useRef } from 'react'
import gsap from 'gsap'
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
  const played = useRef(false)

  useEffect(() => {
    if (!animate || played.current || !ref.current) return
    played.current = true

    // Respect the user's motion preference: land it, don't perform it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(ref.current, { opacity: 1, scale: 1, rotate: -4 })
      return
    }

    const tl = gsap.timeline()
    tl.fromTo(
      ref.current,
      { opacity: 0, scale: 1.75, rotate: -16 },
      { opacity: 1, scale: 1, rotate: -4, duration: 0.42, ease: 'back.out(1.6)' },
    ).to(ref.current, { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.inOut' })
    return () => {
      tl.kill()
    }
  }, [animate])

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
