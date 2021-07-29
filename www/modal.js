/**
 * [editNav description]
 *
 * @return  {void}  [return description]
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
const formData = document.querySelectorAll(".formData");
/**
 * le bouton close
 *
 * @type   {HTMLElement}  .close
 */
const closeBtn = document.querySelector(".close");

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

/**
 * showError ajoute aux éléments de formulaire qui ne sont pas valides les
 * attributs qui permettent à l'utilisateur de voir l'erreur
 *
 * @param   {HTMLElement}  element    l'input en question
 * @param   {String}  errorText  le texte d'erreur qui sera affiché
 *
 * @return  {void}             [return description]
 */
function showError(element, errorText) {
	element.parentElement.setAttribute("data-error-visible", "true");
	element.parentElement.setAttribute("data-error", errorText);
}

/**
 * removeError suprrime aux éléments de formulaire qui sont valides les
 * attributs qui permettent à l'utilisateur de voir l'erreur
 *
 * @param   {HTMLElement}  element    l'input en question
 *
 * @return  {void}             [return description]
 */
function removeError(element) {
	element.parentElement.removeAttribute("data-error-visible");
	element.parentElement.removeAttribute("data-error");
}

// /**
//  * Teste la valeur de l'input date pour le valider ou non
//  *
//  * @event
//  * @param   {Event & { target: HTMLInputElement }}  e  [e description]
//  *
//  * @return  {void}     [return description]
//  */
// function testDateValue(e) {
// 	if (e.target.value.length != 10) {
// 		showError(e.target, "Veuillez entrer une date.");
// 	} else {
// 		removeError(e.target);
// 	}
// }
// date.addEventListener("focusout", testDateValue);

// /**
//  * Teste si une option est cochée
//  *
//  *
//  * @return  {void}     [return description]
//  */
// function testRadioValidity() {
// 	// if (!radio.willValidate) {
// 	// 	showError(radio, "Veuillez sélectionner une ville.");
// 	// } else {
// 	// 	removeError(radio);
// 	// }
// 	// console.log(radio);
// 	if (radio == null) {
// 		radio.setAttribute("data-error-visible", "true");
// 		radio.setAttribute("data-error", "Veuillez sélectionner une ville.");
// 	}
// 	console.log(radio == null);
// }

const inputList = document.getElementsByTagName("input");

for (let i = 0; i < inputList.length; i++) {
	const element = inputList[i];
	switch (element.type) {
		case "text":
			element.addEventListener("input", () =>
				checkInput(element, [isValid, checkLength])
			);
			break;
		case "email":
			element.addEventListener("change", () =>
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
			element.addEventListener("change", () =>
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
 * @return  {void}                 [return description]
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
		return;
	}
	input.parentElement.setAttribute("data-error-visible", "true");
	let errorString = errors.join(" ");
	input.parentElement.setAttribute("data-error", errorString);
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
	let regex = /[0-9]+/;
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
//---//

// ------ Keeping form data ------ //
// function storeData() {
// 	for (let i = 0; i < inputList.length; i++) {
// 		const element = inputList[i];
// 		localStorage.setItem("${element.value}", element.value);
// 		console.log("value : ", element.value);
// 		console.log("name : ", localStorage.getItem("${element.value}"));
// 	}
// }

// window.onbeforeunload = function() {
// 	storeData();
// };
//---//

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

/**
//  * Function to send form data
//  *
//  * @return  {void}     [return description]
//  */
// function validate() {
// 	// e.preventDefault();
// 	console.log("Message");
// 	checkRadio();
// 	if (isFormValid) {
// 		console.log("form valid") //Faire afficher un message de validation
// 	}
// 	console.log(isFormValid);
// }

// document.getElementById("form").addEventListener("submit", send);

