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
  }, { passive: true });
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
  }, { passive: true });
}

function smartToc() {
  function update({toc, tocLinks}) {
    if (window.scrollY == 0) {
      toc.querySelectorAll("a.active").forEach((activeLink) => {
        activeLink.classList.remove("active");
      });
      return;
    }
    tocLinks.forEach((tocLink) => {
      const boundingRect = document.getElementById(tocLink.getAttribute("href").substring(1)).getBoundingClientRect();
      if (boundingRect.top <= 100 && boundingRect.bottom >= 0) {
        toc.querySelectorAll("a.active").forEach((activeLink) => {
          if (activeLink.getAttribute("href") == tocLink.getAttribute("href")) {
            return;
          }
          activeLink.classList.remove("active");
        });
        tocLink.classList.add("active");
      }
    });
  }

  function init() {
    if (window.innerWidth < 1024) {
      return;
    }
    const toc = document.querySelector("#TableOfContents");
    if (!toc) {
      return;
    }
    const tocLinks = toc.querySelectorAll("a");
    if (tocLinks.length == 0) {
      return;
    }

    window.addEventListener("scroll", () => update({toc, tocLinks}), { passive: true });
    window.addEventListener("hashchange", () => update({toc, tocLinks}), { passive: true });
  }

  init();
}
