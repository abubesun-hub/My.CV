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
