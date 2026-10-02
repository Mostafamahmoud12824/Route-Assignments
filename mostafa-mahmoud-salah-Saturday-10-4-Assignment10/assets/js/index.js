var htmlTag = document.documentElement;
function setActive(list, activeEl) {
  list.forEach(function (el) {
    el.classList.toggle("active", el == activeEl);
  });
}

// ================= Dark Mode =================
if (localStorage.getItem("mode") == "dark") {
  htmlTag.classList.add("dark");
}

document.getElementById("modeBtn").addEventListener("click", function () {
  var isDark = htmlTag.classList.toggle("dark");
  localStorage.setItem("mode", isDark ? "dark" : "light");
});

// ================= Back To Top + Scroll Spy =================
var topBtn = document.getElementById("topBtn");
var navLinks = document.querySelectorAll(".main-nav .nav-link");

topBtn.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

function onScroll() {
  topBtn.classList.toggle("d-none", window.scrollY <= 400);

  // the active link is the last section we already passed
  var activeLink = navLinks[0];
  navLinks.forEach(function (link) {
    var section = document.querySelector(link.getAttribute("href"));
    if (window.scrollY + 150 >= section.offsetTop) {
      activeLink = link;
    }
  });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
    activeLink = navLinks[navLinks.length - 1];
  }

  setActive(navLinks, activeLink);
}

window.addEventListener("scroll", onScroll);
onScroll();

// ================= Portfolio Tabs  =================
var filterBtns = document.querySelectorAll(".filter-btn");
var projects = document.querySelectorAll(".project");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    setActive(filterBtns, btn);

    var filter = btn.dataset.filter;
    projects.forEach(function (project) {
      var show = filter == "all" || filter == project.dataset.category;
      project.classList.toggle("d-none", !show);
    });
  });
});

// ================= Testimonials Slider =================
var sliderTrack = document.getElementById("sliderTrack");
var slides = document.querySelectorAll(".slide");
var sliderDots = document.getElementById("sliderDots");
var currentSlide = 0;

// 5 stars in every review
document.querySelectorAll(".stars").forEach(function (stars) {
  stars.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(5);
});

function getVisibleSlides() {
  if (window.innerWidth >= 992) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

for (var i = 0; i <= slides.length - getVisibleSlides(); i++) {
  var dot = document.createElement("button");
  dot.className = "slider-dot";
  dot.dataset.index = i;
  dot.addEventListener("click", function () {
    showSlide(Number(this.dataset.index));
  });
  sliderDots.appendChild(dot);
}

var dots = document.querySelectorAll(".slider-dot");

function showSlide(index) {
  var lastSlide = slides.length - getVisibleSlides();

  if (index > lastSlide) index = 0;
  if (index < 0) index = lastSlide;

  currentSlide = index;

  sliderTrack.style.transform =
    "translateX(" + (index * 100) / getVisibleSlides() + "%)";

  setActive(dots, dots[index]);
}

document.getElementById("nextBtn").addEventListener("click", function () {
  showSlide(currentSlide + 1);
});

document.getElementById("prevBtn").addEventListener("click", function () {
  showSlide(currentSlide - 1);
});

showSlide(0);

var selectBoxes = document.querySelectorAll(".select-box");

selectBoxes.forEach(function (box) {
  var head = box.querySelector(".select-head");
  var text = box.querySelector(".select-text");
  var list = box.querySelector(".select-list");

  text.dataset.placeholder = text.innerHTML; // to use it on reset

  head.addEventListener("click", function () {
    list.classList.toggle("d-none");
  });

  list.querySelectorAll(".select-item").forEach(function (item) {
    item.addEventListener("click", function () {
      text.innerHTML = item.innerHTML;
      head.classList.add("selected");
      list.classList.add("d-none");
    });
  });
});

// ================= Contact Form =================
var contactForm = document.getElementById("contactForm");
var nameInput = document.getElementById("nameInput");
var emailInput = document.getElementById("emailInput");
var messageInput = document.getElementById("messageInput");
var formMessage = document.getElementById("formMessage");

// red border when the input is not valid
function checkInput(input, isValid) {
  input.classList.toggle("border-danger", !isValid);
  return isValid;
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading

  var nameOk = checkInput(nameInput, nameInput.value != "");
  var emailOk = checkInput(emailInput, emailInput.value.includes("@"));
  var messageOk = checkInput(messageInput, messageInput.value != "");
  var isValid = nameOk && emailOk && messageOk;

  formMessage.classList.toggle("text-success", isValid);
  formMessage.classList.toggle("text-danger", !isValid);

  if (isValid) {
    formMessage.innerHTML = "تم إرسال رسالتك بنجاح ✔";
    contactForm.reset();

    // reset the custom selects
    selectBoxes.forEach(function (box) {
      var text = box.querySelector(".select-text");
      text.innerHTML = text.dataset.placeholder;
      box.querySelector(".select-head").classList.remove("selected");
    });
  } else {
    formMessage.innerHTML = "من فضلك املأ الاسم والإيميل وتفاصيل المشروع";
  }
});

// ================= Settings Box =================
// ----- Change Font -----
var fontBtns = document.querySelectorAll(".font-btn");

function changeFont(fontName) {
  document.body.style.fontFamily = fontName + ", sans-serif";
  setActive(fontBtns, document.querySelector('[data-font="' + fontName + '"]'));
  localStorage.setItem("font", fontName);
}

fontBtns.forEach(function (btn) {
  btn.style.fontFamily = btn.dataset.font; 
  btn.addEventListener("click", function () {
    changeFont(btn.dataset.font);
  });
});

// ----- Change Colors -----
var themes = [
  { primary: "#06b6d4", secondary: "#3b82f6", accent: "#8b5cf6" },
  { primary: "#6366f1", secondary: "#8b5cf6", accent: "#ec4899" },
  { primary: "#10b981", secondary: "#14b8a6", accent: "#06b6d4" },
  { primary: "#f97316", secondary: "#f59e0b", accent: "#ef4444" },
  { primary: "#ec4899", secondary: "#f43f5e", accent: "#a855f7" },
  { primary: "#ef4444", secondary: "#f97316", accent: "#ec4899" },
];

var colorsBox = document.getElementById("colors");

themes.forEach(function (theme, index) {
  var btn = document.createElement("button");
  btn.className = "color-btn rounded-circle";
  btn.style.background = theme.primary;
  btn.addEventListener("click", function () {
    changeColor(index);
  });
  colorsBox.appendChild(btn);
});
var colorBtns = document.querySelectorAll(".color-btn");

function changeColor(index) {
  var theme = themes[index];
  htmlTag.style.setProperty("--primary", theme.primary);
  htmlTag.style.setProperty("--secondary", theme.secondary);
  htmlTag.style.setProperty("--accent", theme.accent);

  setActive(colorBtns, colorBtns[index]);
  localStorage.setItem("color", index);
}

// ----- Reset -----
document.getElementById("resetBtn").addEventListener("click", function () {
  changeFont("Tajawal");
  changeColor(0);
});

// load the saved settings
changeFont(localStorage.getItem("font") || "Tajawal");
changeColor(localStorage.getItem("color") || 0);
