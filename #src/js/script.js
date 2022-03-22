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

$('select').each(function () {
	var $this = $(this),
		numberOfOptions = $(this).children('option').length;

	$this.addClass('select-hidden');
	$this.wrap('<div class="select"></div>');
	$this.after('<div class="select-styled"></div>');

	var $styledSelect = $this.next('div.select-styled');
	$styledSelect.text($this.children('option').eq(0).text());

	var $list = $('<ul />', {
		class: 'select-options',
	}).insertAfter($styledSelect);

	for (var i = 0; i < numberOfOptions; i++) {
		$('<li />', {
			text: $this.children('option').eq(i).text(),
			rel: $this.children('option').eq(i).val(),
		}).appendTo($list);
		//if ($this.children('option').eq(i).is(':selected')){
		//  $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
		//}
	}

	var $listItems = $list.children('li');

	$styledSelect.click(function (e) {
		e.stopPropagation();
		$('div.select-styled.active')
			.not(this)
			.each(function () {
				$(this).removeClass('active').next('ul.select-options').hide();
			});
		$(this).toggleClass('active').next('ul.select-options').toggle();
	});

	$listItems.click(function (e) {
		e.stopPropagation();
		$styledSelect.text($(this).text()).removeClass('active');
		$this.val($(this).attr('rel'));
		$list.hide();
		//console.log($this.val());
	});

	$(document).click(function () {
		$styledSelect.removeClass('active');
		$list.hide();
	});
});

const modalWindow = document.querySelector('.modal');
const closeModal = document.querySelector('.modal-close-btn');
const btnsPublish = document.querySelectorAll('.data__control-btns button');

modalWindow.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal')) {
		modalWindow.classList.remove('active');
	}
});
btnsPublish.forEach((btn) => {
	btn.addEventListener('click', () => {
		modalWindow.classList.add('active');
	});
});

closeModal.addEventListener('click', () => {
	modalWindow.classList.remove('active');
});
