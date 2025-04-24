const sitePreference = document.documentElement.getAttribute("data-default-appearance");
const userPreference = localStorage.getItem("appearance");

if ((sitePreference === "dark" && userPreference === null) || userPreference === "dark") {
  document.documentElement.classList.add("dark");
}

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("appearance-switcher").addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    var targetAppearance = document.documentElement.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("appearance", targetAppearance);
  });

  window.addEventListener("scroll", () => {
    var mybutton = document.getElementById("top-link");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      mybutton.style.visibility = "visible";
      mybutton.style.opacity = "1";
    } else {
      mybutton.style.visibility = "hidden";
      mybutton.style.opacity = "0";
    }
  });
});
