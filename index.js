const menuBtn = document.getElementById('menuBtn');
const aside = document.getElementsByTagName('aside')[0];
const personBtn = document.getElementById('personBtn');
const truckBtn = document.getElementById('truckBtn');
const input = document.getElementById('input');
const closeIcon = document.getElementById('closeIcon');

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

input.addEventListener('focus', () => {
  document.getElementById('refreshIcon').style.display = 'none';
  document.getElementById('searchIcon').style.right = 15 + 'px';
  // input.length !== 0 ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});

input.addEventListener('blur', () => {
  closeIcon.style.display = 'none';
  document.getElementById('refreshIcon').style.display = 'inline';
  document.getElementById('searchIcon').style.right = 40 + 'px';
});

input.addEventListener('input', (event) => {
  event.target.value !== event.target.pattern ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});

