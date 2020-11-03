let startFromIndex = 0
let endFromIndex = 7
let numberClicksGoal = 80
let allClicksCounter = null
let windowCard = document.querySelector('.artdeco-modal__content.discover-cohort-recommendations-modal__content')
let pixelAddToGoalCoord = 587.5
let index = 0
let positionY = 0



function connectToEightMembers(){
    console.log('startFromIndex:',startFromIndex)
    console.log('endFromIndex:',endFromIndex)
    let membersCards = windowCard.querySelectorAll('.discover-entity-type-card');
    let indexNumberArray = []
    for (let i = startFromIndex; i <= endFromIndex; i++){
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
        // connectButton.click();
        console.log(connectButton)
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



