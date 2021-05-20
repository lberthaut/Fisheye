var searchParam = (new URL(window.location)).searchParams;
var id = searchParam.get('id');

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
        /*Affichage des infos du photographes en fonction de ses données Json*/
        var photographer = data.photographers.find(p => p.id == id);
        var photoResult = data.media.filter(media => media.photographerId == id);
        var tags = "";
			for(const photographers of photographer.tags){
				tags += `<input type="button" value="#${photographers}" alt="${photographers}" class="btn_tags"></input>`
			}
            var photographerCard = document.querySelector('main');
            photographerCard.innerHTML += `<section alt="photographers informations" class="infos">
            <h1 alt="nom du photographe">
                ${photographer.name}
            </h1>
            <p aria-label="ville du photographe" class="city">
                ${photographer.city}, ${photographer.country}
            </p>
            <p aria-label="slogan" class="slogan">
                ${photographer.tagline}
            </p>
            <div class="tagsbox" aria-label="zone de tags">
            ${tags}
            </div>
            <nav alt="tags" id="tagsbox">
            </nav>
            <input type="button" value="Contactez-moi" alt="Contacter le photographe" class="btn_contact">
            </section>
            <div class="photo_graphers" aria-label="photo de profil du photographe">
                <img src="photos/sample/id_photos/${photographer.portrait}" alt="photo du photographe ${photographer.name}" class="format_photos">
            </div>`
        
        /*Affichage des medias*/
		showMedia(photographer, photoResult);

        /*Affichage du nombres total de likes*/
        showTotalLikes(photoResult);

        /*Affichage du prix/jour*/
        showTotalprice(photographer);
        
        /*Affichage Lightbox*/
        var lightbox = new Lightbox(photoResult, document.querySelector('#lightbox'), photographer.name);
        document.querySelectorAll('.open-lightbox').forEach(media => {
            media.addEventListener('click', function(){
                lightbox.init(this.dataset.id);
            }) 
            media.addEventListener('keydown', function(e){
                if(e.key == 'Enter'){
                    lightbox.init(this.dataset.id);
                }
            })
        });

        /*Incrementation d'un like*/
        document.querySelectorAll('.heartmedia').forEach(heart =>{
            heart.addEventListener('click', addLike);
        })

        /*Ouverture de la Modal de contact*/
        const contactButton = document.querySelector('.btn_contact');
        const modalZone = document.querySelector('#modal_zone');
        const allPage = document.querySelector('#bloc_page');
        contactButton.addEventListener('click', openModal);

        /*Fonction d'ouverture et de fermeture de la Modal*/
        function openModal(){
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
        closeButton.addEventListener('click', function close(){
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
            }})

        /*Tri des medias*/
        document.querySelector('#selection').addEventListener('change', function(){
            var filterResult = null;
            switch(this.value){
                case "popularite":
                    filterResult =  photoResult.sort((a,b)=> b.likes - a.likes);
                break;
                case "date":
                    filterResult = photoResult.sort((a,b)=> Date.parse(b.date) - Date.parse(a.date));
                break;
                case "titre":
                    filterResult = photoResult.sort((a, b)=> a.image.localeCompare(b.image));
                break;
                default:
                break;
            }
            showMedia (photographer, filterResult);

            /*Initialisation de la Lightbox lors d'un tri*/
            var lightbox = new Lightbox(photoResult, document.querySelector('#lightbox'), photographer.name);
            document.querySelectorAll('.open-lightbox').forEach(media => {
                media.addEventListener('click', function(){
                    lightbox.init(this.dataset.id);
                })
            })

            /*Incrementation d'un like lors d'un tri*/
            document.querySelectorAll('.heartmedia').forEach(heart =>{
                heart.addEventListener('click', addLike);
            })
            
        })
    })

/*Fonction d'affichage des medias*/
function showMedia(photographer, photoResult){
    var mediaElement = document.querySelector('#medias_sections');
    mediaElement.innerHTML = "";
    for(const photosData of photoResult){
        const photographerName = photographer.name.split(' ');
        let media = new MediaFactory(photosData, photographerName[0]);
        mediaElement.innerHTML += media.show();
        photoResult.sort((a,b)=> b.likes - a.likes);
    }
}

/*Fonction d'incrémentation du like au click*/
function addLike(){
    let likedElement = this.closest(".likesbox").querySelector('.liked');
    let liked = parseInt(likedElement.innerHTML);
    liked++;
    likedElement.innerHTML = liked;
}

/*Fonction du compteur total des likes*/
function showTotalLikes (photoResult){
    var likes = photoResult.map(media=>media.likes).reduce((total, likes)=>total + likes);
    document.querySelector('#compteur .likes').innerHTML= likes;
};

/*Fonction d'affichage prix/jour*/
function showTotalprice (photographer){
    var price = photographer.price;
    document.querySelector('#compteur .price').innerHTML= price;
};