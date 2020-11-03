let cardIndexThatChecked =null
let relevantMembers = []
let relevantMembersCounter = 0
let numberClicksGoal = 80
let allClicksCounter = null
let windowCard =  document.querySelector('.artdeco-modal__content.discover-cohort-recommendations-modal__content')
let pointY = 100

connectRelevantMembers()

async function connectRelevantMembers() {
    let shuffledArray = await setShuffledArray()
    scrollDown()
    if (!shuffledArray.length){
        setTimeout(()=>connectRelevantMembers(),500)
        return
    }
    SetNewIntervalRandomly(shuffledArray)
}

function scrollDown(){
    pointY += 100
    windowCard.scroll(0,pointY)
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function setShuffledArray(){
    relevantMembers = []
    let membersCards = windowCard.querySelectorAll('.discover-entity-type-card');
    let REConnect = /Connect/

    membersCards.forEach((card,key)=>{
        if(REConnect.test(card.innerHTML) && key%3 !== 0 && key > cardIndexThatChecked){
            relevantMembers.push(card)
        }
    })
    cardIndexThatChecked = membersCards.length
    shuffle(relevantMembers)
    return relevantMembers
}



function ticker(someSecBeforeClick,shuffledArray){
    console.log('secToPlay',someSecBeforeClick/1000)
    setTimeout(()=> {
        let connectButton = shuffledArray[relevantMembersCounter].querySelector('.full-width');
        connectButton.click();
        // console.log(connectButton)
        relevantMembersCounter++
        allClicksCounter++
        if (allClicksCounter >+ numberClicksGoal){
            console.log('finish')

        } else if (relevantMembersCounter >= relevantMembers.length) {
            relevantMembersCounter = 0
            scrollDown()
            setTimeout(()=>connectRelevantMembers(),1000)
        } else {
            SetNewIntervalRandomly(shuffledArray)
        }
    },someSecBeforeClick)
}



function SetNewIntervalRandomly(shuffledArray){
    let randomNumberBetween1to10 = Math.random() * 10
    let randomSecToPlay = 300 * randomNumberBetween1to10 + 1500
    ticker(randomSecToPlay,shuffledArray)
}
