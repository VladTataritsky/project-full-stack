// Script to dynamic work with buttons, forms

// Global variables
const menuBtn = document.getElementById('menuBtn');
const aside = document.getElementsByTagName('aside')[0];
const personBtn = document.getElementById('personBtn');
const truckBtn = document.getElementById('truckBtn');
const sidebarInput = document.getElementById('sidebarInput');
const closeIcon = document.getElementById('closeIcon');

// function which shows/hides sidebar by clicking on the menu button
const menuState = () => {
  if (aside.classList.contains('hide-menu')) {
    aside.classList.remove('hide-menu');
    aside.classList.add('show-menu');
  } else {
    aside.classList.remove('show-menu');
    aside.classList.add('hide-menu');
  }
};
menuBtn.addEventListener('click', menuState);
document.getElementById('backImg').addEventListener('click', () => {
  aside.classList.remove('show-menu');
  aside.classList.add('hide-menu');
});

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
  document.getElementById('refreshIcon').style.display = 'none';
  document.getElementById('searchIcon').style.right = 12 + 'px';
  // sidebarInput.length !== 0 ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});

// function which recovers refresh icon by blur on sidebar input
sidebarInput.addEventListener('blur', () => {
  closeIcon.style.display = 'none';
  document.getElementById('refreshIcon').style.display = 'inline';
  document.getElementById('searchIcon').style.right = 37 + 'px';
});

// function which removes close icon if sidebar input value is empty
sidebarInput.addEventListener('input', (event) => {
  event.target.value !== event.target.pattern ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});

