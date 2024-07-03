const blogItems = document.querySelector('.blog__items');
if (blogItems) {
	loadBlogItems();
}

async function loadBlogItems() {
	const response = await fetch("blog.json", {
		method: "GET"
	});
	if (response.ok) {
		const responseResult = await response.json();
		initBlog(responseResult);
	} else {
		alert("Error");
	}
}

function initBlog(data) {

	for (let index = 0; index < 3; index++) {
		const item = data.items[index];
		buildBlogItem(item);
	}
}

function buildBlogItem(item) {
	let blogItemTemplate = ``;

	blogItemTemplate += `<article class="blog__item item-blog">`;
	item.image ? blogItemTemplate +=
		`<a href="${item.url}" class="item-blog__image">
			<img src="${item.image}" alt="blog">
		</a>` : null;
	blogItemTemplate += `<div class="item-blog__date">${item.date}</div>`;
	blogItemTemplate += `<h4 class="item-blog__title">
		<a href="${item.url}" class="item-blog__link-title">${item.title}</a>
	</h4>`;
	item.text ? blogItemTemplate += `
	${item.text}` : null;

	if(item.tags){
		blogItemTemplate += `<div class="item-blog__tags">`;
			for(const tag in item.tags){
				blogItemTemplate += `<a href="${item.tags[tag]}" class="item-blog__tag">${tag}</a>`;
			}
		blogItemTemplate += `</div>`;
	}
	

	blogItemTemplate += `</article>`;

	blogItems.insertAdjacentHTML('beforeend', blogItemTemplate);

}