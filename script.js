const textArea = document.getElementById("textArea");

function showContent(filename) {
	fetch(`https://mirceah99.github.io/proiect-xis/${filename}`)
		.then((response) => response.body)
		.then((body) => {
			const reader = body.getReader();
			reader.read().then((r) => {
				let string = new TextDecoder().decode(r.value);
				string = string.replaceAll("<", "&lt;");
				string = string.replaceAll(">", "&gt;");
				textArea.classList.remove("hide");
				console.log(string);
				textArea.innerHTML = string;
			});
		});
}

function readTextFile(file) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				return allText;
			}
		}
	};
	rawFile.send(null);
}
