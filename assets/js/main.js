/*
Template: QueueEasy - Smart Queue Management System
*/

(function () {
  //===== Prealoder

  window.onload = function () {
    window.setTimeout(fadeout, 500);
  };

  function fadeout() {
    var preloader = document.querySelector(".preloader");
    if (!preloader) return;

    preloader.classList.add("is-hidden");
    window.setTimeout(function () {
      preloader.style.display = "none";
    }, 400);
  }

  /*=====================================
    Sticky
    ======================================= */
  window.onscroll = function () {
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;

    var logo = document.querySelector(".navbar-brand img");
    if (window.scrollY > sticky) {
      header_navbar.classList.add("sticky");
      // Swap wordmark and icon to pink (dark) version for white sticky background
      var wordmark = document.querySelector(".navbar-brand .qe-wordmark");
      if (wordmark)
        wordmark.src = "assets/images/logo/queueeasy-wordmark-dark.svg";
      var icon = document.querySelector(".navbar-brand .qe-icon");
      if (icon) icon.src = "assets/images/logo/qzy-logo-green.png";
    } else {
      header_navbar.classList.remove("sticky");
      // Restore white wordmark and icon for pink hero background
      var wordmark = document.querySelector(".navbar-brand .qe-wordmark");
      if (wordmark)
        wordmark.src = "assets/images/logo/queueeasy-wordmark-white.svg";
      var icon = document.querySelector(".navbar-brand .qe-icon");
      if (icon) icon.src = "assets/images/logo/qzy-logo-white.png";
    }

    // show or hide the back-top-top button
    var backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "flex";
    } else {
      backToTo.style.display = "none";
    }
  };

  function getScrollOffset() {
    var header = document.querySelector(".navbar-area");
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    return headerHeight + 25;
  }

  function getSectionHeading(target) {
    if (target.id === "home") return target;
    return (
      target.querySelector(".section-title") ||
      target.querySelector(".about-label") ||
      target.querySelector(".contact-label") ||
      target
    );
  }

  // section menu active
  function onScroll(event) {
    var sections = document.querySelectorAll("#nav .page-scroll");
    var scrollPos =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var currLink = sections[i];
      var val = currLink.getAttribute("href");
      var refElement = document.querySelector(val);
      var scrollTopMinus = scrollPos + getScrollOffset();
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        var activeLink = document.querySelector("#nav .page-scroll.active");
        if (activeLink) activeLink.classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  var pageLink = document.querySelectorAll(
    '.page-scroll, .footer .f-link a[href^="#"]'
  );

  pageLink.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (!href || href === "#") return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      var scrollTarget = getSectionHeading(target);

      window.scrollTo({
        top:
          scrollTarget.getBoundingClientRect().top +
          window.pageYOffset -
          getScrollOffset(),
        behavior: "smooth",
      });
    });
  });

  // Contact form WhatsApp redirect
  var contactForm = document.getElementById("contactForm");
  function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add("error");
    document.getElementById(errorId).textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(function (el) {
      el.textContent = "";
    });

    document
      .querySelectorAll("#contactForm input, #contactForm textarea")
      .forEach(function (el) {
        el.classList.remove("error");
      });
  }

  if (contactForm) {
    document
      .querySelectorAll("#contactForm input, #contactForm textarea")
      .forEach(function (field) {
        field.addEventListener("input", function () {
          this.classList.remove("error");

          const error = this.parentElement.querySelector(".error-message");
          if (error) {
            error.textContent = "";
          }
        });
      });

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      var fullName = document.getElementById("contactName").value.trim();
      var businessName = document
        .getElementById("contactBusiness")
        .value.trim();
      var phoneNumber = document.getElementById("contactPhone").value.trim();
      var emailAddress = document.getElementById("contactEmail").value.trim();
      var message = document.getElementById("contactMessage").value.trim();
      var whatsappNumber = "919443356858";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;
      if (!fullName) {
        showError("contactName", "nameError", "Please enter your full name.");
        isValid = false;
      }
      if (!emailAddress) {
        showError(
          "contactEmail",
          "emailError",
          "Please enter your email address."
        );
        isValid = false;
      } else if (!emailRegex.test(emailAddress)) {
        showError(
          "contactEmail",
          "emailError",
          "Please enter a valid email address."
        );
        isValid = false;
      }
      if (phoneNumber && !/^[0-9]{10}$/.test(phoneNumber)) {
        showError(
          "contactPhone",
          "phoneError",
          "Please enter a valid phone number."
        );
        isValid = false;
      }
      if (!message) {
        showError(
          "contactMessage",
          "messageError",
          "Please describe your business requirement."
        );
        isValid = false;
      }

      if (!isValid) {
        const firstError = document.querySelector(".error");
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      var whatsappMessage =
        "Hello QueueEasy Team,\n\n" +
        "Name: " +
        fullName +
        "\n" +
        "Business: " +
        businessName +
        "\n" +
        "Phone: " +
        phoneNumber +
        "\n" +
        "Email: " +
        emailAddress +
        "\n\n" +
        "Message:\n" +
        message;

      var whatsappUrl =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);
      
      window.open(whatsappUrl, "_blank");
    });
  }

  // WOW active
  new WOW().init();

  let filterButtons = document.querySelectorAll(
    ".portfolio-btn-wrapper button"
  );
  filterButtons.forEach((e) =>
    e.addEventListener("click", () => {
      let filterValue = event.target.getAttribute("data-filter");
      iso.arrange({
        filter: filterValue,
      });
    })
  );

  var elements = document.getElementsByClassName("portfolio-btn");
  for (var i = 0; i < elements.length; i++) {
    elements[i].onclick = function () {
      var el = elements[0];
      while (el) {
        if (el.tagName === "BUTTON") {
          el.classList.remove("active");
        }
        el = el.nextSibling;
      }
      this.classList.add("active");
    };
  }

  //===== mobile-menu-btn
  let navbarToggler = document.querySelector(".mobile-menu-btn");
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
  });
})();
