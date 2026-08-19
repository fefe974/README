# Direcciones de diseño

Tres direcciones alternativas para el app del curso, cada una con panel y
lección, más el diseño actual como referencia. Publicadas como un canvas de
Claude Design.

| Archivo | Qué es |
| --- | --- |
| `Main.dc.html` | Referencia: el panel de hoy, piel «papel de trabajo» |
| `A-Panel` · `A-Leccion` | **Cátedra nocturna** — cambia el *tono*: noche, Instrument Serif, oro, sin tarjetas |
| `B-Panel` · `B-Leccion` | **Libro mayor** — cambia la *densidad*: el curso como estado financiero |
| `C-Panel` · `C-Leccion` | **La ruta** — cambia la *arquitectura*: una cosa hoy, y el camino debajo |
| `canvas.json` | Posición de cada tablero en el lienzo y las notas con pros y contras |

Los tres usan el mismo ejercicio real (2-III, «Un camión de basura, dos
cifras») para que la comparación sea pareja, y los tres conservan **Atkinson
Hyperlegible** en el cuerpo: la accesibilidad no entra en la negociación
estética. Todo el texto pasa 4.5:1 sobre su fondo.

Son mockups estáticos para elegir dirección, no prototipos. Al elegir una se
lleva a `app/src`.

## Regenerar el canvas

```
node "<skill>/seed-canvas.mjs" --template "<skill>/payload.template.html" \
  --out cuentas-publicas-direcciones.html \
  --title "Cuentas Públicas · tres direcciones" \
  --artboard Main.dc.html \
  --artboard A-Panel.dc.html --artboard A-Leccion.dc.html \
  --artboard B-Panel.dc.html --artboard B-Leccion.dc.html \
  --artboard C-Panel.dc.html --artboard C-Leccion.dc.html \
  --canvas canvas.json
```

`cuentas-publicas-direcciones.html` es generado — no se edita a mano: se
editan los `.dc.html` y se vuelve a generar.
