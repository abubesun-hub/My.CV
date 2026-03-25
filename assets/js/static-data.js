// تحميل البيانات من ملف JSON وبناء الصفحة (للاستخدام على GitHub Pages)

let cvData = null;
let currentLang = "ar";

const uiText = {
  ar: {
    logo: "السيرة الذاتية",
    navExperience: "الخبرات",
    navEducation: "التعليم",
    navSkills: "المهارات",
    navProjects: "المشاريع",
    navContact: "التواصل",
    sectionExperience: "الخبرات العملية",
    sectionEducation: "التعليم",
    sectionSkills: "المهارات",
    sectionProjects: "المشاريع والأعمال",
    sectionContact: "التواصل",
    heroDownload: "تحميل السيرة الذاتية PDF",
    heroContact: "تواصل معي",
    contactName: "الاسم",
    contactEmail: "البريد الإلكتروني",
    contactMessage: "الرسالة",
    contactSend: "إرسال",
    placeholderExperience: "لم يتم إضافة خبرات بعد.",
    placeholderEducation: "لم يتم إضافة تعليم بعد.",
    placeholderSkills: "لم يتم إضافة مهارات بعد.",
    placeholderProjects: "لم يتم إضافة مشاريع بعد.",
    contactLabelEmail: "البريد:",
    contactLabelPhone: "الهاتف:",
    contactLabelWhatsapp: "واتساب:",
    contactLabelLinkedin: "لينكدإن:",
    contactLabelGithub: "جيت هاب:",
    footerSuffix: " - جميع الحقوق محفوظة."
  },
  en: {
    logo: "Curriculum Vitae",
    navExperience: "Experience",
    navEducation: "Education",
    navSkills: "Skills",
    navProjects: "Projects",
    navContact: "Contact",
    sectionExperience: "Work Experience",
    sectionEducation: "Education",
    sectionSkills: "Skills",
    sectionProjects: "Projects & Portfolio",
    sectionContact: "Contact",
    heroDownload: "Download CV (PDF)",
    heroContact: "Contact Me",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactSend: "Send",
    placeholderExperience: "No experience added yet.",
    placeholderEducation: "No education entries yet.",
    placeholderSkills: "No skills added yet.",
    placeholderProjects: "No projects added yet.",
    contactLabelEmail: "Email:",
    contactLabelPhone: "Phone:",
    contactLabelWhatsapp: "WhatsApp:",
    contactLabelLinkedin: "LinkedIn:",
    contactLabelGithub: "GitHub:",
    footerSuffix: " - All rights reserved."
  }
};

function t(lang, key) {
  const l = uiText[lang] ? lang : "ar";
  return (uiText[l] && uiText[l][key]) || (uiText.ar && uiText.ar[key]) || "";
}

document.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("cv-lang");
  if (stored === "en" || stored === "ar") {
    currentLang = stored;
  }

  fetch("data/data.json")
    .then((res) => res.json())
    .then((data) => {
      cvData = data;
      applyDefaultTheme((data.settings || {}).defaultTheme);
      applyLanguage(currentLang);
      initLanguageSwitch();
    })
    .catch(() => {
      // في حال فشل التحميل نضبط فقط اللغة للواجهة الثابتة
      applyLanguage(currentLang);
      initLanguageSwitch();
    });
});

function initLanguageSwitch() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;

  const updateLabel = () => {
    btn.textContent = currentLang === "en" ? "EN" : "AR";
  };

  updateLabel();

  btn.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("cv-lang", currentLang);
    applyLanguage(currentLang);
    updateLabel();
  });
}

function applyLanguage(lang) {
  const language = lang === "en" ? "en" : "ar";
  currentLang = language;
  window.CV_LANG = language;

  document.documentElement.lang = language === "en" ? "en" : "ar";
  document.documentElement.dir = language === "en" ? "ltr" : "rtl";
  document.body.classList.toggle("lang-en", language === "en");
  document.body.classList.toggle("lang-ar", language === "ar");

  applyUiText(language);

  if (!cvData) return;

  buildProfile(cvData.profile || {}, language);
  buildExperience(cvData.experience || [], language);
  buildEducation(cvData.education || [], language);
  buildSkills(cvData.skills || [], language);
  buildProjects(cvData.projects || [], language);
  buildContacts(cvData.contacts || {}, language);
  updateFooter(cvData.profile || {}, language);
}

function applyUiText(lang) {
  const logoEl = document.getElementById("navLogo");
  const navExperience = document.getElementById("navExperience");
  const navEducation = document.getElementById("navEducation");
  const navSkills = document.getElementById("navSkills");
  const navProjects = document.getElementById("navProjects");
  const navContact = document.getElementById("navContact");
  const titleExperience = document.getElementById("titleExperience");
  const titleEducation = document.getElementById("titleEducation");
  const titleSkills = document.getElementById("titleSkills");
  const titleProjects = document.getElementById("titleProjects");
  const titleContact = document.getElementById("titleContact");
  const btnDownloadCv = document.getElementById("btnDownloadCv");
  const btnHeroContact = document.getElementById("btnHeroContact");
  const labelName = document.getElementById("labelName");
  const labelEmail = document.getElementById("labelEmail");
  const labelMessage = document.getElementById("labelMessage");
  const btnSend = document.getElementById("btnSend");

  if (logoEl) logoEl.textContent = t(lang, "logo");
  if (navExperience) navExperience.textContent = t(lang, "navExperience");
  if (navEducation) navEducation.textContent = t(lang, "navEducation");
  if (navSkills) navSkills.textContent = t(lang, "navSkills");
  if (navProjects) navProjects.textContent = t(lang, "navProjects");
  if (navContact) navContact.textContent = t(lang, "navContact");
  if (titleExperience) titleExperience.textContent = t(lang, "sectionExperience");
  if (titleEducation) titleEducation.textContent = t(lang, "sectionEducation");
  if (titleSkills) titleSkills.textContent = t(lang, "sectionSkills");
  if (titleProjects) titleProjects.textContent = t(lang, "sectionProjects");
  if (titleContact) titleContact.textContent = t(lang, "sectionContact");
  if (btnDownloadCv) btnDownloadCv.textContent = t(lang, "heroDownload");
  if (btnHeroContact) btnHeroContact.textContent = t(lang, "heroContact");
  if (labelName) labelName.textContent = t(lang, "contactName");
  if (labelEmail) labelEmail.textContent = t(lang, "contactEmail");
  if (labelMessage) labelMessage.textContent = t(lang, "contactMessage");
  if (btnSend) btnSend.textContent = t(lang, "contactSend");
}

function buildProfile(profile, lang) {
  const nameEl = document.getElementById("profileName");
  const titleEl = document.getElementById("profileTitle");
  const summaryEl = document.getElementById("profileSummary");
  const locationEl = document.getElementById("profileLocation");
  const imageEl = document.getElementById("profileImage");

  const nameValue = lang === "en" && profile.name_en ? profile.name_en : profile.name;
  const titleValue = lang === "en" && profile.title_en ? profile.title_en : profile.title;
  const summaryValue = lang === "en" && profile.summary_en ? profile.summary_en : profile.summary;
  const locationValue = lang === "en" && profile.location_en ? profile.location_en : profile.location;

  if (nameValue) nameEl.textContent = nameValue;
  if (titleValue) titleEl.textContent = titleValue;
  if (summaryValue) summaryEl.textContent = summaryValue;
  if (locationValue) locationEl.textContent = locationValue;
  if (profile.profileImage) imageEl.src = profile.profileImage;
}

function buildExperience(experience, lang) {
  const container = document.getElementById("experienceContainer");
  if (!container) return;

  if (!experience.length) {
    container.innerHTML = `<p class="placeholder">${t(lang, "placeholderExperience")}</p>`;
    return;
  }

  const timeline = document.createElement("div");
  timeline.className = "timeline";

  experience.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "timeline-item";

    const period = item.period || "";
    const role = lang === "en" && item.role_en ? item.role_en : item.role || "";
    const company = lang === "en" && item.company_en ? item.company_en : item.company || "";
    const description = lang === "en" && item.description_en ? item.description_en : item.description || "";

    wrapper.innerHTML = `
      <div class="timeline-date">${escapeHtml(period)}</div>
      <div class="timeline-content">
        <h4>${escapeHtml(role)}</h4>
        <p class="company">${escapeHtml(company)}</p>
        <p>${formatMultiline(description)}</p>
      </div>
    `;

    timeline.appendChild(wrapper);
  });

  container.innerHTML = "";
  container.appendChild(timeline);
}

function buildEducation(education, lang) {
  const container = document.getElementById("educationContainer");
  if (!container) return;

  if (!education.length) {
    container.innerHTML = `<p class="placeholder">${t(lang, "placeholderEducation")}</p>`;
    return;
  }

  const timeline = document.createElement("div");
  timeline.className = "timeline";

  education.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "timeline-item";

    const period = lang === "en" && item.period_en ? item.period_en : item.period || "";
    const degree = lang === "en" && item.degree_en ? item.degree_en : item.degree || "";
    const institution =
      lang === "en" && item.institution_en ? item.institution_en : item.institution || "";
    const description =
      lang === "en" && item.description_en ? item.description_en : item.description || "";

    wrapper.innerHTML = `
      <div class="timeline-date">${escapeHtml(period)}</div>
      <div class="timeline-content">
        <h4>${escapeHtml(degree)}</h4>
        <p class="company">${escapeHtml(institution)}</p>
        <p>${formatMultiline(description)}</p>
      </div>
    `;

    timeline.appendChild(wrapper);
  });

  container.innerHTML = "";
  container.appendChild(timeline);
}

function buildSkills(skills, lang) {
  const container = document.getElementById("skillsContainer");
  if (!container) return;

  if (!skills.length) {
    container.innerHTML = `<p class="placeholder">${t(lang, "placeholderSkills")}</p>`;
    return;
  }

  container.innerHTML = "";

  skills.forEach((skill) => {
    const level = Number(skill.level || 0);
    const clamped = isNaN(level) ? 0 : Math.max(0, Math.min(100, level));

    const name = lang === "en" && skill.name_en ? skill.name_en : skill.name || "";

    const div = document.createElement("div");
    div.className = "skill";
    div.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${escapeHtml(name)}</span>
        <span class="skill-level">${clamped}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-bar-fill" style="width: ${clamped}%"></div>
      </div>
    `;

    container.appendChild(div);
  });
}

function buildProjects(projects, lang) {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  if (!projects.length) {
    container.innerHTML = `<p class="placeholder">${t(lang, "placeholderProjects")}</p>`;
    return;
  }

  container.innerHTML = "";

  projects.forEach((project) => {
    const title = lang === "en" && project.title_en ? project.title_en : project.title || "";
    const description =
      lang === "en" && project.description_en ? project.description_en : project.description || "";

    const article = document.createElement("article");
    article.className = "project-card";

    const imagePart = project.image
      ? `<img src="${escapeAttribute(project.image)}" alt="${escapeAttribute(title)}" />`
      : "";

    const linkLabel = lang === "en" ? "View Project" : "عرض المشروع";

    const linkPart = project.link
      ? `<a href="${escapeAttribute(project.link)}" target="_blank" class="project-link">${linkLabel}</a>`
      : "";

    article.innerHTML = `
      ${imagePart}
      <div class="project-content">
        <h4>${escapeHtml(title)}</h4>
        <p>${formatMultiline(description)}</p>
        ${linkPart}
      </div>
    `;

    container.appendChild(article);
  });
}

function buildContacts(contacts, lang) {
  const list = document.getElementById("contactsList");
  if (!list) return;

  const items = [];

  if (contacts.email) {
    items.push(
      `<li><strong>${t(lang, "contactLabelEmail")}</strong> <a href="mailto:${escapeAttribute(
        contacts.email
      )}">${escapeHtml(contacts.email)}</a></li>`
    );
  }

  if (contacts.phone) {
    items.push(
      `<li><strong>${t(lang, "contactLabelPhone")}</strong> <a href="tel:${escapeAttribute(
        contacts.phone
      )}">${escapeHtml(contacts.phone)}</a></li>`
    );
  }

  if (contacts.whatsapp) {
    items.push(
      `<li><strong>${t(lang, "contactLabelWhatsapp")}</strong> <a href="https://wa.me/${escapeAttribute(
        contacts.whatsapp
      )}" target="_blank">WhatsApp</a></li>`
    );
  }

  if (contacts.linkedin) {
    items.push(
      `<li><strong>${t(lang, "contactLabelLinkedin")}</strong> <a href="${escapeAttribute(
        contacts.linkedin
      )}" target="_blank">Profile</a></li>`
    );
  }

  if (contacts.github) {
    items.push(
      `<li><strong>${t(lang, "contactLabelGithub")}</strong> <a href="${escapeAttribute(
        contacts.github
      )}" target="_blank">Account</a></li>`
    );
  }

  list.innerHTML = items.join("");
}

function applyDefaultTheme(defaultTheme) {
  // main.js يستخدم window.DEFAULT_THEME إذا وُجد
  if (defaultTheme === "dark" || defaultTheme === "light") {
    window.DEFAULT_THEME = defaultTheme;
  }
}

function updateFooter(profile, lang) {
  const yearEl = document.getElementById("footerYear");
  const footerText = document.getElementById("footerText");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (footerText && profile.name) {
    const nameValue = lang === "en" && profile.name_en ? profile.name_en : profile.name;
    footerText.innerHTML = `© <span id="footerYear">${new Date().getFullYear()}</span> ${escapeHtml(
      nameValue || ""
    )}${t(lang, "footerSuffix")}`;
  }
}

function formatMultiline(text) {
  const safe = escapeHtml(text || "");
  return safe.replace(/\n/g, "<br>");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(str) {
  return escapeHtml(str).replace(/"/g, "&quot;");
}
