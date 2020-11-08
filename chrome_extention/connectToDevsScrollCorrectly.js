let startFromIndex = 0
let endFromIndex = 7
let numberClicksGoal = 80
let allClicksCounter = null
let windowCard
let pixelAddToGoalCoord = 587.5
let index = 0
let positionY = 0
let trailMode = true
let stop = false
let negativeFilterTerm = []
let positiveFilterTerm = []


function startToConnect(request){
    setTheOptions()
    numberClicksGoal = request.memberNum -1
    trailMode = request.trailMode
    request.filterTermArray.forEach(termObj =>{
        if (termObj.detect){
            positiveFilterTerm.push(termObj.text)
        } else {
            negativeFilterTerm.push(termObj.text)
        }
    })
    trailMode ? console.log('trail mode start') : console.log('real mode start')
    return choseTheCorrectEightMembers()
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
}

function choseTheCorrectEightMembers(){
    console.log('startFromIndex:',startFromIndex)
    console.log('endFromIndex:',endFromIndex)
    let membersCards = windowCard.querySelectorAll('.discover-entity-type-card');
    let indexNumberArray = []
    for (let i = endFromIndex; i >= startFromIndex; i--){
        let positiveFilter = checkFilter(i,membersCards,'positive')
        let negativeFilter = checkFilter(i,membersCards)
        if (!positiveFilter || negativeFilter) continue
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
    if (indexNumberArray.length === 0) scrollDown()
   return  SetNewIntervalRandomly(indexNumberArray,membersCards)
}

function checkFilter(i,memberCards,positive){
    let ReArray = positive ? positiveFilterTerm : negativeFilterTerm
    let card = memberCards[i].outerText.toLowerCase().split(' ').join('').split('-').join()
    return ReArray.some(exp =>
        RegExp(exp).test(card)
    )
}

function SetNewIntervalRandomly(indexNumberArray,membersCards){
    let randomNumberBetween1to10 = Math.random()
    let randomSecToPlay = 1500 * randomNumberBetween1to10 + 1500
    return ticker(randomSecToPlay,indexNumberArray,membersCards)
}

async function ticker(someSecBeforeClick,indexNumberArray,membersCards){
    console.log('someSecBeforeClick',someSecBeforeClick/1000)
    await setTimeout(async ()=> {
        await backgroundConnection()
        if (stop) return
        let i = indexNumberArray[index]
        let connectButton = membersCards[i].querySelector('.full-width');
        trailMode ? connectButton.style = 'background-color: aqua;': connectButton.click();
        allClicksCounter++
        index++
        if (allClicksCounter >+ numberClicksGoal){
            console.log('finish')
            return 'finish'
        } else if (index >= 6 || index >= indexNumberArray.length) {
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
        setTimeout(()=>choseTheCorrectEightMembers(),1000)
    },1000)
}

chrome.runtime.onMessage.addListener(function (request) {
    console.log('needToConnect?',request)
        startToConnect(request)
})

async function backgroundConnection(){
    await chrome.runtime.sendMessage({type: 'from_content_script'}, async (response) => {
        stop = response
        return await response
    });
}