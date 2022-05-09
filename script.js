const textArea = document.getElementById("textArea");
const parsed = document.getElementById("parsed");
let uploadedJson = null;
async function showContent(filename) {
	getTextFromGit(filename).then((text) => {
		let string;
		string = text.replaceAll("<", "&lt;");
		string = string.replaceAll(">", "&gt;");
		textArea.classList.remove("hide");
		textArea.innerHTML = string;
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

async function parseJson() {
	let data = await getTextFromGit(
		"EvidentaAgentieFotomodeleHanghiucMircea.json"
	);
	data = JSON.parse(data);
	parsed.innerHTML = `
    <h2>JSON Fotomodele agentiei ${data.agentie.nume} cui(${data.agentie.CUI}) infintata la(${data.agentie["data-infintare"]}):</h2>
			<table id="models"></table>
    <h2>Evenimentele:</h2>
    <table id="events"></table>`;

	// add models
	let table = document.getElementById("models");
	table.innerHTML = "";
	addRowToTable(table, [
		"Nume",
		"CNP",
		"Inaltime",
		"Greutate",
		"Culoare par",
		"Sex",
		"Telefon",
		"Data nasterii",
	]);
	data.agentie.fotomodele.forEach((element) => {
		addRowToTable(table, [
			element.nume,
			element.cnp,
			element.inaltime,
			element.greutate,
			element.culoarePar,
			element.sex,
			element.telefon,
			element["data-nasterii"],
		]);
	});

	// add events
	table = document.getElementById("events");
	addRowToTable(table, [
		"Denumire",
		"Data",
		"Durata (ore)",
		"Descriere",
		"Fotomodele",
	]);
	data.agentie.evenimente.forEach((eveniment) => {
		const models = eveniment.fotomodele.reduce((prevValue, currValue) => {
			prevValue = prevValue + ` ${currValue.nume},`;
			return prevValue;
		}, "");

		addRowToTable(table, [
			eveniment.detalii.denumire,
			eveniment.detalii.data,
			eveniment.detalii.durata,
			eveniment.detalii.descriere,
			models.substring(0, models.length - 1),
		]);
	});
}
function getTextFromGit(filename) {
	return fetch(`https://mirceah99.github.io/proiect-xis/${filename}`)
		.then((response) => response.body)
		.then((body) => {
			const reader = body.getReader();
			return reader.read().then((r) => {
				let string = new TextDecoder().decode(r.value);
				return string;
			});
		});
}

function addRowToTable(table, data) {
	const row = table.insertRow();
	data.forEach((element, index) => {
		row.insertCell(index).innerHTML = element;
	});
}
async function parseXml() {}
