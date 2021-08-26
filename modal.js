/**
 * Clicking the burger menu launches the editNav function, which shows the links or not
 * by adding or removing the class "reponsive".
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
 * modal background
 *
 * @type   {HTMLElement}  .bground
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
/**
 * form
 *
 * @type   {HTMLElement}  #form
 */
const form = document.querySelector("#form");
/**
 * submitMessage
 *
 * @type   {HTMLElement}  .submit-message
 */
const submitMessage = document.querySelector(".submit-message");
/**
 * validators will contain the functions checking the validity of the inputs
 *
 * @type {Object}
 */
const validators = {};

//------ Modal management ------ //
// ------ launch modal event ------ //
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// ------ close modal event ------ //
document.querySelector(".close").addEventListener("click", closeModal);

// ------ launch modal form function ------ //
/**
 * The launchModal function shows the modal by modifying the display style as block
 *
 * @return  {Void}
 */
function launchModal() {
	modalbg.style.display = "block";
	scroll(0, 0);
	document.querySelector("form").focus();
}

// ------ close modal form function ------ //
/**
 * The closeModal function hides the modal by modifying the display style as none
 *
 * @return  {Void}
 */
function closeModal() {
	modalbg.style.display = "none";
}

// ------ Input validation ------ //
const inputList = document.getElementsByTagName("input");

/* Adds an eventListener to each input depending on its type and checks its validity */
for (let i = 0; i < inputList.length; i++) {
	const element = inputList[i];
	switch (element.type) {
		case "text":
			validators[element.id] = [isValid, checkLength];
			element.addEventListener("input", () => checkInput(element));
			break;
		case "email":
			validators[element.id] = [isValid, checkEmailRegex];
			element.addEventListener("focusout", () => checkInput(element));
			break;
		case "date":
			validators[element.id] = [hasDate, isDateValid];
			element.max = setDateLimit(18);
			element.min = setDateLimit(100);
			element.addEventListener("focusout", () => checkInput(element));
			break;
		case "number":
			validators[element.id] = [isValid, checkNumberRegex];
			element.addEventListener("focusout", () => checkInput(element));
			break;
		case "checkbox":
			validators[element.id] = [checkCheckbox];
			element.addEventListener("click", () => checkInput(element));
			break;
		case "radio":
			element.addEventListener("click", () => showError(element, []));
			break;
	}
}

/**
 * checkInput checks if there are errors for the input, by checking
 * the errors stocked in the validtors object, and uses the showError function.
 *
 * @param   {HTMLInputElement}  input          the input checked
 *
 * @return  {void}
 */
function checkInput(input) {
	const functionsList = validators[input.id];
	const errors = [];
	for (let i = 0; i < functionsList.length; i++) {
		const element = functionsList[i](input);
		if (element !== "") errors.push(element);
	}
	showError(input, errors);
}

/**
 * showError takes the input checked and the array containing errors or not. 
 * If there are errors, it adds the attributes that display errors with css 
 * and concatenates the error messages. If there are no errors, it removes them.
 *
 * @param   {HTMLInputElement}  input   the input checked
 * @param   {Array}  errors  array of error messages
 *
 * @return  {void}
 */
function showError(input, errors) {
	if (errors.length === 0) {
		input.parentElement.removeAttribute("data-error-visible");
		input.parentElement.removeAttribute("data-error");
		return;
	}
	input.parentElement.setAttribute("data-error-visible", "true");
	let errorString = errors.join(" ");
	input.parentElement.setAttribute("data-error", errorString);
}

// ---- Functions testing the validity of the inputs ---- //
function isValid(element) {
	return element.checkValidity() ? "" : "Le champ n'est pas valide.";
}
function isDateValid(element) {
	return element.checkValidity()
		? ""
		: "Vous devez avoir plus de 18 ans pour vous inscrire.";
}
function hasDate(element) {
	return element.value === "" ? "Une date doit être saisie." : "";
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
 * setDateLimit takes a number of years from todays'date, and returns the corresponding date
 *
 * @param   {Number}  gap  a number of years
 *
 * @return  {String}       returns a formated date
 */
function setDateLimit(gap) {
	const limit = new Date(Date.now());
	limit.setFullYear(limit.getFullYear() - gap);
	const date = new Intl.DateTimeFormat().format(limit).split("/");
	return `${date[2]}-${date[1]}-${date[0]}`;
}

/**
 * checkRadio checks if a radio input is selected. If there isn't, the function returns an error message.
 *
 * @return  {String}  returns an error message or an empty string
 */
function checkRadio() {
	const radio = document.querySelectorAll("input[type=radio]:checked");
	if (radio.length === 0) {
		return "Vous devez choisir une ville.";
	}
	return "";
}

/**
 * checkCheckbox checks if the checkbox for the terms of use is checked
 *
 * @return  {String}  returns an error message or an empty string
 */
function checkCheckbox() {
	// @ts-ignore
	return !document.getElementById("checkbox1").checked
		? "Vous devez lire et accepter les conditions d'utilisation."
		: "";
}

// ------ Submitting the form ------ //
/**
 * Function to validate the form
 *
 * @param {Event}  e
 *
 * @return  {void}
 */
function validate(e) {
	e.preventDefault();
	e.stopPropagation();
	for (const [key, value] of Object.entries(validators)) {
		// @ts-ignore
		checkInput(document.getElementById(key));
	}
	const errorRadio = checkRadio();
	if (errorRadio !== "")
		showError(document.querySelector("input[type=radio]"), [errorRadio]);

	if (document.querySelectorAll("[data-error-visible]").length > 0) return;
	document.querySelector(".modal-body").innerHTML = `
	<div class="submit-message">
	<h2>Merci pour votre réservation !</h2>
	<button class="button btn-submit" onclick="closeModal()">Fermer</button>
</div>`;
}

document.getElementById("form").addEventListener("submit", validate);
