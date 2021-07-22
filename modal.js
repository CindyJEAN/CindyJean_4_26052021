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
	// heroSection.style.display = "none";
	// footer.style.display = "none";
	scroll(0,0);
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
	// heroSection.style.display = "block";
	// footer.style.display = "flex";
	return true;
}


// ------ Input validation ------ //


// ------ Sending form ------ //

/**
 * Function to send form data
 *
 * @param   {[type]}    ??
 *
 * @return  {void}     [return description]
 */
function send() {
	// e.preventDefault();
	console.log("Message");
}

document.getElementById("form").addEventListener("submit", send);
