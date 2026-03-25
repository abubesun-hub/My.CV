function removeItem(btn) {
  const item = btn.closest(".repeatable-item");
  if (item) {
    item.remove();
  }
}

function createExperienceBlock(item) {
  const div = document.createElement("div");
  div.className = "repeatable-item";
  div.innerHTML = `
    <div class="grid-2">
      <div class="form-group">
        <label>المسمى الوظيفي</label>
        <input type="text" name="exp_role[]" />
      </div>
      <div class="form-group">
        <label>الشركة / الجهة</label>
        <input type="text" name="exp_company[]" />
      </div>
    </div>
    <div class="grid-2">
      <div class="form-group">
        <label>الفترة</label>
        <input type="text" name="exp_period[]" placeholder="مثال: 2020 - حتى الآن" />
      </div>
      <div class="form-group">
        <label>الوصف</label>
        <textarea name="exp_description[]" rows="2"></textarea>
      </div>
    </div>
    <div class="grid-2">
      <div class="form-group">
        <label>Job Title (English)</label>
        <input type="text" name="exp_role_en[]" />
      </div>
      <div class="form-group">
        <label>Company (English)</label>
        <input type="text" name="exp_company_en[]" />
      </div>
    </div>
    <div class="grid-2">
      <div class="form-group">
        <label>Period (English)</label>
        <input type="text" name="exp_period_en[]" />
      </div>
      <div class="form-group">
        <label>Description (English)</label>
        <textarea name="exp_description_en[]" rows="2"></textarea>
      </div>
    </div>
    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
  `;
  if (item) {
    const roleInput = div.querySelector('input[name="exp_role[]"]');
    const companyInput = div.querySelector('input[name="exp_company[]"]');
    const periodInput = div.querySelector('input[name="exp_period[]"]');
    const descInput = div.querySelector('textarea[name="exp_description[]"]');
    const roleEnInput = div.querySelector('input[name="exp_role_en[]"]');
    const companyEnInput = div.querySelector('input[name="exp_company_en[]"]');
    const periodEnInput = div.querySelector('input[name="exp_period_en[]"]');
    const descEnInput = div.querySelector('textarea[name="exp_description_en[]"]');

    if (roleInput) roleInput.value = item.role || "";
    if (companyInput) companyInput.value = item.company || "";
    if (periodInput) periodInput.value = item.period || "";
    if (descInput) descInput.value = item.description || "";
    if (roleEnInput) roleEnInput.value = item.role_en || "";
    if (companyEnInput) companyEnInput.value = item.company_en || "";
    if (periodEnInput) periodEnInput.value = item.period_en || "";
    if (descEnInput) descEnInput.value = item.description_en || "";
  }

  return div;
}

function createEducationBlock(item) {
  const div = document.createElement("div");
  div.className = "repeatable-item";
  div.innerHTML = `
    <div class="grid-2">
      <div class="form-group">
        <label>المؤهل</label>
        <input type="text" name="edu_degree[]" />
      </div>
      <div class="form-group">
        <label>الجامعة / المعهد</label>
        <input type="text" name="edu_institution[]" />
      </div>
    </div>
    <div class="grid-2">
      <div class="form-group">
        <label>الفترة</label>
        <input type="text" name="edu_period[]" />
      </div>
      <div class="form-group">
        <label>الوصف</label>
        <textarea name="edu_description[]" rows="2"></textarea>
      </div>
    </div>
    <div class="grid-2">
      <div class="form-group">
        <label>Degree (English)</label>
        <input type="text" name="edu_degree_en[]" />
      </div>
      <div class="form-group">
        <label>Institution (English)</label>
        <input type="text" name="edu_institution_en[]" />
      </div>
    </div>
    <div class="grid-2">
      <div class="form-group">
        <label>Period (English)</label>
        <input type="text" name="edu_period_en[]" />
      </div>
      <div class="form-group">
        <label>Description (English)</label>
        <textarea name="edu_description_en[]" rows="2"></textarea>
      </div>
    </div>
    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
  `;
  if (item) {
    const degreeInput = div.querySelector('input[name="edu_degree[]"]');
    const instInput = div.querySelector('input[name="edu_institution[]"]');
    const periodInput = div.querySelector('input[name="edu_period[]"]');
    const descInput = div.querySelector('textarea[name="edu_description[]"]');
    const degreeEnInput = div.querySelector('input[name="edu_degree_en[]"]');
    const instEnInput = div.querySelector('input[name="edu_institution_en[]"]');
    const periodEnInput = div.querySelector('input[name="edu_period_en[]"]');
    const descEnInput = div.querySelector('textarea[name="edu_description_en[]"]');

    if (degreeInput) degreeInput.value = item.degree || "";
    if (instInput) instInput.value = item.institution || "";
    if (periodInput) periodInput.value = item.period || "";
    if (descInput) descInput.value = item.description || "";
    if (degreeEnInput) degreeEnInput.value = item.degree_en || "";
    if (instEnInput) instEnInput.value = item.institution_en || "";
    if (periodEnInput) periodEnInput.value = item.period_en || "";
    if (descEnInput) descEnInput.value = item.description_en || "";
  }

  return div;
}

function createSkillBlock(item) {
  const div = document.createElement("div");
  div.className = "repeatable-item";
  div.innerHTML = `
    <div class="grid-2">
      <div class="form-group">
        <label>اسم المهارة</label>
        <input type="text" name="skill_name[]" />
      </div>
      <div class="form-group">
        <label>المستوى (%)</label>
        <input type="number" name="skill_level[]" min="0" max="100" value="80" />
      </div>
    </div>
    <div class="grid-2">
      <div class="form-group">
        <label>اسم المهارة (إنجليزي)</label>
        <input type="text" name="skill_name_en[]" />
      </div>
    </div>
    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
  `;
  if (item) {
    const nameInput = div.querySelector('input[name="skill_name[]"]');
    const levelInput = div.querySelector('input[name="skill_level[]"]');
    const nameEnInput = div.querySelector('input[name="skill_name_en[]"]');

    if (nameInput) nameInput.value = item.name || "";
    if (levelInput) levelInput.value = item.level != null ? item.level : 80;
    if (nameEnInput) nameEnInput.value = item.name_en || "";
  }

  return div;
}

function createProjectBlock(item) {
  const div = document.createElement("div");
  div.className = "repeatable-item";
  div.innerHTML = `
    <div class="form-group">
      <label>عنوان المشروع</label>
      <input type="text" name="project_title[]" />
    </div>
    <div class="form-group">
      <label>الوصف</label>
      <textarea name="project_description[]" rows="2"></textarea>
    </div>
    <div class="form-group">
      <label>Project Title (English)</label>
      <input type="text" name="project_title_en[]" />
    </div>
    <div class="form-group">
      <label>Description (English)</label>
      <textarea name="project_description_en[]" rows="2"></textarea>
    </div>
    <div class="grid-2">
      <div class="form-group">
        <label>رابط المشروع</label>
        <input type="url" name="project_link[]" />
      </div>
      <div class="form-group image-group">
        <label>مسار صورة المشروع</label>
        <input type="text" name="project_image[]" placeholder="assets/images/project-1.jpg" />
      </div>
    </div>
    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
  `;
  if (item) {
    const titleInput = div.querySelector('input[name="project_title[]"]');
    const descInput = div.querySelector('textarea[name="project_description[]"]');
    const titleEnInput = div.querySelector('input[name="project_title_en[]"]');
    const descEnInput = div.querySelector('textarea[name="project_description_en[]"]');
    const linkInput = div.querySelector('input[name="project_link[]"]');
    const imageInput = div.querySelector('input[name="project_image[]"]');

    if (titleInput) titleInput.value = item.title || "";
    if (descInput) descInput.value = item.description || "";
    if (titleEnInput) titleEnInput.value = item.title_en || "";
    if (descEnInput) descEnInput.value = item.description_en || "";
    if (linkInput) linkInput.value = item.link || "";
    if (imageInput) imageInput.value = item.image || "";
  }

  return div;
}

function addExperienceRow(item) {
  const list = document.getElementById("experienceList");
  if (list) list.appendChild(createExperienceBlock(item || null));
}

function addEducationRow(item) {
  const list = document.getElementById("educationList");
  if (list) list.appendChild(createEducationBlock(item || null));
}

function addSkillRow(item) {
  const list = document.getElementById("skillsList");
  if (list) list.appendChild(createSkillBlock(item || null));
}

function addProjectRow(item) {
  const list = document.getElementById("projectsList");
  if (list) list.appendChild(createProjectBlock(item || null));
}

let originalData = null;

function showAdminAlert(message, type) {
  const alertBox = document.getElementById("adminAlert");
  if (!alertBox) return;
  alertBox.textContent = message || "";
  alertBox.classList.remove("error", "success");
  alertBox.classList.add(type === "error" ? "error" : "success");
  alertBox.style.display = message ? "block" : "none";
}

function loadDataIntoForm() {
  fetch("data/data.json")
    .then((res) => res.json())
    .then((data) => {
      originalData = data || {};

      const profile = originalData.profile || {};
      const profileName = document.getElementById("profileName");
      const profileTitle = document.getElementById("profileTitle");
      const profileLocation = document.getElementById("profileLocation");
      const profileSummary = document.getElementById("profileSummary");
      const profileImage = document.getElementById("profileImage");
      const profileNameEn = document.getElementById("profileNameEn");
      const profileTitleEn = document.getElementById("profileTitleEn");
      const profileLocationEn = document.getElementById("profileLocationEn");
      const profileSummaryEn = document.getElementById("profileSummaryEn");

      if (profileName) profileName.value = profile.name || "";
      if (profileTitle) profileTitle.value = profile.title || "";
      if (profileLocation) profileLocation.value = profile.location || "";
      if (profileSummary) profileSummary.value = profile.summary || "";
      if (profileImage) profileImage.value = profile.profileImage || "";
      if (profileNameEn) profileNameEn.value = profile.name_en || "";
      if (profileTitleEn) profileTitleEn.value = profile.title_en || "";
      if (profileLocationEn) profileLocationEn.value = profile.location_en || "";
      if (profileSummaryEn) profileSummaryEn.value = profile.summary_en || "";

      const expList = document.getElementById("experienceList");
      if (expList) {
        expList.innerHTML = "";
        (originalData.experience || []).forEach((item) => addExperienceRow(item));
      }

      const eduList = document.getElementById("educationList");
      if (eduList) {
        eduList.innerHTML = "";
        (originalData.education || []).forEach((item) => addEducationRow(item));
      }

      const skillsList = document.getElementById("skillsList");
      if (skillsList) {
        skillsList.innerHTML = "";
        (originalData.skills || []).forEach((item) => addSkillRow(item));
      }

      const projectsList = document.getElementById("projectsList");
      if (projectsList) {
        projectsList.innerHTML = "";
        (originalData.projects || []).forEach((item) => addProjectRow(item));
      }

      const contacts = originalData.contacts || {};
      const emailInput = document.getElementById("contactEmail");
      const phoneInput = document.getElementById("contactPhone");
      const whatsappInput = document.getElementById("contactWhatsapp");
      const linkedinInput = document.getElementById("contactLinkedin");
      const githubInput = document.getElementById("contactGithub");

      if (emailInput) emailInput.value = contacts.email || "";
      if (phoneInput) phoneInput.value = contacts.phone || "";
      if (whatsappInput) whatsappInput.value = contacts.whatsapp || "";
      if (linkedinInput) linkedinInput.value = contacts.linkedin || "";
      if (githubInput) githubInput.value = contacts.github || "";

      const settings = originalData.settings || {};
      const defaultTheme = document.getElementById("defaultTheme");
      if (defaultTheme) defaultTheme.value = settings.defaultTheme || "light";

      showAdminAlert("تم تحميل البيانات من الملف بنجاح.", "success");
    })
    .catch(() => {
      showAdminAlert("تعذر تحميل data.json. تأكد من وجود الملف.", "error");
    });
}

function buildDataFromForm() {
  const base = JSON.parse(JSON.stringify(originalData || {}));

  if (!base.profile) base.profile = {};
  const profileName = document.getElementById("profileName");
  const profileTitle = document.getElementById("profileTitle");
  const profileLocation = document.getElementById("profileLocation");
  const profileSummary = document.getElementById("profileSummary");
  const profileImage = document.getElementById("profileImage");
  const profileNameEn = document.getElementById("profileNameEn");
  const profileTitleEn = document.getElementById("profileTitleEn");
  const profileLocationEn = document.getElementById("profileLocationEn");
  const profileSummaryEn = document.getElementById("profileSummaryEn");

  base.profile.name = profileName ? profileName.value.trim() : base.profile.name || "";
  base.profile.title = profileTitle ? profileTitle.value.trim() : base.profile.title || "";
  base.profile.location =
    profileLocation ? profileLocation.value.trim() : base.profile.location || "";
  base.profile.summary =
    profileSummary ? profileSummary.value.trim() : base.profile.summary || "";
  base.profile.profileImage =
    profileImage ? profileImage.value.trim() : base.profile.profileImage || "";
  base.profile.name_en =
    profileNameEn ? profileNameEn.value.trim() : base.profile.name_en || "";
  base.profile.title_en =
    profileTitleEn ? profileTitleEn.value.trim() : base.profile.title_en || "";
  base.profile.location_en =
    profileLocationEn ? profileLocationEn.value.trim() : base.profile.location_en || "";
  base.profile.summary_en =
    profileSummaryEn ? profileSummaryEn.value.trim() : base.profile.summary_en || "";

  const expItems = document.querySelectorAll("#experienceList .repeatable-item");
  base.experience = Array.from(expItems).map((el, index) => {
    const existing = (originalData.experience || [])[index] || {};
    const role = el.querySelector('input[name="exp_role[]"]');
    const company = el.querySelector('input[name="exp_company[]"]');
    const period = el.querySelector('input[name="exp_period[]"]');
    const desc = el.querySelector('textarea[name="exp_description[]"]');
    const roleEn = el.querySelector('input[name="exp_role_en[]"]');
    const companyEn = el.querySelector('input[name="exp_company_en[]"]');
    const periodEn = el.querySelector('input[name="exp_period_en[]"]');
    const descEn = el.querySelector('textarea[name="exp_description_en[]"]');

    return {
      ...existing,
      role: role ? role.value.trim() : "",
      company: company ? company.value.trim() : "",
      period: period ? period.value.trim() : "",
      description: desc ? desc.value.trim() : "",
      role_en: roleEn ? roleEn.value.trim() : existing.role_en || "",
      company_en: companyEn ? companyEn.value.trim() : existing.company_en || "",
      period_en: periodEn ? periodEn.value.trim() : existing.period_en || "",
      description_en: descEn ? descEn.value.trim() : existing.description_en || "",
    };
  });

  const eduItems = document.querySelectorAll("#educationList .repeatable-item");
  base.education = Array.from(eduItems).map((el, index) => {
    const existing = (originalData.education || [])[index] || {};
    const degree = el.querySelector('input[name="edu_degree[]"]');
    const inst = el.querySelector('input[name="edu_institution[]"]');
    const period = el.querySelector('input[name="edu_period[]"]');
    const desc = el.querySelector('textarea[name="edu_description[]"]');
    const degreeEn = el.querySelector('input[name="edu_degree_en[]"]');
    const instEn = el.querySelector('input[name="edu_institution_en[]"]');
    const periodEn = el.querySelector('input[name="edu_period_en[]"]');
    const descEn = el.querySelector('textarea[name="edu_description_en[]"]');

    return {
      ...existing,
      degree: degree ? degree.value.trim() : "",
      institution: inst ? inst.value.trim() : "",
      period: period ? period.value.trim() : "",
      description: desc ? desc.value.trim() : "",
      degree_en: degreeEn ? degreeEn.value.trim() : existing.degree_en || "",
      institution_en: instEn ? instEn.value.trim() : existing.institution_en || "",
      period_en: periodEn ? periodEn.value.trim() : existing.period_en || "",
      description_en: descEn ? descEn.value.trim() : existing.description_en || "",
    };
  });

  const skillItems = document.querySelectorAll("#skillsList .repeatable-item");
  base.skills = Array.from(skillItems).map((el, index) => {
    const existing = (originalData.skills || [])[index] || {};
    const name = el.querySelector('input[name="skill_name[]"]');
    const level = el.querySelector('input[name="skill_level[]"]');
     const nameEn = el.querySelector('input[name="skill_name_en[]"]');

    const levelValue = level ? Number(level.value) : existing.level || 0;

    return {
      ...existing,
      name: name ? name.value.trim() : "",
      level: isNaN(levelValue) ? 0 : levelValue,
      name_en: nameEn ? nameEn.value.trim() : existing.name_en || "",
    };
  });

  const projectItems = document.querySelectorAll("#projectsList .repeatable-item");
  base.projects = Array.from(projectItems).map((el, index) => {
    const existing = (originalData.projects || [])[index] || {};
    const title = el.querySelector('input[name="project_title[]"]');
    const desc = el.querySelector('textarea[name="project_description[]"]');
    const titleEn = el.querySelector('input[name="project_title_en[]"]');
    const descEn = el.querySelector('textarea[name="project_description_en[]"]');
    const link = el.querySelector('input[name="project_link[]"]');
    const image = el.querySelector('input[name="project_image[]"]');

    return {
      ...existing,
      title: title ? title.value.trim() : "",
      description: desc ? desc.value.trim() : "",
      title_en: titleEn ? titleEn.value.trim() : existing.title_en || "",
      description_en: descEn ? descEn.value.trim() : existing.description_en || "",
      link: link ? link.value.trim() : "",
      image: image ? image.value.trim() : "",
    };
  });

  if (!base.contacts) base.contacts = {};
  const emailInput = document.getElementById("contactEmail");
  const phoneInput = document.getElementById("contactPhone");
  const whatsappInput = document.getElementById("contactWhatsapp");
  const linkedinInput = document.getElementById("contactLinkedin");
  const githubInput = document.getElementById("contactGithub");

  base.contacts.email = emailInput ? emailInput.value.trim() : base.contacts.email || "";
  base.contacts.phone = phoneInput ? phoneInput.value.trim() : base.contacts.phone || "";
  base.contacts.whatsapp =
    whatsappInput ? whatsappInput.value.trim() : base.contacts.whatsapp || "";
  base.contacts.linkedin =
    linkedinInput ? linkedinInput.value.trim() : base.contacts.linkedin || "";
  base.contacts.github =
    githubInput ? githubInput.value.trim() : base.contacts.github || "";

  if (!base.settings) base.settings = {};
  const defaultTheme = document.getElementById("defaultTheme");
  if (defaultTheme) base.settings.defaultTheme = defaultTheme.value || "light";

  return base;
}

// Simple client-side login and data handling for admin.html (not secure for sensitive data)
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("adminLoginForm");
  if (!loginForm) return;

  const loginView = document.getElementById("loginView");
  const adminPanel = document.getElementById("adminPanel");
  const loginError = document.getElementById("loginError");
  const logoutBtn = document.getElementById("btnLogout");
  const reloadBtn = document.getElementById("btnReloadFromFile");
  const generateBtn = document.getElementById("btnGenerateJson");
  const jsonOutput = document.getElementById("jsonOutput");

  // TODO: غيّر هذه القيم كما تريد
  const ADMIN_USERNAME = "abubesun";
  const ADMIN_PASSWORD = "ahmed1985";

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      if (loginError) loginError.style.display = "none";
      if (loginView) loginView.style.display = "none";
      if (adminPanel) adminPanel.style.display = "flex";
      loadDataIntoForm();
    } else {
      if (loginError) loginError.style.display = "block";
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      if (adminPanel) adminPanel.style.display = "none";
      if (loginView) loginView.style.display = "flex";
      const userInput = document.getElementById("username");
      const passInput = document.getElementById("password");
      if (userInput) userInput.value = "";
      if (passInput) passInput.value = "";
      showAdminAlert("", "success");
      if (jsonOutput) jsonOutput.value = "";
    });
  }

  if (reloadBtn) {
    reloadBtn.addEventListener("click", function () {
      loadDataIntoForm();
    });
  }

  if (generateBtn) {
    generateBtn.addEventListener("click", function () {
      if (!originalData) {
        showAdminAlert("لم يتم تحميل البيانات بعد. قم بالتحميل من الملف أولاً.", "error");
        return;
      }
      const newData = buildDataFromForm();
      if (jsonOutput) {
        jsonOutput.value = JSON.stringify(newData, null, 2);
        jsonOutput.scrollTop = 0;
      }
      showAdminAlert("تم توليد JSON جديد. انسخه إلى ملف data/data.json في GitHub.", "success");
    });
  }
});
