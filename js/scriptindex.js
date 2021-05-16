fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {

		/*Affichage Photographes*/
		showPhotographers(data.photographers)


		/*Tri des photographes*/
		const btns = document.querySelectorAll('.btn_select');

		for(const btn of btns){
			btn.addEventListener('click', function (){
				const filteredPhotographers = data.photographers.filter(p => p.tags.includes(this.dataset.tag));
				showPhotographers(filteredPhotographers);
				document.getElementById('photographers').style.justifyContent = "start";
			})
		}
	})

/*Fonction d'affichage des photographes*/
function showPhotographers(listPhotographers){
	var photographersElement = document.getElementById('photographers');
	photographersElement.innerHTML ='';
	for(const photographers of listPhotographers){
		var tagsBox = "";
		for(const photographersTags of photographers.tags){
			tagsBox += `<button alt="Tag ${photographersTags}" class="btn_select" data-tag="${photographersTags}">#${photographersTags}</button>`
		}
		photographersElement.innerHTML += `<article aria-label="profil du photographe" class="card">
					<a href="photographer.html?id=${photographers.id}" aria-label="page du photographe">
						<div class="photo_graphers" aria-label="photo du photographe">
							<img src="photos/sample/id_photos/${photographers.portrait}" alt="photo du photographe ${photographers.name}" class="format_photos">
						</div>
						<p class="photographers_name" aria-label="nom du photographe">
							${photographers.name}
						</p>
					</a>
					<p aria-label="ville du photographe" class="city">
						${photographers.city}
					</p>
					<p aria-label="slogan" class="slogan">
						${photographers.tagline}
					</p>
					<p aria-label="prix par jour" class="prices">
						${photographers.price}€/jour
					</p>
					<nav aria-label="tags du photographe" id="tagsbox">
					${tagsBox}
					</nav>
				</article>`;
	}
}

/*Affichage Ancre contenu*/
document.addEventListener('scroll', ()=>{
	const urlZone = document.querySelector('.block-url-ancre');
	urlZone.innerHTML = `<a href=#navigation class="lien-ancre-tags" id="lientags" aria-label="aller aux filtres des photographes par tags">Passer au contenu</a>`;
})
