const arrayToFilterFrom = [];
const allPostsArray = [];
const postCard = document.querySelectorAll('.post-card');
const countSpan = document.querySelector('#all-posts-count');

//removing the tag
const removeTag = (thiss) => {
	const index = arrayToFilterFrom.indexOf(
		thiss.parentNode.textContent.split('  ')[0]
	);
	arrayToFilterFrom.splice(index, 1);
	thiss.parentNode.remove();
};

//adding the tag function
const addTag = (thiss) => {
	const tag = document.createElement('DIV');
	tag.setAttribute('class', 'dropdown-tag');
	tag.innerHTML = `${thiss.target.textContent} <div class="tag-remove" onclick="removeTag(this)">  X</div>`;

	const tagWrapper = document.querySelector('.tagWrapper');
	tagWrapper.appendChild(tag);

	const removeTagFromArray = document.querySelectorAll('.tag-remove');
	removeTagFromArray.forEach((tag) => {
		tag.addEventListener('click', filterContent);
	});
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
		arrayToFilterFrom.push(thiss.target.textContent.split(' ').join('-'));
	});
});

//check if any posts are returned
const postGrid = document.querySelector('.all-posts-grid');
if (postGrid.childElementCount === 0) {
	const noPostsFound = document.createElement('DIV');
	noPostsFound.className = 'no-posts-found';
	noPostsFound.textContent =
		'Sorry, No posts were found matching that criteria!';
	postGrid.prepend(noPostsFound);
	countSpan.textContent = '(0)';
}

//clean up class names from spaces before calling the filterContent() function
const filterByIdSpan = document.querySelectorAll(
	'.categories-wtapper-filter span'
);
filterByIdSpan.forEach((e) => (e.className = e.className.split(' ').join('-')));

//call this function every time a new array item is added or removed
const filterContent = () => {
	//1. Hide all posts on tag click
	postCard.forEach((postToHide) => {
		postToHide.style.display = 'none';

		//2. If filtering array empty show them all again
		if (arrayToFilterFrom.length === 0) {
			postToHide.style.display = 'block';
		}
	});
	//3. Filter from original array by classname
	arrayToFilterFrom.filter((post) => {
		post.indexOf(filterByIdSpan.forEach((tagSpan) => tagSpan.className)) !==
			-1;
		const postDisplay = document.querySelectorAll(`.${post}`);
		postDisplay.forEach((block) => {
			block.className.split(' ').join('-');
			block.parentElement.parentElement.style.display = 'block';
		});
	});
};

dropdownOption.forEach((tag) => {
	tag.addEventListener('click', filterContent);
});

//hide the "Load Less" Button if index = 0
const loadLess = document.querySelector('#load-less');
const loadMore = document.querySelector('#load-more');
const nodeCount = document.querySelector('.all-posts-grid');
const goToGoExtreme = document.querySelector('#skipt-to-extreme');
const lessCheckForLTZero = loadLess.attributes[0].nodeValue;

if (
	lessCheckForLTZero == '/posts/?skip=-10' ||
	lessCheckForLTZero == '/posts/?skip=-20'
) {
	loadLess.style.display = 'none';
}

if (nodeCount.childElementCount < 10) {
	loadMore.style.display = 'none';
	goToGoExtreme.style.display = 'inline-block';
} else {
	goToGoExtreme.style.display = 'none';
}
