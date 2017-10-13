// Menu
var navBtn = document.querySelector('.hamburger');
var navMain = document.querySelector('#nav__list');
function openNav(){
    //animate hamburger
    navBtn.classList.toggle('open');

    //open nav by adding class
    navMain.classList.toggle('active');
}
navBtn.addEventListener('click', openNav);