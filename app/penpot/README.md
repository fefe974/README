# Diseño en Penpot

`cuentas-publicas.tokens.json` es un archivo **W3C DTCG** listo para importar en Penpot:
*Workspace → Tokens → ⋯ → Import*. Trae dos temas (claro y oscuro) sobre un set `core`
compartido de espaciado, radios, tipografía y trazos.

## De dónde salen los tokens de la app

El JSON es la fuente. `src/styles/tokens.css` se **genera** a partir de él, así que el
archivo que abres en Penpot y el que corre en producción no pueden divergir. Si cambias
un color en Penpot, exporta el JSON encima de este archivo y vuelve a generar el CSS.

## Por qué el formato y no un archivo `.penpot`

Penpot no se pudo ejecutar aquí: el gateway responde 403 a `penpot.app` y a
`design.penpot.app`, y aunque Docker está instalado su demonio no corre, así que no hay
forma de levantar la pila (PostgreSQL, Redis, backend Clojure, exporter). El repo sí se
clona, y de ahí salió lo que importaba: el formato exacto que Penpot importa, confirmado
contra sus propias fixtures de test en `common/test/common_tests/types/data/`.

Un archivo de tokens es además más útil que una maqueta: es la **fuente** del diseño,
no una foto de él.

## Las dos identidades

| Piel | Fondo | Acento | Idea |
|---|---|---|---|
| `workpaper` (por defecto) | papel columnar, verde frío | índigo `#3A3A8F` | el papel de trabajo del auditor, donde ocurre el trabajo |
| `record` | papel bond, gris cálido | azul de sello `#1B3A6B` | el informe público terminado |

La app arrancó como libro y hoy es un entrenador con panel; la identidad siguió al
producto. Se cambia desde el panel, en *Apariencia*, y la elección persiste.

Todos los contrastes están verificados contra ambas superficies: texto ≥ 4.5:1,
elementos no textuales ≥ 3:1. `muted` se oscureció de `#667065` a `#5E685D` porque el
primero daba 4.36:1 sobre el fondo.
