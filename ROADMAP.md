# Web Atalaya — Hoja de ruta de ejecución

**Cliente:** Salón de Belleza Atalaya (Perú) · 3 locales: Barranco (Lima), Tocache y Tarapoto (San Martín)
**Agencia:** Crouton Lab · Ricardo Silbec
**Contrato:** S/ 1,050 · inicio 20 de julio 2026 · 60 días de garantía post-entrega
**Documento:** v1 · agosto 2026
**Para:** el modelo que ejecuta la construcción (Sonnet). Este documento es la especificación completa. No improvises fuera de él sin decirlo.

---

## 0-bis. Estado de la construcción (17 ago 2026)

**Fases 1 a 4 construidas, verificadas y desplegadas.**

- **Producción (Vercel):** https://web-atalaya.vercel.app — URLs limpias activas
- **Espejo (GitHub Pages):** https://ricardosilbec.github.io/web-atalaya/
- **Repo:** https://github.com/ricardosilbec/web-atalaya
- Local: `npx serve "Web Atalaya"`

Ambos despliegues llevan `noindex, nofollow` y `robots.txt` con `Disallow: /`
mientras sea una revisión con contenido de relleno. Ver el README del repo para
los 4 pasos de paso a dominio definitivo.

Hecho:
- Logo vectorizado a SVG desde los PNG del manual (`assets/marca/`), con
  suavizado que preserva esquinas. Símbolo 2.1 KB. Favicon generado.
- Jost autoalojada, subconjunto latín, 26.6 KB, un solo archivo variable 300–500.
- `atalaya-system.css` + `atalaya-pagina.css` completos con la ley del espejo.
- `data/` unificado en `js/datos.js`; `js/app.js` con motor de WhatsApp, mapas,
  carta, locales, nav, índice-atalaya, barra contextual y revelado.
- 7 páginas: index, balayage, servicios, locales, nosotros, contacto, privacidad.
- `vercel.json`, `robots.txt`, `sitemap.xml`, schema `HairSalon` y `FAQPage`.

Verificado por medición, no a ojo:
- **Contraste: 0 fallos** sobre todo el texto renderizado (script en vivo que
  calcula el ratio real contra el fondo heredado de cada nodo).
- **Sin scroll horizontal** a 390 px y a 1280 px.
- Enlaces `wa.me` correctos, en E.164 sin `+`, mensaje en primera persona y
  URL-encoded. **Escritos estáticamente en el HTML**, no inyectados por JS.

**Siguiente paso de mayor valor: una página por ciudad.** Con las direcciones ya
en mano, `/locales/barranco`, `/locales/tocache` y `/locales/tarapoto` son el
activo SEO más rentable que queda (ver §12.2). **No se construyeron todavía a
propósito:** hacerlas ahora, sin texto propio ni fotos de cada local, produciría
exactamente las páginas calcadas que Google penaliza (§3.3). Necesitan del
cliente un párrafo propio y fotos por ciudad. Hasta entonces, las tres fichas
viven en `/locales` con su schema `HairSalon` individual.

Deuda conocida, decidida a conciencia:
- **La carta de servicios y las fichas de local se pintan con JS.** Sin
  JavaScript esas dos secciones salen vacías (el resto de la página, la
  navegación y todos los botones de agenda sí funcionan). Es el precio de
  mantener `js/datos.js` como fuente única sin paso de compilación, que es lo
  que permite que Ricardo cambie un precio en una línea. Si se decide que el
  no-JS es obligatorio, la salida es pre-generar la carta con el script
  generador y aceptar que hay que reejecutarlo tras cada cambio de datos.
- El aviso de «Vista previa» del tope es temporal: borrar el `<div class="aviso">`
  de las 7 páginas antes de publicar en el dominio definitivo.
- Faltan las Fases 5 y 6 completas: validación en Rich Results Test, auditoría
  con lector de pantalla y medición de Core Web Vitals sobre la URL desplegada.

---

## 0. Cómo usar este documento

Léelo entero antes de escribir la primera línea. Está ordenado para que puedas ejecutarlo de arriba a abajo.

Tres reglas de operación:

1. **Los datos que faltan (§2) no bloquean la construcción.** Todo lo pendiente vive en un solo archivo de configuración. Construyes la máquina con marcadores explícitos; Ricardo llena el tanque después. Nunca inventes un teléfono, una dirección, un precio ni un horario. Si no lo tienes, va como `PENDIENTE` visible en el archivo de datos y **jamás** renderizado al usuario final.
2. **Las leyes duras (§5.2, §5.3) no se negocian.** Están calculadas, no opinadas. Si una decisión de diseño choca con ellas, gana la ley.
3. **§17 es la lista de fases con criterios de aceptación.** Una fase no está cerrada hasta que cumple todos sus criterios. No avances por sentirte cerca.

Si encuentras una contradicción entre este documento y lo que te parece mejor, dilo antes de desviarte.

---

## 1. Contexto y objetivo de negocio

### 1.1 Qué es Atalaya

Salón de belleza con **tres locales en dos regiones**: Barranco (Lima), Tocache
y Tarapoto (San Martín). Servicio estrella: **balayage**. Oferta amplia de
manicure y pedicure con precios de entrada bajos (desde S/ 25).

**Esto no es un salón de Lima.** Dos de los tres locales están en la selva
sanmartinense, a más de 700 km de Lima y en mercados con competencia, precios y
volumen de búsqueda completamente distintos. Cualquier copy o metadato que dé por
sentada una sola ciudad está mal.

### 1.2 El problema real que resuelve la web

De la propuesta comercial, literal: la gente busca "salón de belleza cerca de mí" desde el celular, cae en Google Maps, y si la ficha no está respaldada por una web clara, Atalaya pierde la visita antes de existir para esa persona.

La cadena de conversión es:

```
búsqueda en el celular → ficha de Google Maps → web → WhatsApp → cita agendada
```

**La web no es un folleto. Es el tramo que convierte una ficha de Maps en una conversación de WhatsApp.** Cada decisión de este documento se justifica contra ese tramo. Si algo no ayuda a que alguien pase de "encontré este salón" a "les escribí", no entra.

### 1.3 Métrica de éxito

No es tráfico. Es **clics a WhatsApp con mensaje pre-redactado**, segmentados por servicio y por local. Todo lo demás es secundario.

### 1.4 Posicionamiento (derivado de investigación de mercado)

Balayage en Lima se cotiza entre **S/ 300 y S/ 550** en salones establecidos ([Fresha Lima](https://www.fresha.com/lp/en/tt/balayage-hair-colouring/in/pe-lima)). Atalaya tiene manicure desde S/ 25. Eso ubica a la marca en un lugar preciso y aprovechable:

> **Técnica de salón grande, trato de salón de barrio, precio que no te obliga a pensarlo dos veces.**

El sitio no debe imitar el lujo de un salón de Miraflores de gama alta (pastel, serif dorada, "experiencia premium"). Ese disfraz se nota y no es la verdad del negocio. Debe verse **preciso, seguro y sin adornos** — la estética de alguien que sabe exactamente lo que hace con tu pelo.

La competencia visible en la investigación (Capelli Hair Club, Khaleesi Spa, listados de Fresha) juega toda en el mismo registro: claro, rosado suave, fotografía cálida. **Ir a tinta oscura es la jugada disruptiva y además es literalmente lo que dice el manual de marca.**

---

## 2. Datos que faltan — BLOQUEANTES DE CONTENIDO

Estos datos no bloquean el código, pero **bloquean el lanzamiento**. Preséntalos a Ricardo como lista de pedido al cliente en cuanto termines la Fase 1.

### 2.1 Crítico — sin esto no hay sitio publicable

| Dato | Estado | Impacto si falta |
|---|---|---|
| **Número de WhatsApp de Tarapoto** | ❌ Falta | Ahora usa el de Barranco en temporal. Un cliente de Tarapoto escribe a Lima. |
| **Lista completa de servicios de cabello** | ❌ Falta | Solo tenemos manicure/pedicure. Balayage es el servicio estrella y **no tiene precio ni descripción**. Falta corte, color, tratamientos, peinado, alisado, cejas/pestañas si aplica. |
| **Precio de balayage** | ❌ Falta | Es la página que más va a atraer búsqueda. Referencia de mercado: S/ 300–550. |
| ~~Números de WhatsApp~~ | ✅ **Parcial (17 ago)** | Barranco 910 867 018 · Tocache 955 063 705 · Tarapoto pendiente. |
| ~~Direcciones de los locales~~ | ✅ **Recibidas 17 ago** | Barranco: Av. El Sol Este 827 · Tocache: Av. Bolognesi 630 · Tarapoto: Jr. Chápaja 450 |
| **Place ID de Google Maps de cada local** | ❌ Falta | Ver §10.3 para cómo obtenerlo. |
| **Horarios de atención por local** | ❌ Falta | Va en schema y en la ficha de cada local. |
| ~~Nombres de los locales~~ | ✅ **Resuelto** | Barranco, Tocache y Tarapoto. Los slugs ya usan esos nombres. |

### 2.2 Importante — el sitio funciona sin esto pero pierde mucho

| Dato | Estado | Notas |
|---|---|---|
| Fotos reales de ambos locales | ❌ Falta | Ya está pedido en la propuesta §5. |
| Fotos del equipo + nombres y especialidad | ❌ Falta | Ya está pedido en la propuesta §5. |
| Fotos de trabajos realizados (sobre todo balayage) | ❌ Falta | **Insustituible.** Ver §15.2. |
| Catálogo de productos con precios | ❌ Falta | La propuesta incluye página de catálogo. |
| Logos en alta resolución / vectorial | ⚠️ Parcial | Tenemos PNG a 628px extraídos del manual (`marca/`). **Pedir el SVG o AI original.** |
| Instagram / TikTok del salón | ❌ Falta | Va en `sameAs` del schema y en el footer. |
| Dominio elegido | ❌ Falta | Incluido el primer año según propuesta §3. |

### 2.3 Verificaciones de copy sobre los precios entregados

La lista de manicure llegó con posibles erratas. **Confirmar antes de publicar, no corregir en silencio:**

- "Gel frio" → probablemente **"Gel frío"** (tilde).
- "Bider gel" → casi con seguridad **"Builder gel"**, que es el término técnico estándar.
- "Poli gel" → se escribe normalmente **"Poligel"** o "Polygel".
- "Diseño desde 10 y 15 soles" → ambiguo. ¿Es un rango S/ 10–15? ¿Dos tipos de diseño con precios distintos? Necesita aclaración.
- "Acripie" → término correcto en el mercado peruano, se deja tal cual.

---

## 3. Investigación: qué está pasando en 2026

Resumen de lo que se consultó y qué se toma de cada cosa. Las fuentes están al final del documento (§20).

### 3.1 Tendencias de diseño web vigentes

| Tendencia | Se adopta | Cómo |
|---|---|---|
| **Animación dirigida por scroll (CSS puro)** | ✅ Sí, con reservas | `animation-timeline: view()`. **No es Baseline todavía** — Firefox estable aún la tiene tras bandera. Obligatorio: estado final como default, animación como capa opcional. Ver §6.4. |
| **Tipografía cinética** | ✅ Sí | El wordmark ATALAYA es el elemento gráfico principal. Ver §6.2. |
| **Diseño editorial / revelación secuencial** | ✅ Sí | La lista de servicios como carta editorial, no como grilla de tarjetas. |
| **View Transitions API** | ✅ Sí | Cross-document entre páginas del sitio, con el símbolo como elemento compartido. Progresivo. |
| **Grillas rotas / asimetría** | ✅ Sí, medida | Asimetría en hero y bloques de servicio. Nunca en la lista de precios: ahí manda la legibilidad. |
| **Neo-brutalismo / anti-diseño** | ⚠️ Solo el filo | Se toma el contraste alto y el rechazo al adorno. **No** se toman bordes gruesos, colores chillones ni sombras duras de bloque: chocan con la marca. |
| **Maximalismo** | ❌ No | El brief pide minimalismo y la marca es minimalista. |

### 3.2 Qué hacen bien las webs de salón que convierten

De la investigación de referentes 2026:

- Botón de reserva permanentemente visible, no escondido en el menú.
- El menú de servicios con precios visibles reduce fricción. **La mayoría de salones esconde precios; Atalaya los va a mostrar.** Con precios desde S/ 25 esto es ventaja competitiva, no debilidad.
- Perfiles de estilistas individuales generan confianza antes de la primera visita ("digital chair confidence").
- Portafolio en alta definición: en un negocio visual, la foto del trabajo *es* el argumento de venta.
- Mobile-first real: la búsqueda ocurre en el celular, en la calle, con prisa.

### 3.3 SEO local multi-local

- Cada local necesita **su propia página** con su propio schema `LocalBusiness`, su dirección, su teléfono, su horario, sus fotos y su contenido escrito. Una sola página compartida desperdicia la mitad del potencial.
- Nada de páginas calcadas con el nombre del distrito cambiado: Google lo penaliza como contenido duplicado.
- El schema estructurado (`LocalBusiness`, `FAQPage`, `OpeningHoursSpecification`) es lo que permite que los sistemas de IA citen al negocio con confianza en respuestas generadas.

### 3.4 Rendimiento

- Umbrales vigentes: **LCP < 2.5s · INP < 200ms · CLS < 0.1**, medidos en el percentil 75 de usuarios reales.
- Más del 60% de los orígenes móviles falla el umbral de INP.
- **El cuello de botella no es la red, es el procesador del teléfono.** 4G alcanza de sobra; lo que mata es el JavaScript que un Android de gama media tiene que interpretar. Esto define directamente el presupuesto de §14.

---

## 4. Concepto de diseño

### 4.1 La idea

**Atalaya** es una torre de vigía: un punto alto desde donde se ve lejos y con claridad.

El logotipo lo dice sin texto: un disco de tinta con una **"A" en negativo** que se lee simultáneamente como un pico, un haz de luz y una torre vista de frente. Debajo del vértice, una **contracurva suave** en forma de lente u ojo.

Ese logo contiene la tensión completa de la marca, y por tanto del sitio:

> **filo y curva. Precisión y suavidad. La técnica exacta y el resultado que se siente blando.**

Es exactamente lo que hace un salón: geometría milimétrica aplicada para producir algo que se ve natural. El sistema visual entero sale de ahí. No hay que inventar un concepto — hay que leer el que ya está dibujado.

### 4.2 Los tres motivos que gobiernan todo

Cada elemento gráfico del sitio deriva de uno de estos tres. Si un elemento no deriva de ninguno, sobra.

**1. EL VÉRTICE (el filo)**
El pico de la "A". Medido sobre el archivo original: pendiente **exacta 1:2** — 26.57° desde la vertical, 53.13° de apertura total. No es aproximado, es la geometría real del logo.
Usos: cortes diagonales entre secciones, subrayado de enlaces, indicador de sección activa, flechas, el marcador del índice lateral.

**2. LA LENTE (la curva)**
La contracurva bajo el vértice. Forma de ojo / hoja / lente.
Usos: máscara de las fotos de trabajos, recorte de los retratos del equipo, forma del marcador de mapa, revelación de imágenes al entrar en viewport.

**3. EL DISCO (el campo)**
El círculo contenedor. Es el fondo, el campo oscuro sobre el que aparece la luz.
Usos: fondo tinta dominante, botones circulares, el gesto de apertura del hero.

### 4.3 La narrativa de color: de la oscuridad a la luz

El sitio arranca en tinta y se abre hacia la luz a medida que la persona se acerca a agendar. El color cuenta el recorrido, no decora.

```
llegada          →  consideración      →  decisión
TINTA (oscuro)   →  HUESO (claro)      →  ROSA (señal)
cinematográfico  →  funcional, legible →  acción
```

En la práctica: los bloques narrativos y de atmósfera van en tinta; las listas de precios, mapas y datos prácticos van en hueso (donde la legibilidad manda); el rosa aparece solo en el momento de actuar.

**Nota importante para quien ejecuta:** la regla del sistema Crouton de que *"cada página abre con hero en Miga porque el nav transparente necesita fondo claro"* **NO aplica aquí**. Ese es un límite de la implementación del nav de Crouton, no una ley universal. Atalaya lleva nav propio diseñado para fondo oscuro (§5.8). No copies el sistema de Crouton a este proyecto.

### 4.4 Lista negra — los delatores de plantilla de IA

El brief pide explícitamente no parecer una plantilla de IA. Estas son las señales que la delatan. **Ninguna puede aparecer en el sitio:**

- ❌ Hero centrado con titular grande, subtítulo gris y dos botones pill uno al lado del otro.
- ❌ Grilla de tres tarjetas con ícono circular arriba, título, dos líneas de texto y "Saber más".
- ❌ Íconos de librería genérica (Lucide, Feather, Font Awesome) representando servicios de belleza.
- ❌ Emojis usados como íconos de sección.
- ❌ Gradientes violeta-azul, o cualquier gradiente ajeno a la paleta.
- ❌ `backdrop-filter: blur()` como recurso de profundidad.
- ❌ Sección "¿Por qué elegirnos?" con cuatro columnas de beneficios abstractos.
- ❌ Testimonios en carrusel con comillas gigantes decorativas.
- ❌ Fotos de stock de mujeres sonriendo con toalla en la cabeza.
- ❌ `border-radius` uniforme de 12px en absolutamente todo.
- ❌ La misma animación "fade in up" en cada sección, con el mismo delay escalonado.
- ❌ Texto de relleno tipo "Transformamos tu belleza en una experiencia única".

**En su lugar:**

- ✅ Composición asimétrica anclada a una grilla real de 12 columnas.
- ✅ La lista de servicios como **carta editorial** con líneas de puntos entre nombre y precio, no como tarjetas.
- ✅ Formas derivadas del logo (§4.2) en vez de íconos de librería.
- ✅ Fotografía real del salón y de trabajos reales.
- ✅ Movimiento distinto según la función del elemento (§6).
- ✅ Copy concreto: "Balayage, 3 horas, desde S/ XXX" en vez de adjetivos.

---

## 5. Sistema de diseño

### 5.1 Tokens

```css
:root {
  /* --- Superficies e tintas (manual de marca v1) --- */
  --tinta:      #13161A;   /* fondo oscuro dominante / texto sobre hueso */
  --hueso:      #F3F5F8;   /* fondo claro — NO es blanco puro */
  --rosa:       #D080B6;   /* acento claro — SOLO sobre tinta */
  --rosa-osc:   #7F366A;   /* acento oscuro — SOLO sobre hueso */

  /* --- Grises: cada uno pertenece a UN fondo (§5.2) --- */
  --gris-sobre-tinta:  #8B8F96;  /* 5.59:1 sobre tinta  ✅ */
  --gris-sobre-hueso:  #5C6068;  /* 5.78:1 sobre hueso  ✅ */
  --gris-alto-tinta:   #C7CAD0;  /* 11.05:1 sobre tinta ✅ */
  --borde-hueso:       #E4E6EA;  /* bordes sobre hueso, nunca texto */
  --borde-tinta:       #2A2E34;  /* bordes sobre tinta, nunca texto */

  /* --- Geometría derivada del logo (§4.2) --- */
  --vertice:      26.57deg;  /* pendiente 1:2, medida del símbolo */
  --vertice-tan:  0.5;       /* para cálculos en clip-path */

  /* --- Radios: escala cerrada --- */
  --r-sm:   2px;
  --r-md:   4px;    /* el manual usa 4px en todas sus fichas */
  --r-lg:   16px;
  --r-full: 999px;
  /* Círculos perfectos solo para el disco (§4.2) */

  /* --- Tipografía --- */
  --fuente: 'Jost', system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* --- Ritmo (escala de 4) --- */
  --e1: 4px;   --e2: 8px;   --e3: 12px;  --e4: 16px;
  --e5: 24px;  --e6: 32px;  --e7: 48px;  --e8: 64px;
  --e9: 96px;  --e10: 128px; --e11: 192px;

  /* --- Movimiento --- */
  --t-rapido:  160ms;
  --t-medio:   320ms;
  --t-lento:   640ms;
  --ease:      cubic-bezier(0.22, 1, 0.36, 1);   /* salida suave */
  --ease-filo: cubic-bezier(0.65, 0, 0.35, 1);   /* simétrica, para cortes */

  /* --- Contenedor --- */
  --ancho-max:  1320px;
  --ancho-texto: 68ch;
  --canal:      24px;   /* padding lateral móvil */
}
```

### 5.2 ⚖️ LEY DEL ESPEJO — la regla dura del color

Esta es la regla no negociable del sistema. Sale de calcular los contrastes reales de la paleta del manual, no de una preferencia estética.

**La paleta es un espejo: cada superficie tiene su propio juego de tintas, y los juegos no se cruzan nunca.**

| Tinta | Sobre TINTA `#13161A` | Sobre HUESO `#F3F5F8` |
|---|---|---|
| Rosa `#D080B6` | **6.43:1** ✅ | 2.58:1 ❌ |
| Rosa oscuro `#7F366A` | 2.28:1 ❌ | **7.29:1** ✅ |
| Gris `#8B8F96` | **5.59:1** ✅ | 2.97:1 ❌ |
| Gris `#5C6068` | 2.88:1 ❌ | **5.78:1** ✅ |
| Gris `#C7CAD0` | **11.05:1** ✅ | 1.50:1 ❌ |
| Hueso / Tinta | **16.61:1** ✅ | **16.61:1** ✅ |

Traducido a reglas operativas:

1. **Rosa `#D080B6` solo es texto sobre tinta. Nunca sobre hueso.**
2. **Rosa oscuro `#7F366A` solo es texto sobre hueso. Nunca sobre tinta.**
3. Como **superficie de botón**, la tinta del texto está determinada, no se elige:
   - Fondo rosa `#D080B6` → texto **tinta** `#13161A` (6.43:1 ✅). Texto hueso da 2.58:1 ❌.
   - Fondo rosa oscuro `#7F366A` → texto **hueso** `#F3F5F8` (7.29:1 ✅). Texto tinta da 2.28:1 ❌.
4. Los grises secundarios siguen el mismo espejo. `#8B8F96` y `#C7CAD0` viven sobre tinta; `#5C6068` vive sobre hueso.
5. `--borde-hueso` y `--borde-tinta` son **solo bordes**. Nunca texto, en ningún contexto.

> **Antes de usar cualquier combinación nueva de color como texto, calcula el contraste real. No lo deduzcas de la paleta.**

### 5.3 Ley tipográfica

Del manual de marca, textual: *"Los títulos van en mayúsculas con tracking amplio y peso ligero, igual que en el logotipo. El texto de cuerpo va en minúsculas, peso regular, sin tracking adicional."*

**Jost es la única familia. Tres pesos: 300, 400, 500. No hay más.**

| Rol | Peso | Caja | Tracking | Tamaño (móvil → escritorio) |
|---|---|---|---|---|
| Display (hero) | 300 | MAYÚSCULAS | `0.14em` | `clamp(2.75rem, 11vw, 8rem)` |
| H1 de página | 300 | MAYÚSCULAS | `0.12em` | `clamp(2rem, 6vw, 3.5rem)` |
| H2 sección | 300 | MAYÚSCULAS | `0.1em` | `clamp(1.5rem, 3.5vw, 2.25rem)` |
| H3 / nombre de servicio | 400 | Normal | `0` | `clamp(1.125rem, 2vw, 1.375rem)` |
| Cuerpo | 400 | Normal | `0` | `1rem` / `1.0625rem` |
| Cuerpo largo | 400 | Normal | `0` | `1.125rem`, `line-height: 1.7` |
| Etiqueta / dato | 400 | MAYÚSCULAS | `0.15em` | `0.75rem` |
| Botón | 500 | MAYÚSCULAS | `0.08em` | `0.875rem` |
| Precio | 400 | Normal | `0` | `1rem`, `font-variant-numeric: tabular-nums` |

Reglas adicionales:
- `line-height`: 1.05 en display, 1.15 en títulos, 1.6–1.7 en cuerpo.
- Los precios **siempre** con `tabular-nums`. Es una lista de números en columna: tienen que alinearse.
- Ancho de línea de cuerpo máximo `68ch`.
- Nunca `font-weight` 600 o 700. La marca no los tiene. El énfasis se logra con caja, tracking y color, no con grosor.

### 5.4 Grilla y composición

- 12 columnas, canal de 24px en móvil, 32px desde 768px, máximo 1320px.
- **La asimetría es intencional y sistemática:** los bloques narrativos alternan anclaje entre columnas 1–7 y 6–12. Nunca centrado por defecto.
- Excepciones donde manda la simetría y la legibilidad: la lista de precios, los mapas y el pie de página.
- Móvil: una columna, sin excepciones. La asimetría se activa desde 768px.

### 5.5 Profundidad

**No hay sombras difusas. No hay `backdrop-filter`. No hay glassmorphism.**

La profundidad se construye con tres recursos, en este orden:

1. **Contraste de superficie** — un bloque tinta sobre hueso ya es jerarquía suficiente.
2. **El corte del vértice** — un borde diagonal a 26.57° separa planos mejor que una sombra.
3. **Borde de 1px** — `--borde-hueso` / `--borde-tinta`, como usa el propio manual en sus fichas.

### 5.6 Botones

```
.btn-accion    fondo --rosa      · texto --tinta   · para usar SOBRE TINTA
.btn-accion-cl fondo --rosa-osc  · texto --hueso   · para usar SOBRE HUESO
.btn-linea     transparente · borde 1px · texto heredado del fondo
.btn-disco     circular, 56px, solo ícono (WhatsApp flotante)
```

Reglas:
- Radio `--r-full` en botones de acción, `--r-md` en botones de línea.
- **Área táctil mínima 44×44px** (superamos el mínimo WCAG 2.2 de 24×24). El dedo va en la calle, con prisa.
- Estado `:hover` = rosa → rosa oscuro **solo si el fondo lo permite según §5.2**. Sobre tinta, el hover del botón rosa oscurece el fondo a `#B86A9E` (verificar contraste antes de fijarlo) o desplaza el botón 2px. Preferir el desplazamiento: es seguro y encaja con el sistema.
- `:focus-visible` con anillo de 2px en el rosa que corresponda al fondo, offset 3px. Nunca `outline: none` sin reemplazo.

### 5.7 El corte del vértice — implementación

El separador diagonal entre secciones usa la pendiente del logo. A ancho completo una pendiente 1:2 real sería absurda (720px de alto en un viewport de 1440px), así que se aplica el **ratio como sistema, escalado por contexto**:

```css
/* Corte de sección: mantiene la dirección del vértice, altura controlada */
.corte-vertice {
  --altura-corte: clamp(32px, 6vw, 88px);
  clip-path: polygon(0 var(--altura-corte), 100% 0, 100% 100%, 0 100%);
}

/* Elementos pequeños (marcadores, subrayados, flechas): pendiente 1:2 exacta */
.filo {
  clip-path: polygon(0 100%, 50% 0, 100% 100%);  /* triángulo 1:2 real */
}
```

Todos los cortes de sección apuntan en la **misma dirección** en todo el sitio (sube hacia la derecha). Una diagonal alternando dirección se lee como decoración; una diagonal consistente se lee como sistema.

### 5.8 Navegación

El manual no la define, así que se especifica aquí.

**Escritorio:** barra superior transparente sobre el hero tinta, con el símbolo a la izquierda, enlaces al centro-derecha y el selector de local + botón de agendar a la derecha. Al pasar el hero, se compacta a una barra sólida tinta con borde inferior `--borde-tinta`.

**Móvil:** símbolo + botón de menú arriba; **barra de acción fija abajo** con el botón de agendar y el selector de local. La barra inferior es la decisión clave: en el celular el pulgar vive abajo, y el objetivo del sitio es que se toque ese botón.

**Contraste del nav:** como el nav vive sobre tinta, sus enlaces usan `--gris-alto-tinta` (11.05:1) en reposo y `--hueso` en activo. Sobre las páginas de fondo hueso (locales, servicios), el nav arranca ya en su estado sólido tinta. **Nunca un nav transparente con texto claro sobre fondo claro.**

---

## 6. Sistema de movimiento

"Dinámica" es el brief. Dinámico no significa que todo se mueva: significa que **el movimiento comunica algo**. Cada animación aquí tiene una razón funcional.

### 6.1 Principios

1. Ninguna animación supera **640ms**.
2. Se animan solo `transform`, `opacity`, `clip-path` y `mask`. Nunca `width`, `height`, `top`, `left` ni `margin`.
3. El movimiento **nunca** bloquea la lectura ni retrasa el contenido. Todo el texto es legible con JS desactivado.
4. Cada tipo de elemento tiene su propio movimiento. Un mismo "fade in up" para todo es el delator número uno de plantilla.
5. `prefers-reduced-motion: reduce` desactiva todo movimiento no esencial y deja los estados finales. **Obligatorio, no opcional.**

### 6.2 Firma 1 — La apertura del wordmark

Al cargar el home: **ATALAYA** en Jost 300 mayúsculas aparece con las letras juntas y el tracking se abre hasta `0.14em`, replicando el gesto del propio logotipo. Simultáneamente, el símbolo se revela con una máscara que se abre desde el vértice hacia abajo.

- Duración total: **560ms**. Una sola vez por sesión (`sessionStorage`), no en cada visita a la home.
- `letter-spacing` no es compositable. Implementación: cada letra en su propio `<span>` con `transform: translateX()` calculado, animando transform. O bien aceptar la animación de `letter-spacing` **solo** en este elemento único del hero, midiendo que no dispare CLS.
- **El estado final debe estar en el HTML/CSS base.** Si JS falla, se ve el hero completo y correcto.

### 6.3 Firma 2 — La lente

Las fotos de trabajos se revelan a través de la forma de lente del logo: la máscara entra pequeña y se expande hasta descubrir la imagen completa al entrar en viewport.

```css
.lente {
  mask-image: url('assets/marca/lente.svg');
  mask-size: 0% auto;
  mask-position: center;
  mask-repeat: no-repeat;
}
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .lente {
      animation: abrir-lente linear both;
      animation-timeline: view();
      animation-range: entry 15% cover 45%;
    }
  }
}
@keyframes abrir-lente { to { mask-size: 130% auto; } }
```

Estado por defecto (sin soporte, sin JS, movimiento reducido): imagen completa visible, sin máscara. La máscara se aplica solo dentro del `@supports`.

### 6.4 Firma 3 — El índice-atalaya

Índice vertical fijo al borde derecho (solo ≥1024px): una columna de marcas finas, una por sección. La marca de la sección activa se alarga y despliega el nombre de la sección. Es la torre de vigía convertida en interfaz: **te dice dónde estás en el recorrido.**

Implementación con `IntersectionObserver` (no con listener de scroll). Oculto en móvil.

### 6.5 Firma 4 — Barra de reserva contextual

La barra inferior de agendar **cambia su texto y su mensaje de WhatsApp según la sección visible**. En la sección de balayage dice "Agendar balayage"; en manicure, "Agendar manicure". Al tocarla, el mensaje pre-redactado ya trae ese servicio.

Esto conecta la recomendación de investigación (*poner el enlace lo más cerca posible del momento de intención*) con el mecanismo de conversión del negocio. Es la interacción de mayor valor comercial del sitio.

- Cambio de texto con transición de 160ms.
- Debe funcionar sin JS: el estado base de la barra es "Agendar cita" con el mensaje genérico.

### 6.6 Transiciones entre páginas

```css
@view-transition { navigation: auto; }
```

El símbolo del nav es el elemento compartido (`view-transition-name: simbolo`). Progresivo: sin soporte, navegación normal.

### 6.7 Movimiento de secciones (el resto)

Con `animation-timeline: view()` bajo `@supports` + `prefers-reduced-motion`. Diferenciado por tipo:

- **Bloques de texto:** opacidad 0→1 + `translateY(16px)→0`. Sutil.
- **Filas de precio:** sin animación de entrada. Es una tabla de consulta; que aparezca de golpe.
- **Imágenes:** la lente (§6.3).
- **Cortes diagonales:** el `clip-path` se abre al entrar.
- **Cifras / precios destacados:** sin contador animado. Los contadores que suben son otro delator de plantilla.

### 6.8 Regla de fallback (crítica)

Las animaciones dirigidas por scroll **no son Baseline todavía**: Firefox estable aún las tiene tras bandera. La técnica obligatoria es:

> **Escribe el estado final como CSS por defecto. Aplica la animación solo dentro de `@supports (animation-timeline: view())` y `@media (prefers-reduced-motion: no-preference)`.**

Un navegador sin soporte ignora `animation-timeline` y muestra el contenido terminado. Jamás dejes contenido en `opacity: 0` esperando una animación que puede no ejecutarse.

---

## 7. Arquitectura de información

### 7.1 Mapa del sitio

```
/                        Home
/balayage                Servicio estrella — página dedicada (activo SEO principal)
/servicios               Carta completa de servicios con precios
/locales                 Índice de locales
/locales/local-1         Ficha completa local 1  ← schema propio
/locales/local-2         Ficha completa local 2  ← schema propio
/nosotros                Equipo e historia
/catalogo                Productos
/contacto                Contacto
/privacidad              Política de privacidad
```

### 7.2 Por qué `/balayage` es página propia

Es el servicio estrella, tiene volumen de búsqueda real en Lima y un precio alto (S/ 300–550 de referencia de mercado). Una sección dentro de `/servicios` no compite por "balayage lima"; una página dedicada con FAQ, proceso, cuidados y galería, sí. **Es el activo SEO más valioso del proyecto.**

### 7.3 Por qué cada local tiene página propia

La investigación de SEO multi-local es concluyente: página propia, con schema propio, contenido escrito propio y fotos propias. Una página `/locales` compartida desperdicia la mitad del potencial de búsqueda local.

**Sobre las URLs provisionales:** `local-1` y `local-2` son temporales. En cuanto se conozcan los distritos, renombrar a `/locales/surquillo` (o el que sea) **y dejar una redirección 301 desde la URL vieja**. En un sitio estático en Vercel eso es una entrada en `vercel.json`. Hazlo antes de que Google indexe las URLs provisionales — es decir, idealmente antes del lanzamiento.

### 7.4 Escalar al tercer local

La propuesta compromete el tercer local **sin costo adicional** cuando abra. Por eso los locales son un array en el archivo de datos y las páginas de local se generan desde una plantilla única. Agregar el tercero debe ser: añadir un objeto al array, copiar la plantilla, poner las fotos. Nada más. **Si tu implementación requiere tocar más de eso para sumar un local, está mal hecha.**

---

## 8. Capa de datos — el archivo único

Todo el contenido variable vive en `data/atalaya.js`. Es el único archivo que Ricardo o el cliente tocan para actualizar el sitio. Esto también protege el margen del proyecto: pasados los 60 días de garantía los cambios se cobran a S/ 20/hora, y un cambio de precio debe ser una línea, no una cacería por el HTML.

```js
// data/atalaya.js
// ÚNICO archivo de contenido. Editar aquí, no en el HTML.
// Los campos marcados PENDIENTE deben llenarse antes de publicar.

export const NEGOCIO = {
  nombre: 'Atalaya',
  nombreLargo: 'Atalaya Salón',
  descripcion: '',            // PENDIENTE — 1 frase, 150 caracteres
  moneda: 'PEN',
  simboloMoneda: 'S/',
  instagram: '',              // PENDIENTE
  tiktok: '',                 // PENDIENTE
  dominio: '',                // PENDIENTE
};

export const LOCALES = [
  {
    id: 'local-1',
    slug: 'local-1',            // renombrar al distrito cuando se sepa (§7.3)
    nombre: 'Local 1',          // PENDIENTE — nombre real
    distrito: '',               // PENDIENTE
    direccion: '',              // PENDIENTE — calle y número
    referencia: '',             // opcional: "a media cuadra de..."
    geo: { lat: null, lng: null },   // PENDIENTE
    placeId: '',                // PENDIENTE — ver §10.3
    whatsapp: '',               // PENDIENTE — E.164 sin '+': 51XXXXXXXXX
    telefono: '',               // PENDIENTE — formato legible para mostrar
    horario: [
      // { dias: ['Mo','Tu','We','Th','Fr'], abre: '09:00', cierra: '20:00' },
      // { dias: ['Sa'], abre: '09:00', cierra: '18:00' },
    ],                          // PENDIENTE
    fotos: [],                  // PENDIENTE
    mapaEstatico: '',           // assets/mapas/local-1.avif
    texto: '',                  // PENDIENTE — párrafo propio, NO plantilla (§3.3)
  },
  // local-2 idéntico
];

export const SERVICIOS = [
  {
    categoria: 'Color',
    slug: 'color',
    destacada: true,
    intro: '',                  // PENDIENTE
    items: [
      {
        nombre: 'Balayage',
        slug: 'balayage',
        estrella: true,
        precio: null,           // PENDIENTE — referencia mercado Lima: 300–550
        desde: true,            // muestra "desde S/ X"
        duracion: null,         // PENDIENTE — minutos
        descripcion: '',        // PENDIENTE — 2–3 frases concretas
        paginaPropia: '/balayage',
      },
      // PENDIENTE: resto de servicios de color
    ],
  },
  {
    categoria: 'Manicure y pedicure',
    slug: 'manicure-pedicure',
    destacada: false,
    intro: '',
    items: [
      // Precios confirmados por el cliente. Descripciones PENDIENTES.
      { nombre: 'Básico',           slug: 'basico',           precio: 25,  desde: false, descripcion: '' },
      { nombre: 'Gel frío',         slug: 'gel-frio',         precio: 30,  desde: false, descripcion: '' },  // verificar tilde §2.3
      { nombre: 'Gel color',        slug: 'gel-color',        precio: 45,  desde: false, descripcion: '' },
      { nombre: 'Rubber',           slug: 'rubber',           precio: 60,  desde: false, descripcion: '' },
      { nombre: 'Builder gel',      slug: 'builder-gel',      precio: 60,  desde: false, descripcion: '' },  // verificar nombre §2.3
      { nombre: 'Poligel',          slug: 'poligel',          precio: 70,  desde: false, descripcion: '' },
      { nombre: 'Soft gel',         slug: 'soft-gel',         precio: 70,  desde: false, descripcion: '' },
      { nombre: 'Acrílico',         slug: 'acrilico',         precio: 100, desde: true,  descripcion: '' },
      { nombre: 'Baño de acrílico', slug: 'bano-acrilico',    precio: 80,  desde: false, descripcion: '' },
      { nombre: 'Diseño',           slug: 'diseno',           precio: 10,  desde: true,  descripcion: '' },  // aclarar §2.3
      { nombre: 'Pedicure',         slug: 'pedicure',         precio: 40,  desde: false, descripcion: '' },
      { nombre: 'Pedicure gel',     slug: 'pedicure-gel',     precio: 60,  desde: false, descripcion: '' },
      { nombre: 'Acripie',          slug: 'acripie',          precio: 80,  desde: false, descripcion: '' },
    ],
  },
  // PENDIENTE: corte, tratamientos, peinado, alisado, cejas/pestañas...
];

export const PRODUCTOS = [];   // PENDIENTE — catálogo
export const EQUIPO   = [];    // PENDIENTE — nombre, rol, especialidad, foto, local
```

### 8.1 Reglas del renderizado desde datos

- Un `precio: null` **nunca** renderiza "S/ null", "S/ 0" ni un guion suelto. Renderiza `Consultar por WhatsApp` como enlace de agenda. Esto permite publicar la página de balayage aunque el precio llegue tarde.
- Una `descripcion: ''` no renderiza un párrafo vacío ni texto de relleno. Omite el elemento. **Nunca inventes la descripción de un servicio.**
- Un `whatsapp: ''` hace que los botones de agenda del sitio queden deshabilitados con un aviso visible **en consola de desarrollo**, no para el usuario. Ese estado no debe llegar a producción; ver §18.
- `desde: true` renderiza `desde S/ 100`; `desde: false` renderiza `S/ 100`.

---

## 9. Motor de WhatsApp

Es el corazón del sitio. La propuesta lo especifica en dos puntos: cada servicio con botón que abre WhatsApp con mensaje ya redactado, y cada producto del catálogo igual.

### 9.1 Construcción del enlace

```js
function enlaceWA(local, { servicio = null, producto = null } = {}) {
  if (!local?.whatsapp) return null;      // sin número, sin botón

  let msg;
  if (servicio) {
    msg = `Hola, quiero agendar una cita de ${servicio.nombre} en Atalaya ${local.nombre}. ¿Qué horarios tienen disponibles?`;
  } else if (producto) {
    msg = `Hola, me interesa ${producto.nombre} que vi en la web. ¿Está disponible en Atalaya ${local.nombre}?`;
  } else {
    msg = `Hola, quiero agendar una cita en Atalaya ${local.nombre}. ¿Qué horarios tienen disponibles?`;
  }
  return `https://wa.me/${local.whatsapp}?text=${encodeURIComponent(msg)}`;
}
```

Requisitos verificados contra la documentación de click-to-chat:

- **Número en E.164 sin `+`, sin espacios, sin guiones ni paréntesis.** Perú: `51` + 9 dígitos → `51987654321`.
- **Mensaje en primera persona, desde la perspectiva del cliente.** "Quiero agendar", no "Cliente interesado en".
- **Máximo 1–2 frases.**
- **`encodeURIComponent` siempre.** Sin codificar, el enlace se rompe en algunos dispositivos.
- Sin emojis en el mensaje base. Si el cliente los quiere, se activa con una bandera en `NEGOCIO`.

### 9.2 Resolución de local — la decisión de UX clave

Con dos locales y (probablemente) dos números, **cada botón de agenda tiene que saber a qué número escribir.** Ignorar esto produce el error clásico: la persona escribe al local equivocado, o peor, se queda mirando dos botones sin saber cuál tocar.

Mecanismo:

1. El local elegido se guarda en `localStorage` bajo `atalaya.local`.
2. Si **no** hay local elegido y se toca un botón de agenda → se abre una hoja inferior: *"¿En qué local te queda mejor?"* con los dos locales, su distrito y su dirección. Al elegir, se guarda y **se continúa inmediatamente a WhatsApp** con el mensaje que se iba a mandar. Un toque extra, una sola vez.
3. Si **sí** hay local elegido, el botón va directo a WhatsApp.
4. El nav muestra siempre el local activo y permite cambiarlo con un toque.
5. Dentro de `/locales/local-N`, los botones se atan a **ese** local sin preguntar, sin importar lo guardado.

Detalles:
- Si el cliente confirma que usa **un solo número** para ambos locales, todo esto se simplifica: el mensaje sigue nombrando el local (el salón necesita saberlo) pero desaparece la hoja de selección. **Confirmar esto con el cliente antes de construir — cambia el alcance de esta sección.**
- La hoja se cierra con Escape, con toque fuera y con botón de cerrar. Foco atrapado mientras esté abierta.

### 9.3 Instrumentación

Un solo listener delegado en `document` para todos los enlaces `[data-wa]`. Cada enlace lleva `data-wa-servicio` y `data-wa-local`. Un único punto donde conectar analítica después, sin tocar el resto del código.

```html
<a data-wa data-wa-servicio="balayage" data-wa-local="local-1" href="...">Agendar</a>
```

### 9.4 Presencia de los botones

- **Uno por servicio** en `/servicios` y en cada fila de la carta.
- **Uno por producto** en `/catalogo`.
- **Uno por local** en `/locales` y en cada ficha.
- **Barra fija inferior en móvil**, contextual (§6.5).
- **Botón disco flotante** en escritorio, esquina inferior derecha.
- En el hero del home y al cierre de cada página.

Todos son `<a href>` reales. **Nunca un `<div>` con `onclick`**: tiene que funcionar con teclado, con clic derecho, y sin JS.

---

## 10. Motor de locales y mapas

La propuesta compromete: *"Cada local muestra un mapa que lleva directo a Google Maps, con indicaciones para llegar."*

### 10.1 El mapa — patrón fachada (obligatorio)

Un `<iframe>` de Google Maps incrustado carga cientos de kilobytes de JavaScript de terceros, dispara cookies y desplaza el layout. Con dos mapas en `/locales`, eso solo destruye el presupuesto de rendimiento de §14.

**Patrón obligatorio:**

1. Se muestra una **imagen estática** del mapa (AVIF/WebP, `width`/`height` explícitos, `loading="lazy"`), con el marcador de Atalaya dibujado en la forma de lente del logo (§4.2).
2. Encima, un botón: **"Ver mapa interactivo"**.
3. Solo al tocarlo se inserta el `<iframe>` real.
4. Al lado, siempre visible, el botón **"Cómo llegar"** que va directo a Google Maps (§10.2). **La mayoría de la gente quiere esto, no el mapa embebido.**

Resultado: cero JavaScript de terceros en la carga inicial, cero CLS, y la acción que la gente realmente quiere está a un toque.

### 10.2 Botón "Cómo llegar"

Construido según la documentación de Maps URLs:

```js
function enlaceComoLlegar(local) {
  const p = new URLSearchParams({ api: '1' });
  if (local.geo?.lat && local.geo?.lng) {
    p.set('destination', `${local.geo.lat},${local.geo.lng}`);
  } else if (local.direccion) {
    p.set('destination', `${local.direccion}, ${local.distrito}, Lima, Perú`);
  } else {
    return null;
  }
  if (local.placeId) p.set('destination_place_id', local.placeId);
  return `https://www.google.com/maps/dir/?api=1&${p}`;
}
```

- `api=1` es obligatorio.
- **`destination_place_id` siempre que exista.** Es la única garantía de que apunta al local correcto y no a un homónimo.
- No usar `dir_action=navigate`: lanza navegación paso a paso de inmediato, que es agresivo desde una web. Que la persona vea la ruta y decida.
- Etiqueta del botón: **"Cómo llegar"**. Alternativa aprobada: "Ubícanos". Elegir una y usarla en todo el sitio.
- Abre en pestaña nueva: `target="_blank" rel="noopener"`.

### 10.3 Cómo obtener el Place ID

Para cada local, cuando lleguen las direcciones:
1. Buscar el negocio en [Place ID Finder de Google](https://developers.google.com/maps/documentation/places/web-service/place-id).
2. Copiar el ID (empieza con `ChIJ...`).
3. Pegarlo en `LOCALES[n].placeId`.

Si el local ya tiene ficha de Google Business Profile, usar el Place ID **de esa ficha**: así el botón lleva a la ficha real del negocio, con sus reseñas y fotos, no a un punto genérico en el mapa. Esto además refuerza la relación web ↔ ficha que plantea la propuesta.

### 10.4 Contenido de la ficha de local

Cada `/locales/local-N` lleva:

- Nombre y distrito · dirección completa · referencia de llegada
- Mapa fachada + "Cómo llegar" + "Agendar en este local"
- Horario en tabla legible, con estado **"Abierto ahora" / "Cerrado"** calculado en cliente (zona horaria `America/Lima`)
- Teléfono/WhatsApp propio
- Fotos reales del local
- **Párrafo escrito propio** — no una plantilla con el distrito cambiado (§3.3)
- Equipo de ese local, si aplica
- Schema `HairSalon` propio (§12.3)

---

## 11. Especificación página por página

### 11.1 Home `/`

| # | Sección | Fondo | Contenido |
|---|---|---|---|
| 1 | Hero | Tinta | Wordmark cinético (§6.2) · una frase de posicionamiento · CTA agendar · selector de local · **asomo de la sección siguiente** para invitar al scroll |
| 2 | Balayage | Tinta | Bloque editorial asimétrico · foto en lente · "desde S/ XXX" · CTA · enlace a `/balayage` |
| 3 | Carta de servicios | Hueso ↕ corte | Categorías con precios en formato carta editorial · CTA por fila · enlace a `/servicios` |
| 4 | Trabajos | Tinta | Galería en lente, fotos reales |
| 5 | Locales | Hueso | Dos bloques · mapa fachada · "Cómo llegar" · "Agendar aquí" |
| 6 | Equipo | Hueso | Breve, retratos en lente · enlace a `/nosotros` |
| 7 | Cierre | Rosa oscuro | Banda de acción, texto hueso (7.29:1 ✅) · CTA agendar |
| 8 | Footer | Tinta | Locales, horarios, redes, legal |

**Sobre el hero:** la investigación de salones que convierten señala que la reserva tiene que estar al frente. El hero debe mostrar, sin scroll y en móvil: el nombre, qué es, el botón de agendar, y el borde de la sección siguiente. Nada de un hero de 100vh que solo tenga una frase bonita.

### 11.2 `/balayage` — la página del servicio estrella

Única página **full tinta** de principio a fin. Es la más cinematográfica del sitio porque es la que más vale.

1. Hero: la palabra BALAYAGE en display, foto en lente, precio desde, duración, CTA
2. Qué es — explicación honesta y concreta, sin adjetivos de folleto
3. A quién le queda — tipos de cabello, punto de partida realista
4. El proceso paso a paso — numerado, con la duración real de cada etapa
5. Galería de trabajos reales (§15.2: **solo fotos reales**)
6. Cuidados posteriores — utilidad real, genera confianza y tiempo en página
7. Precio y duración — con CTA
8. **FAQ** — 6 a 8 preguntas, con schema `FAQPage` (§12.3)
9. Cierre con CTA

Preguntas frecuentes sugeridas (**las respuestas las da el cliente, no las inventes**): ¿cuánto dura?, ¿daña el cabello?, ¿cada cuánto hay que retocarlo?, ¿funciona en cabello teñido?, ¿en cabello oscuro?, ¿cuánto cuesta?, ¿necesito cita previa?, ¿qué diferencia hay con las mechas tradicionales?

### 11.3 `/servicios`

Carta completa. Navegación por categorías con anclas fijas (no un filtro con JS que rompa el enlace directo).

Formato de fila — **editorial, no tarjeta**:

```
Balayage ·············································· desde S/ XXX
Iluminación a mano alzada, sin raíz marcada.              3 h  [Agendar]
```

- Línea de puntos entre nombre y precio (`border-bottom: 1px dotted` sobre un pseudo-elemento flexible).
- Precios con `tabular-nums`, alineados a la derecha.
- Descripción en gris, una o dos líneas.
- Botón de agenda por fila. En móvil, la fila entera es tocable hacia la agenda.
- Categoría destacada (Color) arriba.

### 11.4 `/locales` y `/locales/local-N`

Índice + fichas según §10.4.

### 11.5 `/nosotros`

Historia del salón, equipo con retratos en lente, nombre, especialidad y local. La investigación es clara: los perfiles individuales de estilistas construyen confianza antes de la primera visita.

### 11.6 `/catalogo`

Productos con foto, nombre, descripción breve, precio y botón de WhatsApp propio por producto (comprometido en la propuesta). Si el catálogo llega vacío, la página no se publica: mejor no tenerla que tenerla vacía.

### 11.7 `/contacto`

Los dos locales, WhatsApp, teléfono, horarios, redes, mapas.
**Sin formulario.** El mecanismo de contacto de este negocio es WhatsApp, la propuesta lo dice, y un formulario que nadie revisa es peor que no tenerlo. (Nota: esto además evita repetir el problema abierto de `contacto.html` en Landing Crouton, donde el formulario quedó con una clave de placeholder.)

### 11.8 `/privacidad`

Página legal mínima y honesta: qué datos se recogen (prácticamente ninguno si no hay formulario ni analítica invasiva), qué hace el enlace a WhatsApp, y las cookies que existan. Si no se instala analítica, decirlo — es un diferenciador.

---

## 12. SEO

### 12.1 Técnico

- Un `<title>` y una `<meta name="description">` únicos por página. Ninguno duplicado.
- URLs limpias en minúsculas con guiones, sin `.html` visible (config de Vercel).
- Un solo `<h1>` por página, y que sea el título real.
- `<link rel="canonical">` en todas.
- `sitemap.xml` y `robots.txt`.
- Etiquetas Open Graph y Twitter Card con imagen 1200×630.
- `lang="es-PE"`.
- Imágenes con `alt` descriptivo real. No "imagen de salón": *"Balayage en tonos caramelo sobre cabello castaño oscuro, hecho en Atalaya"*.
- HTML semántico: `<main>`, `<nav>`, `<article>`, `<section>` con `aria-labelledby`.

### 12.2 Palabras clave objetivo

**Definitivas al conocer los distritos.** Estructura:

| Página | Objetivo principal | Secundarios |
|---|---|---|
| `/` | atalaya salón (marca) | salón de belleza barranco / tocache / tarapoto |
| `/balayage` | **balayage lima** | balayage barranco, precio balayage, mechas balayage |
| `/servicios` | precios salón de belleza | manicure barranco, uñas acrílicas tarapoto |
| `/locales/barranco` | salón de belleza barranco | peluquería barranco, balayage barranco |
| `/locales/tocache` | **salón de belleza tocache** | peluquería tocache, uñas tocache |
| `/locales/tarapoto` | **salón de belleza tarapoto** | peluquería tarapoto, balayage tarapoto |

**Tocache y Tarapoto son la oportunidad real.** «Balayage lima» es un término
caro y disputado; «salón de belleza tocache» casi no tiene competencia y la
intención de compra es la misma. Un negocio con local físico en una ciudad
pequeña gana esas búsquedas con poco esfuerzo — pero solo con **página propia por
ciudad**, no con las tres apiladas en `/locales`.

**Cada página de local ataca un conjunto de palabras distinto y sin solaparse, atado a su propia geografía.** Dos páginas de local peleando por el mismo término se canibalizan.

### 12.3 Datos estructurados (JSON-LD)

**En cada `/locales/local-N`** — `HairSalon` (subtipo de `LocalBusiness`), con los datos **de ese local**, nunca compartidos:

```json
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": "https://DOMINIO/locales/local-1#negocio",
  "name": "Atalaya — [Distrito]",
  "image": "...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "PENDIENTE",
    "addressLocality": "PENDIENTE",
    "addressRegion": "Lima",
    "addressCountry": "PE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": null, "longitude": null },
  "telephone": "+51XXXXXXXXX",
  "url": "https://DOMINIO/locales/local-1",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00", "closes": "20:00" }
  ],
  "priceRange": "S/ 25 - S/ 550",
  "currenciesAccepted": "PEN",
  "sameAs": ["INSTAGRAM", "TIKTOK", "FICHA GOOGLE"],
  "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Servicios", "itemListElement": [] }
}
```

- **Home:** `Organization` + `WebSite`.
- **`/balayage`:** `Service` con `offers` (`priceCurrency: "PEN"`) + `FAQPage`.
- **`/servicios`:** `OfferCatalog` con los servicios y precios reales.
- **Todas:** `BreadcrumbList`.
- **Validar** en el Rich Results Test de Google antes de entregar. Un JSON-LD con error no sirve de nada.

### 12.4 La conexión con Google Maps

La propuesta plantea la web y las fichas de Maps como un sistema. Fuera del código, dejar recomendado a Ricardo:

- Cada local con su ficha de Google Business Profile completa y verificada.
- El campo web de cada ficha apuntando a **su página de local**, no a la home. Esto es lo que cierra el circuito de la propuesta §2.
- NAP (nombre, dirección, teléfono) **idéntico carácter por carácter** entre la web, ambas fichas y cualquier directorio. Una inconsistencia diluye la señal local.

---

## 13. Accesibilidad — WCAG 2.2 AA

No es opcional ni un extra. Es criterio de aceptación.

- **Contraste:** garantizado por §5.2 si se respeta la ley del espejo. Verificar cualquier combinación nueva antes de usarla.
- **Objetivo táctil:** mínimo 44×44px (el mínimo WCAG 2.2 SC 2.5.8 es 24×24; se sube porque el uso es móvil y en la calle).
- **Teclado:** todo operable. Orden de foco lógico. `:focus-visible` siempre visible. Enlace "saltar al contenido".
- **La hoja de selección de local** atrapa el foco, se cierra con Escape y devuelve el foco al botón que la abrió.
- **`prefers-reduced-motion: reduce`** desactiva todo el movimiento no esencial.
- **Imágenes:** `alt` real; `alt=""` en las puramente decorativas.
- **Formas del logo** usadas como decoración: `aria-hidden="true"`.
- **Estado "Abierto ahora"** comunicado también por texto, no solo por color.
- **Zoom hasta 200%** sin pérdida de contenido ni scroll horizontal.
- Probar con lector de pantalla el recorrido crítico: llegar → elegir servicio → elegir local → agendar.

---

## 14. Rendimiento

Presupuesto medido en **Android de gama media sobre 4G**, que es el dispositivo real del usuario de este sitio. El cuello de botella es el procesador, no la red.

| Métrica | Objetivo | Umbral de fallo |
|---|---|---|
| LCP | < 2.0 s | 2.5 s |
| INP | < 150 ms | 200 ms |
| CLS | < 0.05 | 0.1 |
| JS total (comprimido) | < 25 KB | 40 KB |
| CSS total (comprimido) | < 20 KB | 30 KB |
| Peso de la home | < 500 KB | 800 KB |
| Peticiones en carga inicial | < 20 | 30 |

Reglas que lo hacen posible:

1. **Cero dependencias de terceros en la carga inicial.** Sin jQuery, sin GSAP, sin Bootstrap, sin librerías de íconos, sin mapas embebidos (§10.1).
2. **Jost autoalojada**, subconjunto latín, `woff2`, tres pesos. **No enlazar a Google Fonts:** es bloqueante y añade una conexión externa. `font-display: swap` y `<link rel="preload">` solo para el peso del texto LCP.
3. **Imágenes en AVIF con respaldo WebP.** `width` y `height` siempre explícitos (evita CLS). `loading="lazy"` en todo salvo la del hero. `fetchpriority="high"` en la del hero.
4. **El movimiento anima solo `transform`, `opacity`, `clip-path` y `mask`.**
5. **CSS crítico en línea** para el hero; el resto diferido.
6. **JS en módulos ES nativos**, `defer`, sin empaquetador. El sitio debe funcionar (leer, navegar, agendar) con JS desactivado.
7. `content-visibility: auto` en secciones fuera de pantalla.

**Verificación obligatoria** antes de entregar: Lighthouse móvil con throttling, y PageSpeed Insights sobre la URL desplegada. Los números van en el informe de entrega.

---

## 15. Assets e imágenes

### 15.1 Marca

Ya extraídos del manual y disponibles en `marca/`:

| Archivo | Contenido | Tamaño |
|---|---|---|
| `atalaya-lockup.png` | Símbolo + wordmark + "salón" | 628×622 |
| `atalaya-simbolo.png` | Solo el símbolo | 628×427 |
| `atalaya-wordmark.png` | Solo "ATALAYA salón" | 628×195 |
| `manual-desempaquetado.html` | Manual de marca legible | — |

**Tareas:**
- **Pedir el vectorial (SVG/AI).** 628px no alcanza para pantallas de alta densidad ni para el favicon. Es la petición de assets más urgente después de las fotos.
- Mientras tanto: vectorizar el símbolo a SVG a mano. Es geometría simple (círculo + dos trazos) y el resultado será mejor y más liviano que el PNG.
- Derivar de ese SVG: `lente.svg` (la máscara de §6.3) y `vertice.svg`.
- Favicon completo: SVG, ICO, PNG 180/192/512, `site.webmanifest`. Sobre fondo tinta, símbolo en hueso.

### 15.2 Fotografía — decisión importante

**Las fotos de trabajos, del equipo y de los locales tienen que ser reales.** No es una preferencia estética:

- Un balayage generado por IA presentado como trabajo del salón **es publicidad engañosa**. La persona reserva esperando ese resultado. No lo hacemos.
- Un equipo con caras generadas destruye exactamente la confianza que la sección busca construir.
- Un local que no se parece al local real produce una mala primera visita.

La propuesta ya compromete al cliente a entregar *"fotos de los locales, del equipo y de trabajos realizados"* (§5). **Esa entrega es un bloqueante de lanzamiento, no un extra.**

Guía para pedirlas bien:
- Trabajos: luz natural, fondo neutro, misma distancia y encuadre. Preferible antes/después del mismo ángulo. Mínimo 8–12 para la galería de balayage.
- Locales: fachada (para reconocerlo al llegar), interior general, detalle de estación de trabajo.
- Equipo: retrato vertical, fondo uniforme, misma iluminación entre todos.
- Formato: lo más grande posible, sin filtros de Instagram, sin marcas de agua.

### 15.3 Higgsfield — estado y plan

**DECISIÓN TOMADA (17 ago 2026): la generación de imágenes queda EN PAUSA. No se contrata Higgsfield para este proyecto.**

Construye el sitio completo sin ninguna imagen generada. Ninguna fase depende de ellas.

Contexto de la decisión: la cuenta está en plan gratuito con 0 créditos y no hay
packs sueltos disponibles — la única entrada real es Plus a $49/mes. El
presupuesto estimado era de ~300 créditos para una imagen por servicio (25
servicios × 4 intentos × 2 créditos, más ~80 para texturas y OG), o ~500 si se
generara también galería, equipo y locales. No se justifica contra un contrato
de S/ 1,050, y menos cuando la mayor parte de ese material tiene que ser
fotografía real de todos modos (§15.2).

**Un sitio minimalista, oscuro y dirigido por tipografía no necesita imágenes generadas.** La textura la ponen las formas del logo, el tipo y el contraste, todo en SVG/CSS: cero peso, cero coste, perfectamente on-brand.

**Hacer esto (todo en código, coste cero) — es la ruta oficial del proyecto:**
- Textura de fondo del hero: grano SVG sutil (`feTurbulence`) sobre tinta, opacidad < 4%.
- Halo del disco: gradiente radial rosa muy tenue sobre tinta, evocando el haz del logo.
- Mapas estáticos: captura del mapa con estilo propio + marcador en forma de lente, exportado como AVIF.
- Imagen OG: generarla en HTML/CSS y capturarla a 1200×630. Tinta de fondo, lockup centrado, sin foto.
- Marcadores de posición de fotos: bloques tinta con el símbolo al 6% de opacidad. **Nunca stock genérico**, ni siquiera de forma provisional.

**Si en el futuro se cargan créditos** (no en este proyecto salvo aviso de Ricardo) **— usar Higgsfield solo para esto:**
- Texturas abstractas de fondo (mechones de luz sobre negro, sin caras, sin cuerpos).
- Fondo de la imagen OG.
- **Nunca** para resultados de servicios, personas del equipo ni los locales (§15.2).

Prompts listos para ejecutar cuando haya créditos:

```
TEXTURA HERO (16:9)
Abstract macro photograph of a single sweep of light across matte black,
soft dusty-pink glow at one edge, extreme negative space, cinematic,
editorial, no faces, no people, no text, grain, muted, dark, minimal.
Palette strictly: near-black #13161A and dusty pink #D080B6.

FONDO OG (1200x630, 1.91:1)
Deep near-black background #13161A with a faint diagonal beam of dusty
pink light #D080B6 rising from lower-left to upper-right at a shallow
angle, heavy vignette, empty center for logo placement, no text,
no people, minimal, editorial.
```

---

## 16. Stack, estructura y despliegue

### 16.1 Stack

**HTML + CSS + JavaScript puro. Sin framework, sin empaquetador, sin paso de build.**

Justificación, no inercia:
- Es exactamente lo que necesita este sitio: contenido mayormente estático, con el motor de conversión en enlaces `wa.me`.
- Es el patrón con el que ya trabaja Crouton Lab (ver Landing Crouton: CSS compartido + estilo por página + JS compartido). Consistencia de mantenimiento.
- Es lo que permite cumplir el presupuesto de rendimiento de §14 sin pelear contra un framework.
- Pasados los 60 días de garantía, los cambios se cobran por hora: un sitio sin build es un sitio donde un cambio de precio toma minutos, no un `npm install` que se rompió en seis meses.

**No** usar React, Next.js, Astro, Tailwind ni ningún bundler. Si crees que hace falta uno, dilo antes de introducirlo.

### 16.2 Estructura de archivos

```
Web Atalaya/
├── ROADMAP.md                  ← este documento
├── index.html
├── balayage.html
├── servicios.html
├── locales.html
├── locales/
│   ├── local-1.html
│   └── local-2.html
├── nosotros.html
├── catalogo.html
├── contacto.html
├── privacidad.html
│
├── atalaya-system.css          ← tokens, tipografía, nav, botones, footer, motion
├── atalaya-pagina.css          ← patrones de página interior
│
├── js/
│   ├── datos.js                ← re-exporta data/atalaya.js
│   ├── whatsapp.js             ← motor de §9
│   ├── locales.js              ← selección de local, mapas fachada, "abierto ahora"
│   ├── nav.js                  ← nav, barra móvil, índice-atalaya
│   └── motion.js               ← IntersectionObserver, respeta reduced-motion
│
├── data/
│   └── atalaya.js              ← ÚNICO archivo de contenido (§8)
│
├── assets/
│   ├── marca/                  ← svg del símbolo, lente, vértice, favicons
│   ├── fuentes/                ← jost-300/400/500.woff2 subconjunto latín
│   ├── fotos/                  ← reales del cliente
│   ├── mapas/                  ← mapas estáticos por local
│   └── og-image.png
│
├── marca/                      ← fuente: manual y logos extraídos
├── sitemap.xml
├── robots.txt
└── vercel.json                 ← URLs limpias, redirecciones 301, cabeceras
```

### 16.3 Despliegue

Vercel, auto-deploy desde `main` (mismo patrón que Landing La Nación). En `vercel.json`:
- `cleanUrls: true`
- Redirecciones 301 preparadas para el renombrado de los locales (§7.3)
- Cabeceras de caché largas para `assets/`
- Cabeceras de seguridad básicas: `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`

Repositorio git propio desde el primer commit.

---

## 17. Fases de ejecución

Cada fase tiene criterios de aceptación. **No avances con criterios sin cumplir.**

### Fase 1 — Cimientos
1. Estructura de carpetas y repo git.
2. Vectorizar el símbolo a SVG; derivar `lente.svg` y `vertice.svg`.
3. Descargar y subconjuntar Jost 300/400/500 a `woff2`.
4. Escribir `atalaya-system.css` completo: tokens (§5.1), tipografía (§5.3), botones (§5.6), nav (§5.8), footer, `prefers-reduced-motion`.
5. Escribir `data/atalaya.js` con la estructura de §8 y todos los `PENDIENTE` marcados.
6. Página de prueba que renderice cada token, cada estilo de texto y cada botón sobre ambos fondos.

**Aceptación:** la página de prueba muestra todas las combinaciones de §5.2 con su ratio calculado al lado. **Ninguna combinación prohibida aparece en ningún lado.** Jost carga desde local, sin peticiones a Google.

### Fase 2 — Motor de conversión
1. `js/whatsapp.js` según §9.1.
2. `js/locales.js`: selección de local, persistencia, hoja de selección accesible.
3. `js/locales.js`: `enlaceComoLlegar()` según §10.2 y mapa fachada según §10.1.
4. Estado "Abierto ahora" en zona horaria `America/Lima`.

**Aceptación:** con datos de prueba, un botón de agenda produce un `wa.me` correctamente codificado, con el número en E.164 y el mensaje en primera persona. El botón "Cómo llegar" abre Google Maps en el punto correcto. La hoja de selección se opera entera con teclado y devuelve el foco al cerrarse. **Con `whatsapp: ''` no se renderiza ningún botón roto.**

### Fase 3 — Home
1. Hero con wordmark cinético (§6.2) y estado final en el CSS base.
2. Las 8 secciones de §11.1.
3. Índice-atalaya (§6.4) y barra contextual (§6.5).

**Aceptación:** con JS desactivado, la home se lee completa y todos los botones de agenda funcionan. Con `prefers-reduced-motion`, nada se mueve y nada queda invisible. Sin scroll horizontal entre 320px y 2560px.

### Fase 4 — Páginas interiores
1. `/balayage` completa con FAQ (§11.2).
2. `/servicios` con la carta editorial (§11.3).
3. `/locales` + las dos fichas (§10.4).
4. `/nosotros`, `/contacto`, `/privacidad`. `/catalogo` solo si hay datos.

**Aceptación:** cada página tiene `<title>`, `description` y `<h1>` únicos. Cada ficha de local tiene su propio schema con **sus** datos. Ninguna página muestra `PENDIENTE`, `null`, `S/ 0` ni un párrafo vacío.

### Fase 5 — SEO, schema y accesibilidad
1. Todo el JSON-LD de §12.3, validado en Rich Results Test.
2. `sitemap.xml`, `robots.txt`, canónicas, OG y Twitter Card.
3. Auditoría de accesibilidad completa (§13), incluida una pasada con lector de pantalla del recorrido crítico.

**Aceptación:** Rich Results Test sin errores en todas las páginas con schema. Lighthouse Accessibility 100. Recorrido crítico completable solo con teclado.

### Fase 6 — Rendimiento y entrega
1. Optimizar imágenes a AVIF/WebP con dimensiones explícitas.
2. CSS crítico en línea, resto diferido.
3. Lighthouse móvil con throttling; corregir hasta cumplir §14.
4. `vercel.json`, despliegue, verificación en dominio real.
5. Informe de entrega: métricas alcanzadas, datos aún pendientes, instrucciones de edición de `data/atalaya.js` para Ricardo.

**Aceptación:** los siete presupuestos de §14 cumplidos en la URL desplegada. Cero errores en consola. Probado en iOS Safari, Android Chrome y escritorio.

---

## 18. Definición de terminado

El sitio **no se entrega** hasta que todo esto sea cierto:

- [ ] Ningún `PENDIENTE`, `null`, `undefined`, `S/ 0` ni Lorem visible para el usuario.
- [ ] Todos los botones de WhatsApp abren un chat real, con el número correcto y el mensaje correcto, **probado en un teléfono físico** (iOS y Android).
- [ ] Ambos botones "Cómo llegar" abren el punto correcto en Google Maps, probados desde un móvil.
- [ ] Cero fotos de stock. Cero fotos generadas por IA presentadas como trabajos, equipo o locales.
- [ ] Ninguna combinación de color prohibida por §5.2 en ningún lugar del sitio.
- [ ] Ningún elemento de la lista negra de §4.4.
- [ ] Presupuesto de rendimiento de §14 cumplido en la URL desplegada.
- [ ] Schema válido en Rich Results Test.
- [ ] Sitio navegable y agendable con teclado, y con JavaScript desactivado.
- [ ] `prefers-reduced-motion` respetado, sin contenido invisible.
- [ ] Sin scroll horizontal de 320px a 2560px.
- [ ] Agregar un tercer local requiere: un objeto en el array, una copia de plantilla, unas fotos. Nada más.
- [ ] Ricardo puede cambiar cualquier precio editando una sola línea de `data/atalaya.js`.

---

## 19. Riesgos abiertos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| **La lista de servicios de cabello nunca llega** | Alto — no hay página de balayage real, se cae el activo SEO principal | Pedirla el día 1. Sin ella, `/balayage` no se puede publicar con calidad. |
| **No llegan fotos reales** | Alto — un salón sin fotos de su trabajo no convierte | Ya comprometido en la propuesta §5. Escalar temprano, no la semana de entrega. |
| **Un solo número de WhatsApp para ambos locales** | Medio — cambia el alcance de §9.2 | **Confirmar antes de construir la Fase 2.** |
| **Solo hay logo en PNG 628px** | Medio — límite de calidad en pantallas densas y favicon | Vectorizar a mano en Fase 1; pedir el original en paralelo. |
| **Renombrar los locales después de indexar** | Medio — se pierde autoridad de URL | Renombrar antes del lanzamiento, o dejar la 301 lista desde el día 1. |
| **Generación de imágenes descartada** | Bajo | Decisión tomada, no un bloqueo. El concepto no depende de imágenes generadas: textura en SVG/CSS, fotografía real del cliente (§15.3). |
| **Ampliación de alcance con reservas online** | Medio — el contrato es S/ 1,050 | El mecanismo de reserva es WhatsApp. Un sistema de reservas es otro proyecto. |

---

## 20. Fuentes consultadas

Tendencias de diseño 2026:
- [Envato — Web design trends for 2026](https://elements.envato.com/learn/web-design-trends)
- [Figma — Top Web Design Trends for 2026](https://www.figma.com/resource-library/web-design-trends/)
- [UX Pilot — 14 Web Design Trends 2026](https://uxpilot.ai/blogs/web-design-trends-2026)

Webs de salón que convierten:
- [GlossGenius — Hair salon website design examples](https://glossgenius.com/blog/hair-salon-websites)
- [WebCitz — 9 Best Hair Salon Website Designs 2026](https://www.webcitz.com/blog/best-hair-salon-websites/)
- [DLL Studios — 2026 Salon Website Trends](https://www.dllstudios.com/post/2026-trends-stunning-salon-website-designs-to-elevate-your-brand)

WhatsApp click-to-chat:
- [U2L — The Complete wa.me Guide 2026](https://u2l.ai/blog/whatsapp-click-to-chat-link)
- [Whatsform — WhatsApp link with pre-filled message](https://whatsform.com/blog/whatsapp-link-pre-filled-message/)

Google Maps URLs:
- [Google — Maps URLs, Get Started](https://developers.google.com/maps/documentation/urls/get-started)
- [Google — Direct users to Maps Places Details and Directions](https://developers.google.com/maps/architecture/maps-url)

SEO local multi-local:
- [SEOProfy — Local SEO for multiple locations](https://seoprofy.com/blog/seo-for-multiple-locations/)
- [Roya — Managing local SEO for multiple locations 2026](https://www.roya.com/blog/how-to-manage-local-seo-for-multiple-locations-in-2026.html)

Animación y soporte de navegadores:
- [Frontend Horizon — View Transitions & Scroll-Driven Animations](https://www.frontendhorizon.com/blog/view-transitions-api-and-css-scroll-driven-animations-the-browser-wins-of-2026)
- [CSSAWWWARDS — Scroll-Driven Animations Guide 2026](https://cssawwwards.com/blog/css-scroll-driven-animations-guide-2026)

Rendimiento:
- [Core Web Vitals — LCP, INP & CLS 2026](https://www.corewebvitals.io/core-web-vitals)
- [Locally Lost — Web Performance Benchmarks 2026](https://locallylost.com/guides/web-performance-benchmarks-2026-core-web-vitals-page-speed-trends/)

Mercado de balayage en Lima:
- [Fresha — Balayage en Lima, Perú](https://www.fresha.com/lp/en/tt/balayage-hair-colouring/in/pe-lima)

---

*Crouton Lab · Web Atalaya · hoja de ruta v1 · agosto 2026*
