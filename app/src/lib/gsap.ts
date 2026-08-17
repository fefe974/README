import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/* Registered once, before any GSAP code runs. useGSAP handles cleanup
   automatically, so components never leak a tween or leave an element
   stuck at the inline styles a killed tween happened to reach. */
gsap.registerPlugin(useGSAP)

export { gsap, useGSAP }

/* prefers-reduced-motion via gsap.matchMedia rather than a manual
   window.matchMedia check: matchMedia reverts everything it created
   when the query stops matching, so flipping the OS setting takes
   effect immediately instead of at the next mount. */
export const REDUCED = '(prefers-reduced-motion: reduce)'
export const FULL = '(prefers-reduced-motion: no-preference)'
