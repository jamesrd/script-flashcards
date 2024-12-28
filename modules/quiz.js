var testResults = {
	total: 0,
	correct: 0
};

function resetTestResults() {
	testResults.correct = 0;
	testResults.total = 0;
}

export function testSkills(parent, contentItems) {
	var d = document.createElement("div");
	var score = document.createElement("div");
	score.classList.add("score");
	score.textContent = `Score: ${testResults.correct} / ${testResults.total}`;
	d.appendChild(score);
	parent.replaceChildren(d);
}
