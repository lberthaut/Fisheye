var searchParam = (new URL(window.location)).searchParams;
var id = searchParam.get('id');

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
        var photographer = data.photographers.find(p => p.id == id);
		var photosElement = document.querySelector('#photos_sections');
        var photoResult = data.media.filter(media => media.photographerId == id);
        
            var photographerCard = document.querySelector('main');
            photographerCard.innerHTML += `<section alt="photographers informations" class="infos">
            <h1 alt="photographers name">
                ${photographer.name}
            </h1>
            <p alt="photographer city" class="city">
                ${photographer.city}
            </p>
            <p alt="slogan" class="slogan">
                ${photographer.tagline}
            </p>
            <nav aria-label="categories" id="tagsbox">
            </nav>
            <input type="button" value="Contactez-moi" alt="contact me" class="btn_contact">
            </section>
            <div class="photo_graphers" alt="photographer profile pic">
                <img src="photos/sample/id_photos/${photographer.portrait}" alt="photographers_photo" class="format_photos">
            </div>`
        
		for(const photosData of photoResult){
            const photographerName = photographer.name.split(' ');
			photosElement.innerHTML += `<article alt="photos" class="photos_box">
            <div class="img_format">
                <img src="photos/sample/${photographerName[0]}/${photosData.image}" alt="photo">
            </div>
            <aside alt="informations" class="photos_infos">
                <p>${photosData.image}</p>
                <p>${photosData.price}€</p>
                <p>${photosData.likes}</p>
                <i class="fas fa-heart"></i>
            </aside>
        </article>`;
            }

        const contactButton = document.querySelector('.btn_contact');
        const bodyPage = document.querySelector('#modal_zone');


        contactButton.addEventListener('click', openModal);

        function openModal(){
            bodyPage.innerHTML = `<div alt="modal" class="modal">
            <p>Contactez moi</p>
            <i class="fa fa-times" id="close"></i>
            <p>${photographer.name}</p>
            <form
                  name="contact"
                  action="#"
                  method="get"
                  onsubmit="return validate();"
                >
            <label for="lastname">Prénom</label>
                <input
                    class="text-control"
                    type="text"
                    id="firstname"
                    name="last"
                    required
                />
            <label for="firstname">Nom</label>
                <input
                    class="text-control"
                    type="text"
                    id="lastname"
                    name="last"
                    required
                />
            <label for="mail">E-mail</label>
                <input
                    class="text-control"
                    type="email"
                    id="mail"
                    name="email"
                    required
                />
            <label for="message">Message</label>
                <textarea
                    id="message"
                    rows="5"
                    required
                >
                </textarea>
                <input
                    type="submit"
                    class="send_button"
                    value="Envoyer"
              />
            </form>
        </div>`
        }

        /* const exitModal = document.querySelector('#close');

        exitModal.addEventListener('click', closeModal);

        const contactModal = document.querySelector('.modal');
        function closeModal(){
            contactModal.style.visibility = 'hidden';
        } */

        })