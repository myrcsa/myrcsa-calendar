// myRCSA Calendar — small interactivity layer
// Mobile nav toggle, copy-to-clipboard, scroll-reveal.

(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Copy to clipboard ---- */
  var copyBtn = document.getElementById("copy-btn");
  if (copyBtn) {
    var defaultLabel = copyBtn.querySelector("span").textContent;
    copyBtn.addEventListener("click", function () {
      var targetId = copyBtn.getAttribute("data-copy-target");
      var input = document.getElementById(targetId);
      if (!input) return;

      var finish = function (label) {
        var span = copyBtn.querySelector("span");
        span.textContent = label;
        setTimeout(function () {
          span.textContent = defaultLabel;
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(input.value).then(
          function () { finish("Copied!"); },
          function () { fallbackCopy(input, finish); }
        );
      } else {
        fallbackCopy(input, finish);
      }
    });
  }

  function fallbackCopy(input, finish) {
    input.removeAttribute("readonly");
    input.select();
    input.setSelectionRange(0, input.value.length);
    try {
      document.execCommand("copy");
      finish("Copied!");
    } catch (e) {
      finish("Copy failed");
    }
    input.setAttribute("readonly", "true");
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
