document.addEventListener('DOMContentLoaded', function () {
	// For popups
	document.addEventListener('click',function(e){
		if(e.target && e.target.hasAttribute('data-ajax')) {
			e.preventDefault();

			const url = e.target.getAttribute('data-url');
			const modiferClass = e.target.getAttribute('data-modifer-popup-class');

			fetch(url)
				.then(function(response) {
					return response.text();
				})
				.then(function(html) {
					globalPopup
						.options({
							addClassNamePopup: modiferClass ? modiferClass : null,
							closeButtons: '.js-popup-close-btn'
						})
						.html(html)
						.show();
				});
		}
	});

	
	// For tooltips
	tippy('[data-tippy-content]', {
		allowHTML: true,
		delay: 0,
		appendTo: () => document.body,
	});
}, false);