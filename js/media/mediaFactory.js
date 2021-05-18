class MediaFactory{
    constructor(media, photographerName){
        media.photographerName = photographerName;
        if(media.image != undefined){
            Object.assign(this, new Image(media));
        }
        else if(media.video != undefined){
            Object.assign(this, new Video(media));
        }
    }
    show(){
        return `<article alt="photos" class="media_box">
        <div class="media_format" arial-label="photo ${this.fileName}">
            ${this.media}
        </div>
        <aside alt="informations de la photo" class="medias_infos">
            <span class="titlebox" aria-label="titre de la photo">
                <p aria-label="${this.fileName}">${this.title}</p>
            </span>
            <p aria-label="prix de la photo">${this.price}€</p>
            <span class="likesbox" aria-label="likes de la photo">
                <p class="liked" aria-label="${this.likes} likes">${this.likes}</p>
                <i class="fas fa-heart heartmedia" aria-label="cliquer pour liker la photo"></i>
            </span>
        </aside>
        </article>`;
    }
}