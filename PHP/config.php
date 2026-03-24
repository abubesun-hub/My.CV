<?php
// Basic configuration for the CV website
// Change these credentials to secure your admin panel
$ADMIN_USERNAME = 'admin';
$ADMIN_PASSWORD = '123456'; // Change this to a strong password

// Path to JSON data file
$DATA_FILE = __DIR__ . '/data/data.json';

// Directory for uploaded images
$UPLOAD_DIR = __DIR__ . '/assets/images/';

// Helper function: load data from JSON
function load_cv_data() {
    global $DATA_FILE;
    if (!file_exists($DATA_FILE)) {
        return [
            'profile' => [
                'name' => 'Your Name',
                'title' => 'Your Job Title',
                'summary' => 'Short professional summary about yourself.',
                'location' => 'City, Country',
                'profileImage' => 'assets/images/profile.jpg'
            ],
            'experience' => [],
            'education' => [],
            'skills' => [],
            'projects' => [],
            'contacts' => [
                'email' => '',
                'phone' => '',
                'whatsapp' => '',
                'linkedin' => '',
                'github' => ''
            ],
            'settings' => [
                'defaultTheme' => 'light'
            ]
        ];
    }

    $json = file_get_contents($DATA_FILE);
    $data = json_decode($json, true);
    if (!is_array($data)) {
        $data = [];
    }
    return $data;
}

// Helper function: save data to JSON
function save_cv_data($data) {
    global $DATA_FILE;
    file_put_contents($DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Helper: start session safely
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Helper: check if admin is logged in
function is_admin_logged_in() {
    return !empty($_SESSION['admin_logged_in']);
}
?>
