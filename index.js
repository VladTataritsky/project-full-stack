const menuBtn = document.getElementById('menuBtn');
const aside = document.getElementsByTagName('aside')[0];
const personBtn = document.getElementById('personBtn');
const truckBtn = document.getElementById('truckBtn')

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

personBtn.addEventListener('click', () => {
  document.getElementById('shippingContainer').style.display = 'none';
  document.getElementById('processorInfContainer').style.display = 'block';
  truckBtn.firstElementChild.classList.remove('circle-active');
  personBtn.firstElementChild.classList.add('circle-active');
  personBtn.style.borderBottom = '3px solid #738fa4';
  truckBtn.style.borderBottom = '3px solid transparent';
});
truckBtn.addEventListener('click', () => {
  document.getElementById('processorInfContainer').style.display = 'none';
  document.getElementById('shippingContainer').style.display = 'block';
  personBtn.firstElementChild.classList.remove('circle-active');
  truckBtn.firstElementChild.classList.add('circle-active');
  truckBtn.style.borderBottom = '3px solid #738fa4';
  personBtn.style.borderBottom = '3px solid transparent';
});

document.getElementsByTagName('input')[0].addEventListener('focus', () => {
  document.getElementById('refreshIcon').style.display = 'none';
  document.getElementById('searchIcon').style.right = 15 + 'px';
});
document.getElementsByTagName('input')[0].addEventListener('blur', () => {
  document.getElementById('refreshIcon').style.display = 'inline';
  document.getElementById('searchIcon').style.right = 40 + 'px';

});