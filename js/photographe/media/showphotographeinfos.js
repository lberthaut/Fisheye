function showinfos(photographer){
var tags = "";
			for(const photographers of photographer.tags){
				tags += `<input type="button" value="#${photographers}" alt="${photographers}" class="btn_tags"></input>`
			}
            var photographerCard = document.querySelector('main');
            photographerCard.innerHTML += `<section alt="photographers informations" class="infos">
            <h1 alt="nom du photographe">
                ${photographer.name}
            </h1>
            <p aria-label="ville du photographe" class="city">
                ${photographer.city}, ${photographer.country}
            </p>
            <p aria-label="slogan" class="slogan">
                ${photographer.tagline}
            </p>
            <div class="tagsbox" aria-label="zone de tags">
            ${tags}
            </div>
            <nav alt="tags" id="tagsbox">
            </nav>
            <input type="button" value="Contactez-moi" alt="Contacter le photographe" class="btn_contact">
            </section>
            <div class="photo_graphers" aria-label="photo de profil du photographe">
                <img src="photos/sample/id_photos/${photographer.portrait}" alt="photo du photographe ${photographer.name}" class="format_photos">
            </div>`
        }
        