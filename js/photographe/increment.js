/*Fonction d'incrémentation du like au click*/
function addLike() {
    let likedElement = this.closest(".likesbox").querySelector('.liked');
    let liked = parseInt(likedElement.innerHTML);
    liked++;
    likedElement.innerHTML = liked;
}
