window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("theme-toggle").addEventListener("click", () => {
    if (document.body.className.includes("dark")) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("pref-theme", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("pref-theme", "dark");
    }
  });
});