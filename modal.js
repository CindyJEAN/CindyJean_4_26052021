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
const validators = {};

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

/* Adds eventListener to each input depending on its type and checks its validity */
for (let i = 0; i < inputList.length; i++) {
	const element = inputList[i];
	switch (element.type) {
		case "text":
			validators[element.id] =[isValid, checkLength];
			element.addEventListener("input", () =>
				checkInput(element)
			);
			break;
		case "email":
			validators[element.id] = [isValid, checkEmailRegex];
			element.addEventListener("focusout", () =>
				checkInput(element)
			);
			break;
		case "date":
			validators[element.id] = [checkDate,isValid] ;
			element.max = setDateLimit(18);
			element.min = setDateLimit(100);
			element.addEventListener("focusout", () =>
				checkInput(element)
			);
			break;
		case "number":
			validators[element.id] =  [isValid, checkNumberRegex];
			element.addEventListener("focusout", () =>
				checkInput(element)
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

function showError(input, errors){
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
function checkDate(element) {
	return element.value === "" ? "Une date doit $etre saisie." : "" ;
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
// function storeData(input) {
// 	localStorage.setItem(`${input.name}`, input.value);
// }
// function removeData(input) {
// 	localStorage.removeItem(`${input.name}`);
// }
// function getStoredData() {
// 	for (let i = 0; i < inputList.length; i++) {
// 		const element = inputList[i];
// 		element.value = localStorage.getItem(`${element.name}`);
// 	}
// }
// window.onload = () => getStoredData();
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


/**
 * Function to send form data
 * 
 * @param {Event}  e
 *
 * @return  {void}     [return description]
 */
function validate(e) {
	e.preventDefault();
	e.stopPropagation();
	for( const[key, value] of Object.entries(validators)){
		// @ts-ignore
		checkInput(document.getElementById(key));
	}
	showError(document.querySelector("input[type=radio]"), [checkRadio()]);
	// isFormValid();
	// if (isFormValid) {
	// 	console.log("form valid") //Faire afficher un message de validation
	// }
	// console.log(isFormValid);
}

//Pour empêcher le reload de la page et le submit lorsqu'on clique sur le bouton
document.getElementById("form").addEventListener("submit", validate);
