class Video{
    constructor(media){
        Object.assign(this, media);
        this.media = `<video preload="metadata" tabindex="1" class="open-lightbox vignette-video" data-id="${this.id}" title="${this.alt}"><source src="photos/sample/${this.photographerName}/${this.video}" type="video/mp4" alt="${this.alt}"></video>`;
        this.fileName = this.video;
        this.title = this.fileName.replace(/_/g," ").replace('.mp4',"");
    }
}