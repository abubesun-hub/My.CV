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
    pageTitle: "الصفحة التعريفية لـ أحمد حسين علي",
    pdfDownloadLabel: "تحميل السيرة الذاتية PDF",
    pdfModalTitle: "أدخل رمز التحميل",
    pdfModalPlaceholder: "الرمز السري",
    pdfModalError: "الرمز غير صحيح، حاول مجدداً",
    pdfModalConfirm: "تحميل PDF",
    pdfModalCancel: "إلغاء",
    sectionContact: "التواصل",
    heroContact: "تواصل معي",
    socialBarTitle: "تابعني على المنصات",
    placeholderExperience: "لم يتم إضافة خبرات بعد.",
    placeholderEducation: "لم يتم إضافة تعليم بعد.",
    placeholderSkills: "لم يتم إضافة مهارات بعد.",
    placeholderProjects: "لم يتم إضافة مشاريع بعد.",
    contactLabelEmail: "البريد الإلكتروني",
    contactLabelPhone: "الهاتف",
    contactLabelWhatsapp: "واتساب",
    contactLabelLinkedin: "لينكدإن",
    contactLabelGithub: "جيت هاب",
    contactActionEmail: "أرسل بريد",
    contactActionPhone: "اتصال مباشر",
    contactActionWhatsapp: "مراسلة",
    contactActionLinkedin: "عرض الملف",
    contactActionGithub: "زيارة الحساب",
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
    pageTitle: "Ahmed Hussien Ali - Personal Profile",
    pdfDownloadLabel: "Download CV as PDF",
    pdfModalTitle: "Enter Download Code",
    pdfModalPlaceholder: "Secret code",
    pdfModalError: "Incorrect code, please try again",
    pdfModalConfirm: "Download PDF",
    pdfModalCancel: "Cancel",
    sectionContact: "Contact",
    heroContact: "Contact Me",
    socialBarTitle: "Follow me on social platforms",
    placeholderExperience: "No experience added yet.",
    placeholderEducation: "No education entries yet.",
    placeholderSkills: "No skills added yet.",
    placeholderProjects: "No projects added yet.",
    contactLabelEmail: "Email",
    contactLabelPhone: "Phone",
    contactLabelWhatsapp: "WhatsApp",
    contactLabelLinkedin: "LinkedIn",
    contactLabelGithub: "GitHub",
    contactActionEmail: "Send Email",
    contactActionPhone: "Call Now",
    contactActionWhatsapp: "Start Chat",
    contactActionLinkedin: "Open Profile",
    contactActionGithub: "Visit Account",
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
      initPdfDownload();
    })
    .catch(() => {
      // في حال فشل التحميل نضبط فقط اللغة للواجهة الثابتة
      applyLanguage(currentLang);
      initLanguageSwitch();
      initPdfDownload();
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
  const btnHeroContact = document.getElementById("btnHeroContact");
  const socialBarTitle = document.getElementById("socialBarTitle");

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
  if (btnHeroContact) btnHeroContact.textContent = t(lang, "heroContact");
  if (socialBarTitle) socialBarTitle.textContent = t(lang, "socialBarTitle");
  document.title = t(lang, "pageTitle");
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
    const description =
      lang === "en" && skill.description_en
        ? skill.description_en
        : skill.description || "";

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
      ${description ? `<p class="skill-description">${escapeHtml(description)}</p>` : ""}
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
  const socialBar = document.getElementById("socialIconsBar");
  if (!list || !socialBar) return;

  const cards = [];

  if (contacts.email) {
    cards.push(
      `<li class="contact-card"><span class="contact-label">${t(lang, "contactLabelEmail")}</span><a href="mailto:${escapeAttribute(
        contacts.email
      )}" class="contact-value">${escapeHtml(contacts.email)}</a><a href="mailto:${escapeAttribute(
        contacts.email
      )}" class="contact-action">${t(lang, "contactActionEmail")}</a></li>`
    );
  }

  if (contacts.phone) {
    cards.push(
      `<li class="contact-card"><span class="contact-label">${t(lang, "contactLabelPhone")}</span><a href="tel:${escapeAttribute(
        contacts.phone
      )}" class="contact-value">${escapeHtml(contacts.phone)}</a><a href="tel:${escapeAttribute(
        contacts.phone
      )}" class="contact-action">${t(lang, "contactActionPhone")}</a></li>`
    );
  }

  if (contacts.whatsapp) {
    const whatsappNumber = normalizeWhatsapp(contacts.whatsapp);
    cards.push(
      `<li class="contact-card"><span class="contact-label">${t(lang, "contactLabelWhatsapp")}</span><a href="https://wa.me/${escapeAttribute(
        whatsappNumber
      )}" target="_blank" class="contact-value">${escapeHtml(contacts.whatsapp)}</a><a href="https://wa.me/${escapeAttribute(
        whatsappNumber
      )}" target="_blank" class="contact-action">${t(lang, "contactActionWhatsapp")}</a></li>`
    );
  }

  if (contacts.linkedin) {
    cards.push(
      `<li class="contact-card"><span class="contact-label">${t(lang, "contactLabelLinkedin")}</span><a href="${escapeAttribute(
        contacts.linkedin
      )}" target="_blank" class="contact-value">${shortUrl(contacts.linkedin)}</a><a href="${escapeAttribute(
        contacts.linkedin
      )}" target="_blank" class="contact-action">${t(lang, "contactActionLinkedin")}</a></li>`
    );
  }

  if (contacts.github) {
    cards.push(
      `<li class="contact-card"><span class="contact-label">${t(lang, "contactLabelGithub")}</span><a href="${escapeAttribute(
        contacts.github
      )}" target="_blank" class="contact-value">${shortUrl(contacts.github)}</a><a href="${escapeAttribute(
        contacts.github
      )}" target="_blank" class="contact-action">${t(lang, "contactActionGithub")}</a></li>`
    );
  }

  list.innerHTML = cards.join("");

  const socialDefaults = {
    linkedin: contacts.linkedin || "",
    whatsapp: contacts.whatsapp ? `https://wa.me/${normalizeWhatsapp(contacts.whatsapp)}` : "",
    github: contacts.github || ""
  };

  const socialLinks = {
    ...socialDefaults,
    ...(contacts.socialLinks || {})
  };

  const socialPlatforms = [
    { key: "facebook", label: "Facebook", icon: "M18.896 0H1.104A1.104 1.104 0 000 1.104v17.792A1.104 1.104 0 001.104 20H10.68v-7.74H8.078V9.235h2.602V7.01c0-2.577 1.574-3.98 3.872-3.98 1.1 0 2.045.082 2.32.118v2.69h-1.592c-1.248 0-1.49.593-1.49 1.463v1.934h2.98l-.388 3.025H13.79V20h5.106A1.104 1.104 0 0020 18.896V1.104A1.104 1.104 0 0018.896 0z" },
    { key: "instagram", label: "Instagram", icon: "M10 0C7.284 0 6.944.012 5.88.06c-1.062.049-1.786.217-2.42.463a4.893 4.893 0 00-1.768 1.15A4.893 4.893 0 00.54 3.46C.294 4.094.126 4.818.077 5.88.03 6.944.018 7.284.018 10c0 2.716.012 3.056.059 4.12.049 1.062.217 1.786.463 2.42a4.893 4.893 0 001.15 1.768 4.893 4.893 0 001.768 1.15c.634.246 1.358.414 2.42.463 1.064.047 1.404.059 4.12.059 2.716 0 3.056-.012 4.12-.059 1.062-.049 1.786-.217 2.42-.463a5.01 5.01 0 002.918-2.918c.246-.634.414-1.358.463-2.42.047-1.064.059-1.404.059-4.12 0-2.716-.012-3.056-.059-4.12-.049-1.062-.217-1.786-.463-2.42A4.89 4.89 0 0018.327 1.69a4.893 4.893 0 00-1.768-1.15c-.634-.246-1.358-.414-2.42-.463C13.074.012 12.734 0 10 0zm0 1.802c2.671 0 2.987.01 4.038.057.972.044 1.5.207 1.85.344.464.181.795.398 1.143.746.348.348.565.679.746 1.143.137.35.3.878.344 1.85.047 1.051.057 1.367.057 4.038 0 2.671-.01 2.987-.057 4.038-.044.972-.207 1.5-.344 1.85a3.09 3.09 0 01-.746 1.143 3.09 3.09 0 01-1.143.746c-.35.137-.878.3-1.85.344-1.051.047-1.367.057-4.038.057-2.671 0-2.987-.01-4.038-.057-.972-.044-1.5-.207-1.85-.344a3.09 3.09 0 01-1.143-.746 3.09 3.09 0 01-.746-1.143c-.137-.35-.3-.878-.344-1.85C1.812 12.987 1.802 12.671 1.802 10c0-2.671.01-2.987.057-4.038.044-.972.207-1.5.344-1.85.181-.464.398-.795.746-1.143.348-.348.679-.565 1.143-.746.35-.137.878-.3 1.85-.344C7.013 1.812 7.329 1.802 10 1.802zm0 3.069A5.129 5.129 0 004.871 10 5.129 5.129 0 0010 15.129 5.129 5.129 0 0015.129 10 5.129 5.129 0 0010 4.871zm0 8.456A3.327 3.327 0 016.673 10 3.327 3.327 0 0110 6.673 3.327 3.327 0 0113.327 10 3.327 3.327 0 0110 13.327zm5.33-8.596a1.198 1.198 0 10.001 2.396 1.198 1.198 0 00-.001-2.396z" },
    { key: "x", label: "X", icon: "M15.75 0h3.067l-6.7 7.657L20 20h-6.266l-4.906-6.41L3.219 20H.15l7.165-8.19L0 0h6.425l4.434 5.86L15.75 0zm-1.076 18.141h1.699L5.502 1.761H3.68L14.674 18.14z" },
    { key: "youtube", label: "YouTube", icon: "M19.582 3.46A2.5 2.5 0 0017.82 1.7C16.264 1.286 10 1.286 10 1.286s-6.264 0-7.82.414A2.5 2.5 0 00.418 3.46 26.12 26.12 0 000 10a26.12 26.12 0 00.418 6.54 2.5 2.5 0 001.762 1.76c1.556.414 7.82.414 7.82.414s6.264 0 7.82-.414a2.5 2.5 0 001.762-1.76A26.12 26.12 0 0020 10a26.12 26.12 0 00-.418-6.54zM8 14V6l6 4-6 4z" },
    { key: "tiktok", label: "TikTok", icon: "M14.5 0h-3v13.5a2.5 2.5 0 11-2.5-2.5c.277 0 .545.045.797.126V8.02A5.5 5.5 0 103.5 13.5V3h3c.69 2.044 2.613 3.5 4.9 3.5V3.5A2.5 2.5 0 0114.5 0z" },
    { key: "snapchat", label: "Snapchat", icon: "M10 1.3c1.771 0 3.138 1.274 3.138 3.15v1.296c0 .57.201 1.045.612 1.454.285.284.587.42.964.42.183 0 .349-.03.483-.08.224-.09.396-.137.532-.137.27 0 .463.178.463.447 0 .212-.132.398-.385.551-.478.29-1.073.44-1.753.44-.149 0-.296-.008-.442-.024.35.711.805 1.31 1.366 1.796.68.586 1.47 1.006 2.37 1.258.296.083.438.249.438.503 0 .223-.123.39-.367.493-.824.348-1.65.532-2.48.552-.27 1.148-1.243 1.932-2.93 2.348-.52.127-1.027.193-1.52.193-.495 0-1.001-.066-1.521-.193-1.687-.416-2.66-1.2-2.93-2.348-.83-.02-1.657-.204-2.48-.552-.244-.103-.367-.27-.367-.493 0-.254.142-.42.438-.503.9-.252 1.69-.672 2.37-1.258.56-.486 1.016-1.085 1.366-1.796a4.2 4.2 0 01-.442.024c-.68 0-1.275-.15-1.753-.44-.253-.153-.385-.34-.385-.551 0-.269.193-.447.463-.447.136 0 .308.047.532.137.134.05.3.08.483.08.377 0 .679-.136.964-.42.41-.409.612-.884.612-1.454V4.45C6.862 2.574 8.229 1.3 10 1.3z" },
    { key: "telegram", label: "Telegram", icon: "M19.944 2.043L16.88 17.74c-.23 1.11-.83 1.385-1.68.864l-4.64-3.42-2.24 2.154c-.247.247-.454.454-.93.454l.332-4.714 8.58-7.75c.373-.332-.08-.517-.58-.185l-10.61 6.68-4.57-1.426c-.995-.31-1.013-.995.207-1.473L18.94.532c.86-.31 1.61.185 1.334 1.51z" },
    { key: "linkedin", label: "LinkedIn", icon: "M4.98 3.5C4.98 5.157 3.657 6.5 2 6.5S-.98 5.157-.98 3.5 0.343.5 2 .5s2.98 1.343 2.98 3zM.5 8h3V20h-3V8zm6 0h2.877v1.71h.041c.401-.76 1.381-1.56 2.844-1.56C15.304 8.15 16 10.154 16 12.77V20h-3v-6.419c0-1.531-.027-3.499-2.132-3.499-2.135 0-2.462 1.667-2.462 3.387V20h-3V8z" },
    { key: "whatsapp", label: "WhatsApp", icon: "M17.472 2.523A9.84 9.84 0 0010.041 0C4.495 0 0 4.496 0 10.042a10.01 10.01 0 001.362 5.025L0 20l5.108-1.34a10.02 10.02 0 004.933 1.26h.004c5.546 0 10.042-4.496 10.042-10.042a9.96 9.96 0 00-2.615-7.355zM10.045 18.2h-.003a8.28 8.28 0 01-4.22-1.157l-.303-.18-3.032.795.81-2.955-.198-.304A8.25 8.25 0 011.8 10.042c0-4.547 3.698-8.245 8.245-8.245a8.23 8.23 0 015.846 2.42 8.2 8.2 0 012.408 5.84c0 4.548-3.698 8.243-8.254 8.243zM14.57 11.99c-.248-.124-1.467-.724-1.695-.806-.228-.083-.394-.124-.56.124-.166.248-.643.806-.788.972-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.994-1.23-.736-.657-1.233-1.468-1.378-1.717-.145-.248-.015-.382.109-.506.112-.111.248-.29.373-.435.124-.145.165-.248.248-.414.083-.166.041-.31-.021-.434-.062-.124-.56-1.35-.767-1.84-.201-.483-.405-.417-.56-.425l-.476-.008a.912.912 0 00-.662.31c-.228.248-.87.85-.87 2.07s.89 2.4 1.014 2.565c.124.166 1.75 2.67 4.24 3.742.592.255 1.053.407 1.414.521.594.188 1.134.162 1.561.098.476-.071 1.467-.6 1.674-1.18.207-.58.207-1.078.145-1.18-.062-.103-.228-.166-.476-.29z" },
    { key: "github", label: "GitHub", icon: "M10 .2a10 10 0 00-3.162 19.49c.5.092.684-.217.684-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.37-1.34-3.37-1.34-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.07-.607.07-.607 1.003.071 1.53 1.03 1.53 1.03.892 1.529 2.34 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.252-4.555-1.11-4.555-4.944 0-1.092.39-1.986 1.03-2.685-.103-.253-.446-1.271.098-2.65 0 0 .84-.269 2.75 1.025A9.56 9.56 0 0110 5.07c.85.004 1.706.114 2.505.334 1.909-1.294 2.748-1.025 2.748-1.025.546 1.379.203 2.397.1 2.65.64.699 1.028 1.593 1.028 2.685 0 3.844-2.338 4.688-4.566 4.936.36.31.68.92.68 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.579.69.481A10 10 0 0010 .2z" }
  ];

  const icons = socialPlatforms.map((platform) => {
    const url = String(socialLinks[platform.key] || "").trim();
    const isDisabled = !url;
    const attrs = isDisabled
      ? 'href="#" class="social-icon disabled" aria-disabled="true" tabindex="-1"'
      : `href="${escapeAttribute(url)}" target="_blank" class="social-icon"`;

    return `<a ${attrs} aria-label="${escapeAttribute(
      platform.label
    )}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="${platform.icon}"></path></svg></a>`;
  });

  const downloadBtnHtml = `<button class="social-icon download-cv-icon" id="downloadCvBtn" type="button" aria-label="${escapeAttribute(t(lang, 'pdfDownloadLabel'))}" title="${escapeAttribute(t(lang, 'pdfDownloadLabel'))}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 13.5l-3.5-3.5H8.5V5h3v5H13.5L10 13.5zM4.5 16.5h11V18H4.5v-1.5z"/></svg></button>`;

  socialBar.innerHTML = icons.join("") + downloadBtnHtml;
}

// ─── PDF Download ────────────────────────────────────────────────────────────

const _PDF_CODE_HASH = "991df0b4d26f9622701aded9924358e74d930fa4d1cc63983c61a75d70d8b33f";

function initPdfDownload() {
  // Event delegation — button is rebuilt on lang change
  document.addEventListener("click", function (e) {
    if (e.target.closest("#downloadCvBtn")) {
      showPdfModal();
    }
  });

  const modal = document.getElementById("pdfCodeModal");
  if (!modal) return;

  const input = document.getElementById("pdfCodeInput");
  const confirmBtn = document.getElementById("pdfConfirmBtn");
  const cancelBtn = document.getElementById("pdfCancelBtn");

  cancelBtn.addEventListener("click", hidePdfModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) hidePdfModal();
  });
  confirmBtn.addEventListener("click", handlePdfConfirm);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") handlePdfConfirm();
  });
}

function showPdfModal() {
  const modal = document.getElementById("pdfCodeModal");
  const titleEl = document.getElementById("pdfModalTitle");
  const input = document.getElementById("pdfCodeInput");
  const confirmBtn = document.getElementById("pdfConfirmBtn");
  const cancelBtn = document.getElementById("pdfCancelBtn");
  const errorEl = document.getElementById("pdfCodeError");
  if (!modal) return;

  if (titleEl) titleEl.textContent = t(currentLang, "pdfModalTitle");
  if (input) input.placeholder = t(currentLang, "pdfModalPlaceholder");
  if (confirmBtn) confirmBtn.textContent = t(currentLang, "pdfModalConfirm");
  if (cancelBtn) cancelBtn.textContent = t(currentLang, "pdfModalCancel");

  // Align modal to current page direction
  const box = modal.querySelector(".pdf-modal-box");
  if (box) box.dir = currentLang === "en" ? "ltr" : "rtl";

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
      if (errorEl) {
        errorEl.textContent = t(currentLang, "pdfModalError");
        errorEl.hidden = false;
      }
      if (input) { input.value = ""; input.focus(); }
      return;
    }
    hidePdfModal();
    generateCvPdf(currentLang);
  });
}

function verifyPdfCode(code) {
  return crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(code))
    .then(function (buf) {
      const hex = Array.from(new Uint8Array(buf))
        .map(function (b) { return b.toString(16).padStart(2, "0"); })
        .join("");
      return hex === _PDF_CODE_HASH;
    })
    .catch(function () { return false; });
}

function generateCvPdf(lang) {
  if (!cvData) {
    alert(lang === "ar" ? "البيانات غير متاحة بعد" : "Data not available yet.");
    return;
  }

  const btn = document.getElementById("downloadCvBtn");
  if (btn) btn.classList.add("loading");

  const profile = cvData.profile || {};
  const rawName = lang === "en" && profile.name_en ? profile.name_en : (profile.name || "CV");
  const filename = rawName.replace(/\s+/g, "-") + "-CV.pdf";

  const pdfHtml = buildPdfHtml(lang);
  const printWindow = window.open("", "_blank");
  if (!printWindow || printWindow.closed || typeof printWindow.closed === "undefined") {
    alert(lang === "ar"
      ? "لم يتم فتح نافذة الطباعة، يرجى السماح بالنوافذ المنبثقة"
      : "Could not open print window. Please allow pop-ups.");
    if (btn) btn.classList.remove("loading");
    return;
  }

  const docHtml = "<!DOCTYPE html>" +
    "<html lang=\"" + (lang === "ar" ? "ar" : "en") + "\">" +
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
  if (mount && mount.parentNode) {
    mount.parentNode.removeChild(mount);
  }
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

function buildPdfHtml(lang) {
  var isAr = lang === "ar";
  var dir = isAr ? "rtl" : "ltr";
  var profile = cvData.profile || {};
  var experience = cvData.experience || [];
  var education = cvData.education || [];
  var skills = cvData.skills || [];
  var projects = cvData.projects || [];
  var contacts = cvData.contacts || {};

  var name = isAr ? (profile.name || "") : (profile.name_en || profile.name || "");
  var title = isAr ? (profile.title || "") : (profile.title_en || profile.title || "");
  var summary = isAr ? (profile.summary || "") : (profile.summary_en || profile.summary || "");
  var location = isAr ? (profile.location || "") : (profile.location_en || profile.location || "");

  var photoHtml = profile.profileImage
    ? `<img src="${escapeAttribute(profile.profileImage)}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.55);flex-shrink:0;" crossorigin="anonymous" />`
    : `<div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.18);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;font-size:2rem;">👤</div>`;

  var chips = [];
  if (contacts.email) {
    chips.push(`<a href="mailto:${escapeAttribute(contacts.email)}" style="background:rgba(255,255,255,0.18);border-radius:100px;padding:2px 9px;font-size:9.5px;white-space:nowrap;text-decoration:none;color:inherit;">✉ ${escapeHtml(contacts.email)}</a>`);
  }
  if (contacts.phone) {
    var telHref = "tel:" + normalizeWhatsapp(contacts.phone);
    chips.push(`<a href="${escapeAttribute(telHref)}" style="background:rgba(255,255,255,0.18);border-radius:100px;padding:2px 9px;font-size:9.5px;white-space:nowrap;text-decoration:none;color:inherit;">📞 ${escapeHtml(contacts.phone)}</a>`);
  }
  if (contacts.linkedin) {
    chips.push(`<a href="${escapeAttribute(contacts.linkedin)}" target="_blank" rel="noopener" style="background:rgba(255,255,255,0.18);border-radius:100px;padding:2px 9px;font-size:9.5px;white-space:nowrap;text-decoration:none;color:inherit;">in ${shortUrl(contacts.linkedin)}</a>`);
  }
  if (contacts.github) {
    chips.push(`<a href="${escapeAttribute(contacts.github)}" target="_blank" rel="noopener" style="background:rgba(255,255,255,0.18);border-radius:100px;padding:2px 9px;font-size:9.5px;white-space:nowrap;text-decoration:none;color:inherit;">⌂ ${shortUrl(contacts.github)}</a>`);
  }

  var headerHtml = `
    <div style="background:linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 100%);color:#fff;padding:22px 32px;display:flex;align-items:center;gap:20px;direction:${dir};">
      ${isAr ? "" : photoHtml}
      <div style="flex:1;direction:${dir};">
        <div style="font-size:24px;font-weight:700;margin-bottom:4px;">${escapeHtml(name)}</div>
        <div style="font-size:13px;opacity:0.9;margin-bottom:4px;">${escapeHtml(title)}</div>
        <div style="font-size:11px;opacity:0.8;margin-bottom:10px;">📍 ${escapeHtml(location)}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">${chips.join("")}</div>
      </div>
      ${isAr ? photoHtml : ""}
    </div>`;

  var sectionStyle = "margin-bottom:18px;direction:" + dir + ";";
  var titleStyle = "font-size:12.5px;font-weight:700;color:#1e40af;border-bottom:2px solid #bfdbfe;padding-bottom:4px;margin-bottom:10px;letter-spacing:0.04em;";

  var summaryHtml = summary
    ? `<div style="${sectionStyle}"><div style="${titleStyle}">${isAr ? "نبذة مختصرة" : "PROFESSIONAL SUMMARY"}</div><div style="font-size:11.5px;color:#475569;line-height:1.8;">${escapeHtml(summary).replace(/\n/g, "<br>")}</div></div>`
    : "";

  var expItems = experience.map(function (item) {
    var role    = isAr ? (item.role    || "") : (item.role_en    || item.role    || "");
    var company = isAr ? (item.company || "") : (item.company_en || item.company || "");
    var period  = isAr ? (item.period  || "") : (item.period_en  || item.period  || "");
    var desc    = isAr ? (item.description || "") : (item.description_en || item.description || "");
    return `<div style="display:flex;gap:10px;margin-bottom:11px;">
      <div style="width:7px;height:7px;border-radius:50%;background:#2563eb;margin-top:5px;flex-shrink:0;"></div>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:11.5px;color:#1e293b;">${escapeHtml(role)}</div>
        <div style="font-size:10.5px;color:#2563eb;margin-bottom:2px;">${escapeHtml(company)} <span style="color:#94a3b8;"> · ${escapeHtml(period)}</span></div>
        ${desc ? `<div style="font-size:10.5px;color:#475569;line-height:1.7;">${escapeHtml(desc).replace(/\n/g, "<br>")}</div>` : ""}
      </div>
    </div>`;
  }).join("");

  var expSection = experience.length
    ? `<div style="${sectionStyle}"><div style="${titleStyle}">${isAr ? "الخبرات العملية" : "WORK EXPERIENCE"}</div>${expItems}</div>`
    : "";

  var eduItems = education.map(function (item) {
    var degree      = isAr ? (item.degree      || "") : (item.degree_en      || item.degree      || "");
    var institution = isAr ? (item.institution || "") : (item.institution_en || item.institution || "");
    var period      = isAr ? (item.period      || "") : (item.period_en      || item.period      || "");
    var desc        = isAr ? (item.description || "") : (item.description_en || item.description || "");
    return `<div style="display:flex;gap:10px;margin-bottom:11px;">
      <div style="width:7px;height:7px;border-radius:50%;background:#0ea5e9;margin-top:5px;flex-shrink:0;"></div>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:11px;color:#1e293b;">${escapeHtml(degree)}</div>
        <div style="font-size:10px;color:#0ea5e9;margin-bottom:2px;">${escapeHtml(institution)} <span style="color:#94a3b8;"> · ${escapeHtml(period)}</span></div>
        ${desc ? `<div style="font-size:10px;color:#475569;line-height:1.6;">${escapeHtml(desc).replace(/\n/g, "<br>")}</div>` : ""}
      </div>
    </div>`;
  }).join("");

  var eduSection = education.length
    ? `<div style="${sectionStyle}"><div style="${titleStyle}">${isAr ? "التعليم" : "EDUCATION"}</div>${eduItems}</div>`
    : "";

  var skillItems = skills.map(function (skill) {
    var sName  = isAr ? (skill.name || "") : (skill.name_en || skill.name || "");
    var level  = Math.max(0, Math.min(100, Number(skill.level) || 0));
    return `<div style="margin-bottom:7px;">
      <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px;">
        <span style="font-weight:600;color:#1e293b;">${escapeHtml(sName)}</span>
        <span style="color:#94a3b8;">${level}%</span>
      </div>
      <div style="height:5px;background:#e2e8f0;border-radius:100px;">
        <div style="height:5px;background:linear-gradient(90deg,#1e40af,#3b82f6);border-radius:100px;width:${level}%;"></div>
      </div>
    </div>`;
  }).join("");

  var skillsSection = skills.length
    ? `<div style="${sectionStyle}"><div style="${titleStyle}">${isAr ? "المهارات" : "SKILLS"}</div><div style="column-count:2;column-gap:22px;">${skillItems}</div></div>`
    : "";

  var projectItems = projects.map(function (project) {
    var pTitle = isAr ? (project.title || "") : (project.title_en || project.title || "");
    var pDesc  = isAr ? (project.description || "") : (project.description_en || project.description || "");
    return `<div style="margin-bottom:10px;">
      <div style="font-weight:700;font-size:11px;color:#1e293b;">${escapeHtml(pTitle)}</div>
      ${pDesc ? `<div style="font-size:10px;color:#475569;line-height:1.6;">${escapeHtml(pDesc).replace(/\n/g, "<br>")}</div>` : ""}
      ${project.link ? `<div style="font-size:9.5px;color:#2563eb;margin-top:2px;">${escapeHtml(project.link)}</div>` : ""}
    </div>`;
  }).join("");

  var projectsSection = projects.length
    ? `<div style="${sectionStyle}"><div style="${titleStyle}">${isAr ? "المشاريع والأعمال" : "PROJECTS & PORTFOLIO"}</div>${projectItems}</div>`
    : "";

  var socialIcons = [];
  if (contacts.linkedin) {
    socialIcons.push(`<a href="${escapeAttribute(contacts.linkedin)}" target="_blank" rel="noopener" style="width:22px;height:22px;border-radius:999px;background:#1d4ed8;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;text-decoration:none;">in</a>`);
  }
  if (contacts.github) {
    socialIcons.push(`<a href="${escapeAttribute(contacts.github)}" target="_blank" rel="noopener" style="width:22px;height:22px;border-radius:999px;background:#0f172a;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;text-decoration:none;">GH</a>`);
  }
  if (contacts.phone) {
    var fTel = "tel:" + normalizeWhatsapp(contacts.phone);
    socialIcons.push(`<a href="${escapeAttribute(fTel)}" style="width:22px;height:22px;border-radius:999px;background:#16a34a;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;text-decoration:none;">☎</a>`);
  }
  if (contacts.email) {
    socialIcons.push(`<a href="mailto:${escapeAttribute(contacts.email)}" style="width:22px;height:22px;border-radius:999px;background:#f97316;color:#ffffff;display:inline-flex;align-items:center;justify-content:center;font-size:11px;text-decoration:none;">✉</a>`);
  }

  var socialSection = socialIcons.length
    ? `<div style="margin-top:6px;text-align:center;direction:${dir};">
         <div style="font-size:10px;color:#64748b;margin-bottom:4px;">${isAr ? "روابط التواصل" : "Social Links"}</div>
         <div style="display:inline-flex;gap:6px;">${socialIcons.join("")}</div>
       </div>`
    : "";

  var year = new Date().getFullYear();
  var footerLine = isAr
    ? `© ${year} ${escapeHtml(profile.name || "")} - جميع الحقوق محفوظة`
    : `© ${year} ${escapeHtml(profile.name_en || profile.name || "")} - All rights reserved`;

  return `
  <style>
    @page { size: A4 portrait; margin: 8mm 10mm; }
    .pdf-root { font-family: 'Cairo', sans-serif; background: #ffffff; color: #1e293b; font-size: 13px; line-height: 1.65; width: 100%; }
    .pdf-content { padding: 18px 18px 22px; }
    .pdf-section { margin-bottom: 18px; page-break-inside: avoid; break-inside: avoid; }
    .pdf-item { page-break-inside: avoid; break-inside: avoid; }
    .pdf-footer { margin-top: 10px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 9.5px; color: #94a3b8; text-align: center; }
  </style>
  <div class="pdf-root" dir="${dir}">
    ${headerHtml}
    <div class="pdf-content" style="direction:${dir};">
      ${summaryHtml ? `<div class="pdf-section">${summaryHtml}</div>` : ""}
      ${expSection ? `<div class="pdf-section">${expSection}</div>` : ""}
      ${eduSection ? `<div class="pdf-section">${eduSection}</div>` : ""}
      ${skillsSection ? `<div class="pdf-section">${skillsSection}</div>` : ""}
      ${projectsSection ? `<div class="pdf-section">${projectsSection}</div>` : ""}
      <div class="pdf-footer" style="direction:${dir};">
        ${socialSection}
        <div style="margin-top:6px;">${footerLine}</div>
      </div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────

function shortUrl(value) {
  const url = String(value || "").replace(/^https?:\/\//i, "").replace(/\/$/, "");
  return escapeHtml(url);
}

function normalizeWhatsapp(value) {
  return String(value || "").replace(/[^0-9]/g, "");
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
