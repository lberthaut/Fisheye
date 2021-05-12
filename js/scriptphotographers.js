var searchParam = (new URL(window.location)).searchParams;
var id = searchParam.get('id');

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
        var photographer = data.photographers.find(p => p.id == id);
        var photoResult = data.media.filter(media => media.photographerId == id);
        var tags = "";
			for(const photographers of photographer.tags){
				tags += `<input type="button" value="#${photographers}" alt="${photographers}" class="btn_tags"></input>`
			}
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
            <div class="tagsbox">
            ${tags}
            </div>
            <nav aria-label="categories" id="tagsbox">
            </nav>
            <input type="button" value="Contactez-moi" alt="contact me" class="btn_contact">
            </section>
            <div class="photo_graphers" alt="photographer profile pic">
                <img src="photos/sample/id_photos/${photographer.portrait}" alt="photographers_photo" class="format_photos">
            </div>`
        
		showMedia(photographer, photoResult);
        showTotalLikes(photoResult);
        showTotalprice(photographer);
        var lightbox = new Lightbox(photoResult, document.querySelector('#lightbox'), photographer.name);
        document.querySelectorAll('.open-lightbox').forEach(media => {
            media.addEventListener('click', function(){
                lightbox.init(this.dataset.id);
            })
            
        });


        /*Ouverture de la Modal de contact*/
        const contactButton = document.querySelector('.btn_contact');
        const modalZone = document.querySelector('#modal_zone');
        const allPage = document.querySelector('#bloc_page');

        contactButton.addEventListener('click', openModal);

        function openModal(){
            modalZone.innerHTML = `<div alt="modal" class="modal">
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

        document.getElementById('firstname').focus();
        allPage.style.opacity = "0.5";
        
        
        /*Fermeture de la Modal*/
        const closeButton = document.querySelector('#close');
        const modal = document.querySelector('.modal');
        closeButton.addEventListener('click', function close(){
            modal.style.display = "none";
            allPage.style.opacity = "1";
            });
        }


        /*Tri des medias*/
        document.querySelector('#selection').addEventListener('change', function(){
            var filterResult = null;
            switch(this.value){
                case "date":
                    filterResult = photoResult.sort((a,b)=> Date.parse(b.date) - Date.parse(a.date));
                break;
                case "popularite":
                    filterResult =  photoResult.sort((a,b)=> b.likes - a.likes);
                break;
                case "titre":
                    filterResult = photoResult.sort((a, b)=> a.image.localeCompare(b.image));
                break;
                default:
                break;
            }
            showMedia (photographer, filterResult);
        })

        document.querySelectorAll('.heartmedia').forEach(heart =>{
            heart.addEventListener('click', addLike);
        })
    })

    
/*Affichage des medias*/
function showMedia(photographer, photoResult){
    var mediaElement = document.querySelector('#medias_sections');
    mediaElement.innerHTML = "";
    for(const photosData of photoResult){
        const photographerName = photographer.name.split(' ');
        var media = "";
        var title = "";
        if(photosData.image != undefined){
            media = `<img src="photos/sample/${photographerName[0]}/${photosData.image}" alt="${photosData.alt}" class="open-lightbox" data-id="${photosData.id}">`;
            title = photosData.image;
        }
        if(photosData.video != undefined){
            media = `<video preload="metadata" class="open-lightbox" data-id="${photosData.id}"><source src="photos/sample/${photographerName[0]}/${photosData.video}" type="video/mp4" alt="${photosData.alt}></video>`;
            title = photosData.video;
        }
        mediaElement.innerHTML += `<article alt="photos" class="media_box">
        <div class="media_format">
            ${media}
        </div>
        <aside alt="informations" class="medias_infos">
            <span class="titlebox">
                <p>${title.replace('.jpg',"").replace(/_/g," ").replace('.mp4',"")}</p>
            </span>
            <p>${photosData.price}€</p>
            <span class="likesbox">
                <p class="liked">${photosData.likes}</p>
                <i class="fas fa-heart heartmedia"></i>
            </span>
        </aside>
    </article>`;
        }
}


/*Rajoute 1 au click des likes*/

function addLike(){
    let likedElement = this.closest(".likesbox").querySelector('.liked');
    let liked = parseInt(likedElement.innerHTML);
    liked++;
    likedElement.innerHTML = liked;
}

/*compteur des likes*/
function showTotalLikes (photoResult){
    var likes = photoResult.map(media=>media.likes).reduce((total, likes)=>total + likes);
    document.querySelector('.compteur .likes').innerHTML= likes;
};

/*affichage prix/jour*/
function showTotalprice (photographer){
    var price = photographer.price;
    document.querySelector('.compteur .price').innerHTML= price;
};
