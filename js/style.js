// Script to dynamic work with buttons, forms

// Global variables
const menuBtn = document.getElementById('menuBtn');
const aside = document.getElementsByTagName('aside')[0];
const personBtn = document.getElementById('personBtn');
const truckBtn = document.getElementById('truckBtn');
const sidebarInput = document.getElementById('sidebarInput');
const closeIcon = document.getElementsByClassName('closeIcon')[0];
const contentBlock = document.getElementsByClassName('content-block')[0];
const ordersList = document.getElementsByClassName('orders-list')[0];

/*console.log(ordersList.length)

for(let i = 0; i <= ordersList.length; i++){
  console.log('kek')
}*/

// function which shows/hides sidebar by clicking on the menu button
const menuState = () => {
  if (aside.classList.contains('hide-menu')) {
    aside.classList.remove('hide-menu');
    aside.classList.add('show-menu');
    if (window.screen.width >= 1100) {
      contentBlock.style.opacity = '0'
    }
  } else {
    aside.classList.remove('show-menu');
    aside.classList.add('hide-menu');
  }
};
menuBtn.addEventListener('click', menuState);
document.getElementById('backImg').addEventListener('click', () => {
  aside.classList.remove('show-menu');
  aside.classList.add('hide-menu');
  contentBlock.style.opacity = '1'
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
  document.getElementsByClassName('refreshIcon')[0].style.display = 'none';
  document.getElementsByClassName('searchIcon')[0].style.right = 12 + 'px';
  // sidebarInput.length !== 0 ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});

// function which recovers refresh icon by blur on sidebar input
sidebarInput.addEventListener('blur', () => {
  closeIcon.style.display = 'none';
  document.getElementsByClassName('refreshIcon')[0].style.display = 'inline';
  document.getElementsByClassName('searchIcon')[0].style.right = 37 + 'px';
});

// function which removes close icon if sidebar input value is empty
sidebarInput.addEventListener('input', (event) => {
  event.target.value !== event.target.pattern ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});
