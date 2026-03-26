<?php
require_once __DIR__ . '/config.php';
$data = load_cv_data();
$profile = $data['profile'] ?? [];
$experience = $data['experience'] ?? [];
$education = $data['education'] ?? [];
$skills = $data['skills'] ?? [];
$projects = $data['projects'] ?? [];
$contacts = $data['contacts'] ?? [];
$settings = $data['settings'] ?? [];
$defaultTheme = $settings['defaultTheme'] ?? 'light';
$socialLinks = $contacts['socialLinks'] ?? [];

if (empty($socialLinks['linkedin']) && !empty($contacts['linkedin'])) {
    $socialLinks['linkedin'] = $contacts['linkedin'];
}
if (empty($socialLinks['github']) && !empty($contacts['github'])) {
    $socialLinks['github'] = $contacts['github'];
}
if (empty($socialLinks['whatsapp']) && !empty($contacts['whatsapp'])) {
    $socialLinks['whatsapp'] = 'https://wa.me/' . preg_replace('/[^0-9]/', '', $contacts['whatsapp']);
}

$socialPlatforms = [
    'facebook' => 'FB',
    'instagram' => 'IG',
    'x' => 'X',
    'youtube' => 'YT',
    'tiktok' => 'TT',
    'snapchat' => 'SC',
    'telegram' => 'TG',
    'linkedin' => 'IN',
    'whatsapp' => 'WA',
    'github' => 'GH'
];
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>السيرة الذاتية - <?php echo htmlspecialchars($profile['name'] ?? ''); ?></title>
    <link rel="stylesheet" href="assets/css/style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
    <script>
        // Pass default theme from backend to frontend
        window.DEFAULT_THEME = '<?php echo $defaultTheme === 'dark' ? 'dark' : 'light'; ?>';
    </script>
</head>
<body>
    <div id="app" class="theme-light">
        <header class="hero" id="top">
            <div class="container hero-content fade-in">
                <div class="hero-image">
                    <img src="<?php echo htmlspecialchars($profile['profileImage'] ?? 'assets/images/profile.jpg'); ?>" alt="صورة شخصية" />
                </div>
                <div class="hero-text">
                    <h1><?php echo htmlspecialchars($profile['name'] ?? ''); ?></h1>
                    <h2><?php echo htmlspecialchars($profile['title'] ?? ''); ?></h2>
                    <p class="summary"><?php echo nl2br(htmlspecialchars($profile['summary'] ?? '')); ?></p>
                    <p class="location"><?php echo htmlspecialchars($profile['location'] ?? ''); ?></p>
                    <div class="hero-actions">
                        <a href="CV%20Ahmed%20Hussien%20Ali.pdf" class="btn primary" download>تحميل السيرة الذاتية PDF</a>
                        <a href="#contact" class="btn outline">تواصل معي</a>
                    </div>
                </div>
                <button id="themeToggle" class="theme-toggle" aria-label="تبديل وضع الألوان">
                    🌙
                </button>
            </div>
        </header>

        <nav class="main-nav">
            <div class="container nav-inner">
                <a href="#top" class="logo">السيرة الذاتية</a>
                <ul class="nav-links">
                    <li><a href="#experience">الخبرات</a></li>
                    <li><a href="#education">التعليم</a></li>
                    <li><a href="#skills">المهارات</a></li>
                    <li><a href="#projects">المشاريع</a></li>
                    <li><a href="#contact">التواصل</a></li>
                </ul>
            </div>
        </nav>

        <main>
            <section id="experience" class="section">
                <div class="container fade-in">
                    <h3 class="section-title">الخبرات العملية</h3>
                    <?php if (!empty($experience)): ?>
                        <div class="timeline">
                            <?php foreach ($experience as $item): ?>
                                <div class="timeline-item">
                                    <div class="timeline-date"><?php echo htmlspecialchars($item['period'] ?? ''); ?></div>
                                    <div class="timeline-content">
                                        <h4><?php echo htmlspecialchars($item['role'] ?? ''); ?></h4>
                                        <p class="company"><?php echo htmlspecialchars($item['company'] ?? ''); ?></p>
                                        <p><?php echo nl2br(htmlspecialchars($item['description'] ?? '')); ?></p>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <p class="placeholder">لم يتم إضافة خبرات بعد.</p>
                    <?php endif; ?>
                </div>
            </section>

            <section id="education" class="section alt">
                <div class="container fade-in">
                    <h3 class="section-title">التعليم</h3>
                    <?php if (!empty($education)): ?>
                        <div class="timeline">
                            <?php foreach ($education as $item): ?>
                                <div class="timeline-item">
                                    <div class="timeline-date"><?php echo htmlspecialchars($item['period'] ?? ''); ?></div>
                                    <div class="timeline-content">
                                        <h4><?php echo htmlspecialchars($item['degree'] ?? ''); ?></h4>
                                        <p class="company"><?php echo htmlspecialchars($item['institution'] ?? ''); ?></p>
                                        <p><?php echo nl2br(htmlspecialchars($item['description'] ?? '')); ?></p>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <p class="placeholder">لم يتم إضافة تعليم بعد.</p>
                    <?php endif; ?>
                </div>
            </section>

            <section id="skills" class="section">
                <div class="container fade-in">
                    <h3 class="section-title">المهارات</h3>
                    <?php if (!empty($skills)): ?>
                        <div class="skills-grid">
                            <?php foreach ($skills as $skill): ?>
                                <div class="skill">
                                    <div class="skill-header">
                                        <span class="skill-name"><?php echo htmlspecialchars($skill['name'] ?? ''); ?></span>
                                        <span class="skill-level"><?php echo intval($skill['level'] ?? 0); ?>%</span>
                                    </div>
                                    <div class="skill-bar">
                                        <div class="skill-bar-fill" style="width: <?php echo intval($skill['level'] ?? 0); ?>%"></div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <p class="placeholder">لم يتم إضافة مهارات بعد.</p>
                    <?php endif; ?>
                </div>
            </section>

            <section id="projects" class="section alt">
                <div class="container fade-in">
                    <h3 class="section-title">المشاريع والأعمال</h3>
                    <?php if (!empty($projects)): ?>
                        <div class="projects-grid">
                            <?php foreach ($projects as $project): ?>
                                <article class="project-card">
                                    <?php if (!empty($project['image'])): ?>
                                        <img src="<?php echo htmlspecialchars($project['image']); ?>" alt="<?php echo htmlspecialchars($project['title'] ?? ''); ?>" />
                                    <?php endif; ?>
                                    <div class="project-content">
                                        <h4><?php echo htmlspecialchars($project['title'] ?? ''); ?></h4>
                                        <p><?php echo nl2br(htmlspecialchars($project['description'] ?? '')); ?></p>
                                        <?php if (!empty($project['link'])): ?>
                                            <a href="<?php echo htmlspecialchars($project['link']); ?>" target="_blank" class="project-link">عرض المشروع</a>
                                        <?php endif; ?>
                                    </div>
                                </article>
                            <?php endforeach; ?>
                        </div>
                    <?php else: ?>
                        <p class="placeholder">لم يتم إضافة مشاريع بعد.</p>
                    <?php endif; ?>
                </div>
            </section>

            <section id="contact" class="section">
                <div class="container fade-in">
                    <h3 class="section-title">التواصل</h3>
                    <div class="contact-modern">
                        <div class="contact-primary-bar">
                            <ul class="contact-cards">
                                <?php if (!empty($contacts['email'])): ?>
                                    <li class="contact-card">
                                        <span class="contact-label">البريد الإلكتروني</span>
                                        <a class="contact-value" href="mailto:<?php echo htmlspecialchars($contacts['email']); ?>"><?php echo htmlspecialchars($contacts['email']); ?></a>
                                        <a class="contact-action" href="mailto:<?php echo htmlspecialchars($contacts['email']); ?>">أرسل بريد</a>
                                    </li>
                                <?php endif; ?>
                                <?php if (!empty($contacts['phone'])): ?>
                                    <li class="contact-card">
                                        <span class="contact-label">الهاتف</span>
                                        <a class="contact-value" href="tel:<?php echo htmlspecialchars($contacts['phone']); ?>"><?php echo htmlspecialchars($contacts['phone']); ?></a>
                                        <a class="contact-action" href="tel:<?php echo htmlspecialchars($contacts['phone']); ?>">اتصال مباشر</a>
                                    </li>
                                <?php endif; ?>
                                <?php if (!empty($contacts['whatsapp'])): ?>
                                    <li class="contact-card">
                                        <span class="contact-label">واتساب</span>
                                        <a class="contact-value" href="https://wa.me/<?php echo htmlspecialchars(preg_replace('/[^0-9]/', '', $contacts['whatsapp'])); ?>" target="_blank"><?php echo htmlspecialchars($contacts['whatsapp']); ?></a>
                                        <a class="contact-action" href="https://wa.me/<?php echo htmlspecialchars(preg_replace('/[^0-9]/', '', $contacts['whatsapp'])); ?>" target="_blank">مراسلة</a>
                                    </li>
                                <?php endif; ?>
                                <?php if (!empty($contacts['linkedin'])): ?>
                                    <li class="contact-card">
                                        <span class="contact-label">لينكدإن</span>
                                        <a class="contact-value" href="<?php echo htmlspecialchars($contacts['linkedin']); ?>" target="_blank"><?php echo htmlspecialchars(preg_replace('/^https?:\/\//', '', $contacts['linkedin'])); ?></a>
                                        <a class="contact-action" href="<?php echo htmlspecialchars($contacts['linkedin']); ?>" target="_blank">عرض الملف</a>
                                    </li>
                                <?php endif; ?>
                                <?php if (!empty($contacts['github'])): ?>
                                    <li class="contact-card">
                                        <span class="contact-label">جيت هاب</span>
                                        <a class="contact-value" href="<?php echo htmlspecialchars($contacts['github']); ?>" target="_blank"><?php echo htmlspecialchars(preg_replace('/^https?:\/\//', '', $contacts['github'])); ?></a>
                                        <a class="contact-action" href="<?php echo htmlspecialchars($contacts['github']); ?>" target="_blank">زيارة الحساب</a>
                                    </li>
                                <?php endif; ?>
                            </ul>
                        </div>
                        <div class="contact-social-bar">
                            <p class="social-title">تابعني على المنصات</p>
                            <div class="social-icons">
                                <?php foreach ($socialPlatforms as $platform => $abbr): ?>
                                    <?php $platformUrl = trim($socialLinks[$platform] ?? ''); ?>
                                    <?php if ($platformUrl !== ''): ?>
                                        <a href="<?php echo htmlspecialchars($platformUrl); ?>" target="_blank" class="social-icon" aria-label="<?php echo htmlspecialchars($platform); ?>"><?php echo htmlspecialchars($abbr); ?></a>
                                    <?php else: ?>
                                        <a href="#" class="social-icon disabled" aria-label="<?php echo htmlspecialchars($platform); ?>" aria-disabled="true"><?php echo htmlspecialchars($abbr); ?></a>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="footer">
            <div class="container">
                <p>© <?php echo date('Y'); ?> <?php echo htmlspecialchars($profile['name'] ?? ''); ?> - جميع الحقوق محفوظة.</p>
            </div>
        </footer>
    </div>

    <script src="assets/js/main.js"></script>
</body>
</html>
