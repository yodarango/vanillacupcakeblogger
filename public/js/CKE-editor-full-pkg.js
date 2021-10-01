const arrayToFilterFrom = [];
const allPostsArray = [];
const cancelPostButton = document.querySelector('.cancel-post-erase-all');
const gridTop = document.querySelector('.post-image-top-grid');
const gridBottom = document.querySelector('.post-image-bottom-grid');

//will remove the alert
const bkg = document.createElement('DIV');
const removePrompt = () => {
	bkg.remove();
};

const confirmCancel = () => {
	bkg.style.display = 'block';
	bkg.className = 'dark-background';

	bkg.innerHTML =
		' <div class="card-on-bck" style= "display: flex;" >' +
		'<h3> Are you sure you want to erase all? Your post will not be saved <h3>' +
		'<div class="cancel-post" onclick="removePrompt()"> NO </div> <a href="/account/new" class="send-post"> YES </a>' +
		'</div>';

	document.body.prepend(bkg);
};
cancelPostButton.addEventListener('click', confirmCancel);

//removing the tag
const removeTag = (thiss) => {
	const index = arrayToFilterFrom.indexOf(
		thiss.parentNode.textContent.split(' ')[0]
	);
	arrayToFilterFrom.splice(index, 1);
	thiss.parentNode.remove();
	console.log(arrayToFilterFrom);
};

//adding the tag function
const addTag = (thiss) => {
	const tag = document.createElement('DIV');
	tag.setAttribute('class', 'dropdown-tag');
	tag.innerHTML = `${thiss.target.textContent} <div class="tag-remove" onclick="removeTag(this)">  X</div>`;

	const tagWrapper = document.querySelector('.tagWrapper');
	tagWrapper.appendChild(tag);
};

//adding tags button
const dropdown = document.querySelector('.dropdown-button');
let toggle = true;

dropdown.addEventListener('click', () => {
	const dropdownOptions = document.querySelectorAll('.dorpdown-option');

	if (toggle === true) {
		dropdownOptions.forEach((option) => {
			option.style.display = 'block';
		});
		toggle = false;
	} else if (toggle === false) {
		dropdownOptions.forEach((option) => {
			option.style.display = 'none';
		});
		toggle = true;
	}

	dropdownOptions.forEach((option) => {
		option.addEventListener('click', addTag);
	});
});

///filter results based in tags
const dropdownOption = document.querySelectorAll('.dorpdown-option');

dropdownOption.forEach((tag) => {
	tag.addEventListener('click', (thiss) => {
		arrayToFilterFrom.push(
			thiss.target.textContent.replace(/\s/g, '') /*.split(' ').join('-')*/
		);
		console.log(arrayToFilterFrom);
	});
});
let editor;
const postTitle = document.querySelector('.CKE-post-title');
const content = document.querySelector('.CKE-post-content');
const author = document.querySelector('.CKE-post-author');
const image = document.querySelector('#CKE-post-image');
const embed = document.querySelector('#CKE-post-embedVideo');

const showResult = async (file) => {
	const data = await fileDataURL(file);
	const cover = document.getElementById('result');
	cover.setAttribute('src', data);
	const str = document.getElementById('result').src;
	const n = str.length;
	const result = (3 * n) / 4 / 1000000;
	if (result > 3) {
		alert(`This  image is greater than 3MB. Please upload a smaller image`);
		cover.setAttribute('src', '/images/logo.jpeg');
	}
};

const loader = () => {
	const bkgPost = document.createElement('DIV');
	bkgPost.id = 'loader';
	const loader = document.createElement('DIV');
	loader.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>`;
	bkgPost.appendChild(loader);
	document.body.appendChild(bkgPost);
};

document.querySelector('#submitPost').addEventListener('click', async () => {
	loader();

	let sendEmail;
	document.querySelector('#ball-1').checked
		? (sendEmail = 'yes')
		: (sendEmail = 'no');
	CKeditorPost = {
		postContent: CKEDITOR.instances.editor.getData(),
		category: arrayToFilterFrom,
		title: postTitle.value,
		author: author.value,
		content: content.value,
		postImage: document.getElementById('result').src,
		sendEmail,
	};
	await fetch('/account/new', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(CKeditorPost),
	});
	console.log(CKeditorPost);
	window.location.href = '/account/profile';
});

const embedData = document.querySelector('#YT-res-data');
const embedVideo = document.querySelector('#YT-res-video');
const convertLink = document.querySelector('#youtube-link-converter-link');
const getDataButton = document.querySelector('#getYT-data');
const resMessage = document.querySelector('#YT-res-message');
getDataButton.addEventListener('click', async (e) => {
	try {
		const req = await fetch(
			`https://www.youtube.com/oembed?url=${convertLink.value.trim()}&format=json`
		);
		const res = await req.json();

		resMessage.textContent = `✅ Is this your video? if so you can copy and paste the iframe link below
        inoto the embeding area!
        `;
		embedVideo.innerHTML = res.html;
		embedData.style.background = 'white';
		embedData.textContent = res.html;
		embedData.contentEditable = true;
		console.log(res);
	} catch (error) {
		resMessage.textContent =
			'❌ Opps, there was an error, make sure your link is correct!';
	}
});

//upload images to posts
const fileDataURL = (file) =>
	new Promise((resolve, reject) => {
		let fr = new FileReader();
		fr.onload = () => resolve(fr.result);
		fr.onerror = reject;
		fr.readAsDataURL(file);
	});

const postImageTop = async (file) => {
	const data = await fileDataURL(file);
	const newImage = document.createElement('IMG');
	newImage.setAttribute('src', data);
	gridTop.appendChild(newImage);
	const str = document.getElementById('result').src;
	const n = str.length;
	const result = (3 * n) / 4 / 1000000;
	if (result > 3) {
		alert(`This  image is greater than 3MB. Please upload a smaller image`);
		cover.setAttribute('src', '');
	}
	if (gridTop.childElementCount >= 2) {
		document.querySelector('#upload-post-top').disabled = 'true';
	}
};
const postImageBottom = async (file) => {
	const data = await fileDataURL(file);
	const newImage = document.createElement('IMG');
	newImage.setAttribute('src', data);
	gridBottom.appendChild(newImage);
	const str = document.getElementById('result').src;
	const n = str.length;
	const result = (3 * n) / 4 / 1000000;
	if (result > 3) {
		alert(`This  image is greater than 3MB. Please upload a smaller image`);
		cover.setAttribute('src', '');
	}
	if (gridBottom.childElementCount >= 2) {
		document.querySelector('#upload-post-bottom').disabled = 'true';
	}
};

const sectionToggle = document.querySelector('.page-toggle');

let togglePhoto = false;

sectionToggle.addEventListener('click', (thiss) => {
	const nextSibling = thiss.target.nextElementSibling;
	const childNode = thiss.target.firstChild.nextElementSibling;

	if (togglePhoto === false) {
		togglePhoto = true;
		nextSibling.style.display = 'block';
		childNode.style.cssText =
			'transform: rotate(180deg); transition: transform 300ms ease-in-out;';
	} else if (togglePhoto === true) {
		togglePhoto = false;
		nextSibling.style.display = 'none';
		childNode.style.cssText =
			'transform: rotate(90deg); transition: transform 300ms ease-in-out;';
	}
});
