const postsWrapper = document.querySelector('.post-card-row-wrapper-');
const showWrapperToggle = document.querySelector('#ball-10');
const postCardRow = document.querySelectorAll('#post-card-row-1_2');

// hidden input
const hiddenInput = document.querySelector('#posts-ids-selected');

const showPostsToSHowWrapper = () => {
	showWrapperToggle.checked
		? (postsWrapper.style.display = 'block')
		: (postsWrapper.style.display = 'none');
};

// add or remove post to input
let postToShowAdded = false;

postCardRow.forEach((el) => {
	el.addEventListener('click', (e) => {
		if (
			e.target.dataset.postAdded == 'false' ||
			!e.target.dataset.postAdded
		) {
			e.target.style.backgroundColor = 'rgb(161, 216, 139)';

			hiddenInput.value = hiddenInput.value + `${e.target.dataset.postId} `;
			console.log(e.target.dataset.postAdded);
			e.target.dataset.postAdded = 'true';
		} else if (e.target.dataset.postAdded == 'true') {
			e.target.style.backgroundColor = '#f2f2f2';

			const currentInputIDS = hiddenInput.value.split(' ');
			const removedIdArray = currentInputIDS.filter(
				(id) => id != e.target.dataset.postId
			);
			hiddenInput.value = removedIdArray.toString().replaceAll(',', ' ');
			console.log(e.target.dataset.postAdded);
			e.target.dataset.postAdded = 'false';
		}
	});
});

// -------------------------- click image to show input ------------------------------------
const imageTriggerForInput = document.querySelectorAll(
	'#home-section-logo-image'
);

const triggerInput = (e) => {
	e.target.nextElementSibling.nextElementSibling.nextElementSibling.click();
};

imageTriggerForInput.forEach((image) => {
	image.addEventListener('click', triggerInput);
});

// ----------------------- update image value once the new image is loaded ---------------
const inputNewImage = document.querySelectorAll('#home-section-logo');
const inputNewImageFeaturedSection = document.querySelector(
	'#featured-section-img'
);

const loadData = (e) => {
	e.target.previousElementSibling.style.display = 'block';
	e.target.previousElementSibling.textContent = e.target.value.split('\\')[2];
};

inputNewImageFeaturedSection.addEventListener('change', loadData);

inputNewImage.forEach((input) => {
	input.addEventListener('change', loadData);
});

// ------------------------- desktop menu section ---------------------------
const menuButtonsMoreSections = document.querySelectorAll(
	'.edit-home-page_U-1-2'
);
const homeMenuSection = document.querySelector('#home-div-trigger_U-1-2');
const aboutMenuSection = document.querySelector('#about-div-trigger_U-1-2');
const contactMenuSection = document.querySelector('#contact-div-trigger_U-1-2');
const othersMenuSection = document.querySelector('#buttons-div-trigger_U-1-2');

const HeaderhomeMenuSection = document.querySelector(
	'#header-home-div-trigger_U-1-2'
);
const HeaderaboutMenuSection = document.querySelector(
	'#header-about-div-trigger_U-1-2'
);
const HeadercontactMenuSection = document.querySelector(
	'#header-contact-div-trigger_U-1-2'
);
const HeaderothersMenuSection = document.querySelector(
	'#header-buttons-div-trigger_U-1-2'
);

const showNextSettingsSection = (e) => {
	menuButtonsMoreSections.forEach((button) =>
		button.classList.remove('focused')
	);
	e.target.classList.add('focused');

	console.log(e.target.dataset.setSection);
	switch (e.target.dataset.setSection) {
		case 'home':
			homeMenuSection.classList.remove('hidden-input');
			aboutMenuSection.classList.add('hidden-input');
			contactMenuSection.classList.add('hidden-input');
			othersMenuSection.classList.add('hidden-input');
			HeaderhomeMenuSection.classList.remove('hidden-input');
			HeaderaboutMenuSection.classList.add('hidden-input');
			HeadercontactMenuSection.classList.add('hidden-input');
			HeaderothersMenuSection.classList.add('hidden-input');
			break;
		case 'about':
			homeMenuSection.classList.add('hidden-input');
			aboutMenuSection.classList.remove('hidden-input');
			contactMenuSection.classList.add('hidden-input');
			othersMenuSection.classList.add('hidden-input');
			HeaderhomeMenuSection.classList.add('hidden-input');
			HeaderaboutMenuSection.classList.remove('hidden-input');
			HeadercontactMenuSection.classList.add('hidden-input');
			HeaderothersMenuSection.classList.add('hidden-input');
			break;
		case 'contact':
			homeMenuSection.classList.add('hidden-input');
			aboutMenuSection.classList.add('hidden-input');
			contactMenuSection.classList.remove('hidden-input');
			othersMenuSection.classList.add('hidden-input');
			HeaderhomeMenuSection.classList.add('hidden-input');
			HeaderaboutMenuSection.classList.add('hidden-input');
			HeadercontactMenuSection.classList.remove('hidden-input');
			HeaderothersMenuSection.classList.add('hidden-input');
			break;
		case 'others':
			homeMenuSection.classList.add('hidden-input');
			aboutMenuSection.classList.add('hidden-input');
			contactMenuSection.classList.add('hidden-input');
			othersMenuSection.classList.remove('hidden-input');
			HeaderhomeMenuSection.classList.add('hidden-input');
			HeaderaboutMenuSection.classList.add('hidden-input');
			HeadercontactMenuSection.classList.add('hidden-input');
			HeaderothersMenuSection.classList.remove('hidden-input');
			break;
	}
};

menuButtonsMoreSections.forEach((button) =>
	button.addEventListener('click', showNextSettingsSection)
);
