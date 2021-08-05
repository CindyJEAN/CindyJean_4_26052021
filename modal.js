/**
 * Fait apparaître ou nom les liens du menu en cliquant sur le menu burger,
 * en ajoutant ou supprimant la classe "responsive".
 *
 * @return  {void}
 */
// eslint-disable-next-line no-unused-vars
function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

//------ DOM Elements ------ //
/**
 * le fond de la modale
 *
 * @type   {HTMLElement}  .bground
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
// const formData = document.querySelectorAll(".formData");
/**
 * le bouton close
 *
 * @type   {HTMLElement}  .close
 */
const closeBtn = document.querySelector(".close");

//------ Modal management ------ //
// ------ launch modal event ------ //
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// ------ close modal event ------ //
closeBtn.addEventListener("click", closeModal);

// ------ launch modal form function ------ //
/**
 * Au lancement de la modale, on fait apparaître la modale et disparaître la
 * section hero et le footer, pour ne pas que l'on voit le fond si on swipe vers le bas
 *
 * @return  {Boolean}
 */
function launchModal() {
	modalbg.style.display = "block";
	scroll(0, 0);
	document.querySelector("form").focus();
	return true;
}

// ------ close modal form function ------ //
/**
 * A la fermeture de la modale, on fait disparaître la modale et apparaître la
 * section hero et le footers
 *
 * @return  {Boolean}
 */
function closeModal() {
	modalbg.style.display = "none";
	return true;
}

// ------ Input validation ------ //
const inputList = document.getElementsByTagName("input");

const fieldInputList = [];
for (let i = 0; i < inputList.length; i++) {
	const input = inputList[i];
	if (input.type !== "submit" && input.type !== "radio") {
		fieldInputList.push(input);
	}
}

/* Adds eventListener to each input depending on its type and checks its validity */
for (let i = 0; i < fieldInputList.length; i++) {
	const element = fieldInputList[i];
	switch (element.type) {
		case "text":
			element.addEventListener("input", () =>
				checkInput(element, [isValid, checkLength])
			);
			break;
		case "email":
			element.addEventListener("focusout", () =>
				checkInput(element, [isValid, checkEmailRegex])
			);
			break;
		case "date":
			element.max = setDateLimit(18);
			element.min = setDateLimit(100);
			element.addEventListener("focusout", () =>
				checkInput(element, [isValid])
			);
			break;
		case "number":
			element.addEventListener("focusout", () =>
				checkInput(element, [isValid, checkNumberRegex])
			);
			break;
	}
}

/**
 * La fonction checkInput vérifie s'il y a des erreurs ou non
 * sur les input et ajoute ou supprime les attributs qui permettent
 * d'afficher les messages d'erreur en fonction.
 *
 * @param   {HTMLInputElement}  input          l'input en question
 * @param   {Array.<Function>}  functionsList  le tableau des fonctions qui testent
 * 																						 la validité de l'input
 *
 * @return  {void}
 */
function checkInput(input, functionsList) {
	const errors = [];
	for (let i = 0; i < functionsList.length; i++) {
		const element = functionsList[i](input);
		if (element !== "") errors.push(element);
	}
	if (errors.length === 0) {
		input.parentElement.removeAttribute("data-error-visible");
		input.parentElement.removeAttribute("data-error");
		storeData(input);
		return;
	}
	input.parentElement.setAttribute("data-error-visible", "true");
	let errorString = errors.join(" ");
	input.parentElement.setAttribute("data-error", errorString);
	removeData(input);
	console.log("errors", errors);
	console.log("errorstring", errorString);
}

function isValid(element) {
	return element.checkValidity() ? "" : "Le champs n'est pas valide.";
}

function checkLength(element) {
	return element.value.length >= 2
		? ""
		: "Veuillez entrer au moins deux caractères.";
}

function checkEmailRegex(element) {
	let regex = /\S+@\S+\.\S+/;
	return regex.test(element.value)
		? ""
		: "Veuillez entrer une adresse mail valide.";
}

function checkNumberRegex(element) {
	let regex = /^\d+/;
	return regex.test(element.value)
		? ""
		: "Veuillez entrer un nombre à partir de 0.";
}

/**
 * La fonction setDateLimit calcule la date à un certain nombre d'années de la date du jour
 *
 * @param   {Number}  gap  le nombre d'années de différence avec la date du jour
 *
 * @return  {String}       retourne la date limite formatée
 */
function setDateLimit(gap) {
	const limit = new Date(Date.now());
	limit.setFullYear(limit.getFullYear() - gap);
	const date = new Intl.DateTimeFormat().format(limit).split("/");
	return `${date[2]}-${date[1]}-${date[0]}`;
}

/**
 * La fonction checkRadio vérifie si un bouton radio est sélectionné ou non.
 * Elle retourne un message d'erreur si ce n'est pas le cas.
 *
 * @return  {String}  retourne un message d'erreur ou une chaîne vide.
 */
function checkRadio() {
	const radio = document.querySelectorAll("input[type=radio]:checked");
	return radio.length === 0 ? "vous devez choisir une ville" : "";
}

// ------ Saving form data ------ //
// /**
//  * function storeData stores each input element's value, using its name as key
//  *
//  * @return  {void}
//  */
// function storeData() {
// 	for (let i = 0; i < inputList.length; i++) {
// 		const element = inputList[i];
// 		localStorage.setItem(`${element.name}`, element.value);
// 	}
// }
/**
 * function storeData stores each input element's value, using its name as key
 *
 * @return  {void}
 */
function storeData(input) {
	localStorage.setItem(`${input.name}`, input.value);
}
/**
 * function storeData stores each input element's value, using its name as key
 *
 * @return  {void}
 */
function removeData(input) {
	localStorage.removeItem(`${input.name}`);
}

/**
 * function getStoredData gets each input element's stored value and assigns
 * it to its current value
 *
 * @return  {void}
 */
function getStoredData() {
	for (let i = 0; i < fieldInputList.length; i++) {
		const element = fieldInputList[i];
		element.value = localStorage.getItem(`${element.name}`);
	}
}

window.onload = () => getStoredData();
// window.onbeforeunload = () => storeData();

// ------ Sending form ------ //
// function isFormValid() {
// 	let validInputs = 0;
// 	for (let input of document.getElementsByTagName("input")) {
// 		console.log("validity", input.validity);
// 		if (input.validity.valid) return validInputs++;
// 	}
// 	console.log(validInputs);
// 	if (validInputs == document.getElementsByTagName("input").length) return true;
// }

let inputWithError = 0;
function isFormValid() {
	for (let i = 0; i < inputList.length; i++) {
		const input = inputList[i];
		const errorAttribute =
			input.parentElement.getAttribute("data-error-visible");
		if (errorAttribute === null || "") {
			console.log("no errorAttribute", errorAttribute);
			// return;
		} else {
			inputWithError++;
			console.log("inputWithError", inputWithError);
		}
	}
}

/**
 * Function to send form data
 *
 * @return  {void}     [return description]
 */
function validate() {
	checkRadio();
	isFormValid();
	// if (isFormValid) {
	// 	console.log("form valid") //Faire afficher un message de validation
	// }
	// console.log(isFormValid);
}

function submitForm(e) {
	e.preventDefault();
}

//Pour empêcher le reload de la page et le submit lorsqu'on clique sur le bouton
document.getElementById("form").addEventListener("submit", submitForm);
