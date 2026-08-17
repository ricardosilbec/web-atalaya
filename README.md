# Web Atalaya

Sitio del Salón de Belleza Atalaya (Lima). HTML + CSS + JS puro, sin build.

**Especificación completa: [ROADMAP.md](ROADMAP.md).** Léelo antes de tocar nada.

## Desarrollo

No hay servidor de desarrollo ni dependencias:

```bash
npx serve .
```

## Editar contenido

Todo el contenido variable vive en un único archivo: **`js/datos.js`**.
Precios, servicios, locales, teléfonos y horarios se cambian ahí, no en el HTML.

## Locales

Tres: Barranco (Lima), Tocache y Tarapoto (San Martín). Se definen en
`js/datos.js`; añadir uno es un objeto más en el array `LOCALES`.

## Antes de publicar en el dominio definitivo

1. Borrar el `<div class="aviso">` de las 7 páginas (banda de "Vista previa").
2. Quitar el `<meta name="robots" content="noindex, nofollow">` de las 7 páginas.
3. Cambiar `robots.txt` de `Disallow: /` a `Allow: /`.
4. Poner el dominio real en `sitemap.xml` y añadir las `<link rel="canonical">`.
