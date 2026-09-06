(function () {
  "use strict";

  // ---------- page-load cover ----------
  var cover = document.querySelector("[data-cover]");
  window.addEventListener("load", function () {
    requestAnimationFrame(function () {
      cover && cover.classList.add("is-hidden");
    });
  });

  // ---------- sticky nav state ----------
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- mobile menu ----------
  var toggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", function () {
    var open = mobileMenu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      mobileMenu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // ---------- scroll reveal ----------
  var revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(function (el) {
    var delay = el.getAttribute("data-reveal-delay");
    if (delay) el.style.setProperty("--reveal-delay", delay);
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---------- gallery carousel ----------
  var track = document.getElementById("carouselTrack");
  var slides = track ? Array.prototype.slice.call(track.children) : [];
  var currentEl = document.getElementById("slideCurrent");
  var totalEl = document.getElementById("slideTotal");
  var prevBtn = document.getElementById("prevSlide");
  var nextBtn = document.getElementById("nextSlide");
  var index = 0;
  var autoplayId = null;

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    if (currentEl) currentEl.textContent = pad(index + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayId = window.setInterval(function () { goTo(index + 1); }, 5000);
  }
  function stopAutoplay() {
    if (autoplayId) window.clearInterval(autoplayId);
  }

  if (track && slides.length) {
    track.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    if (totalEl) totalEl.textContent = pad(slides.length);
    goTo(0);
    startAutoplay();

    prevBtn.addEventListener("click", function () { goTo(index - 1); startAutoplay(); });
    nextBtn.addEventListener("click", function () { goTo(index + 1); startAutoplay(); });

    var carousel = document.getElementById("carousel");
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // basic touch swipe
    var touchStartX = 0;
    track.addEventListener("touchstart", function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
      startAutoplay();
    }, { passive: true });
  }

  // ---------- MLS search form (no backend on this static build) ----------
  var mlsForm = document.getElementById("mlsForm");
  var mlsNote = document.getElementById("mlsNote");
  if (mlsForm) {
    mlsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      mlsNote.textContent =
        "Live MLS/IDX results aren’t connected on this preview — call (206) 919-6886 and Marci will pull matching listings for you.";
    });
  }

  // ---------- contact form (no backend on this static build) ----------
  var contactForm = document.getElementById("contactForm");
  var contactNote = document.getElementById("contactNote");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      contactNote.textContent = "Thanks — this demo form isn’t wired to an inbox yet. Call (206) 919-6886 in the meantime.";
      contactForm.reset();
    });
  }

  // ---------- cookie banner ----------
  var cookieBanner = document.getElementById("cookieBanner");
  var cookieAccept = document.getElementById("cookieAccept");
  try {
    if (cookieBanner && !window.localStorage.getItem("mm_cookies_accepted")) {
      window.setTimeout(function () { cookieBanner.classList.add("is-visible"); }, 1200);
    }
    cookieAccept && cookieAccept.addEventListener("click", function () {
      cookieBanner.classList.remove("is-visible");
      try { window.localStorage.setItem("mm_cookies_accepted", "1"); } catch (err) {}
    });
  } catch (err) {
    // localStorage unavailable — skip persistence, banner just won't reappear this tab
  }

  // ---------- footer year ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
