// Theme handling
(function () {
  const htmlBody = document.body;
  const toggleBtn = document.getElementById("themeToggle");
  const preferred = localStorage.getItem("cv-theme");
  const initialTheme = preferred || (window.DEFAULT_THEME || "light");

  function applyTheme(theme) {
    if (theme === "dark") {
      htmlBody.classList.add("dark-theme");
      toggleBtn.textContent = "☀️";
    } else {
      htmlBody.classList.remove("dark-theme");
      toggleBtn.textContent = "🌙";
    }
  }

  if (toggleBtn) {
    applyTheme(initialTheme);

    toggleBtn.addEventListener("click", () => {
      const next = htmlBody.classList.contains("dark-theme") ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("cv-theme", next);
    });
  }
})();

// Smooth fade-in on scroll
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          if (entry.target.id === "skills") {
            document.body.classList.add("skills-visible");
          }
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
})();

// Simple contact form handler (no backend send, just UX)
function handleContactSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("contactStatus");
  if (!status) return false;

  status.textContent = "تم استلام رسالتك (تجريبي - قم بربط النموذج بخدمة بريدية لاحقاً).";
  status.style.color = "#16a34a";

  event.target.reset();
  return false;
}

  // ─── PDF Download ────────────────────────────────────────────────────

  const _PDF_CODE_HASH = "991df0b4d26f9622701aded9924358e74d930fa4d1cc63983c61a75d70d8b33f";

  document.addEventListener("DOMContentLoaded", function () {
    initPdfDownload();
  });

  function initPdfDownload() {
    document.addEventListener("click", function (e) {
      if (e.target.closest("#downloadCvBtn")) showPdfModal();
    });
    const modal = document.getElementById("pdfCodeModal");
    if (!modal) return;
    document.getElementById("pdfCancelBtn").addEventListener("click", hidePdfModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) hidePdfModal(); });
    document.getElementById("pdfConfirmBtn").addEventListener("click", handlePdfConfirm);
    document.getElementById("pdfCodeInput").addEventListener("keydown", function (e) {
      if (e.key === "Enter") handlePdfConfirm();
    });
  }

  function showPdfModal() {
    const modal = document.getElementById("pdfCodeModal");
    const input = document.getElementById("pdfCodeInput");
    const errorEl = document.getElementById("pdfCodeError");
    if (!modal) return;
    modal.hidden = false;
    input.value = "";
    errorEl.hidden = true;
    setTimeout(function () { input.focus(); }, 60);
  }

  function hidePdfModal() {
    const modal = document.getElementById("pdfCodeModal");
    if (modal) modal.hidden = true;
  }

  function handlePdfConfirm() {
    const input = document.getElementById("pdfCodeInput");
    const errorEl = document.getElementById("pdfCodeError");
    const code = input ? input.value.trim() : "";
    if (!code) return;
    verifyPdfCode(code).then(function (valid) {
      if (!valid) {
        if (errorEl) { errorEl.textContent = "الرمز غير صحيح، حاول مجدداً"; errorEl.hidden = false; }
        if (input) { input.value = ""; input.focus(); }
        return;
      }
      hidePdfModal();
      generateCvPdf();
    });
  }

  function verifyPdfCode(code) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(code))
      .then(function (buf) {
        const hex = Array.from(new Uint8Array(buf))
          .map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
        return hex === _PDF_CODE_HASH;
      }).catch(function () { return false; });
  }

  function generateCvPdf() {
    if (typeof html2pdf === "undefined") {
      alert("مكتبة التصدير غير متاحة، تحقق من الاتصال بالإنترنت");
      return;
    }
    const data = window.cvData;
    if (!data) { alert("البيانات غير متاحة"); return; }

    const btn = document.getElementById("downloadCvBtn");
    if (btn) btn.classList.add("loading");

    const profile = data.profile || {};
    const filename = (profile.name || "CV").replace(/\s+/g, "-") + "-CV.pdf";

    const pdfHtml = buildPdfHtmlPhp(data);
    const printWindow = window.open("", "_blank");
    if (!printWindow || printWindow.closed || typeof printWindow.closed === "undefined") {
      alert("لم يتم فتح نافذة الطباعة، يرجى السماح بالنوافذ المنبثقة");
      if (btn) btn.classList.remove("loading");
      return;
    }

    const docHtml = "<!DOCTYPE html>" +
      "<html lang=\"ar\">" +
      "<head><meta charset=\"utf-8\"><title>" + filename + "</title></head>" +
      "<body style=\"margin:0;padding:0;background:#ffffff;\">" +
      pdfHtml +
      "</body></html>";

    const finalize = function () {
      if (btn) btn.classList.remove("loading");
    };

    try {
      printWindow.document.open();
      printWindow.document.write(docHtml);
      printWindow.document.close();

      const triggerPrint = function () {
        try {
          printWindow.focus();
          printWindow.print();
        } catch (e) {
          // ignore
        }
        setTimeout(function () {
          try { printWindow.close(); } catch (e) { }
          finalize();
        }, 500);
      };

      if (printWindow.document.readyState === "complete") {
        triggerPrint();
      } else {
        printWindow.onload = triggerPrint;
      }
    } catch (e) {
      finalize();
    }
  }

  function createPdfRenderMount() {
    const mount = document.createElement("div");
    mount.style.position = "absolute";
    mount.style.left = "-100000px";
    mount.style.top = "0";
    mount.style.width = "210mm";
    mount.style.minHeight = "297mm";
    mount.style.background = "#ffffff";
    mount.style.pointerEvents = "none";
    mount.style.zIndex = "-9999";
    mount.setAttribute("aria-hidden", "true");
    document.body.appendChild(mount);
    return mount;
  }

  function destroyPdfRenderMount(mount) {
    if (mount && mount.parentNode) mount.parentNode.removeChild(mount);
  }

  function waitForPdfAssets(root) {
    const images = Array.from(root.querySelectorAll("img"));
    const imageLoads = images.map(function (img) {
      return new Promise(function (resolve) {
        if (img.complete) {
          resolve();
          return;
        }
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    });

    const fontsReady = document.fonts && document.fonts.ready
      ? document.fonts.ready.catch(function () { return null; })
      : Promise.resolve();

    return Promise.all([fontsReady].concat(imageLoads));
  }

  function pdfEscape(str) {
    return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function pdfShortUrl(val) {
    return pdfEscape(String(val || "").replace(/^https?:\/\//i, "").replace(/\/$/, ""));
  }

  function buildPdfHtmlPhp(data) {
    const dir = "rtl";
    const profile    = data.profile    || {};
    const experience = data.experience || [];
    const education  = data.education  || [];
    const skills     = data.skills     || [];
    const projects   = data.projects   || [];
    const contacts   = data.contacts   || {};

    const name     = pdfEscape(profile.name     || "");
    const title    = pdfEscape(profile.title    || "");
    const summary  = pdfEscape(profile.summary  || "").replace(/\n/g, "<br>");
    const location = pdfEscape(profile.location || "");

    const photoHtml = profile.profileImage
      ? `<img src="${pdfEscape(profile.profileImage)}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.55);flex-shrink:0;" crossorigin="anonymous" />`
      : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.18);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;font-size:2rem;">👤</div>`;

    const chips = [];
    if (contacts.email) {
      chips.push(`<a href="mailto:${pdfEscape(contacts.email)}" style="background:rgba(255,255,255,0.18);border-radius:100px;padding:2px 9px;font-size:9.5px;white-space:nowrap;text-decoration:none;color:inherit;">✉ ${pdfEscape(contacts.email)}</a>`);
    }
    if (contacts.phone) {
      const telHref = "tel:" + String(contacts.phone || "").replace(/[^0-9+]/g, "");
      chips.push(`<a href="${pdfEscape(telHref)}" style="background:rgba(255,255,255,0.18);border-radius:100px;padding:2px 9px;font-size:9.5px;white-space:nowrap;text-decoration:none;color:inherit;">📞 ${pdfEscape(contacts.phone)}</a>`);
    }
    if (contacts.linkedin) {
      chips.push(`<a href="${pdfEscape(contacts.linkedin)}" target="_blank" rel="noopener" style="background:rgba(255,255,255,0.18);border-radius:100px;padding:2px 9px;font-size:9.5px;white-space:nowrap;text-decoration:none;color:inherit;">in ${pdfShortUrl(contacts.linkedin)}</a>`);
    }
    if (contacts.github) {
      chips.push(`<a href="${pdfEscape(contacts.github)}" target="_blank" rel="noopener" style="background:rgba(255,255,255,0.18);border-radius:100px;padding:2px 9px;font-size:9.5px;white-space:nowrap;text-decoration:none;color:inherit;">⌂ ${pdfShortUrl(contacts.github)}</a>`);
    }

    const sS = `margin-bottom:18px;direction:${dir};`;
    const tS = "font-size:12.5px;font-weight:700;color:#1e40af;border-bottom:2px solid #bfdbfe;padding-bottom:4px;margin-bottom:10px;letter-spacing:0.04em;";

    const expItems = experience.map(function (item) {
      return `<div style="display:flex;gap:10px;margin-bottom:11px;">
        <div style="width:7px;height:7px;border-radius:50%;background:#2563eb;margin-top:5px;flex-shrink:0;"></div>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:11.5px;color:#1e293b;">${pdfEscape(item.role||"")}</div>
          <div style="font-size:10.5px;color:#2563eb;margin-bottom:2px;">${pdfEscape(item.company||"")} <span style="color:#94a3b8;"> · ${pdfEscape(item.period||"")}</span></div>
          ${item.description ? `<div style="font-size:10.5px;color:#475569;line-height:1.7;">${pdfEscape(item.description).replace(/\n/g,"<br>")}</div>` : ""}
        </div></div>`;
    }).join("");

    const eduItems = education.map(function (item) {
      return `<div style="display:flex;gap:10px;margin-bottom:11px;">
        <div style="width:7px;height:7px;border-radius:50%;background:#0ea5e9;margin-top:5px;flex-shrink:0;"></div>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:11.5px;color:#1e293b;">${pdfEscape(item.degree||"")}</div>
          <div style="font-size:10.5px;color:#0ea5e9;margin-bottom:2px;">${pdfEscape(item.institution||"")} <span style="color:#94a3b8;"> · ${pdfEscape(item.period||"")}</span></div>
          ${item.description ? `<div style="font-size:10.5px;color:#475569;line-height:1.7;">${pdfEscape(item.description).replace(/\n/g,"<br>")}</div>` : ""}
        </div></div>`;
    }).join("");

    const skillItems = skills.map(function (skill) {
      const lvl = Math.max(0, Math.min(100, Number(skill.level) || 0));
      return `<div style="margin-bottom:7px;">
        <div style="display:flex;justify-content:space-between;font-size:10.5px;margin-bottom:3px;">
          <span style="font-weight:600;color:#1e293b;">${pdfEscape(skill.name||"")}</span>
          <span style="color:#94a3b8;">${lvl}%</span>
        </div>
        <div style="height:5px;background:#e2e8f0;border-radius:100px;">
          <div style="height:5px;background:linear-gradient(90deg,#1e40af,#3b82f6);border-radius:100px;width:${lvl}%;"></div>
        </div></div>`;
    }).join("");

    const projectItems = projects.map(function (p) {
      return `<div style="margin-bottom:10px;">
        <div style="font-weight:700;font-size:11px;color:#1e293b;">${pdfEscape(p.title||"")}</div>
        ${p.description ? `<div style="font-size:10px;color:#475569;line-height:1.6;">${pdfEscape(p.description).replace(/\n/g,"<br>")}</div>` : ""}
        ${p.link ? `<div style="font-size:9.5px;color:#2563eb;margin-top:2px;"><a href="${pdfEscape(p.link)}" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:none;">${pdfEscape(p.link)}</a></div>` : ""}
      </div>`;
    }).join("");

    const socialIcons = [];
    if (contacts.linkedin) {
      socialIcons.push(`<a href="${pdfEscape(contacts.linkedin)}" target="_blank" rel="noopener" style="width:22px;height:22px;border-radius:999px;background:#1d4ed8;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;text-decoration:none;">in</a>`);
    }
    if (contacts.github) {
      socialIcons.push(`<a href="${pdfEscape(contacts.github)}" target="_blank" rel="noopener" style="width:22px;height:22px;border-radius:999px;background:#0f172a;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;text-decoration:none;">GH</a>`);
    }
    if (contacts.phone) {
      const telFooter = "tel:" + String(contacts.phone || "").replace(/[^0-9+]/g, "");
      socialIcons.push(`<a href="${pdfEscape(telFooter)}" style="width:22px;height:22px;border-radius:999px;background:#16a34a;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;text-decoration:none;">☎</a>`);
    }
    if (contacts.email) {
      socialIcons.push(`<a href="mailto:${pdfEscape(contacts.email)}" style="width:22px;height:22px;border-radius:999px;background:#f97316;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;text-decoration:none;">✉</a>`);
    }

    const socialSection = socialIcons.length
      ? `<div style="margin-top:6px;text-align:center;direction:${dir};">
           <div style="font-size:10px;color:#64748b;margin-bottom:4px;">روابط التواصل</div>
           <div style="display:inline-flex;gap:6px;">${socialIcons.join("")}</div>
         </div>`
      : "";

    const year = new Date().getFullYear();
    return `
    <style>
      @page { size: A4 portrait; margin: 8mm 10mm; }
      .pdf-root { font-family: 'Cairo', sans-serif; background: #ffffff; color: #1e293b; font-size: 13px; line-height: 1.65; width: 100%; }
      .pdf-content { padding: 18px 18px 22px; }
      .pdf-section { margin-bottom: 18px; page-break-inside: avoid; break-inside: avoid; }
      .pdf-footer { margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 9.5px; color: #94a3b8; text-align: center; }
    </style>
    <div class="pdf-root" dir="rtl">
      <div style="background:linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 100%);color:#fff;padding:26px 32px;display:flex;align-items:center;gap:20px;direction:rtl;">
        ${photoHtml}
        <div style="flex:1;direction:rtl;">
          <div style="font-size:24px;font-weight:700;margin-bottom:4px;">${name}</div>
          <div style="font-size:13px;opacity:0.9;margin-bottom:4px;">${title}</div>
          <div style="font-size:11px;opacity:0.8;margin-bottom:10px;">📍 ${location}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;">${chips.join("")}</div>
        </div>
      </div>
      <div class="pdf-content">
        ${summary ? `<div class="pdf-section" style="${sS}"><div style="${tS}">نبذة مختصرة</div><div style="font-size:11.5px;color:#475569;line-height:1.8;">${summary}</div></div>` : ""}
        ${experience.length ? `<div class="pdf-section" style="${sS}"><div style="${tS}">الخبرات العملية</div>${expItems}</div>` : ""}
        ${education.length  ? `<div class="pdf-section" style="${sS}"><div style="${tS}">التعليم</div>${eduItems}</div>` : ""}
        ${skills.length     ? `<div class="pdf-section" style="${sS}"><div style="${tS}">المهارات</div><div style="column-count:2;column-gap:22px;">${skillItems}</div></div>` : ""}
        ${projects.length   ? `<div class="pdf-section" style="${sS}"><div style="${tS}">المشاريع والأعمال</div>${projectItems}</div>` : ""}
        <div class="pdf-footer" style="direction:rtl;">
          ${socialSection}
          <div style="margin-top:6px;">© ${year} ${name} - جميع الحقوق محفوظة</div>
        </div>
      </div>
    </div>`;
  }
