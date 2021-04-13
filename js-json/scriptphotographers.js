var searchParam = (new URL(window.location)).searchParams;
var id = searchParam.get('id');

fetch('FishEyeDataFR.json')
	.then(result => 
		result.json())
	.then(data => {
        var photographer = data.photographers.find(p => p.id==id);
		var photosElement = document.querySelectorAll('photos_section');
        var photoResult = data.media.filter(media => media.photographerId == id);
		for(const photosData of photoResult){
            var nameResult = data.photographers.name.split(' ');
			photosElement.innerHTML += `<article alt="photos" class="photos_box">
            <div class="img_format">
                <img src="photos/sample/${photosData.image}" alt="photo">
            </div>
            <aside alt="informations" class="photos_infos">
                <p>${photosData.image}</p>
                <p>${photosData.price}€</p>
                <p>${photosData.likes}</p>
                <i class="fas fa-heart"></i>
            </aside>
        </article>`;
            }
        })