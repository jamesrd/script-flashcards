var contentName;
var contentItems;
var contentEl;

var navTargets = [
	{
		title: "Listing",
		display: function() { showContentTable() }
	},
	{
		title: "Test",
		display: function() { testSkills() }
	}
]

var selectedNavTarget = 0;



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

	updateTitles();
	setupNavBar();
	navigateTo(selectedNavTarget);
	console.log("Reloaded");
}

function navigateTo(index) {
	selectedNavTarget = index;
	var nb = document.getElementById("nav-bar");
	var buttons = nb.getElementsByTagName("button");
	[...buttons].forEach((b, bi) => {

		if (bi == selectedNavTarget) {
			b.classList.add("selected");
		} else {
			b.classList.remove("selected");
		}
	})
	navTargets[selectedNavTarget].display();
}

function setupNavBar() {
	var nb = document.getElementById("nav-bar");
	nb.replaceChildren();
	navTargets.forEach((item, index) => {
		var t = document.createElement("button");
		t.id = `nav.${index}`;
		t.textContent = item.title;
		t.onclick = () => navigateTo(index);
		nb.appendChild(t);
	});
}

function updateTitles() {
	var newTitle = `Learn ${contentName}`;
	document.title = newTitle;
	var td = document.getElementById("top-bar-title");
	td.textContent = newTitle;
}

async function loadContent(contentPath) {
	return fetch(contentPath)
		.then(response => response.json())
}

function showContentTable() {
	var rdiv = document.createElement("div");
	rdiv.classList.add("content-table");
	var tel = document.createElement("table");
	rdiv.appendChild(tel);
	tel.appendChild(createTableRow("th", ["Symbol", "Name", "Transcription", "IPA"]));

	contentItems.forEach(item => {
		tel.appendChild(createTableRow("td", [item.symbol, item.name, item.transcription, item.ipa], ["symbol"]));
	});
	contentEl.replaceChildren(rdiv);
}

function createTableRow(ctype, cols, classes = []) {
	var tr = document.createElement("tr");
	cols.forEach((item, index) => {
		var c = document.createElement(ctype);
		c.textContent = item;
		tr.appendChild(c);
		var cn = classes[index];
		if (cn != undefined) {
			c.classList.add(cn);
		}
	})
	return tr;
}

function testSkills() {
	var d = document.createElement("div");
	d.textContent = "coming soon";
	contentEl.replaceChildren(d);
}

window.onload = function() {
	initialize();
};

