//display the different content types
const postsButton = document.querySelector('.posts-or-comments-wrap_posts');
const commentsButton = document.querySelector(
	'.posts-or-comments-wrap_comments'
);
const statsButton = document.querySelector('.posts-or-comments-stats');
const totalPostsTitle = document.querySelector('.all-posts-title-profile');
const gridView = document.querySelector('.all-posts-grid-profile');
const wrapper = document.querySelector('.append-resulting-childs-comment');
const subscribersWrapper = document.querySelector(
	'.append-resulting-childs-subs'
);
const searchForm = document.querySelector('.search-form-profile');
const dropdownButton = document.querySelector('.dorpdown');

postsButton.addEventListener('click', () => {
	dropdown.style.display = 'block';
	dropdown.style.width = '140px';
	dropdown.style.height = '50px';
	//totalPostsTitle.textContent = `TOTAL POSTS (${gridView.childElementCount})`

	gridView.style.display = 'flex';
	postsButton.style.background = '#3b3b3b';

	wrapper.style.display = 'none';
	commentsButton.style.background = '#5f5f5f';
	statsButton.style.background = '#5f5f5f';

	searchForm.style.display = 'block';

	dropdownButton.style.display = 'block';

	subscribersWrapper.style.display = 'none';

	const removeSubscribers = document.querySelectorAll(
		'.public-comments-profile-subscriber'
	);
	removeSubscribers.forEach((div) => div.remove());
	const removeComments = document.querySelectorAll(
		'.public-comments-profile-comments'
	);
	removeComments.forEach((div) => div.remove());

	document.querySelector('.paggination-buttons').style.display = 'flex';
	document.querySelector('#paggination-buttons-page').style.display = 'flex';

	if (
		document.querySelector('#commentsDisclaimer') ||
		document.querySelector('#subscribersDisclaimer')
	) {
		document.querySelector('#commentsDisclaimer').remove();
		document.querySelector('#subscribersDisclaimer').remove();
	}
});

commentsButton.addEventListener('click', async () => {
	const result = await fetch('/account/comments');
	const data = await result.json();

	totalPostsTitle.textContent = `TOTAL COMMENTS (${data.count})`;

	gridView.style.display = 'none';
	postsButton.style.background = '#5f5f5f';
	commentsButton.style.background = '#3b3b3b';
	statsButton.style.background = '#5f5f5f';
	const searchForm = document.querySelector('.search-form-profile');
	searchForm.style.display = 'none';

	dropdownButton.style.display = 'none';

	wrapper.style.display = 'flex';

	document.querySelector('.paggination-buttons').style.display = 'none';
	document.querySelector('#paggination-buttons-page').style.display = 'none';

	const warning = document.createElement('DIV');
	warning.id = 'commentsDisclaimer';
	warning.innerHTML = ` <h4>Disclaimer</h4>
        <p>Due to performance issues you will only see the last 3000 comments, if you wish to see more, login to your Database</p>
    `;
	wrapper.appendChild(warning);

	if (document.querySelector('#subscribersDisclaimer')) {
		document.querySelector('#subscribersDisclaimer').remove();
	}

	for (item of data.comments) {
		const publicCommentProfile = document.createElement('DIV');
		publicCommentProfile.className = 'public-comments-profile-comments';
		publicCommentProfile.style.display = 'flex';

		const div = `<div class="public-comments_card">
                <img src="${item.avatar}" alt="avatar" class="public-comments_image">
                <h5 class="public-comments_name">${item.name}</h5>
                <p class="public-comments_date">${item.createdAt}</p>
                <p class="public-comments_comment">${item.comment}</p>
                <h3 class="public-comments_delete" onclick="confirmDeleteComment('${item._id}', '${item.name}')">DELETE</h3>
                <h3 class="public-comments_read" onclick="openPopUpProfile(this)">READ</h3>
        </div> `;
		publicCommentProfile.innerHTML = div;
		wrapper.appendChild(publicCommentProfile);
	}

	const removeSubscribers = document.querySelectorAll(
		'.public-comments-profile-subscriber'
	);
	removeSubscribers.forEach((div) => div.remove());
});

statsButton.addEventListener('click', async () => {
	const result = await fetch(`/account/subscribers`);
	const data = await result.json();

	totalPostsTitle.textContent = `TOTAL SUBSCRIBERS (${data.count})`;

	gridView.style.display = 'none';
	postsButton.style.background = '#5f5f5f';

	wrapper.style.display = 'none';
	commentsButton.style.background = '#5f5f5f';

	statsButton.style.background = '#3b3b3b';

	searchForm.style.display = 'none';

	dropdown.style.display = 'none';

	subscribersWrapper.style.display = 'flex';

	document.querySelector('.paggination-buttons').style.display = 'none';
	document.querySelector('#paggination-buttons-page').style.display = 'none';

	const warning = document.createElement('DIV');
	warning.id = 'subscribersDisclaimer';
	warning.innerHTML = `<h4>Disclaimer</h4>
        <p>Due to performance issues you will only see the last 5000 subscribers, if you wish to see more, login to your Database</p>

    `;
	subscribersWrapper.appendChild(warning);
	if (document.querySelector('#commentsDisclaimer')) {
		document.querySelector('#commentsDisclaimer').remove();
	}

	for (item of data.subscribers) {
		const subscriberProfile = document.createElement('DIV');
		subscriberProfile.className = 'public-comments-profile-subscriber';
		subscriberProfile.style.display = 'block';

		const div = `<div class="stats-card">
                <div class="stats-card_name"> <span>Name:</span>${item.name}</div>
                <div class="stats-card_registered"> <span>Subscribed On:</span> ${item.subscribedOn}</div>
                <div class="stats-card_email"> <span>Email: </span>${item.email}</div>
                <button class="stats-wrap_delete" onclick= "confirmDeleteSubscriber('${item._id}')">DELETE</button>
        </div>`;
		subscriberProfile.innerHTML = div;
		subscribersWrapper.appendChild(subscriberProfile);
	}

	const removeComments = document.querySelectorAll(
		'.public-comments-profile-comments'
	);
	removeComments.forEach((div) => div.remove());
});

const openPopUpProfile = (thiss) => {
	const cloneCommentCard = thiss.parentNode.cloneNode(true);
	const background = document.createElement('DIV');

	document.body.appendChild(background);
	background.setAttribute('id', 'popup-bkg');
	background.appendChild(cloneCommentCard);

	background.addEventListener('click', () => {
		background.remove();
	});
	console.log(cloneCommentCard);
};

//will remove the alert
const bkgProfile = document.createElement('DIV');
const removePrompt = () => {
	bkgProfile.remove();
};

//confirm comment deletion
const confirmDeleteComment = (thisId, thisName) => {
	bkgProfile.className = 'dark-background';

	bkgProfile.innerHTML =
		' <div style="display: flex" class="card-on-bck" >' +
		`<h3> Are you sure you want to delete ${thisName}'s comment?<h3>` +
		'<div class="send-post" onclick="removePrompt()"> NO </div>' +
		`<form style="display: inline-block" action="/account/delete-comment/${thisId}?_method=DELETE" method="POST"><button class="cancel-post"> YES </button></form>` +
		'</div>';

	document.body.prepend(bkgProfile);
};

//confirm subcriber deletion
const confirmDeleteSubscriber = (thisId) => {
	bkgProfile.className = 'dark-background';

	bkgProfile.innerHTML =
		' <div style="display: flex" class="card-on-bck" >' +
		'<h3> Are you sure you want to delete this Subscriber?<h3>' +
		'<div class="send-post" onclick="removePrompt()"> NO </div>' +
		`<form style="display: inline-block" action="/account/delete-subscriber/${thisId}?_method=DELETE" method="POST"><button class="cancel-post"> YES </button></form>` +
		'</div>';

	document.body.prepend(bkgProfile);
};

//confirm subcriber deletion
const confirmDeletePost = (thisId) => {
	bkgProfile.className = 'dark-background';

	bkgProfile.innerHTML =
		' <div style="display: flex" class="card-on-bck" >' +
		'<h3> Are you sure you want to delete this Post?<h3>' +
		'<div class="send-post" onclick="removePrompt()"> NO </div>' +
		`<form style="display: inline-block" action="/account/${thisId}?_method=DELETE" method="POST"><button class="cancel-post"> YES </button></form>` +
		'</div>';

	document.body.prepend(bkgProfile);
};

//hide the "Load Less" Button if index = 0
const loadLessProfile = document.querySelector('#load-less');
const loadMoreProfile = document.querySelector('#load-more');
const countNodesProfile = document.querySelector('.all-posts-grid-profile');
const lessCheckForLTZeroProfile = loadLessProfile.attributes[0].nodeValue;
const goToGoExtremeProfile = document.querySelector('#skipt-to-extreme');

if (
	lessCheckForLTZeroProfile == '/account/profile/?skip=-10' ||
	lessCheckForLTZeroProfile == '/account/profile/?skip=-20'
) {
	loadLessProfile.style.display = 'none';
}
if (countNodesProfile.childElementCount < 10) {
	loadMoreProfile.style.display = 'none';
	goToGoExtremeProfile.style.display = 'inline-block';
} else {
	goToGoExtremeProfile.style.display = 'none';
}
