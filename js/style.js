// Script to dynamic work with buttons, forms

// Global variables
const menuBtn = document.getElementById('menuBtn');
const aside = document.getElementsByTagName('aside')[0];
const personBtn = document.getElementById('personBtn');
const truckBtn = document.getElementById('truckBtn');
const sidebarInput = document.getElementById('sidebarInput');
const productsInput = document.getElementById('productsInput');
const closeBtn = document.getElementsByClassName('btn-close')[0];
const closeBtn1 = document.getElementsByClassName('btn-close')[1];
const header = document.getElementsByClassName('main-header')[0];
const contentBlock = document.getElementsByClassName('content-block')[0];
const ordersList = document.getElementsByClassName('orders-list')[0];



// function which shows/hides sidebar by clicking on the menu button
const menuState = () => {
  if (aside.classList.contains('hide-menu')) {
    aside.classList.remove('hide-menu');
    aside.classList.add('show-menu');
   /* if (window.screen.width <= 1100) {
      contentBlock.style.opacity = '0'
    }*/
    header.style.paddingLeft = '340px';
    header.style.width = 'calc(100% - 320px)';
    header.style.maxWidth = '1060px';
    menuBtn.style.display = 'none'
  } else {
    aside.classList.remove('show-menu');
    aside.classList.add('hide-menu');
  }
};
menuBtn.addEventListener('click', menuState);
const backMenu = () => {
  if (aside.classList.contains('show-menu')) {
    aside.classList.remove('show-menu');
    aside.classList.add('hide-menu');
    menuBtn.style.display = 'block';
    header.style.paddingLeft = '0';
    header.style.width = '100%';
    header.style.maxWidth = '1400px';
    contentBlock.style.opacity = '1'
  } else {
    aside.classList.remove('hide-menu');
    aside.classList.add('show-menu');
    menuBtn.style.display = 'none';
    contentBlock.style.opacity = '1'
  }
};
document.getElementById('backImg').addEventListener('click', backMenu);

// function which switches shipping state to processor information block
personBtn.addEventListener('click', () => {
  document.getElementById('shippingContainer').style.display = 'none';
  document.getElementById('processorInfContainer').style.display = 'block';
  truckBtn.firstElementChild.classList.remove('circle-active');
  personBtn.firstElementChild.classList.add('circle-active');
  personBtn.style.borderBottom = '3px solid #738fa4';
  truckBtn.style.borderBottom = '3px solid transparent';
});

// function which switches shipping state to shipping block
truckBtn.addEventListener('click', () => {
  document.getElementById('processorInfContainer').style.display = 'none';
  document.getElementById('shippingContainer').style.display = 'block';
  personBtn.firstElementChild.classList.remove('circle-active');
  truckBtn.firstElementChild.classList.add('circle-active');
  truckBtn.style.borderBottom = '3px solid #738fa4';
  personBtn.style.borderBottom = '3px solid transparent';
});

// function which removes refresh icon by focusing on sidebar input
sidebarInput.addEventListener('focus', () => {
  document.getElementsByClassName('btn-refresh')[0].style.display = 'none';
  // sidebarInput.length !== 0 ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});

// function which recovers refresh icon by blur on sidebar input
sidebarInput.addEventListener('blur', () => {
  closeBtn.style.display = 'none';
  document.getElementsByClassName('btn-refresh')[0].style.display = 'inline';
});


// function which removes refresh icon by focusing on sidebar input
productsInput.addEventListener('focus', () => {
  document.getElementsByClassName('btn-refresh')[1].style.display = 'none';
  // sidebarInput.length !== 0 ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});

// function which recovers refresh icon by blur on sidebar input
productsInput.addEventListener('blur', () => {
  closeBtn1.style.display = 'none';
  document.getElementsByClassName('btn-refresh')[1].style.display = 'inline';
});



// function which removes close icon if sidebar input value is empty
sidebarInput.addEventListener('input', (event) => {
  event.target.value !== event.target.pattern ? closeBtn.style.display = 'inline' : closeBtn.style.display = 'none';
});

productsInput.addEventListener('input', (event) => {
  event.target.value !== event.target.pattern ? closeBtn1.style.display = 'inline' : closeBtn1.style.display = 'none';
});

const focusOrder = () => {
  for (let i = 0; i < ordersList.childNodes.length; i++) {
    if (ordersList.childNodes[i].classList.contains('focus-order-content')) {
      ordersList.childNodes[i].classList.remove('focus-order-content')
    }
  }
  event.target.classList.add('focus-order-content');
  if (window.screen.width <= 1100) {
    backMenu();
    contentBlock.style.opacity = '1'
  }
};