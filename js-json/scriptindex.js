

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
		var photographersElement = document.getElementById('photographers');
		for(const photographers of data.photographers){
			var tagsBox = "";
			for(const photographersTags of photographers.tags){
				tagsBox += `<input type="button" value="#${photographersTags}" alt="${photographersTags}" class="btn_select"></input>`
			}
			photographersElement.innerHTML += `<article alt="photographers profile">
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
	})


