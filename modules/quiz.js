const template =
	`<div class="mode-select">Mode: <select id="mode-select"></select></div>
	<div id="board">
		<div id="quiz-subject"></div>
		<div id="quiz-options"></div>
	</div>
	<div id="score" class="score"></div>
	<div id="quiz-buttons">
		<button id="quiz-reset">Reset</button>
	</div>`;

const modes = {
	SymbolName: "Name of rune",
	NameSymbol: "Rune from name",
	SymbolTranscription: "Transcription of rune",
	TranscriptionSymbol: "Rune from transcription"
}

var testState = {
	mode: modes.SymbolName,
	total: 0,
	correct: 0,
	currentId: 0,
	subjectsAvailable: [],
};

var quizItems = [];
var optionItems = new Set();
var symbolItems = [];

function resetTest() {
	testState.correct = 0;
	testState.total = 0;
	updateScore();
	randomizeSubjects();
	testState.currentId = testState.subjectsAvailable.shift();
	updateSubjectPanel();
}

function updateScore() {
	var score = document.getElementById("score");
	score.textContent = `Score: ${testState.correct} / ${testState.total}`;
}

function changeScore(correct) {
	testState.total++;
	testState.correct += correct ? 1 : 0;
	updateScore();
}

function checkSelection(id) {
	changeScore(symbolItems[testState.currentId][1] == id);
	if (testState.subjectsAvailable.length == 0) {
		randomizeSubjects();
	}
	testState.currentId = testState.subjectsAvailable.shift();
	updateSubjectPanel();
}

function createButtonPanel() {
	var bp = document.createElement("div");
	bp.classList.add("button-panel");

	optionItems.forEach((item) => {
		var qo = document.createElement("div");
		qo.classList.add("option-button");
		qo.onclick = function() { checkSelection(item[1]) };
		qo.innerText = item[0];
		bp.appendChild(qo);
	});
	var te = document.getElementById("quiz-options");
	te.replaceChildren(bp);
}

function updateSubjectPanel() {
	var sp = document.getElementById("quiz-subject");
	sp.innerText = symbolItems[testState.currentId][0];
}

function getItemsForMode(item) {
	var symbols = [], names = [];
	switch (testState.mode) {
		case modes.NameSymbol:
			symbols.push(item.name);
			names.push(item.symbol);
			break;
		case modes.SymbolTranscription:
			symbols.push(item.symbol);
			names.push(...item.transcription);
			break;
		case modes.TranscriptionSymbol:
			names.push(item.symbol);
			symbols.push(...item.transcription);
			break;
		default: // modes.SymbolName
			symbols.push(item.symbol);
			names.push(item.name);
	}
	return {
		symbols: symbols,
		names: names
	};
}

function setupItems() {
	// implement other quiz modes here
	symbolItems = [];
	optionItems = new Set();
	quizItems.forEach((item, index) => {
		var { symbols, names } = getItemsForMode(item);
		symbols.forEach((symbol) => {
			symbolItems.push([symbol, index]);
		});
		names.forEach((name) => {
			optionItems.add([name, index]);
		});
	});
	randomizeSubjects();
}

function randomizeSubjects() {
	var array = [...Array(symbolItems.length).keys()];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	testState.subjectsAvailable = array;
}

function changeMode(newMode) {
	testState.mode = newMode;
	setupItems();
	createButtonPanel();
	resetTest();
}

function modeChanged(element) {
	changeMode(element.value);
}

export function testSkills(parent, contentItems) {
	quizItems = contentItems;
	var d = document.createElement("div");
	d.id = "quiz";
	d.innerHTML = template;
	parent.replaceChildren(d);
	document.getElementById("quiz-reset").onclick = function() { resetTest() };
	var ms = document.getElementById("mode-select");
	ms.onchange = function() { modeChanged(this) };
	Object.keys(modes).forEach(element => {
		var o = document.createElement("option");
		o.setAttribute("value", modes[element]);
		o.innerText = modes[element];
		ms.appendChild(o);
	});
	changeMode(testState.mode);
}
