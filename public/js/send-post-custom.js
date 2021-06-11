// MAY DELETE

const sendPostButton = document.querySelector('.send-post');
const postTitle = document.querySelector('#post-body_title');
const postBody = document.querySelector('#post-body_parragraph');
const entirePost = document.querySelector('#post-body');
const cancelPostButton = document.querySelector('.cancel-post');

const sendPost = async () => {
	const data = {
		postContent: entirePost.outerHTML,
		title: postTitle.textContent,
		content: postBody.textContent,
		category: arrayToFilterFrom,
	};

	await fetch('/account/new', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	location.reload();
};

sendPostButton.addEventListener('click', sendPost);

//will remove the alert
const bkg = document.createElement('DIV');
const removePrompt = () => {
	bkg.remove();
};

const confirmCancel = () => {
	bkg.className = 'dark-background';

	bkg.innerHTML =
		' <div style="display: flex" class="card-on-bck" >' +
		'<h3> Are you sure you want to erase all? Your post will not be saved <h3>' +
		'<div class="send-post" onclick="removePrompt()"> NO </div> <a href="/posts/new" class="cancel-post"> YES </a>' +
		'</div>';

	document.body.prepend(bkg);
};
cancelPostButton.addEventListener('click', confirmCancel);
