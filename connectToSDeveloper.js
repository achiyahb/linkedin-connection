let scrollCounter = 0
let scrollDown = setInterval(()=>{
    document.querySelector('.artdeco-modal__content.discover-cohort-recommendations-modal__content').scroll(0,50000)
    scrollCounter++
    if(scrollCounter >20){
        clearInterval(scrollDown)
        hitTheConnectButton()
    }
},1000)
function hitTheConnectButton(){
    let membersCards = document.querySelectorAll('.discover-entity-type-card');
    for (let i = 120; i<130; i++){
        let connectButton = membersCards[i].querySelector('.full-width');
        connectButton.click();
    }
}
