

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
		/*Affichage Photographes*/
		var photographersElement = document.getElementById('photographers');
		for(const photographers of data.photographers){
			var tagsBox = "";
			for(const photographersTags of photographers.tags){
				tagsBox += `<input type="button" value="#${photographersTags}" alt="${photographersTags}" class="btn_select"></input>`
			}
			photographersElement.innerHTML += `<article alt="photographers profile" id="card">
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


		/*Tri des photographes*/
		const btns = document.querySelectorAll('.btn_select');
		const filteredArea = document.querySelectorAll('#photographers');
		const tags = data.photographers.tags;

		for (i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', (e) => {
				e.preventDefault();
				const filter = e.target.dataset.filter;
				filteredArea.forEach((article)=> {
					if (filter === tags){
						article.style.display = 'block';
					} else {
						if (article.classList.contains(filter)){
							article.style.display = 'block';
						} else {
							article.style.display = 'none';
						}
					}
				});
			});
		};
	})
