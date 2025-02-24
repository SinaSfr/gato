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
    emailIcon.forEach((icon) => {
      icon.addEventListener("click", function () {
        if (window.innerWidth < 1024) {
          emailPopup.style.opacity = "1";
          emailPopup.style.transform = "translateX(0)";
          emailPopup.style.pointerEvents = "auto";
        } else {
          emailPopup.style.position = "fixed";
          emailPopup.style.top = "50%";
          emailPopup.style.left = "50%";
          emailPopup.style.right = "auto";
          emailPopup.style.transform = "translate(-50%, -50%)";
          emailPopup.style.opacity = "1";
          emailPopup.style.pointerEvents = "auto";
        }
      });
    });

    closeIcon.addEventListener("click", function () {
      if (window.innerWidth < 1024) {
        emailPopup.style.opacity = "0";
        emailPopup.style.transform = "translateX(100%)";
        emailPopup.style.pointerEvents = "none";
      } else {
        emailPopup.style.opacity = "0";
        emailPopup.style.pointerEvents = "none";
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
        fetchContentTour.innerHTML =
          "<p>مشکلی در دریافت اطلاعات رخ داد: " + error.message + "</p>";
      }
    }
  }

  firstContent();
  reinitializeSwiper();

  tourLis.forEach((item) => {
    item.addEventListener("click", function () {
      tourLis.forEach((li) => {
        li.style.backgroundColor = "";
        li.style.color = "";
      });

      item.style.color = "#008a8c";

      const cmsQuery = item.getAttribute("data-id");

      const parentContainer = item.closest(".tour-container");
      if (!parentContainer) return;
      const fetchContentTour = parentContainer.querySelector(
        ".fetch-content-tour"
      );

      if (!fetchContentTour) return;

      async function secondContent() {
        try {
          fetchContentTour.innerHTML =
            '<div class="flex justify-center w-full"><span class="loader-fetch"></span></div>';

          const secondResponse = await fetch(
            `/tour-load-items.bc?catid=${cmsQuery}`
          );
          if (!secondResponse.ok) {
            throw new Error(`HTTP error! Status: ${secondResponse.status}`);
          }
          const secondData = await secondResponse.text();
          fetchContentTour.innerHTML = secondData;
        } catch (error) {
          console.error("Fetch failed:", error);
          fetchContentTour.innerHTML =
            "<p>مشکلی در دریافت اطلاعات رخ داد: " + error.message + "</p>";
        }
      }

      secondContent();
      reinitializeSwiper();
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
        // if (pathnamehome) {
        //   if (pathnamehome == "/hotel") {
        //     sessionStorage.setItem("pageName", "hotel");
        //     $("#flight-type-items").hide();
        //     $("#Hotel").addClass("active-module");
        //     $("#Hotel").siblings("li").removeClass("active-module");
        //     $("#item-Hotel").show();
        //     $(
        //       "#item-Flight,#item-Tour,#item-FlightHotel,#item-Insurance,#item-Train"
        //     ).hide();
        //     $(".bg-background-banner").children().addClass("hidden");
        //     $(".bg-background-banner")
        //       .find("#hotel-title")
        //       .removeClass("hidden");
        //     // changeParentBackground("hotelmodule-bg");
        //     $("#Hotel").click(function () {
        //       $("#flight-type-items").hide();
        //       $(".nav-module").each(function () {
        //         var checknav = $(this).attr("data-nav");
        //         if (checknav == "hotel") {
        //           $(this).addClass("nav-module-selected");
        //         } else {
        //           $(this).removeClass("nav-module-selected");
        //         }
        //       });
        //       LoadHotel();
        //     });
        //   } else if (pathnamehome == "/flight") {
        //     sessionStorage.setItem("pageName", "flight");
        //     $("#flight-type-items").show();
        //     $("#Flight").addClass("active-module");
        //     $("#Flight").siblings("li").removeClass("active-module");
        //     $("#item-Flight").show();
        //     $(
        //       "#item-Hotel,#item-Tour,#item-FlightHotel,#item-Insurance,#item-Train"
        //     ).hide();
        //     $(".bg-background-banner").children().addClass("hidden");
        //     $(".bg-background-banner")
        //       .find("#flight-title")
        //       .removeClass("hidden");
        //     // changeParentBackground("flightmodule-bg");
        //     $("#Flight").click(function () {
        //       $("#flight-type-items").show();
        //       $(".nav-module").each(function () {
        //         var checknav = $(this).attr("data-nav");
        //         if (checknav == "flight") {
        //           $(this).addClass("nav-module-selected");
        //         } else {
        //           $(this).removeClass("nav-module-selected");
        //         }
        //       });
        //       LoadFlight();
        //     });
        //   } else if (pathnamehome == "/flighthotel") {
        //     sessionStorage.setItem("pageName", "flighthotel");
        //     $("#flight-type-items").hide();
        //     $("#FlightHotel").addClass("active-module");
        //     $("#FlightHotel").siblings("li").removeClass("active-module");
        //     $("#item-FlightHotel").show();
        //     $(
        //       "#item-Flight,#item-Hotel,#item-Tour,#item-Insurance,#item-Train"
        //     ).hide();
        //     $(".bg-background-banner").children().addClass("hidden");
        //     $(".bg-background-banner")
        //       .find("#flighthotel-title")
        //       .removeClass("hidden");
        //     // changeParentBackground("flighthotelmodule-bg");
        //   } else if (pathnamehome == "/tour") {
        //     sessionStorage.setItem("pageName", "tour");
        //     $("#flight-type-items").hide();
        //     $("#Tour").addClass("active-module");
        //     $("#Tour").siblings("li").removeClass("active-module");
        //     $("#item-Tour").show();
        //     $(
        //       "#item-Flight,#item-Hotel,#item-FlightHotel,#item-Insurance,#item-Train"
        //     ).hide();
        //     $(".bg-background-banner").children().addClass("hidden");
        //     $(".bg-background-banner")
        //       .find("#tour-title")
        //       .removeClass("hidden");
        //     // changeParentBackground("tourmodule-bg");
        //   } else {
        //     sessionStorage.setItem("pageName", "home");
        //     $("#flight-type-items").show();
        //     $("#Flight").siblings("li").removeClass("active-module");
        //     if (innerWidth > 1024) {
        //       $("#Flight").addClass("active-module");
        //     }
        //     $("#item-Flight").show();
        //     $(
        //       "#item-Hotel,#item-Tour,#item-FlightHotel,#item-Insurance,#item-Train"
        //     ).hide();
        //     // changeParentBackground("flightmodule-bg");
        //     $("#Tour").click(function () {
        //       $("#flight-type-items").hide();
        //       $(".nav-module").each(function () {
        //         var checknav = $(this).attr("data-nav");
        //         if (checknav == "tour") {
        //           $(this).addClass("nav-module-selected");
        //         } else {
        //           $(this).removeClass("nav-module-selected");
        //         }
        //       });
        //       LoadTour();
        //     });
        //   }
        // }
      }
    };
  } catch (error) {}
}

function uploadDocumentFooter(args) {
  document.querySelector("#footer-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#footer-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#footer-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadFooter", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaFooter(e) {
  $bc.setSource("captcha.refreshFooter", true);
}

async function OnProcessedEditObjectFooter(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#footer-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#footer-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaFooter();
    setTimeout(() => {
      document.querySelector(
        "#footer-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#footer-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormFooter() {
  var inputElementVisa7 = document.querySelector(
    " .email-footer-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");
}

// visa form
function uploadDocumentVisa(args) {
  document.querySelector("#visa-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#visa-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#visa-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadVisa", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaVisa(e) {
  $bc.setSource("captcha.refreshVisa", true);
}

async function OnProcessedEditObjectVisa(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#visa-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#visa-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaVisa();
    setTimeout(() => {
      document.querySelector("#visa-form-resize .Loading_Form").style.display =
        "none";
      document.querySelector("#visa-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormVisa() {
  var inputElementVisa7 = document.querySelector(
    ".name-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام *");

  var inputElementVisa7 = document.querySelector(
    " .family-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام خانوادگی*");

  var inputElementVisa7 = document.querySelector(
    ".previous-name-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute(
    "placeholder",
    "نام قبلی ( در صورت تغییر نام )"
  );

  var inputElementVisa7 = document.querySelector(
    " .birth-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "تاریخ تولد*");

  var inputElementVisa7 = document.querySelector(
    ".birth-place-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "محل تولد*");

  var inputElementVisa7 = document.querySelector(
    " .nationality-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ملیت*");

  var inputElementVisa7 = document.querySelector(
    ".previous-nationality-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ملیت قبلی ( در صورت وجود)");

  var inputElementVisa8 = document.querySelector(
    ".address-form textarea[data-bc-text-input]"
  );
  inputElementVisa8.setAttribute("placeholder", "آدرس محل سکونت*");

  var inputElementVisa7 = document.querySelector(
    ".phone-number-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "شماره تماس*");

  var inputElementVisa7 = document.querySelector(
    " .fixed-number-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "شماره ثابت");

  var inputElementVisa7 = document.querySelector(
    ".email-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل*");

  var inputElementVisa7 = document.querySelector(
    ".nationality-form-two input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ملیت*");

  var inputElementVisa7 = document.querySelector(
    " .passport-number-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "شماره پاسپورت*");

  var inputElementVisa7 = document.querySelector(
    ".issue-date-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "تاریخ صدور*");

  var inputElementVisa7 = document.querySelector(
    " .expire-date-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "تاریخ انقضا*");
  var inputElementVisa7 = document.querySelector(
    " .country-passport-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "کشور صادرکننده پاسپورت*");
  var inputElementVisa7 = document.querySelector(
    " .destination-country-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "کشور مقصد*");
  var inputElementVisa7 = document.querySelector(
    " .date-in-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "تاریخ ورود مورد انتظار");

  var inputElementVisa7 = document.querySelector(
    " .date-out-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "تاریخ خروج مورد انتظار");

  var inputElementVisa7 = document.querySelector(
    " .sponsor-name-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام اسپانسر");

  var inputElementVisa7 = document.querySelector(
    " .componey-name-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام شرکت یا موسسه آموزشی");

  var inputElementVisa7 = document.querySelector(
    " .componey-address-form textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute(
    "placeholder",
    "آدرس و شماره تماس کارفرما یا دانشگاه"
  );

  var inputElementVisa7 = document.querySelector(
    " .wife-name-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام و اطلاعات همسر");

  var inputElementVisa7 = document.querySelector(
    " .number-child-form textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "تعداد فرزندان و اطلاعات آنها");

  var inputElementVisa7 = document.querySelector(
    " .completion-date-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "تاریخ تکمیل فرم");
}

//form contact
function uploadDocumentContact(args) {
  document.querySelector("#contact-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadContact", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaContact(e) {
  $bc.setSource("captcha.refreshContact", true);
}

async function OnProcessedEditObjectContact(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#contact-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#contact-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaContact();
    setTimeout(() => {
      document.querySelector(
        "#contact-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#contact-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormContact() {
  var inputElementVisa7 = document.querySelector(
    " .email-question-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");

  var inputElementVisa7 = document.querySelector(
    " .message-question-form textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "متن");
}

// header form

function uploadDocumentHeader(args) {
  document.querySelector("#header-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#header-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#header-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadHeader", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaHeader(e) {
  $bc.setSource("captcha.refreshHeader", true);
}

async function OnProcessedEditObjectHeader(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#header-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#header-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaHeader();
    setTimeout(() => {
      document.querySelector(
        "#header-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#header-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormHeader() {
  var inputElementVisa7 = document.querySelector(
    " .name-header-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام");

  var inputElementVisa7 = document.querySelector(
    " .family-header-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام خانوادگی");
  var inputElementVisa7 = document.querySelector(
    " .email-header-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");

  var inputElementVisa7 = document.querySelector(
    " .phone-header-form input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "شماره تماس");

  var inputElementVisa7 = document.querySelector(
    " .message-header-form textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "متن");
}

// swiper
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
      delay: 3000,
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
      delay: 3500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
// if (document.querySelector(".swiper-luxury-tours")) {
//   var swiperLuxuryTours = new Swiper(".swiper-luxury-tours", {
//     slidesPerView: 'auto',
//     speed: 400,
//     centeredSlides: false,
//     spaceBetween: 8,
//     grabCursor: true,
//     autoplay: {
//       delay: 2500,
//       disableOnInteraction: false,
//     },
//     // loop: true,
//     pagination: {
//       el: ".swiper-pagination",
//       type: "progressbar",
//     },
//   });
// }

function reinitializeSwiper() {
  if (swiperLuxuryTours) {
    swiperLuxuryTours.destroy(true, true);
  }

  if (document.querySelector(".swiper-luxury-tours")) {
    var swiperLuxuryTours = new Swiper(".swiper-luxury-tours", {
      slidesPerView: 3,
      speed: 400,
      centeredSlides: false,
      spaceBetween: 8,
      grabCursor: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
    });
  }

  if (swiperEndTours) {
    swiperEndTours.destroy(true, true);
  }

  if (document.querySelector(".swiper-end-tours")) {
    var swiperEndTours = new Swiper(".swiper-end-tours", {
      slidesPerView: 3,
      speed: 400,
      centeredSlides: false,
      spaceBetween: 8,
      grabCursor: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
    });
  }

  if (swiperExhibitionTours) {
    swiperExhibitionTours.destroy(true, true);
  }
  if (document.querySelector(".swiper-exhibition-tours")) {
    var swiperExhibitionTours = new Swiper(".swiper-exhibition-tours", {
      slidesPerView: 3,
      speed: 400,
      centeredSlides: false,
      spaceBetween: 8,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
    });
  }
}

if (document.querySelector(".swiper-travel")) {
  var swiperTravel = new Swiper(".swiper-travel", {
    slidesPerView: 9,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 12,
    grabCursor: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
if (document.querySelector(".swiper-special-tour")) {
  var swiperSpecialTour = new Swiper(".swiper-special-tour", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    loop: true,
  });
}
if (document.querySelector(".swiper-special-tour-mobile")) {
  var swiperSpecialTourMobile = new Swiper(".swiper-special-tour-mobile", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    loop: true,
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
      delay: 6500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}
if (document.querySelector(".swiper-travel-visa")) {
  var swiperTravelVisa = new Swiper(".swiper-travel-visa", {
    slidesPerView: 9,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 12,
    grabCursor: true,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });
}

if (document.querySelector(".swiper-image-slider1-mobile")) {
  var swiperImageSlider1Mobile = new Swiper(".swiper-image-slider1-mobile", {
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
if (document.querySelector(".swiper-image-slider2-mobile")) {
  var swiperImageSlider2Mobile = new Swiper(".swiper-image-slider2-mobile", {
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
if (document.querySelector(".swiper-popular-tours-mobile")) {
  var swiperPopularToursMobile = new Swiper(".swiper-popular-tours-mobile", {
    slidesPerView: 1.3,
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
if (document.querySelector(".swiper-travel-mobile")) {
  var swiperTravelMobile = new Swiper(".swiper-travel-mobile", {
    slidesPerView: 1.3,
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
if (document.querySelector(".swiper-visa-mobile")) {
  var swiperVisaMobile = new Swiper(".swiper-visa-mobile", {
    slidesPerView: 1.3,
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

if (document.querySelector(".swiper-travel-visa-mobile")) {
  var swiperTravelVisaMobile = new Swiper(".swiper-travel-visa-mobile", {
    slidesPerView: 1.3,
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

if (document.querySelector(".swiper-article-travel-mobile")) {
  var swiperTravelMobile = new Swiper(".swiper-article-travel-mobile", {
    slidesPerView: 1.3,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 12,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
  });
}
