const nav = document.querySelector('.navigation');
window.addEventListener('scroll', () => {
	window.scrollY > 0 ? nav.classList.add('scroll') : nav.classList.remove('scroll');
});

const navBtn = document.querySelector('.burger');
const mobNav = document.querySelector('.mob-nav');
navBtn.addEventListener('click', () => {
	navBtn.classList.toggle('open');
	mobNav.classList.toggle('active');
	mobNav.classList.contains('active') ? navBtn.classList.add('black') : navBtn.classList.remove('black');
});
