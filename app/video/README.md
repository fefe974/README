# El repaso en video

`repaso.mp4` / `repaso.webm` no se editan a mano: se generan.

```bash
node video/render.mjs          # scene.html -> video/frames/*.jpg (1728 cuadros, 24 fps)
node_modules/ffmpeg-static/ffmpeg -y -framerate 24 -i video/frames/f%05d.jpg \
  -c:v libx264 -profile:v main -pix_fmt yuv420p -preset slow -crf 35 \
  -movflags +faststart -an video/repaso.mp4
node_modules/ffmpeg-static/ffmpeg -y -framerate 24 -i video/frames/f%05d.jpg \
  -c:v libvpx-vp9 -crf 56 -b:v 0 -row-mt 1 -cpu-used 2 -pix_fmt yuv420p -an video/repaso.webm
```

Después vuelve a generar `src/lib/video.ts` (data URIs + transcripción) y reconstruye.

## Decisiones

- **`scene.html`** reutiliza los tokens y las fuentes de la app, así que el video no
  se parece a la app: está hecho con la app.
- **El render busca en la línea de tiempo** (`tl.time(t)`) en vez de grabar en tiempo
  real. Cada cuadro cae exactamente donde debe sin importar lo lento que renderice,
  así que el resultado es determinista y reproducible.
- **Dos codificaciones.** H.264 primero: es el único que llevan Safari e iOS y se
  decodifica por hardware. VP9 después, para builds de Chromium sin códecs
  propietarios — que es justamente el caso del Chromium de pruebas, así que la
  reproducción se puede verificar automatizada.
- **CRF 35 / 56, no 31 / 50.** El artefacto publicado rechaza páginas por encima de
  ~2.3 MiB, y como todo va incrustado en base64 el video es la mitad del peso. El
  contenido son láminas de color plano y texto, que soportan mucha compresión: a
  CRF 35 el cuadro es indistinguible del de CRF 31 y las dos codificaciones juntas
  bajan de 1.29 MiB a 0.93 MiB. Si el video crece, este es el primer sitio donde
  recortar — antes de quitar una de las dos codificaciones.
- **Sin audio.** No hay síntesis de voz disponible sin red, y un repaso mudo con
  texto en pantalla funciona en el metro con el teléfono en silencio. La
  transcripción en `video.ts` es el equivalente accesible, no un extra.

`video/frames/` está en `.gitignore`: son 1728 JPG intermedios.
