/*Fonction du compteur total des likes*/
function showTotalLikes(photoResult) {
    var likes = photoResult.map(media => media.likes).reduce((total, likes) => total + likes);
    document.querySelector('#compteur .likes').innerHTML = likes;
};

/*Fonction d'affichage prix/jour*/
function showTotalprice(photographer) {
    var price = photographer.price;
    document.querySelector('#compteur .price').innerHTML = price;
};