/* ==========================================================================
   ATALAYA — comportamiento (ROADMAP.md §6, §9, §10)
   Módulo ES nativo, sin dependencias, sin empaquetador.
   Todo lo esencial del sitio funciona sin este archivo.
   ========================================================================== */

import { NEGOCIO, LOCALES, SERVICIOS, precioTexto } from './datos.js';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- 1. Motor de WhatsApp (ROADMAP §9) ------------------------------------ */

export function enlaceWA({ servicio = null, producto = null, local = null } = {}) {
  const num = (local && local.whatsapp) || NEGOCIO.whatsapp;
  if (!num) {
    console.warn('[atalaya] Falta el número de WhatsApp en datos.js — botón omitido.');
    return null;
  }
  const donde = local ? ` en ${NEGOCIO.nombre} ${local.nombre}` : ` en ${NEGOCIO.nombre}`;
  let msg;
  if (servicio) {
    msg = `Hola, quiero agendar una cita de ${servicio.nombre}${donde}. ¿Qué horarios tienen disponibles?`;
  } else if (producto) {
    msg = `Hola, me interesa ${producto.nombre} que vi en la web. ¿Está disponible${donde}?`;
  } else {
    msg = `Hola, quiero agendar una cita${donde}. ¿Qué horarios tienen disponibles?`;
  }
  return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
}

/* Resuelve los enlaces marcados con data-wa en el HTML estático. */
function conectarWA() {
  $$('[data-wa]').forEach((el) => {
    const slug = el.dataset.waServicio;
    const localId = el.dataset.waLocal;
    const servicio = slug
      ? SERVICIOS.flatMap((c) => c.items).find((i) => i.slug === slug)
      : null;
    const local = localId ? LOCALES.find((l) => l.id === localId) : null;
    const href = enlaceWA({ servicio, local });
    if (href) {
      el.href = href;
      el.target = '_blank';
      el.rel = 'noopener';
    } else {
      el.setAttribute('aria-disabled', 'true');
      el.removeAttribute('href');
    }
  });
}

/* --- 2. Google Maps: cómo llegar (ROADMAP §10.2) -------------------------- */

export function enlaceComoLlegar(local) {
  const p = new URLSearchParams({ api: '1' });
  if (local.geo && local.geo.lat != null && local.geo.lng != null) {
    p.set('destination', `${local.geo.lat},${local.geo.lng}`);
  } else if (local.direccion) {
    p.set('destination', `${local.direccion}, ${local.distrito}, Lima, Perú`);
  } else {
    return null;   // sin dirección no hay ruta: el botón no se renderiza
  }
  if (local.placeId) p.set('destination_place_id', local.placeId);
  return `https://www.google.com/maps/dir/?${p}`;
}

function conectarMapas() {
  $$('[data-como-llegar]').forEach((el) => {
    const local = LOCALES.find((l) => l.id === el.dataset.comoLlegar);
    const href = local && enlaceComoLlegar(local);
    if (href) {
      el.href = href;
      el.target = '_blank';
      el.rel = 'noopener';
      el.hidden = false;
    } else {
      el.hidden = true;   // ubicación por confirmar
    }
  });
}

/* --- 3. Carta de servicios (ROADMAP §11.3) -------------------------------- */

function filaServicio(item) {
  const wa = enlaceWA({ servicio: item });
  const precio = precioTexto(item);
  const enlaceNombre = item.pagina
    ? `<a class="enlace" href="${item.pagina}">${item.nombre}</a>`
    : item.nombre;
  return `
    <li class="fila${item.estrella ? ' fila-estrella' : ''}">
      <div class="fila-cab">
        <h3 class="fila-nom">${enlaceNombre}${item.estrella ? ' <span class="chip">Servicio estrella</span>' : ''}</h3>
        <span class="fila-linea" aria-hidden="true"></span>
        <span class="fila-precio num">${precio}</span>
      </div>
      ${item.descripcion ? `<p class="fila-desc sec">${item.descripcion}</p>` : ''}
      ${wa ? `<a class="fila-cta btn btn-linea" href="${wa}" target="_blank" rel="noopener"
                 data-wa-servicio="${item.slug}">Agendar</a>` : ''}
    </li>`;
}

function pintarCarta() {
  const cont = $('[data-carta]');
  if (!cont) return;
  const soloDestacada = cont.dataset.carta === 'destacada';
  const cats = soloDestacada ? SERVICIOS.filter((c) => c.destacada) : SERVICIOS;
  cont.innerHTML = cats.map((c) => `
    <section class="cat" id="cat-${c.slug}">
      <header class="cat-cab rev">
        <h2>${c.categoria}</h2>
        ${c.intro ? `<p class="lead sec">${c.intro}</p>` : ''}
      </header>
      <ul class="lista">${c.items.map(filaServicio).join('')}</ul>
    </section>`).join('');
}

/* --- 3b. Locales (ROADMAP §10.4) ------------------------------------------ */

function horarioTexto(local) {
  if (!local.horario || !local.horario.length) return null;
  const DIAS = { Mo: 'Lun', Tu: 'Mar', We: 'Mié', Th: 'Jue', Fr: 'Vie', Sa: 'Sáb', Su: 'Dom' };
  return local.horario
    .map((h) => `${h.dias.map((d) => DIAS[d] || d).join(', ')} · ${h.abre}–${h.cierra}`)
    .join('<br>');
}

function pintarLocales() {
  const cont = $('[data-locales]');
  if (!cont) return;

  cont.innerHTML = LOCALES.map((local) => {
    const wa = enlaceWA({ local });
    const ruta = enlaceComoLlegar(local);
    const horario = horarioTexto(local);
    const titulo = local.distrito ? `${local.nombre} · ${local.distrito}` : local.nombre;

    return `
      <article class="local rev">
        <div class="local-mapa">
          <svg class="pin" viewBox="0 0 512 512" aria-hidden="true"><use href="#a-simbolo"/></svg>
          <span class="nota">${ruta ? 'Mapa' : 'Mapa — dirección por confirmar'}</span>
        </div>
        <div class="local-cuerpo">
          <h3>${titulo}</h3>
          <ul class="local-datos">
            <li>${local.direccion
              ? local.direccion + (local.referencia ? `<br><span class="sec">${local.referencia}</span>` : '')
              : '<span class="pendiente">Dirección por confirmar</span>'}</li>
            <li>${horario || '<span class="pendiente">Horario por confirmar</span>'}</li>
            <li>${NEGOCIO.telefonoVisible}</li>
          </ul>
          <div class="local-acciones">
            ${wa ? `<a class="btn btn-accion-cl" href="${wa}" target="_blank" rel="noopener">Agendar aquí</a>` : ''}
            ${ruta ? `<a class="btn btn-linea" href="${ruta}" target="_blank" rel="noopener">Cómo llegar</a>`
                   : `<span class="btn btn-linea" aria-disabled="true" style="opacity:.45;pointer-events:none">Cómo llegar</span>`}
          </div>
        </div>
      </article>`;
  }).join('');
}

/* --- 4. Nav, menú y barra de reserva -------------------------------------- */

/* Mide el tope fijo (aviso + nav) y lo expone como --tope-h. */
function medirTope() {
  const tope = $('.tope');
  if (!tope) return;
  const aplicar = () =>
    document.documentElement.style.setProperty('--tope-h', tope.offsetHeight + 'px');
  aplicar();
  if ('ResizeObserver' in window) new ResizeObserver(aplicar).observe(tope);
  else window.addEventListener('resize', aplicar, { passive: true });
}

function nav() {
  const barraNav = $('.nav');
  const menu = $('.menu');
  const btn = $('.menu-btn');
  const barra = $('.barra');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const abierto = menu.classList.toggle('abierto');
      btn.setAttribute('aria-expanded', String(abierto));
      document.body.style.overflow = abierto ? 'hidden' : '';
    });
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        menu.classList.remove('abierto');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('abierto')) {
        menu.classList.remove('abierto');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        btn.focus();
      }
    });
  }

  let ultimo = 0;
  const alScroll = () => {
    const y = window.scrollY;
    if (barraNav) barraNav.classList.toggle('solido', y > 40);
    if (barra) barra.classList.toggle('visible', y > 320);
    ultimo = y;
  };
  alScroll();
  window.addEventListener('scroll', alScroll, { passive: true });
}

/* --- 5. Revelado al entrar en viewport (ROADMAP §6.7) --------------------- */

function revelar() {
  const objetivos = $$('.rev, .lente-rev');
  if (!objetivos.length) return;
  if (reduce || !('IntersectionObserver' in window)) {
    objetivos.forEach((el) => el.classList.add('visto'));
    return;
  }
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visto');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  objetivos.forEach((el) => io.observe(el));
}

/* --- 6. Índice-atalaya + barra contextual (ROADMAP §6.4, §6.5) ------------ */

function indice() {
  const idx = $('.indice');
  const secciones = $$('[data-seccion]');
  if (!secciones.length) return;

  if (idx) {
    idx.innerHTML = secciones.map((s) => `
      <li><a href="#${s.id}" data-i="${s.id}">
        <span class="txt">${s.dataset.seccion}</span>
        <span class="marca-i"></span>
      </a></li>`).join('');
  }

  const enlaces = idx ? $$('a', idx) : [];
  const barraCta = $('[data-cta-contextual]');
  const ctaBase = barraCta ? barraCta.textContent.trim() : '';

  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;

      enlaces.forEach((a) => a.classList.toggle('act', a.dataset.i === id));

      // El índice invierte su tinta sobre secciones claras
      if (idx) idx.classList.toggle('sobre-hueso', e.target.classList.contains('s-hueso'));

      // La barra de reserva adopta el servicio de la sección visible
      if (barraCta) {
        const slug = e.target.dataset.ctaServicio;
        const etiqueta = e.target.dataset.ctaTexto;
        if (slug) {
          const serv = SERVICIOS.flatMap((c) => c.items).find((i) => i.slug === slug);
          const href = enlaceWA({ servicio: serv });
          if (href) barraCta.href = href;
        } else {
          const href = enlaceWA({});
          if (href) barraCta.href = href;
        }
        barraCta.textContent = etiqueta || ctaBase;
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  secciones.forEach((s) => io.observe(s));
}

/* --- 7. Arranque ---------------------------------------------------------- */

document.documentElement.classList.add('js');

function iniciar() {
  pintarCarta();
  pintarLocales();
  conectarWA();
  conectarMapas();
  medirTope();
  nav();
  indice();
  revelar();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}
