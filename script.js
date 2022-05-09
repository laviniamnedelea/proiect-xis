const textArea = document.getElementById("textArea");
const parsed = document.getElementById("parsed");
let uploadedJson = null;
let uploadedXml = null;

document.getElementById("upload").addEventListener("change", onUploadFile);
document
	.getElementById("uploadXml")
	.addEventListener("change", onUploadFileXml);

async function showContent(filename) {
	let text = await getTextFromGit(filename);
	if (uploadedJson && filename.search("json") > -1) {
		text = uploadedJson;
	}
	if (uploadedXml && filename.search("xml") > -1) {
		text = uploadedXml;
	}
	let string;
	string = text.replaceAll("<", "&lt;");
	string = string.replaceAll(">", "&gt;");
	textArea.classList.remove("hide");
	textArea.innerHTML = string;
}

async function parseJson() {
	let data = await getTextFromGit(
		"EvidentaAgentieFotomodeleHanghiucMircea.json"
	);
	data = uploadedJson ? JSON.parse(uploadedJson) : JSON.parse(data);
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
async function parseXml() {
	let data = await getTextFromGit(
		"EvidentaAgentieFotomodeleHanghiucMircea.xml"
	);
	data = uploadedXml ? uploadedXml : data;
	var x2js = new X2JS();
	data = x2js.xml_str2json(data);
	parsed.innerHTML = `
    <h2>Xml Fotomodele agentiei ${data.agentie._nume} cui(${data.agentie._CUI}) infintata la(${data.agentie["_data-infintare"]}):</h2>
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
	data.agentie.fotomodele.fotomodel.forEach((element) => {
		addRowToTable(table, [
			element.nume,
			element._cnp,
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
	data.agentie.evenimente.eveniment.forEach((eveniment) => {
		const models = eveniment.fotomodele.fotomodel.reduce(
			(prevValue, currValue) => {
				prevValue = prevValue + ` ${currValue.nume},`;
				return prevValue;
			},
			""
		);

		addRowToTable(table, [
			eveniment.detalii.denumire,
			eveniment.detalii.data,
			eveniment.detalii.durata,
			eveniment.detalii.descriere,
			models.substring(0, models.length - 1),
		]);
	});
}

function uploadJson() {
	document.getElementById("upload").click();
}
function uploadXml() {
	document.getElementById("uploadXml").click();
}

function onUploadFile() {
	var reader = new FileReader();
	reader.onload = onReaderLoad;
	reader.readAsText(event.target.files[0]);

	function onReaderLoad(event) {
		uploadedJson = event.target.result;
	}
}
function onUploadFileXml() {
	var reader = new FileReader();
	reader.onload = onReaderLoad;
	reader.readAsText(event.target.files[0]);

	function onReaderLoad(event) {
		uploadedXml = event.target.result;
	}
}

async function applyXsl() {
	window
		.open("https://mirceah99.github.io/proiect-xis/xmlWithXsl.xml", "_blank")
		.focus();
}
