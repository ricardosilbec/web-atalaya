/* ==========================================================================
   ATALAYA — archivo único de contenido (ROADMAP.md §8)
   Editar AQUÍ, nunca en el HTML.

   Estado a 17 ago 2026:
   · WhatsApp POR LOCAL (confirmado 17 ago):
       Barranco → 910 867 018   ·   Tocache → 955 063 705
       Tarapoto → usa el de Barranco EN TEMPORAL hasta que el cliente dé el suyo.
     Los CTA genéricos (hero, nav, pie) apuntan a Barranco por defecto.
   · Direcciones confirmadas. Horarios y Place IDs: PENDIENTES del cliente
   · Tres locales en DOS regiones: Lima (Barranco) y San Martín (Tocache y
     Tarapoto). El negocio ya no es "un salón de Lima" — cuidado al escribir
     copy o metadatos que den por sentada una sola ciudad.
   · Servicios de cabello más allá de balayage: PENDIENTES
   · Precio de balayage: PENDIENTE (referencia de mercado Lima S/ 300–550)
   · Fotos: PENDIENTES — todo se renderiza con marcadores de marca
   · Las descripciones con `borrador: true` las redactó Crouton Lab y
     necesitan aprobación del cliente antes de publicar.
   ========================================================================== */

export const NEGOCIO = {
  nombre: 'Atalaya',
  nombreLargo: 'Atalaya Salón',
  descripcion: 'Balayage, color y uñas. Tres locales en Barranco, Tocache y Tarapoto.',
  moneda: 'PEN',
  simbolo: 'S/',
  // Número por defecto de los CTA que no nombran un local. Es el de Barranco.
  whatsapp: '51910867018',           // E.164 sin '+'
  instagram: '',                     // PENDIENTE
  tiktok: '',                        // PENDIENTE
  dominio: '',                       // PENDIENTE
};

/* Tres locales. `ciudad` y `region` son obligatorios: se usan para armar la
   dirección de Google Maps y el schema de cada ficha. No asumir Lima. */
export const LOCALES = [
  {
    id: 'barranco',
    slug: 'barranco',
    nombre: 'Barranco',
    direccion: 'Av. El Sol Este 825',
    distrito: 'Barranco',
    ciudad: 'Lima',
    region: 'Lima',
    referencia: '',                  // opcional
    geo: { lat: null, lng: null },   // PENDIENTE — mejora la precisión del mapa
    placeId: '',                     // PENDIENTE (ROADMAP §10.3)
    whatsapp: '51910867018',         // número de Lima
    horario: [],                     // PENDIENTE
    texto: '',                       // PENDIENTE — párrafo propio, no plantilla
    fotos: [],
  },
  {
    id: 'tocache',
    slug: 'tocache',
    nombre: 'Tocache',
    direccion: 'Jr. Bolognesi 685',
    distrito: 'Tocache',
    ciudad: 'Tocache',
    region: 'San Martín',
    referencia: '',
    geo: { lat: null, lng: null },
    placeId: '',
    whatsapp: '51955063705',
    horario: [],
    texto: '',
    fotos: [],
  },
  {
    id: 'tarapoto',
    slug: 'tarapoto',
    nombre: 'Tarapoto',
    direccion: 'Jr. Shapaja 450',
    distrito: 'Tarapoto',
    ciudad: 'Tarapoto',
    region: 'San Martín',
    referencia: '',
    geo: { lat: null, lng: null },
    placeId: '',
    whatsapp: '51910867018',         // TEMPORAL: es el de Barranco.
                                     // PENDIENTE: número propio de Tarapoto.
    horario: [],
    texto: '',
    fotos: [],
  },
];

/* +51 955 063 705 a partir del E.164 guardado. Un solo sitio donde formatear. */
export function telefonoVisible(local) {
  const n = (local && local.whatsapp) || NEGOCIO.whatsapp;
  const m = n.replace(/^51/, '');
  return '+51 ' + m.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
}

/* URL del mapa incrustado. Sin clave de API: el endpoint clásico de Maps
   acepta una consulta de texto y devuelve el mapa listo para <iframe>. */
export function mapaEmbed(local) {
  if (!local.direccion) return null;
  const q = local.geo && local.geo.lat != null
    ? `${local.geo.lat},${local.geo.lng}`
    : direccionCompleta(local);
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&hl=es&output=embed`;
}

/* Dirección completa para Google Maps y schema. */
export function direccionCompleta(local) {
  return [local.direccion, local.distrito, local.ciudad, local.region, 'Perú']
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i)   // Barranco/Barranco, Lima/Lima…
    .join(', ');
}

export const SERVICIOS = [
  {
    categoria: 'Color',
    slug: 'color',
    destacada: true,
    intro: 'Trabajo de color a mano alzada. La técnica se elige según tu punto de partida, no al revés.',
    items: [
      {
        nombre: 'Balayage',
        slug: 'balayage',
        estrella: true,
        precio: null,                // PENDIENTE
        desde: true,
        duracion: null,              // PENDIENTE
        descripcion: 'Iluminación pintada a mano alzada, sin papel ni gorro. Deja una transición suave desde la raíz, así que crece sin marcar línea y aguanta meses sin retoque.',
        borrador: true,
        pagina: 'balayage.html',
      },
    ],
  },
  {
    categoria: 'Manicure y pedicure',
    slug: 'manicure-pedicure',
    destacada: false,
    intro: 'Precios confirmados por el salón. El diseño se cotiza aparte según complejidad.',
    items: [
      { nombre: 'Básico', slug: 'basico', precio: 25, desde: false,
        descripcion: 'Limado, cutícula y esmalte tradicional.', borrador: true },
      { nombre: 'Gel frío', slug: 'gel-frio', precio: 30, desde: false,
        descripcion: 'Esmaltado en gel curado sin calor en la uña. Dura más que el esmalte tradicional.', borrador: true },
      { nombre: 'Gel color', slug: 'gel-color', precio: 45, desde: false,
        descripcion: 'Esmaltado semipermanente en gel. Brillo y color estables entre dos y tres semanas.', borrador: true },
      { nombre: 'Rubber', slug: 'rubber', precio: 60, desde: false,
        descripcion: 'Base de goma que refuerza la uña natural y corrige el nivelado antes del color.', borrador: true },
      { nombre: 'Builder gel', slug: 'builder-gel', precio: 60, desde: false,
        descripcion: 'Gel de construcción para dar estructura y algo de largo sobre la uña natural.', borrador: true,
        nota: 'Confirmar nombre: llegó como "Bider gel".' },
      { nombre: 'Poligel', slug: 'poligel', precio: 70, desde: false,
        descripcion: 'Híbrido entre acrílico y gel. Más ligero que el acrílico y con más aguante que el gel solo.', borrador: true },
      { nombre: 'Soft gel', slug: 'soft-gel', precio: 70, desde: false,
        descripcion: 'Tips preformados de gel blando, se adaptan a la uña y quedan finos.', borrador: true },
      { nombre: 'Acrílico', slug: 'acrilico', precio: 100, desde: true,
        descripcion: 'Extensión en acrílico. El precio sube según el largo y la forma que elijas.', borrador: true },
      { nombre: 'Baño de acrílico', slug: 'bano-acrilico', precio: 80, desde: false,
        descripcion: 'Capa de acrílico sobre la uña natural, sin extender el largo. Refuerza sin peso.', borrador: true },
      { nombre: 'Diseño', slug: 'diseno', precio: 10, desde: true,
        descripcion: 'Decoración por uña. El precio depende de la complejidad.', borrador: true,
        nota: 'Aclarar con el cliente: llegó como "desde 10 y 15 soles".' },
      { nombre: 'Pedicure', slug: 'pedicure', precio: 40, desde: false,
        descripcion: 'Limado, cutícula, trabajo de callos y esmalte tradicional.', borrador: true },
      { nombre: 'Pedicure gel', slug: 'pedicure-gel', precio: 60, desde: false,
        descripcion: 'Pedicure completo con esmaltado en gel semipermanente.', borrador: true },
      { nombre: 'Acripie', slug: 'acripie', precio: 80, desde: false,
        descripcion: 'Refuerzo en acrílico sobre la uña del pie. Para uñas quebradizas o muy cortas.', borrador: true },
    ],
  },
];

/* PENDIENTE: el resto de servicios de cabello (corte, tinte, mechas,
   tratamientos, keratina, peinado, cejas y pestañas). Añadir como categorías
   nuevas siguiendo la forma de arriba. */

export const EQUIPO = [];      // PENDIENTE
export const PRODUCTOS = [];   // PENDIENTE — catálogo

/* --- Derivados ----------------------------------------------------------- */

export const TODOS_SERVICIOS = SERVICIOS.flatMap((c) =>
  c.items.map((i) => ({ ...i, categoria: c.categoria, categoriaSlug: c.slug }))
);

export function precioTexto(item) {
  if (item.precio == null) return 'Consultar';
  return (item.desde ? 'desde ' : '') + NEGOCIO.simbolo + ' ' + item.precio;
}
