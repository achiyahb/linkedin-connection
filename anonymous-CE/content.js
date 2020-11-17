function anonymousCards(){
    setInterval(()=>{
        let invitationCards = document.querySelectorAll('.invitation-card.artdeco-list__item.ember-view')
        invitationCards.forEach((card,key)=>{
            let nameTitle = card.querySelector('.invitation-card__title.t-16.t-black.t-bold')
            let firstName = nameTitle.innerText.split(' ')[0]
            nameTitle.innerText = firstName
            card.querySelector('img').src = `https://robohash.org/${firstName}`
        })
    },10)
}



chrome.runtime.onMessage.addListener((message) => {
    if(message.type === 'executeContentFunc'){
        anonymousCards()
    }
});