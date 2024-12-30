const template =
	`<div id="score" class="score"></div>
	<div id="board">
		<div id="quiz-subject"></div>
		<div id="quiz-options"></div>
	</div>
	<div id="quiz-buttons">
		<button id="quiz-reset">Reset</button>
	</div>`;

var testState = {
	total: 0,
	correct: 0,
	currentIndex: 0
};

var quizItems = [];

function resetTest() {
	testState.correct = 0;
	testState.total = 0;
	updateScore();
	testState.currentIndex = 0;
	updateSubjectPanel();

	// then whatever other reset needs to be done
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

function checkSelection(index) {
	changeScore(testState.currentIndex == index);
	testState.currentIndex = (testState.currentIndex + 1) % quizItems.length;
	updateSubjectPanel();
}

function createButtonPanel() {
	var bp = document.createElement("div");
	bp.classList.add("button-panel");

	quizItems.forEach((item, index) => {
		var qo = document.createElement("div");
		qo.classList.add("option-button");
		qo.onclick = function() { checkSelection(index) };
		qo.innerText = item.name;
		bp.appendChild(qo);
	});
	var te = document.getElementById("quiz-options");
	te.replaceChildren(bp);
}

function updateSubjectPanel() {
	var sp = document.getElementById("quiz-subject");
	sp.innerText = quizItems[testState.currentIndex].symbol;
}

export function testSkills(parent, contentItems) {
	quizItems = contentItems;
	var d = document.createElement("div");
	d.id = "quiz";
	d.innerHTML = template;
	parent.replaceChildren(d);
	document.getElementById("quiz-reset").onclick = function() { resetTest() };
	updateScore();
	createButtonPanel();
	updateSubjectPanel();
}
