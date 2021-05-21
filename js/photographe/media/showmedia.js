/*Fonction d'affichage des medias*/
function showMedia(photographer, photoResult){
    var mediaElement = document.querySelector('#medias_sections');
    mediaElement.innerHTML = "";
    for(const photosData of photoResult){
        const photographerName = photographer.name.split(' ');
        let media = new MediaFactory(photosData, photographerName[0]);
        mediaElement.innerHTML += media.show();
    }
}