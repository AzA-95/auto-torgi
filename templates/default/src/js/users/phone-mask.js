import Inputmask from "inputmask";

const runInitInputMask = function() {
	let elements = document.querySelectorAll('.js-phone-mask');

	if (elements.length) {
		let im = new Inputmask('+7 999 999-99-99', {
			"clearIncomplete": true
		});
	
		im.mask(elements);
	}
};

runInitInputMask();

// Add an event listener
document.addEventListener("popup:shown", function(e) {
	runInitInputMask();
});