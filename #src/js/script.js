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

var map;

function initMap() {
	// Create map
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 30.266666, lng: -97.73333 },
		zoom: 8,
	});

	// Array to hold search options
	var markers = [];

	// When user selects prediction from list
	searchName.addListener('places_changed', function () {
		// Var to get places
		var places = searchName.getPlaces();

		// If no places then just return (do nothing)
		if (places.length === 0) {
			return;
		}

		// Clear previous markers
		markers.forEach(function (m) {
			m.setMap(null);
		});

		// Reset markers array
		markers = [];

		// bounds object
		var bounds = new google.maps.LatLngBounds();

		places.forEach(function (p) {
			// If no data then just return (do nothing)
			if (!p.geometry) {
				return;
			}

			// push marker with data
			markers.push(
				new google.maps.Marker({
					map: map,
					title: p.title,
					position: p.geometry.location,
				})
			);

			if (p.geometry.viewport) {
				bounds.union(p.geometry.viewport);
			} else {
				bounds.extend(p.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});
}

const modalWindow = document.querySelector('.modal');
const closeModal = document.querySelector('.modal-close-btn');
const btnsPublish = document.querySelectorAll('.data__control-btns button');

modalWindow?.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal')) {
		modalWindow.classList.remove('active');
	}
});
btnsPublish.forEach((btn) => {
	btn.addEventListener('click', () => {
		modalWindow.classList.add('active');
	});
});

closeModal?.addEventListener('click', () => {
	modalWindow.classList.remove('active');
});

const accordionItemHeaders = document.querySelectorAll('.faq__accordion-item-header');

accordionItemHeaders.forEach((accordionItemHeader) => {
	accordionItemHeader.addEventListener('click', (event) => {
		const currentlyActiveAccordionItemHeader = document.querySelector('.faq__accordion-item-header.active');
		if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
			currentlyActiveAccordionItemHeader.classList.toggle('active');
			currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
		}
		console.log(accordionItemHeader);

		accordionItemHeader.classList.toggle('active');
		const accordionItemBody = accordionItemHeader.nextElementSibling;
		if (accordionItemHeader.classList.contains('active')) {
			accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
		} else {
			accordionItemBody.style.maxHeight = 0;
		}
	});
});

const singleCompanyBtns = document.querySelectorAll(".section-company__controls-buttons button");

if (singleCompanyBtns) {
	singleCompanyBtns.forEach(item => {
		item.addEventListener("click", function () {
			document.querySelector(".modal").classList.add("active");
		});
	});
}

if (document.querySelector(".whitelist-btn")) {
	document.querySelector(".whitelist-btn").addEventListener("click", function () {
		if (this.querySelector(".fa-heart").classList.contains("fa-regular")) {
			this.querySelector(".fa-heart").classList.remove("fa-regular");
			this.querySelector(".fa-heart").classList.add("fa-solid");
		} else {
			this.querySelector(".fa-heart").classList.remove("fa-solid");
			this.querySelector(".fa-heart").classList.add("fa-regular");
		}
	});
}