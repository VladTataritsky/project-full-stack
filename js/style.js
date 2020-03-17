// Global variables
const menuBtn = document.getElementById("menuBtn");
const aside = document.getElementsByTagName("aside")[0];
const personBtn = document.getElementById("personBtn");
const truckBtn = document.getElementById("truckBtn");
const header = document.getElementsByClassName("main-header")[0];
const maxPhoneSizeScreen = 1100;
const ordersList = document.getElementsByClassName("orders-list")[0];


// function which shows/hides sidebar by clicking on the menu button
const menuState = () => {
  if (aside.classList.contains("hide-menu")) {
    aside.classList.remove("hide-menu");
    aside.classList.add("show-menu");
    header.classList.remove("header-hide-menu");
    header.classList.add("header-show-menu");
    menuBtn.style.display = "none"
  } else {
    aside.classList.remove("show-menu");
    aside.classList.add("hide-menu");
  }
};
menuBtn.addEventListener("click", menuState);

const backMenu = () => {
  if (aside.classList.contains("show-menu")) {
    aside.classList.remove("show-menu");
    aside.classList.add("hide-menu");
    menuBtn.style.display = "block";
    header.classList.remove("header-show-menu");
    header.classList.add("header-hide-menu");
  } else {
    aside.classList.remove("hide-menu");
    aside.classList.add("show-menu");
    menuBtn.style.display = "none";
  }
};
document.getElementById("backImg").addEventListener("click", backMenu);

// function which switches shipping state to processor information block
const personTab = () => {
  document.getElementById("shippingContainer").style.display = "none";
  document.getElementById("processorInfContainer").style.display = "block";
  truckBtn.firstElementChild.classList.remove("circle-active");
  personBtn.firstElementChild.classList.add("circle-active");
  personBtn.style.borderBottom = "3px solid #738fa4";
  truckBtn.style.borderBottom = "3px solid transparent";
};
personBtn.addEventListener("click", personTab);

// function which switches shipping state to shipping block
const truckTab = () => {
  document.getElementById("processorInfContainer").style.display = "none";
  document.getElementById("shippingContainer").style.display = "block";
  personBtn.firstElementChild.classList.remove("circle-active");
  truckBtn.firstElementChild.classList.add("circle-active");
  truckBtn.style.borderBottom = "3px solid #738fa4";
  personBtn.style.borderBottom = "3px solid transparent";
};
truckBtn.addEventListener("click", truckTab);

// function which removes refresh icon by focusing on sidebar input
const focusInput = (event) => {
  document.getElementsByClassName("btn-refresh")[event.target.getAttribute("data-input")].style.display = "none";
};
document.getElementById("sidebarInput").addEventListener("focus", focusInput);
document.getElementById("productsInput").addEventListener("focus", focusInput);

// function which recovers refresh icon by blur on sidebar input
const blurInput = (event) => {
  document.getElementsByClassName("btn-close")[event.target.getAttribute("data-input")].style.display = "none";
  document.getElementsByClassName("btn-refresh")[event.target.getAttribute("data-input")].style.display = "inline";
};
document.getElementById("sidebarInput").addEventListener("blur", blurInput);
document.getElementById("productsInput").addEventListener("blur", blurInput);

// function which removes close icon if sidebar input value is empty
const inputEmptyVal = (event) => {
  event.target.value !== event.target.pattern ? document.getElementsByClassName("btn-close")[event.target.getAttribute("data-input")].style.display = "inline" : document.getElementsByClassName("btn-close")[event.target.getAttribute("data-input")].style.display = "none";
};
document.getElementById("sidebarInput").addEventListener("input", inputEmptyVal);
document.getElementById("productsInput").addEventListener("input", inputEmptyVal);

const focusOrder = () => {
  for (let i = 0; i < ordersList.childNodes.length; i++) {
    if (ordersList.childNodes[i].classList.contains("focus-order-content")) {
      ordersList.childNodes[i].classList.remove("focus-order-content")
    }
  }
  event.target.classList.add("focus-order-content");
  if (window.screen.width <= maxPhoneSizeScreen) {
    backMenu();
    document.getElementsByClassName("content-block")[0].style.opacity = "1"
  }
};



