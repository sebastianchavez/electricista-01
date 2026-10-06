/**
 * VoltajeSeguro - Validación y envío del formulario
 * - Validación en vivo (blur/input)
 * - Simulación de envío con feedback visual
 * - Toast de éxito/error
 */

(function () {
  "use strict";

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel));
  }

  const RULES = {
    required: (v) => v.trim() !== "",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    phone: (v) => v.trim() === "" || /^[0-9\s+\-()]{6,}$/.test(v.trim()),
    minLength: (v, n) => v.trim().length >= n,
  };

  const MESSAGES = {
    required: "Este campo es obligatorio",
    email: "Ingresá un email válido",
    phone: "Ingresá un teléfono válido",
    minLength: "El mensaje es demasiado corto",
  };

  function validateField(field) {
    const value = field.value || "";
    const type = field.type;
    const tagName = field.tagName.toLowerCase();
    let valid = true;
    let msg = "";

    // required
    if (field.hasAttribute("required") && !RULES.required(value)) {
      valid = false;
      msg = MESSAGES.required;
    }
    // email
    else if (type === "email" && value && !RULES.email(value)) {
      valid = false;
      msg = MESSAGES.email;
    }
    // phone (opcional)
    else if (type === "tel" && value && !RULES.phone(value)) {
      valid = false;
      msg = MESSAGES.phone;
    }
    // minlength
    else if (field.dataset.minLength && value && !RULES.minLength(value, parseInt(field.dataset.minLength, 10))) {
      valid = false;
      msg = MESSAGES.minLength;
    }

    const group = field.closest(".form-group");
    if (group) {
      group.classList.toggle("error", !valid);
      const errEl = group.querySelector(".error-message");
      if (errEl) errEl.textContent = msg;
    }
    field.classList.toggle("error", !valid);
    return valid;
  }

  function initForm() {
    const form = $("#contact-form");
    if (!form) return;

    // Validación en blur
    $$("[data-validate]", form).forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".form-group")?.classList.contains("error")) {
          validateField(field);
        }
      });
    });

    // Submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fields = $$("[data-validate]", form);
      let allValid = true;
      fields.forEach((f) => {
        if (!validateField(f)) allValid = false;
      });

      if (!allValid) {
        showToast("Revisá los campos marcados en rojo", "error");
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML =
        '<svg class="animate-spin w-5 h-5 mr-2 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg> Enviando...';

      // Simulación de envío
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        form.reset();
        showToast("¡Mensaje enviado con éxito! Te responderemos a la brevedad.", "success");
      }, 1600);
    });
  }

  function showToast(message, type = "success") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    const color = type === "success" ? "border-yellow-400" : "border-red-400";
    toast.classList.add(type === "success" ? color : color.replace("yellow", "4"));
    toast.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-2xl">${type === "success" ? "✓" : "⚠"}</span>
        <p class="text-white text-sm flex-1">${message}</p>
      </div>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  document.addEventListener("DOMContentLoaded", initForm);
})();