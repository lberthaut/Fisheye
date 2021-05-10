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
            media = `<a href="photos/sample/${photographerName[0]}/${photosData.image}" data-lightbox="mygallery"><img src="photos/sample/${photographerName[0]}/${photosData.image}" alt="${photosData.alt}"></a>`;
            title = photosData.image;
        }
        if(photosData.video != undefined){
            media = `<a href="photos/sample/${photographerName[0]}/${photosData.video}" data-lightbox="mygallery"><video preload="metadata"><source src="photos/sample/${photographerName[0]}/${photosData.video}" type="video/mp4" alt="${photosData.alt}></video></a>`;
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



/*affichage Lightbox*/
class lightbox{
    static init(){
        const imageZone = document.querySelector('#medias_sections');
        const links = Array.from(imageZone.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
        const gallery = links.map(link =>link.getAttribute('href'));
            links.forEach(link => link.addEventListener('click', e=>{
                e.preventDefault();
                new lightbox(e.currentTarget.getAttribute('href'), gallery);
            }))
    }

    constructor (url){
        const element = this.buildDOM(url);
        this.image = gallery;
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(element);
        document.addEventListener('keyup', this.onKeyUp);
    }

    loadImage (url) {
        this.url = null;
        const image = new Image();
        const container = this.element.querySelector('.lightbox__container');
        const loader = document.createElement('div');
        loader.classList.add('lightbox__loader');
        container.innerHTML = '';
        container.appendChild(loader);
        image.onload = () => {
          container.removeChild(loader);
          container.appendChild(image);
          this.url = url;
        }
        image.src = url;
      }

    onKeyUp(e){
        if(e.key =='Escape'){
            this.close;
        } else if(e.key == 'ArrowLeft'){
            this.prev(e);
        } else if(e.key == 'ArrowRight'){
            this.next(e);
        }
    }

    close(e){
        e.preventDefault();
        this.element.style.display = "none";
        window.setTimeout(()=>{
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp);
    }

    next(e){
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url);
        if(i == this.image.length -1){
            i=-1;
        }
        this.loadImage(this.images[i+1]);
    }

    prev(e){
        e.preventDefault();
        let i = this.images.findIndex(image => image === this.url);
        if(i == 0){
            i = this.image.length;
        }
        this.loadImage(this.images[i-1]);
    }

    buildDOM (url){
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `<i class="fas fa-times lightbox_close" alt="close""></i>
        <i class="fas fa-arrow-right lightbox_next" alt="next photo"></i>
        <i class="fas fa-arrow-left lightbox_prev" alt="previous photo"></i>
        <div class="lightbox_container">
        ${url}
        </div>`;
        dom.querySelector('lightbox_close').addEventListener('click', this.close.bind(this));
        dom.querySelector('lightbox_next').addEventListener('click', this.next.bind(this));
        dom.querySelector('lightbox_prev').addEventListener('click', this.prev.bind(this));
        return dom;
    }
}

lightbox.init();



/* class LightBox{
        constructor(listImage, selector){
            this.listImage = listImage;
            this.current = null;
            this.selector = selector;
            this.element = document.querySelector(selector);
        }

        init(){
            for(let image of this.listImage){
            }
        }

        add(image){
            this.listImage.push(image);
        }

        play(){
            this.current = this.listImage[0];
            document.querySelector(this.selector + "img:first-child");
        }

        next(){
            for(let i=0; i<this.listImage.length; i++){
                if(this.listImage[i] == this.current){
                    if(i == (this.listImage.length - 1)){
                        this.current = this.listImage[0];
                        var activ = this.element.querySelector(this.selector);
                    }else{
                        this.current = this.listImage[++i];
                        var activ = this.element.querySelector(this.selector);
                    }
                    activ.setAttribute("class", "");
                    break;
                }
            }

        }

        previous(){
            for(let i=0; i<this.listImage.length; i++){
                if(this.listImage[i] == this.current){
                    if(i == 0){
                        this.current = this.listImage[this.listImage.length-1];
                        var activ = this.element.querySelector(this.selector);
                    }else{
                        this.current = this.listImage[--1];
                        var activ = this.element.querySelector(this.selector);
                    }
                    activ.setAttribute("class", "");
                    break;
                }
            }
        }
        prepareEvent(){

        }
} */







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
