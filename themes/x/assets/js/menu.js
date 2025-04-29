var menuButton = document.getElementById("menu-button");
var menuList = document.getElementById("menu-list");

menuButton.addEventListener("click", () => {
  menuList.classList.toggle("!block");
});
