/* *****************************************************************
MENU BURGER
***************************************************************** */

let sidenav = document.getElementById("mySidenav");
let openBtn = document.getElementById("openBtn");
let closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeButton.onclick = closeNav;
sidenav.onclick = clicCloseNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active");
}

function clicCloseNav() {
  sidenav.classList.remove("active");
}
/* *****************************************************************
ANIMATION TITRE KER ROZENN
***************************************************************** */
document.addEventListener("DOMContentLoaded", function () {
  // Attend que le DOM soit chargé.

  // Déclare plusieurs variables et les relie à des éléments HTML spécifiques.
  const title = document.querySelector("h1");
  const txt = "KER ROZENN";

  // Crée une fonction appelée "typewriter" pour simuler l'effet d'une machine à écrire.
  function typewriter(text, index) {
    // Si l'index est inférieur à la longueur du texte, continue à ajouter des caractères un par un.
    if (index < text.length) {
      setTimeout(() => {
        // Ajoute un caractère du texte au titre (entouré de balises HTML <span>).
        title.innerHTML += `<span>${text[index]}</span>`;
        // Appelle la fonction "typewriter" de manière récursive pour le caractère suivant.
        typewriter(text, index + 1);
      }, 150); // Attends 150 millisecondes avant d'ajouter le caractère suivant.
    }
  }

  // commence à appeler la fonction "typewriter" avec le texte "KER ROZENN".
  setTimeout(() => {
    typewriter(txt, 0);
  }, 0);
});

/* *****************************************************************
EFFET DE SCROLL et POPUP (menu carte et concours)
***************************************************************** */
let playOnce = true;

window.addEventListener("scroll", () => {
  //faire un pourcentage de la scrollValue
  //valeur globale du body = document.body.offsetHeight
  //niveau du scroll = window.scrollY
  //taille de la fenetre = window.innerHeight

  let scrollValue =
    (window.innerHeight + window.scrollY) / document.body.offsetHeight;
  console.log(scrollValue);
  if (scrollValue > 0.25) {
    containerCarte.style.opacity = 1; //rend visible l'élément
    containerCarte.style.transform = "none"; //
  }
  // Popup

  if (scrollValue > 0.4 && playOnce) {
    popup.style.opacity = 1;
    popup.style.transform = "none";
    playOnce = false;
  }
});

closeBtn.addEventListener("click", () => {
  popup.style.opacity = 0;
  popup.style.transform = "translateX(500px)";
});

/* *****************************************************************
AFFICHER LA FENETRE QUI DEMANDE L'EMAIL EN CAS D'ERREUR
***************************************************************** */
// Définissez l'événement de clic en dehors de la fonction
document.getElementById("btnConcours").onclick = function () {
  obtenirValeurEmail();
};

function obtenirValeurEmail() {
  // Récupérez l'élément input par son ID
  let champEmail = document.getElementById("emailField");
  // Récupérez la valeur du champ email
  let valeurEmail = champEmail.value;

  // Utilisation d'une regex (expression régulière) pour valider l'adresse e-mail
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (regex.test(valeurEmail)) {
    // L'adresse e-mail est valide, vous pouvez la traiter ici
    console.log("Adresse e-mail valide : " + valeurEmail);
  } else {
    // L'adresse e-mail est invalide, affichez un message d'erreur ou effectuez une action appropriée

    Swal.fire("Veuillez entrer une adresse email valide.");
  }

  // Affichez la valeur dans la console (ou utilisez-la comme vous le souhaitez)
  console.log("Adresse e-mail : " + valeurEmail);
}

/* ***************************************************************** */
