const nav = document.querySelector('.navigation');
window.addEventListener('scroll', () => {
	window.scrollY > 0 ? nav.classList.add('scroll') : nav.classList.remove('scroll');
});

const navBtn = document.querySelector('.navigation__button');

navBtn.addEventListener('click', () => {
	navBtn.classList.add('open');
});
