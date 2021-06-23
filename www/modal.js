function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// DOM Elements
/**
 * le fond de la modale 
 *
 * @type   {HTMLElement}  .bground  [.bground description]
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

/**
 * permet de tester une valeur
 *
 * @param   {HTMLElement}  argument  un nom
 * @param	{Number}       bidule    un chiffre
 *
 * @return  {Boolean}           vrai ou faux
 */
function test(argument, bidule){
	console.log(argument);
	return true;
}
