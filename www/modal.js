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
//  * la section hero
//  *
//  * @type   {HTMLElement}  .hero-section
//  */
// const heroSection = document.querySelector(".hero-section");
// /**
//  * le footer
//  *
//  * @type   {HTMLElement}  .footer
//  */
// const footer = document.querySelector("footer");
/**
 * le bouton close
 *
 * @type   {HTMLElement}  .close
 */
const closeBtn = document.querySelector(".close");
/**
 * input prénom
 *
 * @param   {HTMLElement}  first  #first
 */
const firstName = document.getElementById("first");
/** input nom
 *
 * @param   {HTMLElement}  last  #last
 */
const lastName = document.getElementById("last");
/** input email
 *
 * @param   {HTMLElement}  email  #email
 */
const email = document.getElementById("email");
/** input date
 *
 * @param   {HTMLElement}  birthdate  #birthdate
 */
const date = document.getElementById("birthdate");
/** input quantity
 *
 * @param   {HTMLElement}  quantity  #quantity
 */
const contestQuantity = document.getElementById("quantity");
/** input radio location
 *
 * @param   {HTMLElement}  location1  [type=radio]
 */
const radio = document.querySelector("input[type=radio]:checked");

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
//  * [addEventListener description]
//  *
//  * @param   {String}  input     [input description]
//  * @param   {Function}  function  [function description]
//  * @param   {Event}  e         [e description]
//  *
//  * @return  {void}            [return description]
//  */
// firstName.addEventListener("input", function(e) {
// 	if (e.target.value.length < 2) {
// 		showError(firstName, "Veuillez entrer au moins deux caractères.");
// 	}
// });

/**
 * Teste la valeur de l'input Prénom pour le valider ou non
 *
 * @event
 * @param   {Event & { target: HTMLInputElement }}           e        an event
 *
 * @return  {void}     [return description]
 */
function testFirstNameValue(e) {
	if (e.target.value.length < 2) {
		showError(e.target, "Veuillez entrer au moins deux caractères.");
	} else {
		removeError(e.target);
	}
}
// firstName.addEventListener("input", testFirstNameValue);
/**
 * Teste la valeur de l'input Nom pour le valider ou non
 *
 * @event
 * @param   {Event & { target: HTMLInputElement }}  e  [e description]
 *
 * @return  {void}     [return description]
 */
function testLastNameValue(e) {
	if (e.target.value.length < 1) {
		showError(e.target, "Veuillez entrer au moins un caractère.");
	} else {
		removeError(e.target);
	}
}
// lastName.addEventListener("input", testLastNameValue);

/**
 * Teste la valeur de l'input E-mail pour le valider ou non
 *
 * @event
 * @param   {Event & { target: HTMLInputElement }}  e  [e description]
 *
 * @return  {void}     [return description]
 */
function testEmailValue(e) {
	if (e.target.validity.typeMismatch) {
		showError(e.target, "Veuillez entrer une adresse email correcte.");
	} else {
		removeError(e.target);
	}
}
email.addEventListener("input", testEmailValue);

/**
 * Teste la valeur de l'input date pour le valider ou non
 *
 * @event
 * @param   {Event & { target: HTMLInputElement }}  e  [e description]
 *
 * @return  {void}     [return description]
 */
function testDateValue(e) {
	if (e.target.value.length != 10) {
		showError(e.target, "Veuillez entrer une date.");
	} else {
		removeError(e.target);
	}
}
date.addEventListener("focusout", testDateValue);

/**
 * Teste la valeur de l'input quantity pour le valider ou non
 *
 * @event
 * @param   {Event & { target: HTMLInputElement }}  e  [e description]
 *
 * @return  {void}     [return description]
 */
function testQuantityValue(e) {
	if (e.target.value.length < 1) {
		showError(e.target, "Veuillez entrer un nombre à partir de 0.");
	} else {
		removeError(e.target);
	}
}
contestQuantity.addEventListener("focusout", testQuantityValue);

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

//---- premier essai à supprimer -----//
// /**
//  * Teste la valeur de l'input en général pour le valider ou non
//  *
//  * @param   {any}  e  [e description]
//  *
//  * @return  {any}     [return description]
//  */
// function testValue(e, test) {
// 	if (test) {
// 		showError(e.target, "Veuillez entrer au moins deux caractères.");
// 	} else {
// 		removeError(e.target);
// 	}
// }

// /**
//  * [addEventListener description]
//  *
//  * @param   {Event}  input          [input description]
//  * @param   {Function}  testValue      [testValue description]
//  * @param   {Event}  e              [e description]
//  *
//  * @return  {[type]}                 [return description]
//  */
// firstName.addEventListener("input", function(e) {
// 	testValue("input", e.target.value.length < 2);
// } );
//fin de partie à supprimer

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
// 	testRadioValidity;
// 	if (isFormValid) {
// 		console.log("form valid") //Faire afficher un message de validation
// 	}
// 	console.log(isFormValid);
// }

// document.getElementById("form").addEventListener("submit", send);

const inputList = document.getElementsByTagName("input");

for (let i = 0; i < inputList.length; i++) {
	const element = inputList[i];
	switch (element.type) {
		case "text":
			element.addEventListener("input", () =>
				checkInput(element, [checkLength, isValid])
			);
			break;
		case "email":
	}
}

/**
 * [checkInput description]
 *
 * @param   {HTMLInputElement}  input          [input description]
 * @param   {Array.<Function>}  functionsList  [functionsList description]
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
		// enlever les message d'erreur
		input.parentElement.removeAttribute("data-error-visible");
		input.parentElement.removeAttribute("data-error");
		return;
	} else {
		//ajouter les message d'erreur
		input.parentElement.setAttribute("data-error-visible", "true");
		for (let i = 0; i < errors.length; i++) {
			input.parentElement.setAttribute("data-error", errors[i]);
		}
	}

	console.log("input", input);
	console.log("errors", errors);
}

function checkLength(element) {
	return element.value.length >= 2 ? "" : "Veuillez entrer au moins deux caractères.";
}

function isValid(element) {
	return element.checkValidity() ? "" : "Le champs n'est pas valide.";
}
