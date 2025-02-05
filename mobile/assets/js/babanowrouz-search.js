// function LoadSelection() {
//   let NavTitle = sessionStorage.getItem('pageName');
//   let stateObj = {
//     'pageName': ''
//   };
//   stateObj.pageName = NavTitle;
//   let pageUrl = './' + NavTitle;
//   history.pushState('', '', pageUrl);
//   let currentMenuIcon = $('.main-nav > li[data-nav="' + NavTitle + '"]');
//   currentMenuIcon.addClass('nav-module-selected');
//   currentMenuIcon.siblings().removeClass('nav-module-selected');
//   if (NavTitle == 'hotel' ) {
//     LoadHotel();
//   } else if (NavTitle == 'flight') {
//     LoadFlight();
//   } else if (NavTitle == 'flighthotel') {
//     LoadFlightHotel();
//   } else if (NavTitle == 'tour') {
//     LoadTour();
//   } else if (NavTitle == 'insurance') {
//     // LoadInsurane();
//     console.log("test" , navTitle);
//   } else if (NavTitle == 'train') {
//     // LoadTrain();
//     console.log("test" , navTitle);
//   }
// };

function train_search_isSubmited(element, event) {
  // event.preventDefault();
  let isValid = true;
  element
    .querySelectorAll("input[name=fdate],input[name=tdate]")
    .forEach((e) => {
      if (e.value == "" && !e.disabled) {
        event.preventDefault();
        if (e.classList.contains("date-value")) {
          e.closest("div").querySelector(".Basis_Date").style.border =
            "1px solid #f42e36";
        } else {
          e.style.border = "1px solid #f42e36";
        }
        isValid = false;
      }
    });


  if (element.getAttribute("data-form") == "train") {
    var ad = parseInt(element.querySelector(".adult").value),
      inf = 0,
      valueAdded = 1,
      ch = 0,
      sum = 0;
    element
      .querySelector(".section-select-age")
      .querySelectorAll("select")
      .forEach((e) => {
        var age = parseInt(e.value);
        ch += valueAdded;
        if (age < 3) {
          inf += valueAdded;
        }
      });
    sum = parseInt(ad + ch);
    if (inf > ad || sum > 10) {
      isValid = false;
      event.preventDefault();
      document.querySelector(".warning").classList.remove("unvisible");
      document.querySelector(".warning").classList.remove("hidden");
    }
  }

  if (isValid) {
    let georgiaDate = "";
    let georgiaDate_splited = "";
    if (element.querySelector("input[name=fdate]").value) {
      georgiaDate = element.querySelector("input[name=fdate]").value;
      georgiaDate_splited = georgiaDate.split("-");
    }
    if (
      parseInt(georgiaDate_splited[0]) > 1300 &&
      parseInt(georgiaDate_splited[0]) < 1500
    ) {
      georgiaDate = convert_jalali_toGregorian(georgiaDate);
    }
    if (element.getAttribute("data-form") == "train") {
      // console.log("is train")
      let select_age = "";
      element
        .querySelector(".section-select-age")
        .querySelectorAll("select")
        .forEach((e) => {
          select_age += e.value + ",";
        });
        // console.log(select_age);
      if (select_age !== "") {
        element.querySelector(".select-age-value").value = select_age;
        var val_1 = element.querySelector(".select-age-value").value;
        var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
        // console.log(val_1 ,val_2);
        element.querySelector(".select-age-value").value = val_2;
      } else {
        element.querySelector(".select-age-value").value = 0;
      }
      // const train = {
      //   value: {
      //     departure: {
      //       name: `${element.querySelector(".departure").value}`,
      //       id: `${element.querySelector(".from").value}`,
      //     },
      //     destination: {
      //       name: `${element.querySelector(".destination").value}`,
      //       id: `${element.querySelector(".to").value}`,
      //     },
      //     date: {
      //       start: `${
      //         element
      //           .querySelector(".start_date")
      //           .closest("div")
      //           .querySelector(".date-value")
      //           ? element
      //               .querySelector(".start_date")
      //               .closest("div")
      //               .querySelector(".date-value").value
      //           : element.querySelector(".start_date").value
      //       }`,
      //       end: `${
      //         element
      //           .querySelector(".end_date")
      //           .closest("div")
      //           .querySelector(".date-value")
      //           ? element
      //               .querySelector(".end_date")
      //               .closest("div")
      //               .querySelector(".date-value").value
      //           : element.querySelector(".end_date").value
      //       }`,
      //     },
      //     CompartmentType: `${element.querySelector(".CompartmentType").value}`,
      //     passengers: {
      //       adult: `${element.querySelector(".adult-count").value}`,
      //       child: `${
      //         element.querySelector(".child-count").value.indexOf(",") > 0
      //           ? element.querySelector(".child-count").value.slice(0, -1)
      //           : element.querySelector(".child-count").value
      //       }`,
      //       ages: `${element.querySelector(".select-age-value").value}`,
      //     },
      //     persiancurrent: `${
      //       element.querySelector(".persiancurrent")
      //         ? element.querySelector(".persiancurrent").value
      //         : element.querySelector(".currentdate").value
      //     }`,
      //     georgiaDate: georgiaDate,
      //     action: `${element.getAttribute("action")}`,
      //     method: `${element.getAttribute("method")}`,
      //     // flightType: `${element.getAttribute("data-flightType")}`,
      //   },
      //   time: new Date().getTime(),
      //   expire: new Date(georgiaDate).getTime(),
      // };
      // set_searchHistory(train, "train");
    }
  }
}

//<!----------------------------END JS SEARCHBOX ------------------------------>
$(document).ready(function () {
  $("#Hotel").click(function () {
    if(innerWidth < 1024 && $(".search-engine-content").hasClass("hidden")){
      $(".search-engine-content").removeClass("hidden")
    }
    $("#flight-type-items").hide();
    $(".nav-module").each(function () {
      var checknav = $(this).attr("data-nav");
      if (checknav == "hotel") {
        $(this).addClass("nav-module-selected");
      } else {
        $(this).removeClass("nav-module-selected");
      }
    });
    sessionStorage.setItem("pageName", "hotel");
    LoadHotel();
    // LoadSelection();
  });

  $("#Flight").click(function () {
    if(innerWidth < 1024 && $(".search-engine-content").hasClass("hidden")){
      $(".search-engine-content").removeClass("hidden")
    }
    $("#flight-type-items").show();
    $(".nav-module").each(function () {
      var checknav = $(this).attr("data-nav");
      if (checknav == "flight") {
        $(this).addClass("nav-module-selected");
      } else {
        $(this).removeClass("nav-module-selected");
      }
    });
    sessionStorage.setItem("pageName", "flight");
    LoadFlight();
    // LoadSelection();
  });

  $("#FlightHotel").click(function () {
    if(innerWidth < 1024 && $(".search-engine-content").hasClass("hidden")){
      $(".search-engine-content").removeClass("hidden")
    }
    $("#flight-type-items").hide();
    $(".nav-module").each(function () {
      var checknav = $(this).attr("data-nav");
      if (checknav == "flighthotel") {
        $(this).addClass("nav-module-selected");
      } else {
        $(this).removeClass("nav-module-selected");
      }
    });
    sessionStorage.setItem("pageName", "flighthotel");
    LoadFlightHotel();
    // LoadSelection();
  });

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
    sessionStorage.setItem("pageName", "tour");
    LoadTour();
    // LoadSelection();
  });

  $("#Insurance").click(function () {
    if(innerWidth < 1024 && $(".search-engine-content").hasClass("hidden")){
      $(".search-engine-content").removeClass("hidden")
    }
    $("#flight-type-items").hide();
    $(".nav-module").each(function () {
      var checknav = $(this).attr("data-nav");
      if (checknav == "insurance") {
        $(this).addClass("nav-module-selected");
      } else {
        $(this).removeClass("nav-module-selected");
      }
    });
    sessionStorage.setItem("pageName", "insurance");
    LoadInsurane();
    // LoadSelection();
  });

  $("#Train").click(function () {
    if(innerWidth < 1024 && $(".search-engine-content").hasClass("hidden")){
      $(".search-engine-content").removeClass("hidden")
    }
    $("#flight-type-items").hide();
    $(".nav-module").each(function () {
      var checknav = $(this).attr("data-nav");
      if (checknav == "train") {
        $(this).addClass("nav-module-selected");
      } else {
        $(this).removeClass("nav-module-selected");
      }
    });
    sessionStorage.setItem("pageName", "train");
    LoadTrain();
    // LoadSelection();
  });
});

// let searchbg = document.getElementById("banner-sb").classList

function LoadHotel() {
  window.changeParentBackground("hotelmodule-bg");
  // $("#banner-sb").addClass('bg-hotelmodule');
  // $("#banner-sb").removeClass('bg-flighthotelmodule');
  // $("#banner-sb").removeClass('bg-flightmodule');
  // $("#banner-sb").removeClass('bg-tourmodule');
  // $("#banner-sb").removeClass('bg-insurancemodule');
  // $("#banner-sb").removeClass('bg-trainmodule');

  $(".nav-module").each(function () {
    var checknav = $(this).attr("data-nav");
    if (checknav == "hotel") {
      $(this).addClass("nav-module-selected");
    } else {
      $(this).removeClass("nav-module-selected");
    }
  });
  $("#flight-type-items").hide();
  $("#Hotel").addClass("active-module");
  $("#Hotel").siblings("li").removeClass("active-module");
  $("#item-Hotel").show();
  $(
    "#item-Flight,#item-Tour,#item-FlightHotel,#item-Insurance,#item-Train"
  ).hide();
  $(".bg-background-banner").children().addClass("hidden");
  $(".bg-background-banner").find("#hotel-title").removeClass("hidden");
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}
function LoadFlight() {
  window.changeParentBackground("flightmodule-bg");
  // $("#banner-sb").addClass('bg-flightmodule');
  // $("#banner-sb").removeClass('bg-flighthotelmodule');
  // $("#banner-sb").removeClass('bg-hotelmodule');
  // $("#banner-sb").removeClass('bg-tourmodule');
  // $("#banner-sb").removeClass('bg-insurancemodule');
  // $("#banner-sb").removeClass('bg-trainmodule');

  $(".nav-module").each(function () {
    var checknav = $(this).attr("data-nav");
    if (checknav == "flight") {
      $(this).addClass("nav-module-selected");
    } else {
      $(this).removeClass("nav-module-selected");
    }
  });
  $("#flight-type-items").show();
  $("#Flight").addClass("active-module");
  $("#Flight").siblings("li").removeClass("active-module");
  $("#item-Flight").show();
  $(
    "#item-Hotel,#item-Tour,#item-FlightHotel,#item-Insurance,#item-Train"
  ).hide();
  $(".bg-background-banner").children().addClass("hidden");
  $(".bg-background-banner").find("#flight-title").removeClass("hidden");
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}

function LoadFlightHotel() {
  window.changeParentBackground("flighthotelmodule-bg");
  // $("#banner-sb").addClass('bg-flighthotelmodule');
  // $("#banner-sb").removeClass('bg-flightmodule');
  // $("#banner-sb").removeClass('bg-hotelmodule');
  // $("#banner-sb").removeClass('bg-tourmodule');
  // $("#banner-sb").removeClass('bg-insurancemodule');
  // $("#banner-sb").removeClass('bg-trainmodule');

  $(".nav-module").each(function () {
    var checknav = $(this).attr("data-nav");
    if (checknav == "flighthotel") {
      $(this).addClass("nav-module-selected");
    } else {
      $(this).removeClass("nav-module-selected");
    }
  });

  $("#flight-type-items").hide();
  $("#FlightHotel").addClass("active-module");
  $("#FlightHotel").siblings("li").removeClass("active-module");
  $("#item-FlightHotel").show();
  $("#item-Flight,#item-Hotel,#item-Tour,#item-Insurance,#item-Train").hide();
  $(".bg-background-banner").children().addClass("hidden");
  $(".bg-background-banner").find("#flighthotel-title").removeClass("hidden");
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}

function LoadTour() {
  window.changeParentBackground("tourmodule-bg");
  // $("#banner-sb").addClass('bg-tourmodule');
  // $("#banner-sb").removeClass('bg-flighthotelmodule');
  // $("#banner-sb").removeClass('bg-flightmodule');
  // $("#banner-sb").removeClass('bg-hotelmodule');
  // $("#banner-sb").removeClass('bg-insurancemodule');
  // $("#banner-sb").removeClass('bg-trainmodule');
  $(".nav-module").each(function () {
    var checknav = $(this).attr("data-nav");
    if (checknav == "tour") {
      $(this).addClass("nav-module-selected");
    } else {
      $(this).removeClass("nav-module-selected");
    }
  });
  $("#flight-type-items").hide();
  $("#Tour").addClass("active-module");
  $("#Tour").siblings("li").removeClass("active-module");
  $("#item-Tour").show();
  $(
    "#item-Flight,#item-Hotel,#item-FlightHotel,#item-Insurance,#item-Train"
  ).hide();
  $(".bg-background-banner").children().addClass("hidden");
  $(".bg-background-banner").find("#tour-title").removeClass("hidden");
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}

function LoadInsurane() {
  window.changeParentBackground("insurancemodule-bg");
  // $("#banner-sb").addClass('bg-insurancemodule');
  // $("#banner-sb").removeClass('bg-flighthotelmodule');
  // $("#banner-sb").removeClass('bg-flightmodule');
  // $("#banner-sb").removeClass('bg-hotelmodule');
  // $("#banner-sb").removeClass('bg-tourmodule');
  // $("#banner-sb").removeClass('bg-trainmodule');

  $(".nav-module").each(function () {
    var checknav = $(this).attr("data-nav");
    if (checknav == "insurance") {
      $(this).addClass("nav-module-selected");
    } else {
      $(this).removeClass("nav-module-selected");
    }
  });

  $("#flight-type-items").hide();
  $("#Insurance").addClass("active-module");
  $("#Insurance").siblings("li").removeClass("active-module");
  $("#item-Insurance").show();
  $("#item-Flight,#item-Hotel,#item-Tour,#item-FlightHotel,#item-Train").hide();
  $(".bg-background-banner").children().addClass("hidden");
  $(".bg-background-banner").find("#insurance-title").removeClass("hidden");
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}
function LoadTrain() {
  window.changeParentBackground("trainmodule-bg");
  // $("#banner-sb").addClass('bg-trainmodule');
  // $("#banner-sb").removeClass('bg-flighthotelmodule');
  // $("#banner-sb").removeClass('bg-flightmodule');
  // $("#banner-sb").removeClass('bg-hotelmodule');
  // $("#banner-sb").removeClass('bg-tourmodule');
  // $("#banner-sb").removeClass('bg-insurancemodule');

  $(".nav-module").each(function () {
    var checknav = $(this).attr("data-nav");
    if (checknav == "train") {
      $(this).addClass("nav-module-selected");
    } else {
      $(this).removeClass("nav-module-selected");
    }
  });

  $("#flight-type-items").hide();
  $("#Train").addClass("active-module");
  $("#Train").siblings("li").removeClass("active-module");
  $("#item-Train").show();
  $(
    "#item-Flight,#item-Hotel,#item-Tour,#item-FlightHotel,#item-Insurance"
  ).hide();
  $(".bg-background-banner").children().addClass("hidden");
  $(".bg-background-banner").find("#insurance-title").removeClass("hidden");
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}

if ($(".checkparent_page").val() == "true") {
  $("#Flight").addClass("inactive");
  $("#Tour").removeClass("inactive");
  $(".r-tour").css("display", "block");
  $(".r-flight").css("display", "none");
}
$(document).ready(function () {
  $(".nav-module").click(function () {
    let navTitle = $(this).attr("data-nav");
    sessionStorage.setItem("pageName", navTitle);
    // LoadSelection();

    if ($(this).find("a").attr("href")) {
      let navTitle = $(this).attr("data-nav");
      // $(this).find('a').removeAttribute("href");
      sessionStorage.setItem("pageName", navTitle);
    }
    window.changeParentBackground(`${navTitle}module-bg`);
  });

  // $(".default-page-load").click(function () {
  //   sessionStorage.removeItem('pageName');
  //   $('.bg-background-banner').children().addClass('hidden');
  //   $('.bg-background-banner').find('#flight-title').removeClass('hidden');
  // });
});

$(".FlightClass").each(function () {
  $(this).change(function () {
    var flightclass = $(this).val();
    var text;
    switch (flightclass) {
      case "Economy":
        text = "اکونومی";
        break;
      case "BusinessClass":
        text = "بیزینس";
        break;
      case "FirstClass":
        text = "فرست";
        break;
    }
    $(this).closest("form").find(".class-select").text(text);
  });
});

function setFlightType(ele) {
  var flighttype = ele.value;
  document.getElementById("selectflightclass").selectedIndex = 0;

  if (flighttype == "oneway") {
    $("#item-Flight").find("form").attr("data-flightType", "1");
    $(this).addClass("active-flight-type");

    $("#backtoback").removeClass("active-flight-type");
    $("#multiflight").removeClass("active-flight-type");

    $("#multi-flight-form").addClass("hidden");
    $("#flight-form").removeClass("hidden");

    $(this)
      .closest("#item-Flight")
      .find(".end_date")
      .removeClass("nextCalOpening");
    $("#item-Flight").find("#flight-form").find(".end_date").val("");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .prop("disabled", true);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", true);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .addClass("Noactive-date");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest(".bg-white")
      .addClass("opc-50");
    $("#flight-form").attr("action", "/Tem3_Oneway_Search.bc");
    if ($(window).width() <= 1024) {
      $("#flight-form").attr("action", "/M_Oneway_Search.bc");
    }
  } else if (flighttype == "roundtrip") {
    $("#item-Flight").find("form").attr("data-flightType", "2");
    $(this).addClass("active-flight-type");

    $("#oneway").removeClass("active-flight-type");
    $("#multiflight").removeClass("active-flight-type");

    $("#multi-flight-form").addClass("hidden");
    $("#flight-form").removeClass("hidden");

    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .addClass("nextCalOpening");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .prop("disabled", false);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", false);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .removeClass("Noactive-date");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest(".bg-white")
      .removeClass("opc-50");
    $("#flight-form").attr("action", "/Tem3_Roundtrip_Search.bc");
    if ($(window).width() <= 1024) {
      $("#flight-form").attr("action", "/M_Roundtrip_Search.bc");
    }
  } else if (flighttype == "multicity") {
    $("#item-Flight").find("form").attr("data-flightType", "1");
    $(this).addClass("active-flight-type");
    $("#backtoback").removeClass("active-flight-type");
    $("#oneway").removeClass("active-flight-type");

    $("#multi-flight-form").removeClass("hidden");
    $("#flight-form").addClass("hidden");

    $(this)
      .closest("#item-Flight")
      .find(".end_date")
      .removeClass("nextCalOpening");
    $("#item-Flight").find(".end_date").val("");
    $("#item-Flight").find(".end_date").prop("disabled", true);
    $("#item-Flight")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", true);
    $("#item-Flight").find(".end_date").addClass("Noactive-date");
    $("#item-Flight").find(".end_date").closest(".bg-white").addClass("opc-50");
    if ($(window).width() <= 1024) {
      $("#multi-flight-form").attr("action", "/M_Multicity_Search.bc");
    }
  } else {
    $("#item-Flight").find("form").attr("data-flightType", "1");
    $(this).addClass("active-flight-type");

    $("#backtoback").removeClass("active-flight-type");
    $("#multiflight").removeClass("active-flight-type");

    $("#multi-flight-form").addClass("hidden");
    $("#flight-form").removeClass("hidden");

    $(this)
      .closest("#item-Flight")
      .find(".end_date")
      .removeClass("nextCalOpening");
    $("#item-Flight").find("#flight-form").find(".end_date").val("");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .prop("disabled", true);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", true);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .addClass("Noactive-date");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest(".bg-white")
      .addClass("opc-50");
    $("#flight-form").attr("action", "/Tem3_Train_Oneway_Search.bc");
    if ($(window).width() <= 1024) {
      $("#flight-form").attr("action", "/M_Train_Oneway_Search.bc");
    }
  }
}

function setTrainType(ele) {
  var traintype = ele.value;
  document.getElementById("Train-TraintypeClass").selectedIndex = 0;

  if (traintype == "oneway") {
    $("#item-Train").find("form").attr("data-trainType", "1");
    $(this).addClass("active-train-type");

    $("#backtoback").removeClass("active-train-type");
    $("#multitrain").removeClass("active-train-type");

    $("#multi-train-form").addClass("hidden");
    $("#train-form").removeClass("hidden");

    $(this)
      .closest("#item-Train")
      .find(".end_date")
      .removeClass("nextCalOpening");
    $("#item-Train").find("#train-form").find(".end_date").val("");
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .prop("disabled", true);
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", true);
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .addClass("Noactive-date");
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .closest(".bg-white")
      .addClass("opc-50");
    $("#train-form").attr("action", "/Tem3_Oneway_Search.bc");
    if ($(window).width() <= 1024) {
      $("#train-form").attr("action", "/M_Oneway_Search.bc");
    }
  } else if (traintype == "roundtrip") {
    $("#item-Train").find("form").attr("data-trainType", "2");
    $(this).addClass("active-train-type");

    $("#oneway").removeClass("active-train-type");
    $("#multitrain").removeClass("active-train-type");

    $("#multi-train-form").addClass("hidden");
    $("#train-form").removeClass("hidden");

    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .addClass("nextCalOpening");
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .prop("disabled", false);
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", false);
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .removeClass("Noactive-date");
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .closest(".bg-white")
      .removeClass("opc-50");
    $("#train-form").attr("action", "/Tem3_Train_Roundtrip_Search.bc");
    if ($(window).width() <= 1024) {
      $("#train-form").attr("action", "/M_Train_Roundtrip_Search.bc");
    }
  } else {
    $("#item-Train").find("form").attr("data-trainType", "1");
    $(this).addClass("active-train-type");

    $("#backtoback").removeClass("active-train-type");
    $("#multitrain").removeClass("active-train-type");

    $("#multi-train-form").addClass("hidden");
    $("#train-form").removeClass("hidden");

    $(this)
      .closest("#item-Train")
      .find(".end_date")
      .removeClass("nextCalOpening");
    $("#item-Train").find("#train-form").find(".end_date").val("");
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .prop("disabled", true);
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", true);
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .addClass("Noactive-date");
    $("#item-Train")
      .find("#train-form")
      .find(".end_date")
      .closest(".bg-white")
      .addClass("opc-50");
    $("#train-form").attr("action", "/Tem3_Train_Oneway_Search.bc");
    if ($(window).width() <= 1024) {
      $("#train-form").attr("action", "/M_Train_Oneway_Search.bc");
    }
  }
}

function setCompartmentType(element) {
  let textCT = element.options[element.selectedIndex].text;
  document
    .getElementById("train-form")
    .querySelector(".compartment-type").innerText = textCT;
}

function CheckPrivateCompartment(elementent) {
  var isChecked = $(elementent).prop("checked");
  if (isChecked == true) {
    $(elementent).val(1);
  } else if (isChecked == false) {
    $(elementent).val(0);
  }
}

function setFlightClass(element) {
  let valueFC = element.value;
  let textFC = element.options[element.selectedIndex].text;
  let flightForm = document.getElementById("flight-form");
  let flightMCForm = document.getElementById("multi-flight-form");

  if (!flightForm.classList.contains("hidden")) {
    $(flightForm).find(".select-flight-class").val(valueFC);
    $(flightForm).find(".class-select").text(textFC);
  }

  if (!flightMCForm.classList.contains("hidden")) {
    $(flightMCForm).find(".select-flight-class").val(valueFC);
    $(flightMCForm).find(".class-select").text(textFC);
  }
}

$(document).ready(function () {
  $("#multi-flight-form").addClass("hidden");

  if ($(window).width() <= 1024) {
    if ($("#flight-form").attr("action") == "/Tem3_Roundtrip_Search.bc") {
      $("#flight-form").attr("action", "/M_Roundtrip_Search.bc");
    }
    if ($("#flight-form").attr("action") == "/Tem3_Oneway_Search.bc") {
      $("#flight-form").attr("action", "/M_Oneway_Search.bc");
    }
    if ($("#train-form").attr("action") == "/Tem3_Train_Oneway_Search.bc") {
      $("#train-form").attr("action", "/M_Train_Oneway_Search.bc");
    }
    if ($("#train-form").attr("action") == "/Tem3_Train_Roundtrip_Search.bc") {
      $("#train-form").attr("action", "/M_Train_Roundtrip_Search.bc");
    }
    $("#multi-flight").attr("action", "/M_Multicity_Search.bc");
    $("#hotel-form").attr("action", "/M_Hotel_Search.bc");
    $("#flightHotel-form").attr("action", "/M_FlightHotel_Search.bc");
    $("#Insurance-form").attr("action", "/M_Insurance_Search.bc");
    $("#Tour-form").attr("action", "/M_Tour_Search.bc");
  }
});

function flight_class(element) {
  $(".flight-class").text($(element).find("option:selected").text());
}

function openNextCal(e) {
  let activeBtn = $(".search-nav ul > .active-module").attr("data-id");
  if (activeBtn == "item-FlightHotel") {
    if ($(".check-hotel-date-container").is(":visible")) {
      if ($(".check-hotel-date-container").find(".checkin").val() != "") {
        let returnDate = $(".check-hotel-date-container")
          .find(".nextCalOpeningex")
          .val();
        if (returnDate == "") {
          $(".check-hotel-date-container")
            .find(".nextCalOpeningex")
            .trigger("onclick");
        }
      } else {
        let returnDate = $("#" + activeBtn)
          .find(".nextCalOpening")
          .val();
        if (returnDate == "") {
          $("#" + activeBtn)
            .find(".nextCalOpening")
            .trigger("onclick");
        }
      }
    } else {
      let returnDate = $("#" + activeBtn)
        .find(".nextCalOpening")
        .val();
      if (returnDate == "") {
        $("#" + activeBtn)
          .find(".nextCalOpening")
          .trigger("onclick");
      }
    }
  } else {
    let returnDate = $("#" + activeBtn)
      .find(".nextCalOpening")
      .val();
    if (returnDate == "") {
      $("#" + activeBtn)
        .find(".nextCalOpening")
        .trigger("onclick");
    }
  }
}
////////<!----- JS  FLIGHT ---->////////
function empty_value(t) {
  $(t).closest(".city").find(".country").val(""),
    $(t).closest(".city").find(".searchList").fadeIn(),
    $(t).closest(".city").find(".country").focus(),
    $(t).closest(".city").find(".ul-list").show(),
    $(t).closest(".city").siblings(".city").find(".searchList").fadeOut();
}

$(".country").each(function () {
  $(this).on("blur", function () {
    if ($(this).closest(".city").find(".countryFlight").text().length > 0) {
      if (0 == hoverelse) {
        var t = $(this)
            .closest(".city")
            .find(".countryFlight")
            .children(".selectCountry:first")
            .find(".txtcountry")
            .text(),
          e =
            (t.split(" "),
            $(this)
              .closest(".city")
              .find(".countryFlight")
              .children(".selectCountry:first")
              .find(".countryid")
              .val());
        $(this).closest(".city").find(".country").val(t);
        var i = t.split("(");
        $(this).closest(".city").find(".split-text").text(i[0]),
          $(this).closest(".city").find(".text-value").val(t),
          $(this).closest(".city").find(".co-id").val(e),
          $(this).closest(".city").find(".countryFlight").empty();
      }
    } else $(this).closest(".city").find(".mini-loading").css("display", "none");
  });
});
$("#Tour-form .country").on("keyup", function () {
  var t = $(this).val().toLowerCase();
  $(".selectCountry").hide(),
    $(".selectCountry")
      .filter(function () {
        return $(this).text().toLowerCase().includes(t);
      })
      .show();
});

$(document).on("click", function (t) {
  $(t.target).closest(
    ".searchList,.country,.selectCountry,.city, .form-search-input"
  ).length || $(".searchList").slideUp(),
    $(t.target).closest(
      ".hotel-input , .count-adult , .count-child , .count-room , .count-adultRoom , .count-childRoom , .fclass , .HotelPassengers div , HotelPassengers span"
    ).length || $(".HotelPassengers").removeClass("block");
});

function city_search(t) {
  0 === t.which ||
    t.ctrlKey ||
    t.metaKey ||
    t.altKey ||
    (4 == $(t).attr("data-type")
      ? ($(t).val(""),
        $(t).closest(".city").find(".co-id").val(""),
        $(t).closest(".city").find(".mini-loading").show(),
        $.ajax({
          url: "/Client_City_Search.bc",
          type: "get",
          data: { type: $(t).attr("data-type"), lid: "1" },
          success: function (e) {
            $(t).attr("data-active", "1"),
              $(t).closest(".city").find(".mini-loading").hide(),
              $(t).closest(".city").find(".countryFlight").empty().html(e),
              $(t).closest(".city").find(".countryFlight").slideDown();
          },
        }))
      : ((upper_case =
          $(t).val().substr(0, 1).toUpperCase() +
          $(t).val().substr(1).toLowerCase()),
        $(t).val(upper_case),
        "3" == $(t).attr("data-type")
          ? "رم" == $(t).val() || "قم" == $(t).val()
            ? $(t).val().length > 1
              ? ($(t).closest(".city").find(".mini-loading").show(),
                $(t).closest(".city").find(".ul-list").hide(),
                $.ajax({
                  url: "/Client_City_Search.bc",
                  type: "get",
                  data: {
                    term: $(t).val(),
                    type: $(t).attr("data-type"),
                    lid: 1,
                    select_value: 0,
                  },
                  success: function (e) {
                    $(t).closest(".city").find(".mini-loading").hide(),
                      $(t)
                        .closest(".city")
                        .find(".countryFlight")
                        .empty()
                        .html(e);
                  },
                }))
              : ($(t).closest(".city").find(".countryFlight").empty(),
                $(t).closest(".city").find(".ul-list").show())
            : $(t).val().length > 2
            ? ($(t).closest(".city").find(".mini-loading").show(),
              $(t).closest(".city").find(".ul-list").hide(),
              $.ajax({
                url: "/Client_City_Search.bc",
                type: "get",
                data: {
                  term: $(t).val(),
                  type: $(t).attr("data-type"),
                  lid: 1,
                  select_value: 0,
                },
                success: function (e) {
                  $(t).closest(".city").find(".mini-loading").hide(),
                    $(t)
                      .closest(".city")
                      .find(".countryFlight")
                      .empty()
                      .html(e);
                },
              }))
            : ($(t).closest(".city").find(".countryFlight").empty(),
              $(t).closest(".city").find(".ul-list").show())
          : "3" !== $(t).attr("data-type") &&
            ($(t).val().length > 2
              ? ($(t).closest(".city").find(".mini-loading").show(),
                $(t).closest(".city").find(".ul-list").hide(),
                $.ajax({
                  url: "/Client_City_Search.bc",
                  type: "get",
                  data: {
                    term: $(t).val(),
                    type: $(t).attr("data-type"),
                    lid: 1,
                    select_value: 0,
                  },
                  success: function (e) {
                    $(t).closest(".city").find(".mini-loading").hide(),
                      $(t)
                        .closest(".city")
                        .find(".countryFlight")
                        .empty()
                        .html(e);
                  },
                }))
              : ($(t).closest(".city").find(".countryFlight").empty(),
                $(t).closest(".city").find(".ul-list").show()))));
}

function SelectPlace(element) {
  var idSelected = $(element).attr("data-id");
  var textSelected = $(element).find("span").text();
  $(element).closest(".city").find(".country").val(textSelected);
  $(element).closest(".city").find(".co-id").val(idSelected);
  $(element).closest(".city").find(".searchList").fadeOut();
  if (
    element.closest("#flightHotel-form") ||
    element.closest("#flight-form") ||
    element.closest("#train-form")
  ) {
    if ($(element).closest(".city").find(".FCD2").val()) {
      $(element)
        .closest("form")
        .find(".Basis_Date_Box")
        .find(".start_date")
        .trigger("onclick");
    } else {
      $(element)
        .closest(".city")
        .next()
        .next(".city")
        .find(".country")
        .trigger("onclick");
    }
  } else if (element.closest("#multi-flight-form")) {
    if ($(element).closest(".city").find(".FCD2").val()) {
      $(element)
        .closest(".route-content")
        .find(".Basis_Date_Box")
        .find(".start_date")
        .trigger("onclick");
    } else {
      $(element)
        .closest(".city")
        .next()
        .next(".city")
        .find(".country")
        .trigger("onclick");
    }
  } else if (element.closest("#hotel-form")) {
    $(element)
      .closest("#hotel-form")
      .find(".Basis_Date_Box")
      .find(".start_date")
      .trigger("onclick");
  }
}

$(document).on("click", function (event) {
  if (!$(event.target).closest(".searchList,.country,.selectCountry").length) {
    $(".searchList").fadeOut();
  }
  if (
    !$(event.target).closest(
      ".passenger_section,#ui-datepicker-div,.FlightClass , .flight-class ,.Wrapper-CountPassenger,.plus-minus,.plus-minus-ch,.plus-minus-room,.createChildDropdown select,.add-room,.plus-minus-ins,.BithdatePassenger,.nice-select .option,.item-CountPassenger input"
    ).length
  ) {
    $(".CountPassenger").fadeOut();
  }
});

function show_passengers(element) {
  $(element).closest("form").find(".CountPassenger").fadeIn();
}
$(".confirm").click(function (e) {
  $(this).closest(".CountPassenger").fadeOut();
});
$(".plus-minus").on("click", function () {
  var button = $(this);
  var oldVal = parseInt(
    button.closest(".item-CountPassenger").find("input").val()
  );
  var newVal =
    button.text().indexOf("+") > -1 ? oldVal + 1 : oldVal > 0 ? oldVal - 1 : 0;
  if (newVal >= 2) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .addClass("minus-btn-active");
  }
  if (newVal < 2) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .removeClass("minus-btn-active");
  }
  if (newVal >= 10) return;
  if (newVal < 1) return;
  button.closest(".item-CountPassenger").find("input").val(newVal);
  var passengers_count =
    parseInt(button.closest("form").find(".child-count").val()) +
    parseInt(newVal);
  button
    .closest("form")
    .find(".count-passengers .count")
    .text(passengers_count);
});
$(".plus-minus-ch").on("click", function () {
  var button = $(this);
  var oldVal = parseInt(
    button.closest(".item-CountPassenger").find("input").val()
  );
  var newVal =
    button.text().indexOf("+") > -1 ? oldVal + 1 : oldVal > 0 ? oldVal - 1 : 0;
  if (newVal >= 1) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .addClass("minus-btn-active");
  }
  if (newVal < 1) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .removeClass("minus-btn-active");
  }
  if (newVal >= 5) return;
  button.closest(".item-CountPassenger").find("input").val(newVal);
  if (newVal == 0) {
    button.closest(".item-CountPassenger").find(".child").val(newVal);
  } else {
    button
      .closest(".item-CountPassenger")
      .find(".child")
      .val(newVal + ",");
  }
  var passengers_count =
    parseInt(button.closest("form").find(".adult").val()) + parseInt(newVal);
  button
    .closest("form")
    .find(".count-passengers .count")
    .text(passengers_count);
  if (oldVal < newVal) {
    button
      .closest(".item-CountPassenger")
      .find(".section-select-age")
      .append(createChildDropdown(newVal));
  } else if (oldVal > newVal) {
    destroyChildDropdown(
      button.closest(".item-CountPassenger").find(".section-select-age"),
      newVal
    );
  }
});
var createChildDropdown = function (i) {
  var $childDropdown = $("<div />", {
    class: "createChildDropdown flex justify-between",
  });
  $childDropdown.append(
    $("<label />", {
      for: "childDropdown-" + i,
    }).text("سن کودک " + i)
  );
  $childDropdown.append($("<select class='w-8/12' />"));
  var options = [
    "تا 1 سال",
    "1 تا 2  ",
    "2 تا 3 ",
    "3 تا 4  ",
    "4 تا 5 ",
    "5 تا 6 ",
    "6 تا 7 ",
    "7 تا 8 ",
    "8 تا 9 ",
    "9 تا 10 ",
    "10 تا 11 ",
    "11 تا 12 ",
  ];
  options.forEach(function (option, index) {
    $childDropdown.find("select").append(
      $("<option />")
        .text(option)
        .attr("value", index + 1)
    );
  });
  return $childDropdown;
};
var destroyChildDropdown = function ($el, i) {
  $el.find("div.createChildDropdown").get(i).remove();
};
$(".exchange-icon").click(function () {
  var dep = $(this).closest("form").find(".FCD1").val();
  var des = $(this).closest("form").find(".FCD2").val();
  var depid = $(this).closest("form").find(".FCDid1").val();
  var desid = $(this).closest("form").find(".FCDid2").val();
  $(this).closest("form").find(".FCD1").val(des);
  $(this).closest("form").find(".FCD2").val(dep);
  $(this).closest("form").find(".FCDid1").val(desid);
  $(this).closest("form").find(".FCDid2").val(depid);
});

////////<!----- JS  INSURANCE ---->////////
$(".plus-minus-ins").on("click", function () {
  var button = $(this);
  var oldVal = parseInt(
    button.closest(".item-CountPassenger").find("input").val()
  );
  var newVal =
    button.text().indexOf("+") > -1 ? oldVal + 1 : oldVal > 0 ? oldVal - 1 : 0;
  if (newVal >= 1) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .addClass("minus-btn-active");
  }
  if (newVal < 1) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .removeClass("minus-btn-active");
  }
  if (newVal >= 9) return;
  if (newVal < 1) return;
  button.closest(".item-CountPassenger").find(".passengercount").val(newVal);
  button.closest("form").find(".count-passengers .count").text(newVal);
  if (oldVal < newVal) {
    button
      .closest(".item-CountPassenger")
      .find(".Wrapper-BirthdatePassenger")
      .empty();
    for (var i = 1; i <= newVal; i++) {
      button
        .closest(".item-CountPassenger")
        .find(".Wrapper-BirthdatePassenger")
        .append(
          '<div class="BirthdatePassenger my-4"><label class="label text-neutral-500 font-danamedium mb-3 w-full ">تاریخ تولد مسافر ' +
            i +
            '</label><input class="datepicker BithdatePassenger passenger-bithdate w-full block h-10 leading-10 mt-2" placeholder="تاریخ میلادی" type="text" autocomplete="off" readonly required><div class="clr"></div></div>'
        );
    }
  } else if (oldVal > newVal) {
    destroyInsurancePassenger(
      button
        .closest(".item-CountPassenger")
        .find(".Wrapper-BirthdatePassenger"),
      newVal
    );
  }
  $(".datepicker").focus(function (e) {
    FDatepicker(this, {
      single: !0,
      isJalali: isJalali,
      changeMonth: !0,
      changeYear: !0,
      minDate: "-100y",
      maxDate: $("#AdaultMaxDate").val(),
      yearRangeJalali: "1250:1500",
      yearRangeGregorian: "1900:2030",
      numberOfMonths: 1,
    });
    var innerContent = $(".nice-select > ul");
    var option_height = $(".nice-select .option").height();
    var option_count = $(".nice-select .option").length;
    var Ul_height = parseInt(option_height) * parseInt(option_count);
    innerContent.scrollTop(Ul_height / 2);
  });
});
var destroyInsurancePassenger = function ($el, i) {
  $el.find("div.BirthdatePassenger").get(i).remove();
};

$("#Insurance-form").submit(function (i) {
  $(this)
    .find(".datepicker")
    .each(function () {
      $(this).val().length < 1 &&
        ($(this).css("border-color", "red"),
        $(".NotEnteringBirthadate").show(),
        $(this).closest("form").find(".CountPassenger").slideDown(),
        i.preventDefault());
    });
  var t = "";
  $(this)
    .find(".BirthdatePassenger")
    .each(function (i, e) {
      t = t + '"' + $(this).find(".datepicker").val() + '",';
    }),
    $(this).find(".birthday").val(t);
  var e = $(this)
    .find(".birthday")
    .val()
    .replace(/,(?=[^,]*$)/, "");
  $(this).find(".birthday").val(e);
});
////////<!----- JS  HOTEL/TOUR ---->////////

$(".plus-minus-room").on("click", function () {
  var button = $(this);
  var ad = 0;
  var oldVal = parseInt(
    button.closest(".item-CountPassenger").find("input").val()
  );
  var newVal =
    button.text().indexOf("+") > -1 ? oldVal + 1 : oldVal > 0 ? oldVal - 1 : 0;
  if (newVal >= 2) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .addClass("minus-btn-active");
  }
  if (newVal < 2) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .removeClass("minus-btn-active");
  }
  if (newVal >= 5) return;
  if (newVal < 1) return;
  button.closest(".item-CountPassenger").find("input").val(newVal);
  button.closest("form").find(".count-passengers .count-room").text(newVal);
  button.closest("form").find(".ShowRow").empty();
  for (i = 1; i <= newVal; i++) {
    button
      .closest("form")
      .find(".ShowRow")
      .append(
        '<div class="contentRoom"><div class="RoomRow mb-3">اتاق ' +
          i +
          ' </div><div class="item-CountPassenger mb-4"><div class="first-part-CountPassenger text-secondary mb-3">بزرگسال (+12)</div><div class="second-part-CountPassenger flex justify-between"><div class="passenger-button plus-minus"><span class="plus-btn w-7 h-7 leading-36px bg-white border-neutralcolor-300 border hover:border-primary-600 rounded-2xl text-center cursor-pointer inline-block text-4xl font-danaregular">+</span></div><div class="passenger-button text-base"><input type="text" name="_root.rooms__' +
          i +
          '.adultcount" class="adult adult-count text-center w-full leading-6"  readonly="" value="2"></div><div class="passenger-button plus-minus"><span class="minus-btn w-7 h-7 leading-36px bg-white border-neutralcolor-300 border hover:border-primary-600 rounded-2xl text-center cursor-pointer inline-block text-4xl font-danaregular">-</span></div></div><div class="clr"></div></div><div class="item-CountPassenger mb-4"><div class="first-part-CountPassenger text-secondary mb-3">کودک (-12)</div><div class="second-part-CountPassenger flex justify-between"><div class="passenger-button plus-minus-ch"><span class="plus-btn w-7 h-7 leading-36px bg-white border-neutralcolor-300 border hover:border-primary-600 rounded-2xl text-center cursor-pointer inline-block text-4xl font-danaregular">+</span></div><div class="passenger-button text-base"><input type="text" class="child-count text-center w-full leading-6"  readonly="" value="0"></div><div class="passenger-button plus-minus-ch"><span class="minus-btn w-7 h-7 leading-36px bg-white border-neutralcolor-300 border hover:border-primary-600 rounded-2xl text-center cursor-pointer inline-block text-4xl font-danaregular">-</span></div></div><input type="hidden" value="0" class="childcountandage" name="_root.rooms__' +
          i +
          '.childcountandage"><div class="clr"></div><div class="section-select-age leading-38px divide-y w-full flex-col justify-items-stretch"></div><div class="clr"></div></div></div>'
      );
  }
  button
    .closest("form")
    .find(".contentRoom")
    .each(function () {
      var adult = parseInt($(this).find(".adult").val());
      ad += adult;
      $(this)
        .find(".plus-minus")
        .on("click", function () {
          var sumAdult = 0;
          var sumChild = 0;
          var button = $(this);
          var oldVal = parseInt(
            button.closest(".item-CountPassenger").find("input").val()
          );
          var newVal =
            button.text().indexOf("+") > -1
              ? oldVal + 1
              : oldVal > 0
              ? oldVal - 1
              : 0;
          if (newVal >= 2) {
            button
              .closest(".item-CountPassenger")
              .find(".minus-btn")
              .addClass("minus-btn-active");
          }
          if (newVal < 2) {
            button
              .closest(".item-CountPassenger")
              .find(".minus-btn")
              .removeClass("minus-btn-active");
          }
          if (newVal >= 10) return;
          if (newVal < 1) return;
          button.closest(".item-CountPassenger").find("input").val(newVal);
          button
            .closest(".CountPassenger")
            .find(".contentRoom")
            .each(function () {
              sumAdult += parseInt($(this).find(".adult").val());
              sumChild += parseInt($(this).find(".child-count").val());
            });
          button
            .closest("form")
            .find(".count-passengers .count")
            .text(sumAdult + sumChild);
        });
      $(this)
        .find(".plus-minus-ch")
        .on("click", function () {
          var sumAdult = 0;
          var sumChild = 0;
          var button = $(this);
          var oldVal = parseInt(
            button.closest(".item-CountPassenger").find("input").val()
          );
          var newVal =
            button.text().indexOf("+") > -1
              ? oldVal + 1
              : oldVal > 0
              ? oldVal - 1
              : 0;
          if (newVal >= 1) {
            button
              .closest(".item-CountPassenger")
              .find(".minus-btn")
              .addClass("minus-btn-active");
          }
          if (newVal < 1) {
            button
              .closest(".item-CountPassenger")
              .find(".minus-btn")
              .removeClass("minus-btn-active");
          }
          if (newVal >= 5) return;
          button.closest(".item-CountPassenger").find("input").val(newVal);
          button
            .closest(".CountPassenger")
            .find(".contentRoom")
            .each(function () {
              sumAdult += parseInt($(this).find(".adult").val());
              sumChild += parseInt($(this).find(".child-count").val());
            });
          button
            .closest("form")
            .find(".count-passengers .count")
            .text(sumAdult + sumChild);
          if (oldVal < newVal) {
            button
              .closest(".item-CountPassenger")
              .find(".section-select-age")
              .append(createChildDropdown(newVal));
          } else if (oldVal > newVal) {
            destroyChildDropdown(
              button
                .closest(".item-CountPassenger")
                .find(".section-select-age"),
              newVal
            );
          }
        });
    });
  button.closest("form").find(".count-passengers .count").text(parseInt(ad));
});
////////<!----- JS  FLIGHT/HOTEL ---->////////
function CheckExteraHoteldate(element) {
  var isChecked = $(element).prop("checked");
  if (isChecked == true) {
    $(element).val(1);
    $(".check-hotel-date-container").show();
    $(".checkout").attr("required", true);
    $(".checkin").attr("required", true);
  } else if (isChecked == false) {
    $(element).val(0);
    $(".check-hotel-date-container").hide();
    $(".checkout").attr("required", false);
    $(".checkin").attr("required", false);
  }
}

if ($(".Hotel-Date").val() == 1) {
  $(".check-hotel-date-container").show();
  $(".Hotel-Date").prop("checked", true);
} else {
  $(".check-hotel-date-container").hide();
  $(".Hotel-Date").prop("checked", false);
}
////////<!----- JS  DATEPICKER ---->////////
function getPassportExpiryDate() {
  return new Date();
}
var regional = "",
  isJalali = !1;
if (regional == "fa") {
  isJalali = !0;
}
$(".datepicker").focus(function (e) {
  FDatepicker(this, {
    single: !0,
    isJalali: isJalali,
    changeMonth: !0,
    changeYear: !0,
    minDate: "-100y",
    maxDate: $("#AdaultMaxDate").val(),
    yearRangeJalali: "1250:1500",
    yearRangeGregorian: "1900:2030",
    numberOfMonths: 1,
  });
  var innerContent = $(".nice-select > ul");
  var option_height = $(".nice-select .option").height();
  var option_count = $(".nice-select .option").length;
  var Ul_height = parseInt(option_height) * parseInt(option_count);
  innerContent.scrollTop(Ul_height / 2);
});
PersianDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
};
PersianDate.PersianToGregorian = function (j_y, j_m, j_d) {
  j_y = parseInt(j_y);
  j_m = parseInt(j_m);
  j_d = parseInt(j_d);
  var jy = j_y - 979;
  var jm = j_m - 1;
  var jd = j_d - 1;
  var j_day_no =
    365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
  for (var i = 0; i < jm; ++i) j_day_no += PersianDate.j_days_in_month[i];
  j_day_no += jd;
  var g_day_no = j_day_no + 79;
  var gy = 1600 + 400 * parseInt(g_day_no / 146097);
  g_day_no = g_day_no % 146097;
  var leap = !0;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * parseInt(g_day_no / 36524);
    g_day_no = g_day_no % 36524;
    if (g_day_no >= 365) g_day_no++;
    else leap = !1;
  }
  gy += 4 * parseInt(g_day_no / 1461);
  g_day_no %= 1461;
  if (g_day_no >= 366) {
    leap = !1;
    g_day_no--;
    gy += parseInt(g_day_no / 365);
    g_day_no = g_day_no % 365;
  }
  for (
    var i = 0;
    g_day_no >= PersianDate.g_days_in_month[i] + (i == 1 && leap);
    i++
  )
    g_day_no -= PersianDate.g_days_in_month[i] + (i == 1 && leap);
  var gm = i + 1;
  var gd = g_day_no + 1;
  gm = gm < 10 ? "0" + gm : gm;
  gd = gd < 10 ? "0" + gd : gd;
  return [gy, gm, gd];
};

////////<!----- JS  MULTICITY ---->////////
if ($(window).width() >= 1024) {
  $("#multi-flight")
    .find(".route-content")
    .each(function () {
      $(this).addClass("set_Date_Box");
    });
}

function showMultiCity(element) {
  $("#multi-flight").removeClass("unvisible");
  $("#flight_form").addClass("unvisible");

  $(element).addClass("active-flight-type");
  $("#oneway").removeClass("active-flight-type");
  $("#backtoback").removeClass("active-flight-type");
  $("#multi-flight").show();
  $(".amitflight").hide();

  if ($(window).width() <= 750) {
    $("#multi-flight").attr("action", "/M_MultiCity_Search.bc");
  }
}
const destination_nth_txt = ["مقصد اول", "مقصد دوم", "مقصد سوم", "مقصد چهارم"];
function addMulticityRoute(element) {
  if (
    document
      .querySelector(".route-container")
      .querySelectorAll(".route-content").length < 4
  ) {
    const appended_element = document
      .querySelector(".route-container")
      .querySelectorAll(".route-content")[0].innerHTML;
    const child = document.createElement("div");
    child.innerHTML = appended_element;

    if ($(window).width() >= 1024) {
      child.className = "route-content w-full border-t border-neutral-200 pb-4";
    } else {
      child.className = "route-content w-full border-t border-neutral-200";
    }
    child.querySelector(".multi-route-tlt").innerText =
      destination_nth_txt[
        document
          .querySelector(".route-container")
          .querySelectorAll(".route-content").length
      ];

    child.querySelectorAll("input").forEach((e) => {
      e.value = "";
    });

    child
      .querySelector(".multi-route-tlt")
      .insertAdjacentHTML(
        "afterend",
        `<span class="text-white bg-error-400 cursor-pointer hover:bg-error-500 font-danamedium px-1 rounded-md" onclick="deleteMulticityRoute(this)" > حذف مسیر  </span>`
      );

    if (child.querySelector(".gregorian_date")) {
      child.querySelector(".gregorian_date").remove();
    }

    document.querySelector(".route-container").append(child);
    child.setAttribute(
      "data-index",
      element
        .closest("form")
        .querySelector(".route-container")
        .querySelectorAll(".route-content").length
    );

    child.querySelector(".fromcity_container").querySelector(".FCD1").value =
      child.previousElementSibling
        .querySelector(".tocity_container")
        .querySelector(".FCD2").value;
    child
      .querySelector(".fromcity_container")
      .querySelector(".fromcity").value = child.previousElementSibling
      .querySelector(".tocity_container")
      .querySelector(".tocity").value;
    child.querySelector(".tocity_container").querySelector(".FCD2").value = "";
    child.querySelector(".tocity_container").querySelector(".tocity").value =
      "";
    child.querySelector(".Basis_Date_Box").querySelector(".start_date").value =
      "";
  }
  checkButtonAddCity();
}

function deleteMulticityRoute(element) {
  element.closest(".route-content").remove();
  let index = 0;
  document
    .querySelector("#multi-flight-form")
    .querySelector(".route-container")
    .querySelectorAll(".route-content")
    .forEach((e) => {
      e.querySelector(".multi-route-tlt").innerText =
        destination_nth_txt[index];
      index++;
      e.setAttribute("data-index", index);
    });
  checkButtonAddCity();
}

function checkButtonAddCity() {
  if (
    document
      .querySelector("#multi-flight-form")
      .querySelector(".route-container")
      .querySelectorAll(".route-content").length >= 4
  ) {
    document
      .getElementsByClassName("route-plus-btn")[0]
      .classList.add("deactive-addmc");
  } else {
    document
      .getElementsByClassName("route-plus-btn")[0]
      .classList.remove("deactive-addmc");
  }
}

function formMulticity_search_isSubmited(element, event) {
  let fdates = element.querySelectorAll("input[name=fdate]");
  let validation = true;
  fdates.forEach((e) => {
    if (e.value == "" && e.disabled == false) {
      event.preventDefault();
      validation = false;
      e.style.border = "1px solid #f42e36";
    }
  });

  if (validation) {
    let select_age = "";
    element
      .querySelector(".section-select-age")
      .querySelectorAll("select")
      .forEach((e) => {
        select_age = select_age + e.value + ",";
      });
    if (select_age !== "") {
      element.querySelector(".select-age-value").value = select_age;
      var val_1 = element.querySelector(".select-age-value").value;
      var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
      element.querySelector(".select-age-value").value = val_2;
    } else {
      element.querySelector(".select-age-value").value = 0;
    }
    for (
      let i = 0;
      i < element.getElementsByClassName("route-content").length;
      i++
    ) {
      element
        .getElementsByClassName("route-content")
        [i].querySelector(".fromcity")
        .setAttribute("name", `_root.route__${i}.fromcity`);
      element
        .getElementsByClassName("route-content")
        [i].querySelector(".tocity")
        .setAttribute("name", `_root.route__${i}.tocity`);
      element
        .getElementsByClassName("route-content")
        [i].querySelector(".start_date")
        .setAttribute("name", `_root.route__${i}.departuredate`);
      element
        .getElementsByClassName("route-content")
        [i].querySelector(".fromcity-text")
        .setAttribute("name", `_root.route__${i}.fromcityName`);
      element
        .getElementsByClassName("route-content")
        [i].querySelector(".tocity-text")
        .setAttribute("name", `_root.route__${i}.tocityName`);
      element
        .getElementsByClassName("route-content")
        [i].querySelector(".multi-route-tlt")
        .insertAdjacentHTML(
          "beforeend",
          `<input type="hidden" value="${destination_nth_txt[i]}" name="_root.route__${i}.index"/>`
        );
    }
  }
}

function exchangeDepDes(element) {
  var dep = $(element).closest(".route-content").find(".FCD1").val(),
    des = $(element).closest(".route-content").find(".FCD2").val(),
    depid = $(element).closest(".route-content").find(".FCDid1").val(),
    desid = $(element).closest(".route-content").find(".FCDid2").val();

  $(element).closest(".route-content").find(".FCD1").val(des),
    $(element).closest(".route-content").find(".FCD2").val(dep),
    $(element).closest(".route-content").find(".FCDid1").val(desid),
    $(element).closest(".route-content").find(".FCDid2").val(depid);
}
////////<!----- JS  MULTICITY ---->////////


