import * as listing from "./modules/listing.js";
import * as quiz from "./modules/quiz.js";

var contentName;
var contentItems;
var contentEl;

var navTargets = [
	{
		title: "Listing",
		display: function() { listing.showContentTable(contentEl, contentItems) }
	},
	{
		title: "Test",
		display: function() { quiz.testSkills(contentEl, contentItems) }
	}
]

var selectedNavTarget = 1;

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

window.onload = function() {
	initialize();
};

