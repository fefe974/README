/** Tokens mirror src/styles/tokens.css so every colour resolves in both themes. */
const t = (n) => `rgb(var(--${n}) / <alpha-value>)`
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: t('ground'), sheet: t('sheet'), sunk: t('sunk'),
        ink: t('ink'), ink2: t('ink-2'), muted: t('muted'),
        rule: t('rule'), rule2: t('rule-2'),
        seal: t('seal'), sealsoft: t('seal-soft'),
        ok: t('ok'), oksoft: t('ok-soft'), no: t('no'), nosoft: t('no-soft'),
      },
      fontFamily: {
        display: ['EB Garamond', 'ui-serif', 'Georgia', 'serif'],
        body: ['Atkinson Hyperlegible', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: { read: '34rem' },
    },
  },
  plugins: [],
}
