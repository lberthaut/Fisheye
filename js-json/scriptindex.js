

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
		showPhotographers()

		/*Affichage des photographes*/
		function showPhotographers(){
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
		}


		
		/*tri des photographes*/
		const btn = document.getElementsByClassName("btn_select");
		btn.addEventListener('click', showFiltered);
		
		function showFiltered(){
		const mediaTags = [];
		let uniqueTags = mediaTags.filter(
			(value, index, self) => self.indexOf(value) === index);
			for (let u in uniqueTags){
				e.preventDefault();
			for(let i in data.photographers){
				const tagsData = data.photographers[i].tags;
				for (let t in tagsData){
					if(uniqueTags[u] == tagsData[t]){
						document.querySelector('photographers') = null;
						const newArticle = document.createElement("article");
						sectionTags.appendChild(newArticle);
						newArticle.getElementById('card');
						newArticle.innerHTML = `<article alt="photographers profile" id="card">
						<a href="photographer.html?id=${photographers[i].id}" alt="photographers page">
							<div class="photo_graphers">
								<img src="photos/sample/id_photos/${photographers[i].portrait}" alt="photographers_photo" class="format_photos">
							</div>
							<p class="photographers_name" alt="photographers name">
								${photographers[i].name}
							</p>
						</a>
						<p alt="photographer city" class="city">
							${photographers[i].city}
						</p>
						<p alt="slogan" class="slogan">
							${photographers[i].tagline}
						</p>
						<p alt="prices" class="prices">
							${photographers[i].price}€/jour
						</p>
						<nav aria-label="categories" id="tagsbox">
						${tagsBox[i]}
						</nav>
					</article>`
					}}
				}
			}
		};
	})
