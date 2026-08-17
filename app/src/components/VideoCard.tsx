import { useRef, useState } from 'react'
import { VIDEO_POSTER, VIDEO_SECONDS, VIDEO_SRC, VIDEO_TRANSCRIPT, VIDEO_WEBM } from '@/lib/video'
import { cn } from '@/lib/utils'

/* The recap is silent and carries all of its information as on-screen
   text, so the transcript is not a nicety — it is the accessible
   equivalent, and it doubles as a skimmable outline. */

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export function VideoCard() {
  const v = useRef<HTMLVideoElement>(null)
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)

  return (
    <section data-panel-card>
      <h2 className="mb-1 font-mono text-[10.5px] uppercase tracking-[0.13em] text-muted">Repaso en video</h2>
      <p className="mb-3 text-[13px] leading-snug text-muted">
        Los dos capítulos en {mmss(VIDEO_SECONDS)}. Sin audio: todo el contenido está en pantalla.
      </p>

      <div className="overflow-hidden rounded-xl border border-rule bg-sheet shadow-[var(--shadow-sm)]">
        <video
          ref={v}
          poster={VIDEO_POSTER}
          controls
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label="Repaso en video de los capítulos 1 y 2. Vídeo mudo; la transcripción está debajo."
          className="block aspect-video w-full bg-sunk"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <source src={VIDEO_WEBM} type="video/webm" />
        </video>

        <div className="flex items-center gap-2 border-t border-rule px-3 py-2.5">
          <button
            onClick={() => {
              const el = v.current
              if (!el) return
              if (el.paused) void el.play()
              else el.pause()
            }}
            className="rounded-lg bg-seal px-3.5 py-2 text-[13.5px] font-bold text-sheet"
          >
            {playing ? 'Pausar' : 'Reproducir'}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="rounded-lg border border-rule2 bg-sheet px-3.5 py-2 text-[13.5px] font-bold"
          >
            {open ? 'Ocultar transcripción' : 'Transcripción'}
          </button>
          <span className="ml-auto font-mono text-[11px] tabular-nums text-muted">
            {mmss(VIDEO_SECONDS)}
          </span>
        </div>

        {open && (
          <ol className="border-t border-rule">
            {VIDEO_TRANSCRIPT.map(([t, text], i) => (
              <li key={t} className={cn('flex gap-3 px-4 py-3', i && 'border-t border-rule')}>
                <button
                  onClick={() => {
                    const el = v.current
                    if (!el) return
                    const [m, s] = t.split(':').map(Number)
                    el.currentTime = m * 60 + s
                    void el.play()
                  }}
                  className="h-fit flex-none rounded border border-rule2 bg-sunk px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-seal"
                >
                  {t}
                </button>
                <p className="text-[14px] leading-relaxed text-ink2">{text}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
