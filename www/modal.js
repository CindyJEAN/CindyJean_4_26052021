/**
 * [editNav description] ????
 *
 * @return  {[type]}  [return description]
 */
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
 * @type   {HTMLElement}  .bground
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
/**
 * la section hero
 *
 * @type   {HTMLElement}  .hero-section
 */
const heroSection = document.querySelector(".hero-section");
/**
 * le footer
 *
 * @type   {HTMLElement}  .footer
 */
const footer = document.querySelector("footer");
/**
 * le bouton close
 *
 * @type   {HTMLElement}  .close
 */
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
/**
 * Au lancement de la modale, on fait apparaître la modale et disparaître la 
 * section hero et le footer, pour ne pas que l'on voit le fond si on swipe vers le bas
 *
 * @return  {Boolean}
 */
function launchModal() {
	modalbg.style.display = "block";
	heroSection.style.display = "none";
	footer.style.display = "none";
	return true;
}

// launch modal form
/**
 * A la fermeture de la modale, on fait disparaître la modale et apparaître la 
 * section hero et le footers
 *
 * @return  {Boolean}
 */
function closeModal() {
	modalbg.style.display = "none";
	heroSection.style.display = "block";
	footer.style.display = "flex";
	return true;
}



//Exemple de fonction avec arguments : a supprimer ensuite
/**
 * permet de tester une valeur
 *
 * @param   {HTMLElement}  argument  un nom
 * @param	{Number}       bidule    un chiffre
 *
 * @return  {Boolean}           vrai ou faux
 */
// function test(argument, bidule) {
// 	console.log(argument);
// 	return true;
// }
