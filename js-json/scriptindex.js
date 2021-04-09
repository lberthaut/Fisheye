

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
		var photographersElement = document.getElementById('photographers');
		for(const photographers of data.photographers){
			photographersElement.innerHTML += `<article alt="photographers profile">
						<a href="" alt="photographers page">
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
						</nav>
					</article>`;
					var photographersTagsBox = document.getElementById('tagsbox');
					for(const photographersTags of photographers.tags){
						let i=0; i<photographersTags.length; i++;
						photographersTagsBox.innerHTML += `<input type="button" value="#${photographers.tags[i]}" alt="${photographers.tags[i]}" class="btn_select"></input>`
					}
		/* function includeTags (){
			var photographersTagsBox = document.getElementById('tagsbox');
			for(let i=0; i<photographers.tags.length; i++)
			photographersTagsBox.innerHTML += `<input type="button" value="#${photographers.tags[i]}" alt="${photographers.tags[i]}" class="btn_select"></input>`
		}
		photographers.tags.forEach(includeTags); */
		}
	})


