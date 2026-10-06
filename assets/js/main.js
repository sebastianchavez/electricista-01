/**
 * VoltajeSeguro - Lógica principal del sitio
 * - Navbar scroll
 * - Menú móvil
 * - Animaciones de entrada (IntersectionObserver)
 * - Contadores animados
 * - Galería (filtros + lightbox)
 * - Render dinámico de contenido desde data.js
 * - FAQ acordeón
 * - Smooth scroll
 */

(function () {
  "use strict";

  const D = window.VS_DATA || {};

  /* =====================================================
     Navbar: sombra al hacer scroll
     ===================================================== */
  function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const onScroll = () => {
      if (window.scrollY > 30) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* =====================================================
     Menú móvil
     ===================================================== */
  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      const expanded = menu.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded);
      toggle.querySelector("svg")?.classList.toggle("rotate-180");
    });

    // Cerrar al hacer click en un link
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =====================================================
     Animaciones de entrada (IntersectionObserver)
     ===================================================== */
  function initRevealAnimations() {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  /* =====================================================
     Contadores animados
     ===================================================== */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString("es-AR") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString("es-AR") + suffix;
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-target]");
    if (!counters.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => observer.observe(el));
  }

  /* =====================================================
     Galería: filtros y lightbox
     ===================================================== */
  function initGalleryFilters() {
    const container = document.getElementById("gallery-grid");
    const buttons = document.querySelectorAll(".filter-btn");
    if (!container || !buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        container.querySelectorAll(".gallery-item").forEach((item) => {
          const cat = item.dataset.category;
          if (filter === "all" || cat === filter) {
            item.style.display = "";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 30);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.95)";
            setTimeout(() => (item.style.display = "none"), 300);
          }
        });
      });
    });
  }

  function initLightbox() {
    const container = document.getElementById("gallery-grid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");

    if (!container || !lightbox || !lightboxImg) return;

    container.addEventListener("click", (e) => {
      const item = e.target.closest(".gallery-item");
      if (!item) return;
      const img = item.querySelector("img");
      const title = item.querySelector(".gallery-title")?.textContent || "";
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      if (lightboxCaption) lightboxCaption.textContent = title;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    const close = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };

    closeBtn?.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) close();
    });
  }

  /* =====================================================
     FAQ acordeón (icons)
     ===================================================== */
  function initFAQ() {
    document.querySelectorAll("details").forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) {
          document.querySelectorAll("details").forEach((other) => {
            if (other !== d && other.open) other.open = false;
          });
        }
      });
    });
  }

  /* =====================================================
     Render dinámico: galería
     ===================================================== */
  function renderGallery() {
    const grid = document.getElementById("gallery-grid");
    if (!grid || !D.GALLERY) return;
    grid.innerHTML = D.GALLERY.map(
      (item) => `
      <div class="gallery-item reveal-scale" data-category="${item.category}">
        <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-64 object-cover">
        <div class="overlay">
          <div>
            <span class="text-xs uppercase tracking-wider text-yellow-300">${item.category}</span>
            <h4 class="gallery-title text-white font-semibold text-lg mt-1">${item.title}</h4>
          </div>
        </div>
      </div>`
    ).join("");
  }

  /* =====================================================
     Render dinámico: servicios
     ===================================================== */
  function renderServices() {
    const grid = document.getElementById("services-grid");
    if (!grid || !D.SERVICES) return;
    grid.innerHTML = D.SERVICES.map(
      (s) => `
      <div class="card-hover reveal bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col">
        <div class="w-14 h-14 rounded-xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-4">
          ${iconSVG(s.icon, "w-7 h-7")}
        </div>
        <h3 class="text-xl font-bold text-white mb-2">${s.title}</h3>
        <p class="text-neutral-400 text-sm mb-4 flex-grow">${s.description}</p>
        <ul class="space-y-2 mb-4 text-sm">
          ${s.features
            .map(
              (f) =>
                `<li class="flex items-start gap-2 text-neutral-300"><span class="text-yellow-400 mt-0.5">✓</span><span>${f}</span></li>`
            )
            .join("")}
        </ul>
        <div class="pt-4 border-t border-neutral-800 flex items-center justify-between">
          <div>
            <div class="text-xs text-neutral-500">Desde</div>
            <div class="text-yellow-400 font-bold text-lg">$${s.priceFrom.toLocaleString("es-AR")}</div>
          </div>
          <a href="contacto.html" class="text-yellow-400 text-sm font-semibold hover:underline">Cotizar →</a>
        </div>
      </div>`
    ).join("");
  }

  function renderServicesCompact() {
    const grid = document.getElementById("services-compact");
    if (!grid || !D.SERVICES) return;
    grid.innerHTML = D.SERVICES.slice(0, 3)
      .map(
        (s) => `
      <div class="card-hover reveal bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div class="w-12 h-12 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-4">
          ${iconSVG(s.icon, "w-6 h-6")}
        </div>
        <h3 class="text-lg font-bold text-white mb-2">${s.title}</h3>
        <p class="text-neutral-400 text-sm">${s.description}</p>
      </div>`
    )
      .join("");
  }

  /* =====================================================
     Render dinámico: equipo
     ===================================================== */
  function renderTeam() {
    const grid = document.getElementById("team-grid");
    if (!grid || !D.TEAM) return;
    grid.innerHTML = D.TEAM.map(
      (m) => `
      <div class="card-hover reveal bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div class="aspect-square overflow-hidden bg-neutral-800">
          <img src="${m.image}" alt="${m.name}" loading="lazy" class="w-full h-full object-cover">
        </div>
        <div class="p-6">
          <h3 class="text-lg font-bold text-white">${m.name}</h3>
          <p class="text-yellow-400 text-sm font-semibold mb-2">${m.role}</p>
          <p class="text-neutral-400 text-sm mb-3"><span class="text-neutral-500">Especialidad:</span> ${m.specialty}</p>
          <div class="flex items-center justify-between text-xs text-neutral-500 pt-3 border-t border-neutral-800">
            <span>${m.experience} exp.</span>
            <span>${m.certifications.length} certificación${m.certifications.length > 1 ? "es" : ""}</span>
          </div>
        </div>
      </div>`
    ).join("");
  }

  /* =====================================================
     Render dinámico: testimonios
     ===================================================== */
  function renderTestimonials() {
    const grid = document.getElementById("testimonials-grid");
    if (!grid || !D.TESTIMONIALS) return;
    grid.innerHTML = D.TESTIMONIALS.map(
      (t) => `
      <div class="testimonial-card card-hover reveal bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div class="flex items-center gap-3 mb-4">
          <img src="${t.avatar}" alt="${t.name}" loading="lazy" class="w-12 h-12 rounded-full object-cover">
          <div>
            <div class="text-white font-semibold">${t.name}</div>
            <div class="text-xs text-neutral-500">${t.role}</div>
          </div>
        </div>
        <div class="flex gap-1 mb-3 text-yellow-400">
          ${"★".repeat(t.rating)}
        </div>
        <p class="text-neutral-300 text-sm leading-relaxed">${t.comment}</p>
      </div>`
    ).join("");
  }

  /* =====================================================
     Render dinámico: stats
     ===================================================== */
  function renderStats() {
    const grid = document.getElementById("stats-grid");
    if (!grid || !D.STATS) return;
    grid.innerHTML = D.STATS.map(
      (s) => `
      <div class="text-center reveal-scale">
          <div class="stat-number text-5xl md:text-6xl font-extrabold mb-2">
            <span data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</span>
          </div>
          <div class="text-neutral-400 uppercase text-sm tracking-wider">${s.label}</div>
        </div>`
    ).join("");
  }

  /* =====================================================
     Render dinámico: pricing
     ===================================================== */
  function renderPricing() {
    const grid = document.getElementById("pricing-grid");
    if (!grid || !D.PRICING) return;
    grid.innerHTML = D.PRICING.map(
      (p) => `
      <div class="card-hover reveal ${p.featured ? "pricing-featured bg-neutral-900" : "bg-neutral-900"} border border-neutral-800 rounded-2xl p-8 relative">
        <div class="text-center mb-6">
          <h3 class="text-2xl font-bold text-white mb-1">${p.name}</h3>
          <p class="text-yellow-400 text-sm font-semibold mb-4">${p.tagline}</p>
          <div class="mb-2">
            ${
              p.price
                ? `<span class="text-5xl font-extrabold text-white">$${p.price.toLocaleString("es-AR")}</span>`
                : `<span class="text-3xl font-extrabold text-white">A medida</span>`
            }
          </div>
          <p class="text-neutral-500 text-sm">${p.period}</p>
        </div>
        <p class="text-neutral-400 text-sm text-center mb-6">${p.description}</p>
        <ul class="space-y-3 mb-8">
          ${p.features
            .map(
              (f) => `
            <li class="flex items-start gap-2 text-sm text-neutral-300">
              <span class="text-yellow-400 mt-0.5">✓</span><span>${f}</span>
            </li>`
            )
            .join("")}
          ${p.notIncluded
            .map(
              (f) => `
            <li class="flex items-start gap-2 text-sm text-neutral-600 line-through">
              <span class="mt-0.5">✕</span><span>${f}</span>
            </li>`
            )
            .join("")}
        </ul>
        <a href="contacto.html" class="block text-center w-full ${p.featured ? "btn-primary bg-yellow-400 text-neutral-900" : "btn-outline border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-neutral-900"} font-bold py-3 rounded-lg">
          ${p.featured ? "Elegir plan" : "Más info"}
        </a>
      </div>`
    ).join("");
  }

  /* =====================================================
     Render dinámico: cursos
     ===================================================== */
  function renderCourses() {
    const grid = document.getElementById("courses-grid");
    if (!grid || !D.COURSES) return;
    grid.innerHTML = D.COURSES.map(
      (c) => `
      <div class="course-card reveal bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col">
        <div class="bg-gradient-to-br from-yellow-400 to-yellow-500 text-neutral-900 p-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold uppercase tracking-wider bg-neutral-900/20 px-2 py-1 rounded">${c.level}</span>
            <span class="text-2xl font-extrabold">$${c.price.toLocaleString("es-AR")}</span>
          </div>
          <h3 class="text-2xl font-bold mt-2">${c.title}</h3>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <p class="text-neutral-400 text-sm mb-4">${c.description}</p>
          <div class="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div class="bg-neutral-800 rounded-lg p-3">
              <div class="text-neutral-500 text-xs">Duración</div>
              <div class="text-white font-semibold">${c.duration}</div>
            </div>
            <div class="bg-neutral-800 rounded-lg p-3">
              <div class="text-neutral-500 text-xs">Carga horaria</div>
              <div class="text-white font-semibold">${c.hours}</div>
            </div>
            <div class="bg-neutral-800 rounded-lg p-3">
              <div class="text-neutral-500 text-xs">Clases</div>
              <div class="text-white font-semibold">${c.classes}</div>
            </div>
            <div class="bg-neutral-800 rounded-lg p-3">
              <div class="text-neutral-500 text-xs">Instructor</div>
              <div class="text-white font-semibold text-xs">${c.instructor}</div>
            </div>
          </div>
          <div class="mb-4">
            <div class="text-xs text-neutral-500 mb-2 uppercase tracking-wider">Requisitos</div>
            <p class="text-sm text-neutral-300">${c.requirements}</p>
          </div>
          <div class="mb-4">
            <div class="text-xs text-neutral-500 mb-2 uppercase tracking-wider">Temario</div>
            <ul class="text-sm space-y-1">
              ${c.topics
                .map(
                  (t) =>
                    `<li class="text-neutral-300 flex items-start gap-2"><span class="text-yellow-400">•</span><span>${t}</span></li>`
                )
                .join("")}
            </ul>
          </div>
          <a href="contacto.html" class="btn-primary mt-auto block text-center bg-yellow-400 text-neutral-900 font-bold py-3 rounded-lg">
            Inscribirme
          </a>
        </div>
      </div>`
    ).join("");
  }

  /* =====================================================
     Render dinámico: proceso
     ===================================================== */
  function renderProcess() {
    const grid = document.getElementById("process-grid");
    if (!grid || !D.PROCESS) return;
    grid.innerHTML = D.PROCESS.map(
      (p) => `
      <div class="relative reveal">
        <div class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 card-hover">
          <div class="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 text-neutral-900 rounded-full flex items-center justify-center font-extrabold text-xl shadow-lg">
            ${p.step}
          </div>
          <div class="w-12 h-12 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center mb-3 ml-10">
            ${iconSVG(p.icon, "w-6 h-6")}
          </div>
          <h3 class="text-lg font-bold text-white mb-2">${p.title}</h3>
          <p class="text-neutral-400 text-sm">${p.description}</p>
        </div>
      </div>`
    ).join("");
  }

  /* =====================================================
     Render dinámico: valores
     ===================================================== */
  function renderValues() {
    const grid = document.getElementById("values-grid");
    if (!grid || !D.VALUES) return;
    grid.innerHTML = D.VALUES.map(
      (v) => `
      <div class="text-center reveal p-6">
        <div class="w-16 h-16 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-4">
          ${iconSVG(v.icon, "w-8 h-8")}
        </div>
        <h3 class="text-xl font-bold text-white mb-2">${v.title}</h3>
        <p class="text-neutral-400 text-sm">${v.description}</p>
      </div>`
    ).join("");
  }

  /* =====================================================
     Render dinámico: FAQ
     ===================================================== */
  function renderFAQ() {
    const grid = document.getElementById("faq-list");
    if (!grid || !D.FAQ) return;
    grid.innerHTML = D.FAQ.map(
      (f) => `
      <details class="reveal bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden group">
        <summary class="flex items-center justify-between p-5 cursor-pointer text-white font-semibold">
          <span>${f.question}</span>
          <span class="faq-icon text-yellow-400 text-2xl leading-none">+</span>
        </summary>
        <div class="px-5 pb-5 text-neutral-400 text-sm leading-relaxed">
          ${f.answer}
        </div>
      </details>`
    ).join("");
  }

  /* =====================================================
     Iconos SVG inline (Lucide simplificado)
     ===================================================== */
  function iconSVG(name, cls = "w-3 h-3") {
    const icons = {
      home: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      wrench: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
      zap: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      lightbulb: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>',
      cable: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9a2 2 0 0 1-2-2V5h4v2a2 2 0 0 1-2 2Z"/><path d="M20 9a2 2 0 0 0 2-2V5h-4v2a2 2 0 0 0 2 2Z"/><path d="M4 22h16"/><path d="M10 14v8"/><path d="M14 14v8"/><path d="M4 9h16v5H4z"/></svg>',
      factory: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>',
      thermometer: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>',
      "alert-triangle": '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
      shield: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
      clock: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      "badge-check": '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>',
      "heart-handshake": '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="m12 13-1.5-1.5"/><path d="m17 16-1.5-1.5"/></svg>',
      "message-circle": '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>',
      "map-pin": '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
      "file-text": '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
      "check-circle": '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      phone: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
      mail: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
      "arrow-right": '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
      menu: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
      x: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
      star: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      facebook: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.95 9-10z"/></svg>',
      instagram: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
      linkedin: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>',
      youtube: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
      whatsapp: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
      award: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
      target: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      send: '<svg class="' + cls + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
    };
    return icons[name] || "";
  }

  // Exponer para uso inline si es necesario
  window.VS_ICON = iconSVG;

  /* =====================================================
     Init
     ===================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initMobileMenu();
    initRevealAnimations();
    initCounters();
    initGalleryFilters();
    initLightbox();
    initFAQ();

    // Render dinámico según lo que exista en el DOM
    renderStats();
    renderServices();
    renderServicesCompact();
    renderTeam();
    renderTestimonials();
    renderGallery();
    renderPricing();
    renderCourses();
    renderProcess();
    renderValues();
    renderFAQ();

    // Re-aplicar observer tras renderizar contenido dinámico
    setTimeout(initRevealAnimations, 50);
    setTimeout(initCounters, 50);
  });
})();