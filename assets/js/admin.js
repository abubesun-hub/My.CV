function removeItem(btn) {
  const item = btn.closest(".repeatable-item");
  if (item) {
    item.remove();
  }
}

function createExperienceBlock() {
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
    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
  `;
  return div;
}

function createEducationBlock() {
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
    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
  `;
  return div;
}

function createSkillBlock() {
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
    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
  `;
  return div;
}

function createProjectBlock() {
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
    <div class="grid-2">
      <div class="form-group">
        <label>رابط المشروع</label>
        <input type="url" name="project_link[]" />
      </div>
      <div class="form-group image-group">
        <label>صورة المشروع</label>
        <input type="file" name="project_image[]" accept="image/*" />
        <input type="hidden" name="project_image_existing[]" value="" />
      </div>
    </div>
    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
  `;
  return div;
}

function addExperienceRow() {
  const list = document.getElementById("experienceList");
  if (list) list.appendChild(createExperienceBlock());
}

function addEducationRow() {
  const list = document.getElementById("educationList");
  if (list) list.appendChild(createEducationBlock());
}

function addSkillRow() {
  const list = document.getElementById("skillsList");
  if (list) list.appendChild(createSkillBlock());
}

function addProjectRow() {
  const list = document.getElementById("projectsList");
  if (list) list.appendChild(createProjectBlock());
}
