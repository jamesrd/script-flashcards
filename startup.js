var contentName;
var contentItems;

function initialize() {
	// load configuration and setup
	getConfiguration().then(setConfiguration);
}

function getConfiguration() {
	return fetch("static/config.json").then(response => response.json());
}

async function setConfiguration(config) {
	// later: add a content picker

	var ci = config.contentFiles[0];
	contentName = ci.name;

	contentItems = await loadContent(ci.path);

	update_titles();
	showContentList(contentItems);
}

function update_titles() {
	var newTitle = `Learn ${contentName}`;
	document.title = newTitle;
	var td = document.getElementById("top-bar-title");
	td.textContent = newTitle;
}

function loadContent(contentPath) {
	return fetch(contentPath)
		.then(response => response.json())
}

function showContentList(items) {
	var rootEl = document.getElementById("content");
	while (rootEl.lastChild) {
		rootEl.removeChild(rootEl.lastChild);
	}
	var ulEl = document.createElement("ul");
	items.forEach(item => {
		var iel = document.createElement("li");
		iel.textContent = `${item.symbol} - ${item.name} - ${item.transcription} (${item.ipa})`;
		ulEl.appendChild(iel);
	});
	rootEl.appendChild(ulEl);
}

window.onload = function() {
	initialize();
};

