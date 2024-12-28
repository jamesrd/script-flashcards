import * as utilities from "./utilities.js";

export function showContentTable(contentEl, contentItems) {
	var rdiv = document.createElement("div");
	rdiv.classList.add("content-table");
	var tel = document.createElement("table");
	rdiv.appendChild(tel);
	tel.appendChild(utilities.createTableRow("th", ["Symbol", "Name", "Transcription", "IPA"]));

	contentItems.forEach(item => {
		tel.appendChild(utilities.createTableRow("td", [item.symbol, item.name, item.transcription, item.ipa], ["symbol"]));
	});
	contentEl.replaceChildren(rdiv);
}


