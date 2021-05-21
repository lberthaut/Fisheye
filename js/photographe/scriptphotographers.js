var searchParam = (new URL(window.location)).searchParams;
var id = searchParam.get('id');

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
        /*Affichage des infos du photographes en fonction de ses données Json*/
        var photographer = data.photographers.find(p => p.id == id);
        var photoResult = data.media.filter(media => media.photographerId == id);

        /**Affichage infos du photographe*/
        showinfos(photographer);
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
        contactButton.addEventListener('click', openModal);

        /*Tri des medias*/
        document.querySelector('#selection').addEventListener('change', function (){
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