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

/*Affichage Ancre contenu*/
document.addEventListener('scroll', ()=>{
	const urlZone = document.querySelector('.block-url-ancre');
	urlZone.innerHTML = `<a href=#navigation class="lien-ancre-tags" aria-labelledby="lientags" aria-label="aller aux filtres des photographes par tags">Passer au contenu</a>`;
})
