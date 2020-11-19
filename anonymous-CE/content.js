chrome.runtime.onMessage.addListener((message) => {
    if(message.type === 'executeContentFunc'){
        anonymousCards()
    setInterval(()=>{
        anonymousCards()
    },100)
    }
});

function anonymousCards(){
    let invitationCards = document.querySelectorAll('.invitation-card.artdeco-list__item.ember-view')
    invitationCards.forEach((card,key)=>{
    let nameTitle = card.querySelector('.invitation-card__title.t-16.t-black.t-bold')
    let firstName = nameTitle.innerText.split(' ')[0]
        let subTitle = card.querySelector('.invitation-card__subtitle.t-14.t-black--light.t-normal')
        let withoutCompany = subTitle.innerText.split(' at ')[0].split(' - ')[0]
        subTitle.innerText = withoutCompany
    nameTitle.innerText = firstName
    card.querySelector('img').src = `https://robohash.org/${firstName}`
    })
}