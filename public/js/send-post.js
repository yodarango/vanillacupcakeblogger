let editor;
const title = document.querySelector('.CKE-post-title');
const content = document.querySelector('.CKE-post-content');
const image = document.querySelector('#CKE-post-image');
const form = document.querySelector('.CKE-post-form');
const embed = document.querySelector('#CKE-post-content');

DecoupledEditor.create(document.querySelector('#editor'), {
	toolbar: {
		removeItems: ['mediaEmbed', 'uploadImage'],
		shouldNotGroupWhenFull: true,
	},
})
	.then((newEditor) => {
		const toolbarContainer = document.querySelector('#toolbar-container');
		editor = newEditor;
		toolbarContainer.appendChild(newEditor.ui.view.toolbar.element);
	})
	.catch((error) => {
		console.error(error);
	});
const fileDataURL = (file) =>
	new Promise((resolve, reject) => {
		let fr = new FileReader();
		fr.onload = () => resolve(fr.result);
		fr.onerror = reject;
		fr.readAsDataURL(file);
	});

const showResult = async (file) => {
	const data = await fileDataURL(file);
	const cover = document.getElementById('result');
	cover.setAttribute('src', data);
	const str = document.getElementById('result').src;
	const n = str.length;
	const result = (3 * n) / 4 / 1000000;
	if (result > 1) {
		alert(`This  image is greater than 3MB. Please upload a smaller image`);
		cover.setAttribute('src', '');
	}
};

document.querySelector('#submitPost').addEventListener('click', async () => {
	const editorData = editor.getData();

	CKeditorPost = {
		postContent: editorData + embed.value,
		category: arrayToFilterFrom,
		title: title.value,
		content: content.value,
		postImage: document.getElementById('result').src,
	};

	const datas = await fetch('/account/new', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(CKeditorPost),
	});
	console.log(datas);
});

const updatePost = document.createElement('.send-post-update');

updatePost.addEventListener('click', async () => {
	const data = fetch('/');
});
