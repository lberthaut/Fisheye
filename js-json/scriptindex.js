//*DOM Elements*//

const buttons = document.querySelectorAll("#btn_select");
const articles = document.querySelectorAll("article");



function tri(){
    buttons.addEventListener("click", tri);
    if(this.buttons.value != articles.input.value){
        this.articles.style.display = "none";
    }
}


