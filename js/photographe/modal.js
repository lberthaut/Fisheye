/*Fonction d'ouverture et de fermeture de la Modal*/
const modalZone = document.querySelector('#modal_zone');
const allPage = document.querySelector('#bloc_page');

function openModal(photographer) {
    modalZone.innerHTML = `<div id="modal de contact" class="modal">
    <p aria-label="contact">Contactez moi</p>
    <i class="fa fa-times" id="close" aria-label="fermer la modal" alt="fermer la modal"></i>
    <p aria-label="nom du photographe">${photographer.name}</p>
    <form
          name="contact"
          action="#"
          method="get"
          onsubmit="return validate();"
          id="modal"
        >
    <label for="lastname">Nom</label>
        <input
            class="text-control"
            type="text"
            id="lastname"
            name="last"
            required
            aria-labelledby="modal"
        />
    <label for="firstname">Prénom</label>
        <input
            class="text-control"
            type="text"
            id="firstname"
            name="last"
            required
            aria-labelledby="modal"
        />
    <label for="mail">E-mail</label>
        <input
            class="text-control"
            type="email"
            id="mail"
            name="email"
            required
            aria-labelledby="modal"
        />
    <label for="message">Message</label>
        <textarea
            id="message"
            rows="5"
            required
            aria-labelledby="modal"
        >
        </textarea>
        <input
            role="button"
            type="submit"
            class="send_button submit"
            value="Envoyer"
            aria-labelledby="modal"
      />
    </form>
</div>`

    document.getElementById('lastname').focus();
    allPage.style.opacity = "0.5";

    /*Fermeture de la Modal*/
    const closeButton = document.querySelector('#close');
    const modal = document.querySelector('.modal');
    closeButton.addEventListener('click', function close() {
        modal.style.display = "none";
        allPage.style.opacity = "1";
    });
}
document.addEventListener('keydown', (e) => {
    const submit = document.querySelector('#modal')
    switch (e.key) {
        case "Escape":
            modalZone.style.display = "none";
            allPage.style.opacity = "1";
            break;
        case "Enter":
            submit.submit();
            break;
    }
})