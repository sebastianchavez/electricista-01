# VoltajeSeguro — Landing Page Template

Template HTML estático multi-página para un negocio de servicios eléctricos. Construido con Tailwind CSS (vía CDN) y JavaScript nativo, sin build step.

## Características

- 9 páginas HTML completas
- 100% responsive (mobile-first)
- Animaciones de entrada con `IntersectionObserver`
- Contadores animados
- Galería con filtros y lightbox
- Formulario de contacto con validación
- Datos mockeados centralizados (fáciles de editar)
- Botón flotante de WhatsApp
- Paleta amarilla/negra (asociada a la electricidad)
- SEO básico (títulos, descripciones, OpenGraph)

## Páginas

| Archivo | Descripción |
|---|---|
| `index.html` | Inicio: hero, stats, servicios, proceso, galería preview, testimonios, CTA |
| `sobre-nosotros.html` | Historia, equipo, misión/visión, valores, certificaciones |
| `servicios.html` | Listado completo de servicios + proceso |
| `galeria.html` | Galería con filtros por categoría + lightbox |
| `precios.html` | 3 planes, tabla comparativa, precios individuales, FAQ |
| `cursos.html` | 4 cursos de formación + calendario semanal |
| `contacto.html` | Formulario + datos + horarios + FAQ + mapa de Google |
| `privacidad.html` | Política de privacidad |
| `terminos.html` | Términos y condiciones |

## Estructura de carpetas

```
electricista-01/
├── index.html
├── sobre-nosotros.html
├── servicios.html
├── galeria.html
├── precios.html
├── cursos.html
├── contacto.html
├── privacidad.html
├── terminos.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── data.js          # 👈 Toda la info mockeada (editá aquí)
│   │   ├── main.js          # Nav, animaciones, galería, FAQ
│   │   └── form.js          # Validación del formulario de contacto
│   └── images/
└── README.md
```

## Cómo usar

### Opción 1: Abrir directamente

Simplemente abrí `index.html` en tu navegador. No hay build process.

### Opción 2: Servidor local (recomendado)

Algunos navegadores bloquean recursos cuando se sirve con `file://`. Para mejor performance y evitar warnings de CORS:

```bash
# Python 3
python -m http.server 8080

# Node.js (con npx)
npx serve .

# PHP
php -S localhost:8080
```

Luego abrí `http://localhost:8080` en tu navegador.

## Personalización

### 1. Datos del negocio

Toda la información del sitio está centralizada en `assets/js/data.js`. Editá el objeto `BUSINESS` con tus datos:

```js
const BUSINESS = {
  name: "Tu Empresa",
  phone: "+54 11 ...",
  email: "tu@email.com",
  address: "Tu dirección",
  schedule: {
    weekdays: "Lun-Vie 8:00 a 20:00",
    saturday: "Sáb 9:00 a 14:00",
    sunday: "Dom solo emergencias"
  },
  // ... redes sociales, mapa, etc.
};
```

### 2. Cambiar colores

Los colores principales son `yellow-400` y `neutral-900/800`. Para cambiar la paleta, podés:

**Opción A:** Reemplazar las clases de Tailwind en todos los HTMLs (buscar y reemplazar).

**Opción B:** Configurar `tailwind.config` al inicio de cada HTML:

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#tu-color',
      }
    }
  }
};
```

### 3. Imágenes

Las imágenes del template vienen de Unsplash como placeholders. Reemplazalas con tus propias imágenes:

- Editá los `src="https://images.unsplash.com/..."` en cada HTML
- O agregá imágenes locales en `assets/images/` y referenciá con `assets/images/tu-imagen.jpg`

## Stack técnico

- **HTML5** semántico
- **Tailwind CSS 3** (vía CDN, no requiere build)
- **JavaScript nativo** (sin frameworks ni librerías)
- **Google Fonts:** Inter
- **Iconos:** SVG inline (Lucide-style)
- **Imágenes:** Unsplash (placeholders)

## Animaciones incluidas

- Fade-in al hacer scroll (`IntersectionObserver`)
- Slide-in desde izquierda/derecha
- Contadores numéricos animados
- Botones con efecto ripple
- Galería con hover scale + overlay
- Lightbox modal con fade
- Cards con hover lift
- Menú móvil animado
- Pulso en botón WhatsApp
- Chispas decorativas en hero

## Compatibilidad

- Chrome / Edge / Firefox / Safari (últimas 2 versiones)
- iOS Safari 12+
- Soporta `prefers-reduced-motion`

## Notas legales

⚠️ El template incluye **política de privacidad** y **términos y condiciones** con contenido de ejemplo. Antes de publicar el sitio en producción:

1. Hacé revisar el texto legal por un abogado
2. Adaptá las cláusulas a tu situación particular
3. Verificá el cumplimiento de la normativa aplicable (Ley 25.326 de Protección de Datos Personales en Argentina, RGPD si aplica, etc.)
4. Actualizá la fecha de "Última actualización"

## Licencia

Template de uso libre. Imágenes de Unsplash sujetas a su propia licencia.