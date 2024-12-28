var contentName;
var contentItems;
var contentEl;


function initialize() {
	contentEl = document.getElementById("content");
	// load configuration and setup
	getConfiguration().then(setConfiguration);
}

async function getConfiguration() {
	return fetch("static/config.json").then(response => response.json());
}

async function setConfiguration(config) {
	// later: add a content picker

	var ci = config.contentFiles[0];
	contentName = ci.name;

	contentItems = await loadContent(ci.path);

	update_titles();
	showContentTable(contentItems);
	console.log("Reloaded");
}

function update_titles() {
	var newTitle = `Learn ${contentName}`;
	document.title = newTitle;
	var td = document.getElementById("top-bar-title");
	td.textContent = newTitle;
}

async function loadContent(contentPath) {
	return fetch(contentPath)
		.then(response => response.json())
}

function showContentTable(items) {
	var rdiv = document.createElement("div");
	rdiv.classList.add("content-table");
	var tel = document.createElement("table");
	rdiv.appendChild(tel);
	tel.appendChild(createTableRow("th", ["Symbol", "Name", "Transcription", "IPA"]));

	items.forEach(item => {
		tel.appendChild(createTableRow("td", [item.symbol, item.name, item.transcription, item.ipa]));
	});
	contentEl.replaceChildren(rdiv);
}

function createTableRow(ctype, cols) {
	var tr = document.createElement("tr");
	cols.map((item) => {
		var c = document.createElement(ctype);
		c.textContent = item;
		tr.appendChild(c);
	})
	return tr;
}

window.onload = function() {
	initialize();
};

