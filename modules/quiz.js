var testResults = {
	total: 0,
	correct: 0
};

function resetTestResults() {
	testResults.correct = 0;
	testResults.total = 0;
	console.log("Reset");
	updateScore();
}

function updateScore() {
	var score = document.getElementById("score");
	score.textContent = `Score: ${testResults.correct} / ${testResults.total}`;
}

function changeScore(correct) {
	testResults.total++;
	testResults.correct += correct ? 1 : 0;
	updateScore();
}

export function testSkills(parent, contentItems) {
	var d = document.createElement("div");
	var score = document.createElement("div");
	score.id = "score";
	score.classList.add("score");
	score.textContent = `Score: ${testResults.correct} / ${testResults.total}`;
	d.appendChild(score);

	var r = document.createElement("button");
	r.textContent = "Right";
	r.onclick = () => changeScore(true);
	d.appendChild(r);
	var w = document.createElement("button");
	w.textContent = "Wrong";
	w.onclick = () => changeScore(false);
	d.appendChild(w);
	var x = document.createElement("button");
	x.textContent = "Reset";
	x.onclick = () => resetTestResults();
	d.appendChild(x);
	parent.replaceChildren(d);
}
