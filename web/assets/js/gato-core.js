const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1024) {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
    // headerMenu.style.display = "none";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
    // headerMenu.style.display = "block";
  });
} else {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  toggleDropdowns.forEach((toggle, index) => {
    const submenu = toggle.nextElementSibling;
    const dropdownIcon = dropdownIcons[index];

    toggle.addEventListener("click", function () {
      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {
        submenu.style.maxHeight = "400px";
        submenu.style.opacity = "1";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const faqBox = document.querySelectorAll(".faq-box");
  const faqBtns = document.querySelectorAll(".faq-btn");
  const faqAnswers = document.querySelectorAll(".faq-answer");

  faqBox.forEach((button, index) => {
    button.addEventListener("click", function () {
      const faqAnswer = faqAnswers[index];
      const faqBtn = faqBtns[index];

      faqBtn.classList.toggle("rotate-180");
      // faqAnswer.classList.toggle("mt-2");

      if (faqAnswer.classList.contains("max-h-0")) {
        faqAnswer.classList.remove("max-h-0", "opacity-0");
        faqAnswer.classList.add("max-h-screen", "opacity-100");
      } else {
        faqAnswer.classList.add("max-h-0", "opacity-0");
        faqAnswer.classList.remove("max-h-screen", "opacity-100");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".email-icon")) {
    const emailIcon = document.querySelectorAll(".email-icon");
    const emailPopup = document.querySelector(".email-popup");
    const closeIcon = document.querySelector(".close-icon");

    // تغییرات مربوط به پاپ‌آپ برای موبایل و دسکتاپ
    emailIcon.forEach(icon => {
      icon.addEventListener("click", function () {
        if (window.innerWidth < 1024) {
          emailPopup.style.opacity = '1';
          emailPopup.style.transform = 'translateX(0)';
          emailPopup.style.pointerEvents = 'auto';
        } else {
          emailPopup.style.position = 'fixed';
          emailPopup.style.top = '50%';
          emailPopup.style.left = '50%';
          emailPopup.style.transform = 'translate(-40%, -50%)'; 
          emailPopup.style.opacity = '1';
          emailPopup.style.pointerEvents = 'auto';
        }
      });
    });

    closeIcon.addEventListener("click", function () {
      if (window.innerWidth < 1024) {
        emailPopup.style.opacity = '0';
        emailPopup.style.transform = 'translateX(100%)';
        emailPopup.style.pointerEvents = 'none';
      } else {
        emailPopup.style.opacity = '0';
        emailPopup.style.pointerEvents = 'none';
      }
    });
    
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentTours = document.querySelectorAll(".fetch-content-tour");
  const tourLis = document.querySelectorAll(".tour-li");

  async function firstContent() {
    for (let i = 0; i < fetchContentTours.length; i++) {
      const fetchContentTour = fetchContentTours[i];
      try {
        const catid = fetchContentTour.getAttribute("data-catid");
        const firstResponse = await fetch(`/tour-load-items.bc?catid=${catid}`);
        const firstData = await firstResponse.text();
        fetchContentTour.innerHTML = firstData;
      } catch (error) {
        console.error("Fetch failed:", error);
        fetchContentTour.innerHTML = "<p>مشکلی در دریافت اطلاعات رخ داد: " + error.message + "</p>";
      }
    }
  }

  firstContent();

  tourLis.forEach((item) => {
    item.addEventListener("click", function () {
      tourLis.forEach((li) => {
        li.style.backgroundColor = "";
        li.style.color = "";
      });

      // item.style.backgroundColor = "#445E87";
      item.style.color = "#008a8c";

      const cmsQuery = item.getAttribute("data-id");

      async function secondContent() {
        for (let i = 0; i < fetchContentTours.length; i++) {
          const fetchContentTour = fetchContentTours[i];
          try {
            const secondResponse = await fetch(`/tour-load-items.bc?catid=${cmsQuery}`);
            if (!secondResponse.ok) {
              throw new Error(`HTTP error! Status: ${secondResponse.status}`);
            }
            const secondData = await secondResponse.text();
            fetchContentTour.innerHTML = secondData;
          } catch (error) {
            console.error("Fetch failed:", error);
            fetchContentTour.innerHTML = "<p>مشکلی در دریافت اطلاعات رخ داد: " + error.message + "</p>";
          }
        }
      }

      if (swiperLuxuryTours) {
        swiperLuxuryTours.params.spaceBetween = 8; 
        swiperLuxuryTours.update(); 
      }
      secondContent();


    });
  });
});


function loadContentHomePage() {
  loadSearchEngine("search-engine.bc", "searchbox");
}
async function loadSearchEngine(url, sectionload) {
  try {
    var xhrobj = new XMLHttpRequest();
    xhrobj.open("GET", url);
    xhrobj.send();

    xhrobj.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var container = document.getElementById(sectionload);
        container.innerHTML = xhrobj.responseText;

        var scripts = container.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var scriptTag = document.createElement("script");

          if (scripts[i].src) {
            scriptTag.src = scripts[i].src;
            scriptTag.async = false;
          } else {
            scriptTag.text = scripts[i].textContent;
          }

          document.head
            .appendChild(scriptTag)
            .parentNode.removeChild(scriptTag);
        }

        const pathnamehome = window.location.pathname;
        if (pathnamehome) {
          if (pathnamehome == "/hotel") {
            sessionStorage.setItem("pageName", "hotel");
            $("#flight-type-items").hide();
            $("#Hotel").addClass("active-module");
            $("#Hotel").siblings("li").removeClass("active-module");
            $("#item-Hotel").show();
            $(
              "#item-Flight,#item-Tour,#item-FlightHotel,#item-Insurance,#item-Train"
            ).hide();
            $(".bg-background-banner").children().addClass("hidden");
            $(".bg-background-banner")
              .find("#hotel-title")
              .removeClass("hidden");
            // changeParentBackground("hotelmodule-bg");
            $("#Hotel").click(function () {
              $("#flight-type-items").hide();
              $(".nav-module").each(function () {
                var checknav = $(this).attr("data-nav");
                if (checknav == "hotel") {
                  $(this).addClass("nav-module-selected");
                } else {
                  $(this).removeClass("nav-module-selected");
                }
              });
              LoadHotel();
            });
          } else if (pathnamehome == "/flight") {
            sessionStorage.setItem("pageName", "flight");
            $("#flight-type-items").show();
            $("#Flight").addClass("active-module");
            $("#Flight").siblings("li").removeClass("active-module");
            $("#item-Flight").show();
            $(
              "#item-Hotel,#item-Tour,#item-FlightHotel,#item-Insurance,#item-Train"
            ).hide();
            $(".bg-background-banner").children().addClass("hidden");
            $(".bg-background-banner")
              .find("#flight-title")
              .removeClass("hidden");
            // changeParentBackground("flightmodule-bg");
            $("#Flight").click(function () {
              $("#flight-type-items").show();
              $(".nav-module").each(function () {
                var checknav = $(this).attr("data-nav");
                if (checknav == "flight") {
                  $(this).addClass("nav-module-selected");
                } else {
                  $(this).removeClass("nav-module-selected");
                }
              });
              LoadFlight();
            });
          } else if (pathnamehome == "/flighthotel") {
            sessionStorage.setItem("pageName", "flighthotel");
            $("#flight-type-items").hide();
            $("#FlightHotel").addClass("active-module");
            $("#FlightHotel").siblings("li").removeClass("active-module");
            $("#item-FlightHotel").show();
            $(
              "#item-Flight,#item-Hotel,#item-Tour,#item-Insurance,#item-Train"
            ).hide();
            $(".bg-background-banner").children().addClass("hidden");
            $(".bg-background-banner")
              .find("#flighthotel-title")
              .removeClass("hidden");
            // changeParentBackground("flighthotelmodule-bg");
          } else if (pathnamehome == "/tour") {
            sessionStorage.setItem("pageName", "tour");
            $("#flight-type-items").hide();
            $("#Tour").addClass("active-module");
            $("#Tour").siblings("li").removeClass("active-module");
            $("#item-Tour").show();
            $(
              "#item-Flight,#item-Hotel,#item-FlightHotel,#item-Insurance,#item-Train"
            ).hide();
            $(".bg-background-banner").children().addClass("hidden");
            $(".bg-background-banner")
              .find("#tour-title")
              .removeClass("hidden");
            // changeParentBackground("tourmodule-bg");
          } else {
            sessionStorage.setItem("pageName", "home");
            $("#flight-type-items").show();
            $("#Flight").siblings("li").removeClass("active-module");
            if (innerWidth > 1024) {
              $("#Flight").addClass("active-module");
            }
            $("#item-Flight").show();
            $(
              "#item-Hotel,#item-Tour,#item-FlightHotel,#item-Insurance,#item-Train"
            ).hide();
            // changeParentBackground("flightmodule-bg");
            $("#Tour").click(function () {
              $("#flight-type-items").hide();
              $(".nav-module").each(function () {
                var checknav = $(this).attr("data-nav");
                if (checknav == "tour") {
                  $(this).addClass("nav-module-selected");
                } else {
                  $(this).removeClass("nav-module-selected");
                }
              });
              LoadTour();
            });
          }
        }
      }
    };
  } catch (error) {}
}

if (document.querySelector(".swiper-image-slider1")) {
  var swiperImageSlider1 = new Swiper(".swiper-image-slider1", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
if (document.querySelector(".swiper-image-slider2")) {
  var swiperImageSlider2 = new Swiper(".swiper-image-slider2", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
if (document.querySelector(".swiper-popular-tours")) {
  var swiperPopularTours = new Swiper(".swiper-popular-tours", {
    slidesPerView: 4,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 12,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
if (document.querySelector(".swiper-luxury-tours")) {
  var swiperLuxuryTours = new Swiper(".swiper-luxury-tours", {
    slidesPerView: 'auto',
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
    },
    // loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
if (document.querySelector(".swiper-end-tours")) {
  var swiperEndTours = new Swiper(".swiper-end-tours", {
    slidesPerView: 3,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
if (document.querySelector(".swiper-exhibition-tours")) {
  var swiperExhibitionTours = new Swiper(".swiper-exhibition-tours", {
    slidesPerView: 3,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
if (document.querySelector(".swiper-travel")) {
  var swiperTravel = new Swiper(".swiper-travel", {
    slidesPerView: 9,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 12,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
if (document.querySelector(".swiper-visa")) {
  var swiperVisa = new Swiper(".swiper-visa", {
    slidesPerView: 4,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 12,
    grabCursor: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}

