// Lorsque l'utilisateur clique sur le bouton de menu (ouverture du menu)
document.querySelector(".menu-toggle").addEventListener("click", function(event) {
    // Empêcher le clic de se propager pour éviter que le document ne capte cet événement
    event.stopPropagation();
    // Basculer l'état du menu (ouvrir ou fermer)
    document.querySelector("nav ul").classList.toggle("active");
});

// Lorsque l'utilisateur clique en dehors du menu
document.addEventListener("click", function(event) {
    // Vérifier si le clic s'est produit en dehors de la fenêtre de navigation
    var menu = document.querySelector("nav ul");
    var menuToggleButton = document.querySelector(".menu-toggle");

    if (!menu.contains(event.target) && !menuToggleButton.contains(event.target)) {
        // Fermer le menu en supprimant la classe "active"
        menu.classList.remove("active");
    }
});