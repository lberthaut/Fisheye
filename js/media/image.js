class Image{
    constructor(media){
        Object.assign(this, media);
        this.media = `<img src="photos/sample/${this.photographerName}/${this.image}" alt="${this.alt}" tabindex="1" class="open-lightbox" data-id="${this.id}">`;
        this.fileName = this.image;
        this.title = this.fileName.replace('.jpg',"").replace(/_/g," ");
    }
}