let moreThenDayParse = []
let REArray = ['day', 'second', 'hour', 'minute']
let checkInvitationMode
let startWithdraw = false
let lastScrollBtnIndex = 0
let trailMode =true

function checkThePagesTimePhrase() {
    console.log('function')
    let timesOnPage = document.querySelectorAll('.time-badge.time-ago')
    timesOnPage.forEach((phrase) => {
        let phraseText = phrase.innerText
        let avoidPhrase
        REArray.forEach(RExp => {
            let avoid = RegExp(RExp).test(phraseText)
            if (avoid) avoidPhrase = true
        })
        if (!avoidPhrase && !moreThenDayParse.includes(phraseText)) {
            moreThenDayParse.push(phraseText)
        }
    })
}


function toTheNextPage() {
    let allPageButton = document.querySelectorAll('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.ember-view')
    let thisPageButton = document.querySelector('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.active.ember-view')
    let pageKey
    allPageButton.forEach((btn, key) => {
        if (btn === thisPageButton) {
            pageKey = key
        }
    })
    if (startWithdraw) {
        allPageButton[0].querySelector('button').click()
        startWithdraw = false
        checkAllMyInvention()
    } else if (pageKey >= 9) {
        console.log('finish')
        backgroundConnection()
        return 'finish'
    } else {
        allPageButton[pageKey + 1].querySelector('button').click()
    }
}



function checkAllMyInvention() {
    if (checkInvitationMode) {
        checkThePagesTimePhrase()
    } else {
        if (!startWithdraw) {
           setTimeout(()=>{
               createIndexToWithdraw()
           },1500)
        }
    }
    let finish = toTheNextPage()
    if (!finish && checkInvitationMode) {
        setTimeout(() => {
            console.log(moreThenDayParse)
            checkAllMyInvention()
        }, 1000)
    }
}

chrome.runtime.onMessage.addListener(function (request) {
    if (request.text === 'check') {
        checkInvitationMode = true
        checkAllMyInvention()
    } else if (request.text === 'withdraw_start') {
        checkInvitationMode = false
        REArray = request.chosenPhraseArray
        startWithdraw = true
        checkAllMyInvention()
    }
})

function backgroundConnection() {
    chrome.runtime.sendMessage({type: 'withdraw_Content', timesArray: moreThenDayParse}, async (response) => {
        return await response
    });
}

function createIndexToWithdraw() {
    let indexToWithdraw = []
    let timesOnPage = document.querySelectorAll('.time-badge.time-ago')
    timesOnPage.forEach((phrase, key) => {
        let phraseText = phrase.innerText
        let phraseToClickOn
        REArray.forEach(RExp => {
            let check = RegExp(RExp).test(phraseText)
            if (check) phraseToClickOn = true
        })
        if (phraseToClickOn) {
            indexToWithdraw.push(key)
        }
    })
    if (!indexToWithdraw.length) {
       setTimeout(()=>{
           toTheNextPage()
           createIndexToWithdraw()
       },1000)
    }
    withdrawFromPeopleInPage(indexToWithdraw, 0)
}

function withdrawFromPeopleInPage(indexToWithdraw, i) {
    let btnIndex = indexToWithdraw[i]
    i++
    let withdrawBtn = document.querySelectorAll('.invitation-card__action-btn')[btnIndex]
    console.log(withdrawBtn)
    if (btnIndex - lastScrollBtnIndex < 5) {
        scrollToTheButton(withdrawBtn, btnIndex,indexToWithdraw, i)
    } else {
        hitTheWithdrawBtn(withdrawBtn,indexToWithdraw, i)
    }
}

function scrollToTheButton(withdrawBtn, btnIndex,indexToWithdraw, i) {
    let currentTop = document.documentElement.scrollTop
    let btnTop = withdrawBtn.getBoundingClientRect().top -100
    let needToScroll = btnTop - currentTop
    let partToScroll = 7
    let interval = setInterval(()=>{
        scrollByPlus(partToScroll)
        if (document.documentElement.scrollTop >= needToScroll){
            clearInterval(interval)
            lastScrollBtnIndex = btnIndex
            hitTheWithdrawBtn(withdrawBtn,indexToWithdraw, i)
        }
    },10)
}

function scrollByPlus(pxToScroll){
    let currentTop = document.documentElement.scrollTop
    let needToScroll =  currentTop + pxToScroll
    window.scroll(0,needToScroll)
}

function hitTheWithdrawBtn(withdrawBtn,indexToWithdraw, i){
    let randomTimeToWithdraw = Math.random() * 1500 + 500
    setTimeout(() => {
        if (trailMode){
            withdrawBtn.style = 'background-color: aqua;'
            withdrawFromPeopleInPage(indexToWithdraw, i)
        } else {
            withdrawBtn.click()
            setTimeout(()=>{
                document.querySelectorAll('.artdeco-modal__confirm-dialog-btn')[1].click()
                withdrawFromPeopleInPage(indexToWithdraw, i)
            },500)
        }

    }, randomTimeToWithdraw)
}