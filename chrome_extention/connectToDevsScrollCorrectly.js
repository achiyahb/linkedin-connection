let startFromIndex = 0
let endFromIndex = 7
let numberClicksGoal = 80
let allClicksCounter = null
let windowCard
let pixelAddToGoalCoord = 587.5
let index = 0
let positionY = 0
let agreementToTerm = 'trail'
let trailMode = true
let REReal = /^real$/

function startToConnect(){
    windowCard = document.querySelector('.artdeco-modal__content.discover-cohort-recommendations-modal__content')
    numberClicksGoal = prompt('how many people you wish to connect? we recommend less then 80','80')
    agreementToTerm = prompt('Are you interested in running the bot in trial or real mode? For real mode, write real.\n' +
        'By sending this message, you confirm that you are aware that the use of this bot is at your own responsibility.','trail')
    trailMode = !REReal.test(agreementToTerm.toLowerCase())
    trailMode ? console.log('trail mode start') : console.log('real mode start')
    connectToEightMembers()
}

function connectToEightMembers(){
    console.log('startFromIndex:',startFromIndex)
    console.log('endFromIndex:',endFromIndex)
    let membersCards = windowCard.querySelectorAll('.discover-entity-type-card');
    let indexNumberArray = []
    for (let i = endFromIndex; i >= startFromIndex; i--){
        let randomBoolean = Math.random() >= 0.5;
        if (randomBoolean){
            indexNumberArray.push(i)
        } else {
            indexNumberArray.unshift(i)
        }
    }
    console.log(indexNumberArray)
    startFromIndex += 8
    endFromIndex += 8
    SetNewIntervalRandomly(indexNumberArray,membersCards)
}

function SetNewIntervalRandomly(indexNumberArray,membersCards){
    let randomNumberBetween1to10 = Math.random()
    let randomSecToPlay = 1500 * randomNumberBetween1to10 + 1500
    ticker(randomSecToPlay,indexNumberArray,membersCards)
}

function ticker(someSecBeforeClick,indexNumberArray,membersCards){
    console.log('someSecBeforeClick',someSecBeforeClick/1000)
    setTimeout(()=> {
        let i = indexNumberArray[index]
        let connectButton = membersCards[i].querySelector('.full-width');
        trailMode ? console.log(connectButton) : connectButton.click();
        allClicksCounter++
        index++
        if (allClicksCounter >+ numberClicksGoal){
            console.log('finish')
        } else if (index >= 6) {
            index = 0
            setTimeout(()=>{scrollDown()},1000)
        } else {
            SetNewIntervalRandomly(indexNumberArray,membersCards)
        }
    },someSecBeforeClick)
}

function scrollDown(){
    positionY += pixelAddToGoalCoord
    windowCard.scroll(0,positionY)
    setTimeout(()=>{
        windowCard.scroll(0,positionY)
        setTimeout(()=>connectToEightMembers(),1000)
    },1000)
}

chrome.runtime.onMessage.addListener(function (request) {
    startToConnect()
})

console.log('connector is activated')