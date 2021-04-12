fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
		var photosElement = document.querySelectorAll('photos_section');
		for(const photosData of data.media){
			photosElement.innerHTML += `<article alt="photos" class="photos_box">
            <div class="img_format">
                <img src="photos/sample/${photosData.image}" alt="photo">
            </div>
            <aside alt="informations" class="photos_infos">
                <p>${photosElement.alt}</p>
                <p>${photosElement.price}€</p>
                <p>${photosElement.likes}</p>
                <i class="fas fa-heart"></i>
            </aside>
        </article>`;
            }
        })