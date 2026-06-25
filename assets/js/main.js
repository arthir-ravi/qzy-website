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
      if (icon) icon.src = "assets/images/logo/qzy-logo-pink.png";
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

  // section menu active
  function onScroll(event) {
    var sections = document.querySelectorAll(".page-scroll");
    var scrollPos =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var currLink = sections[i];
      var val = currLink.getAttribute("href");
      var refElement = document.querySelector(val);
      var scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".page-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  var pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      var offset;
      if (window.innerWidth >= 1200) {
        offset = 20;
      } else if (window.innerWidth >= 992) {
        offset = 30;
      } else if (window.innerWidth >= 768) {
        offset = 45;
      } else {
        offset = 60;
      }

      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: "smooth",
      });
    });
  });

  // Contact form WhatsApp redirect
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var fullName = document.getElementById("contactName").value.trim();
      var businessName = document
        .getElementById("contactBusiness")
        .value.trim();
      var phoneNumber = document.getElementById("contactPhone").value.trim();
      var emailAddress = document.getElementById("contactEmail").value.trim();
      var message = document.getElementById("contactMessage").value.trim();
      var whatsappNumber = "919443356858";

      if (
        !fullName ||
        !businessName ||
        !phoneNumber ||
        !emailAddress ||
        !message
      ) {
        alert("Please fill in all required fields.");
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

      window.location.href =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);
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
