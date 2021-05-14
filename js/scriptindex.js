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
		photographersElement.innerHTML += `<article alt="photographers profile" class="card">
					<a href="photographer.html?id=${photographers.id}" alt="photographers page">
						<div class="photo_graphers">
							<img src="photos/sample/id_photos/${photographers.portrait}" alt="photographers_photo" class="format_photos">
						</div>
						<p class="photographers_name" alt="photographers name">
							${photographers.name}
						</p>
					</a>
					<p alt="photographer city" class="city">
						${photographers.city}
					</p>
					<p alt="slogan" class="slogan">
						${photographers.tagline}
					</p>
					<p alt="prices" class="prices">
						${photographers.price}€/jour
					</p>
					<nav aria-label="categories" id="tagsbox">
					${tagsBox}
					</nav>
				</article>`;
	}
}