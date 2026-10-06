/* ==========================================================================
   ATALAYA — archivo único de contenido (ROADMAP.md §8)
   Editar AQUÍ, nunca en el HTML.

   Estado a 17 ago 2026:
   · WhatsApp POR LOCAL (confirmado 17 ago):
       Barranco → 981 591 998   ·   Tocache → 955 063 705
       Tarapoto → usa el de Barranco EN TEMPORAL hasta que el cliente dé el suyo.
     Los CTA genéricos (hero, nav, pie) apuntan a Barranco por defecto.
   · Direcciones confirmadas. Horarios y Place IDs: PENDIENTES del cliente
   · Tres locales en DOS regiones: Lima (Barranco) y San Martín (Tocache y
     Tarapoto). El negocio ya no es "un salón de Lima" — cuidado al escribir
     copy o metadatos que den por sentada una sola ciudad.
   · Carta completa recibida 6 oct: Tratamientos, Manicure y pedicure,
     Depilaciones y Maquillaje.
   · Precio de balayage: S/ 400 (confirmado 6 oct)
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
  whatsapp: '51981591998',           // E.164 sin '+'
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
    whatsapp: '51981591998',         // número de Lima
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
    whatsapp: '51981591998',         // TEMPORAL: es el de Barranco.
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
    categoria: 'Tratamientos',
    slug: 'tratamientos',
    destacada: true,
    intro: 'Corte, color y tratamiento de cabello. La técnica se elige según tu punto de partida, no al revés.',
    items: [
      { nombre: 'Balayage', slug: 'balayage', estrella: true, precio: 400, desde: false,
        duracion: null, pagina: 'balayage.html', borrador: true,
        descripcion: 'Iluminación pintada a mano alzada, sin papel ni gorro. Deja una transición suave desde la raíz, así que crece sin marcar línea y aguanta meses sin retoque.' },
      { nombre: 'Corte dama', slug: 'corte-dama', precio: 50, desde: false, borrador: true,
        descripcion: 'Corte y acabado, definido según tu tipo de cabello y cómo lo llevas a diario.' },
      { nombre: 'Corte caballero', slug: 'corte-caballero', precio: 50, desde: false, borrador: true,
        descripcion: 'Corte masculino con máquina y tijera, perfilado incluido.' },
      { nombre: 'Cepillado', slug: 'cepillado', precio: 45, desde: false, borrador: true,
        descripcion: 'Secado con cepillo para dar forma y brillo, sin plancha.' },
      { nombre: 'Planchado', slug: 'planchado', precio: 50, desde: false, borrador: true,
        descripcion: 'Alisado temporal con plancha. Dura hasta el siguiente lavado.' },
      { nombre: 'Ondas', slug: 'ondas', precio: 80, desde: false, borrador: true,
        descripcion: 'Ondas marcadas con tenaza. Peinado de salida, no permanente.' },
      { nombre: 'Peinados', slug: 'peinados', precio: 120, desde: true, borrador: true,
        descripcion: 'Recogidos y semirrecogidos para eventos. El precio depende de la complejidad.' },
      { nombre: 'Color raíces', slug: 'color-raices', precio: 120, desde: false, borrador: true,
        descripcion: 'Retoque de color solo en el crecimiento, para emparejarlo con el resto.' },
      { nombre: 'Color completo', slug: 'color-completo', precio: 220, desde: false, borrador: true,
        descripcion: 'Color de raíz a puntas, para cambiar de tono o cubrir canas.' },
      { nombre: 'Mechas', slug: 'mechas', precio: 300, desde: false, borrador: true,
        descripcion: 'Aclarado con papel desde la raíz. Marca más contraste que el balayage.' },
      { nombre: 'Babylights', slug: 'babylights', precio: 350, desde: false, borrador: true,
        nota: 'Confirmar nombre: llegó como "Babyligth".',
        descripcion: 'Mechas muy finas que imitan el aclarado natural del sol. Efecto sutil.' },
      { nombre: 'Alisado orgánico', slug: 'alisado-organico', precio: 350, desde: true, borrador: true,
        descripcion: 'Alisado sin formol. Reduce volumen y frizz durante varios meses.' },
      { nombre: 'Laceado japonés', slug: 'laceado-japones', precio: 600, desde: true, borrador: true,
        descripcion: 'Alisado permanente que reestructura el cabello. No se revierte con el lavado.' },
      { nombre: 'Botox reparador', slug: 'botox-reparador', precio: 150, desde: false, borrador: true,
        descripcion: 'Relleno capilar para cabello poroso o quebradizo.' },
      { nombre: 'Botox plasma', slug: 'botox-plasma', precio: 220, desde: false, borrador: true,
        descripcion: 'Versión reforzada del botox capilar, con sellado térmico.' },
      { nombre: "Tratamiento L'Oréal", slug: 'tratamiento-loreal', precio: 140, desde: false, borrador: true,
        descripcion: "Protocolo de hidratación profunda con la línea profesional de L'Oréal." },
      { nombre: 'Tratamiento Revlon', slug: 'tratamiento-revlon', precio: 100, desde: false, borrador: true,
        descripcion: 'Protocolo de hidratación con la línea profesional de Revlon.' },
      { nombre: 'Aplicación de ampolla', slug: 'ampolla', precio: 30, desde: true, borrador: true,
        nota: 'ACLARAR: el cliente mandó dos precios (30 y 50) con el mismo nombre. Se muestra "desde S/ 30" hasta saber qué distingue a cada una.',
        descripcion: 'Ampolla de tratamiento aplicada en cabina. Hay dos opciones según el producto.' },
    ],
  },
  {
    categoria: 'Manicure y pedicure',
    slug: 'manicure-pedicure',
    destacada: false,
    intro: 'El diseño se cotiza aparte, según complejidad.',
    items: [
      { nombre: 'Básico', slug: 'basico', precio: 25, desde: false, borrador: true,
        descripcion: 'Limado, cutícula y esmalte tradicional.' },
      { nombre: 'Gel frío', slug: 'gel-frio', precio: 30, desde: false, borrador: true,
        descripcion: 'Esmaltado en gel curado sin calor en la uña. Dura más que el esmalte tradicional.' },
      { nombre: 'Gel color', slug: 'gel-color', precio: 45, desde: false, borrador: true,
        descripcion: 'Esmaltado semipermanente en gel. Brillo y color estables entre dos y tres semanas.' },
      { nombre: 'Rubber', slug: 'rubber', precio: 60, desde: false, borrador: true,
        descripcion: 'Base de goma que refuerza la uña natural y corrige el nivelado antes del color.' },
      { nombre: 'Builder gel', slug: 'builder-gel', precio: 60, desde: false, borrador: true,
        nota: 'Confirmar nombre: llegó como "Bider gel".',
        descripcion: 'Gel de construcción para dar estructura y algo de largo sobre la uña natural.' },
      { nombre: 'Poligel', slug: 'poligel', precio: 70, desde: false, borrador: true,
        descripcion: 'Híbrido entre acrílico y gel. Más ligero que el acrílico y con más aguante que el gel solo.' },
      { nombre: 'Soft gel', slug: 'soft-gel', precio: 70, desde: false, borrador: true,
        descripcion: 'Tips preformados de gel blando, se adaptan a la uña y quedan finos.' },
      { nombre: 'Acrílico', slug: 'acrilico', precio: 100, desde: true, borrador: true,
        descripcion: 'Extensión en acrílico. El precio sube según el largo y la forma que elijas.' },
      { nombre: 'Baño de acrílico', slug: 'bano-acrilico', precio: 80, desde: false, borrador: true,
        descripcion: 'Capa de acrílico sobre la uña natural, sin extender el largo. Refuerza sin peso.' },
      { nombre: 'Diseño', slug: 'diseno', precio: 10, desde: true, borrador: true,
        nota: 'Aclarar con el cliente: llegó como "desde 10 y 15 soles".',
        descripcion: 'Decoración por uña. El precio depende de la complejidad.' },
      { nombre: 'Pedicure', slug: 'pedicure', precio: 40, desde: false, borrador: true,
        descripcion: 'Limado, cutícula, trabajo de callos y esmalte tradicional.' },
      { nombre: 'Pedicure gel', slug: 'pedicure-gel', precio: 60, desde: false, borrador: true,
        descripcion: 'Pedicure completo con esmaltado en gel semipermanente.' },
      { nombre: 'Acripie', slug: 'acripie', precio: 80, desde: false, borrador: true,
        descripcion: 'Refuerzo en acrílico sobre la uña del pie. Para uñas quebradizas o muy cortas.' },
    ],
  },
  {
    categoria: 'Depilaciones',
    slug: 'depilaciones',
    destacada: false,
    intro: '',
    items: [
      { nombre: 'Bozo', slug: 'bozo', precio: 25, desde: false, borrador: true,
        descripcion: 'Labio superior.' },
      { nombre: 'Cejas', slug: 'cejas', precio: 25, desde: false, borrador: true,
        descripcion: 'Perfilado y depilación de cejas.' },
      { nombre: 'Axila', slug: 'axila', precio: 30, desde: false, borrador: true,
        descripcion: 'Ambas axilas.' },
      { nombre: 'Bikini', slug: 'bikini', precio: 45, desde: false, borrador: true,
        descripcion: 'Línea del bikini.' },
      { nombre: 'Media pierna', slug: 'media-pierna', precio: 50, desde: false, borrador: true,
        descripcion: 'De la rodilla hacia abajo.' },
      { nombre: 'Rostro completo', slug: 'rostro-completo', precio: 80, desde: false, borrador: true,
        descripcion: 'Bozo, cejas, mentón y patillas.' },
      { nombre: 'Brasilera', slug: 'brasilera', precio: 80, desde: false, borrador: true,
        descripcion: 'Zona íntima completa.' },
      { nombre: 'Pierna completa', slug: 'pierna-completa', precio: 90, desde: false, borrador: true,
        descripcion: 'Pierna entera.' },
    ],
  },
  {
    categoria: 'Maquillaje',
    slug: 'maquillaje',
    destacada: false,
    intro: '',
    items: [
      { nombre: 'Maquillaje', slug: 'maquillaje', precio: 150, desde: false, borrador: true,
        descripcion: 'Maquillaje profesional para eventos y sesiones.' },
    ],
  },
];

/* Carta completa recibida del cliente el 6 oct 2026. Las descripciones las
   redactó Crouton Lab (borrador: true) y faltan por aprobar. */

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
