class Lightbox {
    constructor(listMedia, element, photographerName) {
        this.listMedia = listMedia;
        this.element = element;
        this.element.innerHTML = `<i role="button" class="fas fa-times lightbox_close" aria-label="fermer la lightbox""></i>
        <i role="button" class="fas fa-arrow-right lightbox_next" aria-label="prochaine photo"></i>
        <i role="button" class="fas fa-arrow-left lightbox_prev" aria-label="précédente photo"></i>
        <div class="lightbox_container">
        </div>`;
        this.name = (photographerName.split(' '))[0];
        this.element.querySelector('.lightbox_close').addEventListener('click', () => this.close());
        this.element.querySelector('.lightbox_next').addEventListener('click', () => this.next());
        this.element.querySelector('.lightbox_prev').addEventListener('click', () => this.prev());
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.prev();
                    break;
                case "ArrowRight":
                    this.next();
                    break;
                case "Escape":
                    this.close();
                    break;
            }
        })

    }

    init(idMedia) {
        var media = this.listMedia.find(p => p.id == idMedia);
        this.showMedia(media);
        this.element.style.display = "block";
    }

    showMedia(media) {
        this.currentMedia = media;
        var mediaElement = null;
        if (media.image != undefined) {
            mediaElement = `<img src="photos/sample/${this.name}/${media.image}" alt="${media.alt}"><p class="text-lightbox">${media.image.replace('.jpg',"").replace(/_/g," ")}</p>`;
        }
        if (media.video != undefined) {
            mediaElement = `<video preload="metadata" controls title="${media.alt}" autoplay class="video-lightbox"><source src="photos/sample/${this.name}/${media.video}" type="video/mp4" alt="${media.alt}"></video><p class="text-lightbox">${media.video.replace(/_/g," ").replace('.mp4',"")}</p>`;
        }
        this.element.querySelector('.lightbox_container').innerHTML = mediaElement;
    }

    close() {
        this.element.style.display = "none";
    }

    next() {
        var index = this.listMedia.findIndex(p => p.id == this.currentMedia.id);
        if (index < this.listMedia.length - 1) {
            this.showMedia(this.listMedia[index + 1]);
        } else {
            this.showMedia(this.listMedia[0]);
        }
    }

    prev() {
        var index = this.listMedia.findIndex(p => p.id == this.currentMedia.id);
        if (index > 0) {
            this.showMedia(this.listMedia[index - 1]);
        } else {
            this.showMedia(this.listMedia[this.listMedia.length - 1]);
        }
    }
}