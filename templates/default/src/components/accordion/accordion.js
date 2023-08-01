const accordions = document.querySelectorAll(".js-accordion__title");

Array.from(accordions).forEach(function(accordion) {
	const parent = accordion.parentNode;
	const accordionContent = accordion.nextElementSibling;
	const height = accordionContent.scrollHeight;

	// Set initial max-height for visible active accordion 
	if (parent.classList.contains('active')) {
		accordionContent.style.setProperty(
			"--max-height",
			`${height}px`
		);
	}

	accordion.addEventListener("click", function() {
		const height = accordionContent.scrollHeight;

		accordionContent.style.setProperty(
			"--max-height",
			`${height}px`
		);

		// Нужен чтобы отрабатывала css анимация
		requestAnimationFrame(() => {
			parent.classList.toggle("active");
		});
	});
});