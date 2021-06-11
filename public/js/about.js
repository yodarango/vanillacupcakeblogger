//intervals updater count
const counter = () => {
	const subscribers = document.querySelector(
		'.hidden-value-subscribers'
	).innerHTML;
	const posts = document.querySelector('.hidden-value-posts').innerHTML;
	const likes = document.querySelector('.hidden-value-likes').innerHTML;

	const subscriberstoInt = parseInt(subscribers.toString());
	const poststoInt = parseInt(posts.toString());
	const likestoInt = parseInt(likes.toString());

	let valuesToZero = 0;

	const subsinterval = setInterval(updateSubscriberCount, 30);
	const postsinterval = setInterval(updatePostCount, 30);
	const likesinterval = setInterval(updateLikesCount, 30);

	function updateSubscriberCount() {
		valuesToZero < subscriberstoInt
			? valuesToZero++
			: clearInterval(subsinterval);
		document.querySelector('#subscribers-count').textContent = valuesToZero;
	}
	function updatePostCount() {
		valuesToZero < poststoInt ? valuesToZero++ : clearInterval(postsinterval);
		document.querySelector('#posts-count').textContent = valuesToZero;
	}
	function updateLikesCount() {
		valuesToZero < likestoInt ? valuesToZero++ : clearInterval(likesinterval);
		document.querySelector('#likes-count').textContent = valuesToZero;
	}
};
counter();

const subscribeButton = document.querySelector('.subscribe-button');
subscribeButton.addEventListener('click', () => {
	const background = document.createElement('DIV');
	background.className = 'dark-background';

	const card = document.querySelector('#card-on-bck-subscribers');
	card.style.display = 'flex';

	document.body.appendChild(background);
});
