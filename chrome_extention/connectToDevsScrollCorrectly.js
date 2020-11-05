let startFromIndex = 0
let endFromIndex = 7
let numberClicksGoal = 80
let allClicksCounter = null
let windowCard
let pixelAddToGoalCoord = 587.5
let index = 0
let positionY = 0
let trailMode = true
let REReal = /^real$/

function startToConnect(request){
    setTheOptions()
    numberClicksGoal = request.memberNum
    trailMode = request.trailMode
    trailMode ? console.log('trail mode start') : console.log('real mode start')
    connectToEightMembers()
}

function setTheOptions(){
    startFromIndex = 0
    endFromIndex = 7
    numberClicksGoal = 80
    allClicksCounter = null
    windowCard = document.querySelector('.artdeco-modal__content.discover-cohort-recommendations-modal__content')
    pixelAddToGoalCoord = 587.5
    index = 0
    positionY = 0
    trailMode = true
    REReal = /^real$/
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
    startToConnect(request)
})

console.log('connector is activated')