function loadContent() {
	fetch("younger_futhark.json")
		.then(response => response.json())
		.then(items => show_items(items));
}

function show_items(items) {
	var rootEl = document.getElementById("symbols");
	items.forEach(item => {
		var iel = document.createElement("li");
		iel.textContent = `${item.symbol} - ${item.name} - ${item.transcription} (${item.ipa})`;
		rootEl.appendChild(iel);
	});
}


