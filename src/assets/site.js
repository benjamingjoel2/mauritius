// Site-wide behaviour: mobile menu and header state on scroll. Everything
// works without this file: the nav simply shows as a list.
(function () {
  var root = document.documentElement;
  root.classList.add("js");

  // Mobile menu
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  if (toggle && menu) {
    var label = toggle.querySelector(".menu-toggle-label");
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      root.classList.toggle("menu-open", open);
      if (label) label.textContent = open ? "Close" : "Menu";
      // Keep keyboard focus inside the open menu.
      document.querySelectorAll("main, .site-footer, .skip-link").forEach(function (el) {
        if (open) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
      if (open) {
        var first = menu.querySelector("a");
        if (first) first.focus();
      }
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Header turns solid once you scroll past the top of the hero.
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
