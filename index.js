const menuBtn = document.getElementById('menuBtn');
const aside = document.getElementsByTagName('aside')[0];

const menuState = () => {
  if(aside.classList.contains('hide-menu')) {
    aside.classList.remove('hide-menu');
    aside.classList.add('show-menu');
  } else {
    aside.classList.remove('show-menu');
    aside.classList.add('hide-menu');
  }
};

menuBtn.addEventListener('click', menuState);