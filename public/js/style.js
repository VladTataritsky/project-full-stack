// Global variables
const menuBtn = document.getElementById("menuBtn");
const aside = document.getElementsByTagName("aside")[0];
const personBtn = document.getElementById("personBtn");
const truckBtn = document.getElementById("truckBtn");
const mapBtn = document.getElementById("mapBtn");
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

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('toggle-tabs')){
    for(let i = 0; i < document.getElementsByClassName('toggle-tabs').length; i++){
      document.getElementsByClassName('toggle-tabs')[i].firstElementChild.classList.remove("circle-active");
      document.getElementsByClassName('toggle-tabs')[i].style.borderBottom = "3px solid transparent";
    }

    if(event.target.id === 'truckBtn'){
      toFirstTab()
    }
    if(event.target.id === 'personBtn'){
      document.getElementsByClassName("map-wrapper")[0].style.display = "none";
      document.getElementById("shippingContainer").style.display = "none";
      document.getElementById("processorInfContainer").style.display = "block";

    }
    if(event.target.id === 'mapBtn'){
      document.getElementById("shippingContainer").style.display = "none";
      document.getElementById("processorInfContainer").style.display = "none";
      document.getElementsByClassName("map-wrapper")[0].style.display = "flex";
    }
    event.target.style.display = 'flex';
    event.target.firstElementChild.classList.add("circle-active");
    event.target.style.borderBottom = "3px solid #738fa4";
  }
});

const toFirstTab = () => {
  document.getElementById("processorInfContainer").style.display = "none";
  document.getElementsByClassName("map-wrapper")[0].style.display = "none";
  document.getElementById("shippingContainer").style.display = "block";
}

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

document.getElementsByClassName('add-orders-img')[0].addEventListener('click', ()=> {
  document.getElementsByClassName('popup')[0].style.display = 'block';
  document.getElementById('form-popup-products').style.display = 'none';
  document.getElementById('form-popup').style.display = 'block';
});

document.getElementsByClassName('add-product-img')[0].addEventListener('click', ()=> {
  document.getElementsByClassName('popup')[0].style.display = 'block';
  document.getElementById('form-popup').style.display = 'none';
  document.getElementById('form-popup-products').style.display = 'block';
});

document.getElementsByClassName('close-popup-img')[0].addEventListener('click', ()=> {document.getElementsByClassName('popup')[0].style.display = 'none'
});


