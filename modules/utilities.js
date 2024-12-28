export function createTableRow(ctype, cols, classes = []) {
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
