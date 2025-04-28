var menuButton = document.getElementById("menu-button");
var mobileMenu = document.getElementById("mobile-menu");
var menuOpen = false;

menuButton.addEventListener("click", () => {
  if (!menuOpen) {
    menuOpen = true;
    mobileMenu.style.display = "block";
  } else {
    menuOpen = false;
    mobileMenu.style.display = "none";
  }
});
