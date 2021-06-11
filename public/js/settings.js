const sectionToggle = document.querySelectorAll('.page-toggle');

let toggle = false;
sectionToggle.forEach((toggleDiv) => {
	toggleDiv.addEventListener('click', (thiss) => {
		const nextSibling = thiss.target.nextElementSibling;
		const childNode = thiss.target.firstChild.nextElementSibling;

		if (toggle === false) {
			toggle = true;
			nextSibling.style.display = 'block';
			childNode.style.cssText =
				'transform: rotate(180deg); transition: transform 300ms ease-in-out;';
		} else if (toggle === true) {
			toggle = false;
			nextSibling.style.display = 'none';
			childNode.style.cssText =
				'transform: rotate(90deg); transition: transform 300ms ease-in-out;';
		}
	});
});

/////-------delete routes---------

const deleteRoute = document.querySelectorAll('.delete');
const darkBkg = document.createElement('DIV');

deleteRoute.forEach((deleteButton) => {
	deleteButton.addEventListener('click', (thiss) => {
		darkBkg.className = 'dark-background';
		document.body.appendChild(darkBkg);
		darkBkg.style.display = 'block';

		const card = document.querySelector(
			`.${thiss.target.nextElementSibling.className.replace(/ /g, '-')}`
		);
		card.style.display = 'flex';

		console.log(thiss.target.nextElementSibling.className.replace(/ /g, '-'));
	});
});

const removePromptProf = () => {
	darkBkg.style.display = 'none';
	const card = document.querySelectorAll('#delete-route');
	card.forEach((card) => (card.style.display = 'none'));
};
