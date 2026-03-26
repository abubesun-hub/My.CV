<?php
require_once __DIR__ . '/config.php';

// Redirect to login if not logged in
if (!is_admin_logged_in()) {
    header('Location: login.php');
    exit;
}

$data = load_cv_data();
$profile = $data['profile'] ?? [];
$experience = $data['experience'] ?? [];
$education = $data['education'] ?? [];
$skills = $data['skills'] ?? [];
$projects = $data['projects'] ?? [];
$contacts = $data['contacts'] ?? [];
$settings = $data['settings'] ?? [];

$saveMessage = '';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Update profile
    $data['profile']['name'] = $_POST['profile_name'] ?? '';
    $data['profile']['title'] = $_POST['profile_title'] ?? '';
    $data['profile']['summary'] = $_POST['profile_summary'] ?? '';
    $data['profile']['location'] = $_POST['profile_location'] ?? '';

    // Handle profile image upload
    if (!empty($_FILES['profile_image']['name'])) {
        $filename = 'profile_' . time() . '_' . basename($_FILES['profile_image']['name']);
        $target = $UPLOAD_DIR . $filename;
        if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $target)) {
            $data['profile']['profileImage'] = 'assets/images/' . $filename;
        }
    }

    // Experience
    $data['experience'] = [];
    if (!empty($_POST['exp_role'])) {
        foreach ($_POST['exp_role'] as $i => $role) {
            if (trim($role) === '') continue;
            $data['experience'][] = [
                'role' => $role,
                'company' => $_POST['exp_company'][$i] ?? '',
                'period' => $_POST['exp_period'][$i] ?? '',
                'description' => $_POST['exp_description'][$i] ?? ''
            ];
        }
    }

    // Education
    $data['education'] = [];
    if (!empty($_POST['edu_degree'])) {
        foreach ($_POST['edu_degree'] as $i => $deg) {
            if (trim($deg) === '') continue;
            $data['education'][] = [
                'degree' => $deg,
                'institution' => $_POST['edu_institution'][$i] ?? '',
                'period' => $_POST['edu_period'][$i] ?? '',
                'description' => $_POST['edu_description'][$i] ?? ''
            ];
        }
    }

    // Skills
    $data['skills'] = [];
    if (!empty($_POST['skill_name'])) {
        foreach ($_POST['skill_name'] as $i => $name) {
            if (trim($name) === '') continue;
            $level = intval($_POST['skill_level'][$i] ?? 0);
            if ($level < 0) $level = 0;
            if ($level > 100) $level = 100;
            $data['skills'][] = [
                'name' => $name,
                'level' => $level
            ];
        }
    }

    // Projects
    $data['projects'] = [];
    if (!empty($_POST['project_title'])) {
        foreach ($_POST['project_title'] as $i => $title) {
            if (trim($title) === '') continue;
            $project = [
                'title' => $title,
                'description' => $_POST['project_description'][$i] ?? '',
                'link' => $_POST['project_link'][$i] ?? '',
                'image' => $_POST['project_image_existing'][$i] ?? ''
            ];

            // Handle project image upload
            if (!empty($_FILES['project_image']['name'][$i])) {
                $tmpName = $_FILES['project_image']['tmp_name'][$i];
                $originalName = basename($_FILES['project_image']['name'][$i]);
                $filename = 'project_' . time() . '_' . $originalName;
                $target = $UPLOAD_DIR . $filename;
                if (move_uploaded_file($tmpName, $target)) {
                    $project['image'] = 'assets/images/' . $filename;
                }
            }

            $data['projects'][] = $project;
        }
    }

    // Contacts
    $data['contacts'] = [
        'email' => $_POST['contact_email'] ?? '',
        'phone' => $_POST['contact_phone'] ?? '',
        'whatsapp' => $_POST['contact_whatsapp'] ?? '',
        'linkedin' => $_POST['contact_linkedin'] ?? '',
        'github' => $_POST['contact_github'] ?? '',
        'socialLinks' => [
            'facebook' => $_POST['social_facebook'] ?? '',
            'instagram' => $_POST['social_instagram'] ?? '',
            'x' => $_POST['social_x'] ?? '',
            'youtube' => $_POST['social_youtube'] ?? '',
            'tiktok' => $_POST['social_tiktok'] ?? '',
            'snapchat' => $_POST['social_snapchat'] ?? '',
            'telegram' => $_POST['social_telegram'] ?? '',
            'linkedin' => $_POST['social_linkedin'] ?? ($_POST['contact_linkedin'] ?? ''),
            'whatsapp' => $_POST['social_whatsapp'] ?? '',
            'github' => $_POST['social_github'] ?? ($_POST['contact_github'] ?? '')
        ]
    ];

    // Settings
    $data['settings']['defaultTheme'] = ($_POST['default_theme'] ?? 'light') === 'dark' ? 'dark' : 'light';

    save_cv_data($data);
    $saveMessage = 'تم حفظ البيانات بنجاح.';

    // Refresh in-memory data
    $profile = $data['profile'];
    $experience = $data['experience'];
    $education = $data['education'];
    $skills = $data['skills'];
    $projects = $data['projects'];
    $contacts = $data['contacts'];
    $settings = $data['settings'];
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>لوحة التحكم - السيرة الذاتية</title>
    <link rel="stylesheet" href="assets/css/admin.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="admin-wrapper">
        <header class="admin-header">
            <h1>لوحة التحكم</h1>
            <div class="admin-header-actions">
                <a href="index.php" target="_blank" class="btn secondary">فتح الصفحة الرئيسية</a>
                <a href="logout.php" class="btn danger">تسجيل الخروج</a>
            </div>
        </header>

        <main class="admin-main">
            <?php if ($saveMessage): ?>
                <div class="alert success"><?php echo htmlspecialchars($saveMessage); ?></div>
            <?php endif; ?>

            <form class="admin-form" method="post" enctype="multipart/form-data">
                <section class="card">
                    <h2>البيانات الشخصية</h2>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>الاسم الكامل</label>
                            <input type="text" name="profile_name" value="<?php echo htmlspecialchars($profile['name'] ?? ''); ?>" required />
                        </div>
                        <div class="form-group">
                            <label>المسمى الوظيفي</label>
                            <input type="text" name="profile_title" value="<?php echo htmlspecialchars($profile['title'] ?? ''); ?>" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>النبذة المختصرة</label>
                        <textarea name="profile_summary" rows="4"><?php echo htmlspecialchars($profile['summary'] ?? ''); ?></textarea>
                    </div>
                    <div class="form-group">
                        <label>الموقع (المدينة - الدولة)</label>
                        <input type="text" name="profile_location" value="<?php echo htmlspecialchars($profile['location'] ?? ''); ?>" />
                    </div>
                    <div class="form-group image-group">
                        <label>الصورة الشخصية</label>
                        <?php if (!empty($profile['profileImage'])): ?>
                            <img src="<?php echo htmlspecialchars($profile['profileImage']); ?>" alt="صورة شخصية" class="preview" />
                        <?php endif; ?>
                        <input type="file" name="profile_image" accept="image/*" />
                    </div>
                </section>

                <section class="card" id="experience-section">
                    <div class="card-header">
                        <h2>الخبرات العملية</h2>
                        <button type="button" class="btn small" onclick="addExperienceRow()">+ إضافة خبرة</button>
                    </div>
                    <div id="experienceList" class="repeatable-list">
                        <?php if (!empty($experience)): ?>
                            <?php foreach ($experience as $idx => $item): ?>
                                <div class="repeatable-item">
                                    <div class="grid-2">
                                        <div class="form-group">
                                            <label>المسمى الوظيفي</label>
                                            <input type="text" name="exp_role[]" value="<?php echo htmlspecialchars($item['role'] ?? ''); ?>" />
                                        </div>
                                        <div class="form-group">
                                            <label>الشركة / الجهة</label>
                                            <input type="text" name="exp_company[]" value="<?php echo htmlspecialchars($item['company'] ?? ''); ?>" />
                                        </div>
                                    </div>
                                    <div class="grid-2">
                                        <div class="form-group">
                                            <label>الفترة</label>
                                            <input type="text" name="exp_period[]" value="<?php echo htmlspecialchars($item['period'] ?? ''); ?>" placeholder="مثال: 2020 - حتى الآن" />
                                        </div>
                                        <div class="form-group">
                                            <label>الوصف</label>
                                            <textarea name="exp_description[]" rows="2"><?php echo htmlspecialchars($item['description'] ?? ''); ?></textarea>
                                        </div>
                                    </div>
                                    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </section>

                <section class="card" id="education-section">
                    <div class="card-header">
                        <h2>التعليم</h2>
                        <button type="button" class="btn small" onclick="addEducationRow()">+ إضافة مؤهل</button>
                    </div>
                    <div id="educationList" class="repeatable-list">
                        <?php if (!empty($education)): ?>
                            <?php foreach ($education as $item): ?>
                                <div class="repeatable-item">
                                    <div class="grid-2">
                                        <div class="form-group">
                                            <label>المؤهل</label>
                                            <input type="text" name="edu_degree[]" value="<?php echo htmlspecialchars($item['degree'] ?? ''); ?>" />
                                        </div>
                                        <div class="form-group">
                                            <label>الجامعة / المعهد</label>
                                            <input type="text" name="edu_institution[]" value="<?php echo htmlspecialchars($item['institution'] ?? ''); ?>" />
                                        </div>
                                    </div>
                                    <div class="grid-2">
                                        <div class="form-group">
                                            <label>الفترة</label>
                                            <input type="text" name="edu_period[]" value="<?php echo htmlspecialchars($item['period'] ?? ''); ?>" />
                                        </div>
                                        <div class="form-group">
                                            <label>الوصف</label>
                                            <textarea name="edu_description[]" rows="2"><?php echo htmlspecialchars($item['description'] ?? ''); ?></textarea>
                                        </div>
                                    </div>
                                    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </section>

                <section class="card" id="skills-section">
                    <div class="card-header">
                        <h2>المهارات</h2>
                        <button type="button" class="btn small" onclick="addSkillRow()">+ إضافة مهارة</button>
                    </div>
                    <div id="skillsList" class="repeatable-list">
                        <?php if (!empty($skills)): ?>
                            <?php foreach ($skills as $skill): ?>
                                <div class="repeatable-item">
                                    <div class="grid-2">
                                        <div class="form-group">
                                            <label>اسم المهارة</label>
                                            <input type="text" name="skill_name[]" value="<?php echo htmlspecialchars($skill['name'] ?? ''); ?>" />
                                        </div>
                                        <div class="form-group">
                                            <label>المستوى (%)</label>
                                            <input type="number" name="skill_level[]" min="0" max="100" value="<?php echo intval($skill['level'] ?? 0); ?>" />
                                        </div>
                                    </div>
                                    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </section>

                <section class="card" id="projects-section">
                    <div class="card-header">
                        <h2>المشاريع</h2>
                        <button type="button" class="btn small" onclick="addProjectRow()">+ إضافة مشروع</button>
                    </div>
                    <div id="projectsList" class="repeatable-list">
                        <?php if (!empty($projects)): ?>
                            <?php foreach ($projects as $project): ?>
                                <div class="repeatable-item">
                                    <div class="form-group">
                                        <label>عنوان المشروع</label>
                                        <input type="text" name="project_title[]" value="<?php echo htmlspecialchars($project['title'] ?? ''); ?>" />
                                    </div>
                                    <div class="form-group">
                                        <label>الوصف</label>
                                        <textarea name="project_description[]" rows="2"><?php echo htmlspecialchars($project['description'] ?? ''); ?></textarea>
                                    </div>
                                    <div class="grid-2">
                                        <div class="form-group">
                                            <label>رابط المشروع</label>
                                            <input type="url" name="project_link[]" value="<?php echo htmlspecialchars($project['link'] ?? ''); ?>" />
                                        </div>
                                        <div class="form-group image-group">
                                            <label>صورة المشروع</label>
                                            <?php if (!empty($project['image'])): ?>
                                                <img src="<?php echo htmlspecialchars($project['image']); ?>" alt="صورة المشروع" class="preview" />
                                            <?php endif; ?>
                                            <input type="file" name="project_image[]" accept="image/*" />
                                            <input type="hidden" name="project_image_existing[]" value="<?php echo htmlspecialchars($project['image'] ?? ''); ?>" />
                                        </div>
                                    </div>
                                    <button type="button" class="remove-btn" onclick="removeItem(this)">حذف</button>
                                </div>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </section>

                <section class="card" id="contacts-section">
                    <h2>بيانات التواصل</h2>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>البريد الإلكتروني</label>
                            <input type="email" name="contact_email" value="<?php echo htmlspecialchars($contacts['email'] ?? ''); ?>" />
                        </div>
                        <div class="form-group">
                            <label>رقم الهاتف</label>
                            <input type="text" name="contact_phone" value="<?php echo htmlspecialchars($contacts['phone'] ?? ''); ?>" />
                        </div>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>رقم واتساب (بدون +)</label>
                            <input type="text" name="contact_whatsapp" value="<?php echo htmlspecialchars($contacts['whatsapp'] ?? ''); ?>" />
                        </div>
                        <div class="form-group">
                            <label>رابط لينكدإن</label>
                            <input type="url" name="contact_linkedin" value="<?php echo htmlspecialchars($contacts['linkedin'] ?? ''); ?>" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>رابط GitHub</label>
                        <input type="url" name="contact_github" value="<?php echo htmlspecialchars($contacts['github'] ?? ''); ?>" />
                    </div>

                    <?php $social = $contacts['socialLinks'] ?? []; ?>
                    <h2 style="margin-top:0.6rem;">روابط أيقونات السوشيال (البار الثاني)</h2>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>Facebook</label>
                            <input type="url" name="social_facebook" value="<?php echo htmlspecialchars($social['facebook'] ?? ''); ?>" />
                        </div>
                        <div class="form-group">
                            <label>Instagram</label>
                            <input type="url" name="social_instagram" value="<?php echo htmlspecialchars($social['instagram'] ?? ''); ?>" />
                        </div>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>X (Twitter)</label>
                            <input type="url" name="social_x" value="<?php echo htmlspecialchars($social['x'] ?? ''); ?>" />
                        </div>
                        <div class="form-group">
                            <label>YouTube</label>
                            <input type="url" name="social_youtube" value="<?php echo htmlspecialchars($social['youtube'] ?? ''); ?>" />
                        </div>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>TikTok</label>
                            <input type="url" name="social_tiktok" value="<?php echo htmlspecialchars($social['tiktok'] ?? ''); ?>" />
                        </div>
                        <div class="form-group">
                            <label>Snapchat</label>
                            <input type="url" name="social_snapchat" value="<?php echo htmlspecialchars($social['snapchat'] ?? ''); ?>" />
                        </div>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>Telegram</label>
                            <input type="url" name="social_telegram" value="<?php echo htmlspecialchars($social['telegram'] ?? ''); ?>" />
                        </div>
                        <div class="form-group">
                            <label>LinkedIn</label>
                            <input type="url" name="social_linkedin" value="<?php echo htmlspecialchars($social['linkedin'] ?? ($contacts['linkedin'] ?? '')); ?>" />
                        </div>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>WhatsApp Link</label>
                            <input type="url" name="social_whatsapp" value="<?php echo htmlspecialchars($social['whatsapp'] ?? ''); ?>" />
                        </div>
                        <div class="form-group">
                            <label>GitHub</label>
                            <input type="url" name="social_github" value="<?php echo htmlspecialchars($social['github'] ?? ($contacts['github'] ?? '')); ?>" />
                        </div>
                    </div>
                </section>

                <section class="card" id="settings-section">
                    <h2>الإعدادات</h2>
                    <div class="form-group">
                        <label>وضع الألوان الافتراضي</label>
                        <select name="default_theme">
                            <option value="light" <?php echo ($settings['defaultTheme'] ?? 'light') === 'light' ? 'selected' : ''; ?>>وضع فاتح</option>
                            <option value="dark" <?php echo ($settings['defaultTheme'] ?? 'light') === 'dark' ? 'selected' : ''; ?>>وضع داكن</option>
                        </select>
                    </div>
                </section>

                <div class="form-actions">
                    <button type="submit" class="btn primary">حفظ جميع التغييرات</button>
                </div>
            </form>
        </main>
    </div>

    <script src="assets/js/admin.js"></script>
</body>
</html>
