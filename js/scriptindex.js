

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
		const photographerCard = document.getElementById('card');
		const tags = data.photographers.find(p => p.tags);
		const btnValue = btns.value;

		for (i = 0; i < btns.length; i++) {
			let btnArray = [];
			btnArray.push(btnValue);
			btns[i].addEventListener('click', (e) => {
				e.preventDefault();
				btnArray.forEach(()=> {
					if (btnValue === '#'+tags){
						photographerCard.style.display = 'block';
					} else {
						if (photographerCard.includes('#'+tags)){
							photographerCard.style.display = 'block';
						} else {
							photographerCard.style.display = 'none';
						}
					}
				});
			});
		};



		/*test-essai tri bis*/
		/* let arrayWithOnlyTagsSelected = [];
		const artistData = data.photographers;
		const aTagElts = document.querySelectorAll('.btn_select');

      	aTagElts.forEach((aTagElt) => {
        aTagElt.addEventListener("click", function (e) {
        	e.preventDefault();
        	let tagSelected = window.event.target.textContent || window.event.target.innerText;
        	if (arrayWithOnlyTagsSelected.includes(tagSelected)) {
        		arrayWithOnlyTagsSelected = arrayWithOnlyTagsSelected.filter((item) => item != tagSelected);
        	} else{
            	arrayWithOnlyTagsSelected.push(tagSelected);
          	}

        	let newArtistDatas = [];

			if (arrayWithOnlyTagsSelected.length == 0) {
				newArtistDatas = artistData;
			} else {
            	for (let a in artistData) {
            		let cardWithAllTags = true;

            		arrayWithOnlyTagsSelected.forEach((element) => {
                		if (!artistData[a].tags.includes(element)) {
                  			cardWithAllTags = false;
                		}
					});
              		if (cardWithAllTags) {
                		newArtistDatas.push(artistData[a]);
              		}
            	}
          	}
        });
      }); */




	})
