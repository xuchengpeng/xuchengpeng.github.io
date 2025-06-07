window.addEventListener("DOMContentLoaded", (_) => {
  headerShadow();
  scrollTop();
  smartToc();
});

function headerShadow() {
  var header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      header.classList.add("header-shadow");
    } else {
      header.classList.remove("header-shadow");
    }
  });
}

function scrollTop() {
  var toplink = document.getElementById("top-link");
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      toplink.style.visibility = "visible";
      toplink.style.opacity = "1";
    } else {
      toplink.style.visibility = "hidden";
      toplink.style.opacity = "0";
    }
  });
}

function smartToc() {
  var elements = document.querySelectorAll("#TableOfContents a");
  window.addEventListener("scroll", function () {
    if (window.innerWidth < 1024) {
      return;
    }
    if (window.scrollY <= 50) {
      document.querySelectorAll("#TableOfContents a.active").forEach((activeElement) => {
        activeElement.classList.remove("active");
      });
      return;
    }
    elements.forEach((element) => {
      const boundingRect = document.getElementById(element.getAttribute("href").substring(1)).getBoundingClientRect();
      if (boundingRect.top <= 100 && boundingRect.bottom >= 0) {
        document.querySelectorAll("#TableOfContents a.active").forEach((activeElement) => {
          if (activeElement.getAttribute("href") == element.getAttribute("href")) {
            return;
          }
          activeElement.classList.remove("active");
        });
        element.classList.add("active");
      }
    });
  });
}
