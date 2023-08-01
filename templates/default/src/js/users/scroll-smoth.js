let isMob = window.matchMedia('(max-width:768px)').matches;
let links = document.querySelectorAll('.js-scroll-smoth');

[].forEach.call(links, function(link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();

		let el = document.querySelector(this.getAttribute('href'));
		
		if (el) {
			window.scroll({
				behavior: 'smooth',
				top: isMob ? el.offsetTop - 40 : el.offsetTop // 40 is height of mobile header
			});
		}
	});
});