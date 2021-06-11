//menu
const menuTrigger = document.querySelector('.header_menu');
let toggleMenu = true;

const triggerMenu = () => {
	const topBar = document.querySelector('.menu_burger-top');
	const middleBar = document.querySelector('.menu_burger-middle');
	const bottomBar = document.querySelector('.menu_burger-bottom');
	const menuContainer = document.querySelector('.menu-container');
	const menuContainerDiv = document.querySelectorAll('.menu-container a');

	if (toggleMenu === true) {
		menuContainer.style.cssText =
			'width: 80%; transition: width 600ms ease-in-out;';
		topBar.style.cssText =
			'transform: rotate(45deg);  position: relative; top: .2rem; margin: 0; transition: transform 300ms ease-in-out;';
		middleBar.style.cssText = 'display: none;';
		bottomBar.style.cssText =
			'transform: rotate(-45deg);  position: relative; top: .-2rem; margin: 0; transition: transform 300ms ease-in-out;';
		menuContainerDiv.forEach((div) => {
			div.classList.remove('a-close');
			div.classList.add('a-open');
		});
		toggleMenu = false;
	} else if (toggleMenu === false) {
		menuContainer.style.cssText =
			'width: 0; transition: width 600ms ease-in-out;';
		topBar.style.cssText =
			'transform: rotate(0); transition: transform 300ms ease-in-out;';
		middleBar.style.cssText = 'display: block;';
		bottomBar.style.cssText =
			'transform: rotate(0); transition: transform 300ms ease-in-out;';
		menuContainerDiv.forEach((div) => {
			div.classList.remove('a-open');
			div.classList.add('a-close');
		});

		toggleMenu = true;
	}
};
menuTrigger.addEventListener('click', triggerMenu);

///open each comment card
const readComment = document.querySelectorAll('.public-comments_card');

readComment.forEach((comment) => {
	comment.addEventListener('click', (thiss) => {
		let cloneCommentCard;

		if (thiss.target.className == 'public-comments_card') {
			cloneCommentCard = thiss.target.cloneNode(true);
		} else {
			cloneCommentCard = thiss.target.parentNode.cloneNode(true);
		}

		const background = document.createElement('DIV');

		document.body.appendChild(background);
		background.setAttribute('id', 'popup-bkg');
		background.appendChild(cloneCommentCard);

		background.addEventListener('click', () => {
			background.remove();
		});
	});
});

//leave a comment
const createComment = document.querySelector('.leave-a-comment');

//on add event if the button is rendered
if (createComment) {
	createComment.addEventListener('click', () => {
		const createCommentForm = document.querySelector('#card-on-bck');
		createCommentForm.style.display = 'flex';

		const background = document.createElement('DIV');
		background.className = 'dark-background';
		document.body.appendChild(background);

		document.body.style.overflow = 'hidden';
	});
}
const hideCreateComment = () => {
	const createCommentForm = document.querySelector('#card-on-bck');
	document.querySelector('.dark-background').remove();
	createCommentForm.style.display = 'none';
	document.body.style.overflow = 'scroll';
};
