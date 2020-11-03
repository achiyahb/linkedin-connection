let scrollCounter = 0
let connectNumber = 80
let scrollDown = setInterval(()=>{
    document.querySelector('.artdeco-modal_content.discover-cohort-recommendations-modal_content').scroll(0,50000)
    scrollCounter++
    if(scrollCounter >20){
        clearInterval(scrollDown)
        hitTheConnectButton()
    }
},1000)
function hitTheConnectButton() {
    let membersCards = document.querySelectorAll('.discover-entity-type-card');
    for (let i = 0; i < connectNumber; i++) {
        let connectButton = membersCards[i].querySelector('.full-width');
        connectButton.click();
    }
}