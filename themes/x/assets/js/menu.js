var menuButton = document.getElementById("menu-button");
var menuList = document.getElementById("menu-list");

menuButton.addEventListener("click", () => {
  menuList.style.display = (getComputedStyle(menuList).display === "none") ? "block" : "none";
});
