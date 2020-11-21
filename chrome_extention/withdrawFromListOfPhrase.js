let btnIndex = 0
let withdrawCounter = 0
let startWithdraw = true
let lastScrollBtnIndex = 0
let trialMode = false
let example = false

function toTheNextPageWithdraw() {
    let allPageButton = document.querySelectorAll('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.ember-view')
    let thisPageButton = document.querySelector('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.active.ember-view')
    let pageKey
    allPageButton.forEach((btn, key) => {
        if (btn === thisPageButton) {
            pageKey = key
        }
    })
    if (pageKey <= 0) {
        console.log('finish')
        backgroundConnection()
        return 'finish'
    } else {
        allPageButton[pageKey - 1].querySelector('button').click()
    }
}

function createIndexToWithdraw() {
    let indexToWithdraw = []
    setTimeout(() => {
        let timesOnPage = document.querySelectorAll('.time-badge.time-ago')
        if (timesOnPage[99] || startWithdraw) {
            startWithdraw = false
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
            withdrawFromPeopleInPage(indexToWithdraw, 0)
        } else {
            createIndexToWithdraw()
        }
    }, 1000)
}

function withdrawFromPeopleInPage(indexToWithdraw, i) {
    btnIndex = indexToWithdraw[i]
    i++
    let withdrawBtn = document.querySelectorAll('.invitation-card__action-btn')[btnIndex]
    console.log(withdrawBtn)
    if (btnIndex - lastScrollBtnIndex > 7) {
        lastScrollBtnIndex = btnIndex
        scrollToTheButton(withdrawBtn, btnIndex, indexToWithdraw, i)
    } else {
        hitTheWithdrawBtn(withdrawBtn, indexToWithdraw, i)
    }
}

function scrollToTheButton(withdrawBtn, btnIndex, indexToWithdraw, i) {
    let heightLimit = document.documentElement.scrollHeight - window.innerHeight
    let currentTop = document.documentElement.scrollTop
    let btnTop = withdrawBtn.getBoundingClientRect().top - 100
    let needToScroll = btnTop + currentTop
    console.log('heightLimit', heightLimit)
    console.log('currentTop', currentTop)
    console.log('needToScroll', needToScroll)
    let partToScroll = 7
    let interval = setInterval(() => {
        scrollByPlus(partToScroll)
        if (document.documentElement.scrollTop >= needToScroll) {
            clearInterval(interval)
            lastScrollBtnIndex = btnIndex
            hitTheWithdrawBtn(withdrawBtn, indexToWithdraw, i)
        } else if (needToScroll > heightLimit) {
            needToScroll = heightLimit
        }
    }, 10)
}

function scrollByPlus(pxToScroll) {
    let currentTop = document.documentElement.scrollTop
    let needToScroll = currentTop + pxToScroll
    window.scroll(0, needToScroll)
}

function hitTheWithdrawBtn(withdrawBtn, indexToWithdraw, i) {
    let randomTimeToWithdraw = Math.random() * 1500 + 500
    if (!withdrawBtn) {
        return setValuesToNextPage()
    } else {
        withdrawCounter++
        console.log(withdrawCounter)
    }
    setTimeout(() => {
        if (trialMode) {
            withdrawBtn.style = 'background-color: aqua;'
            withdrawFromPeopleInPage(indexToWithdraw, i)
        } else if (example) {
            withdrawBtn.click()
            let acceptBtn = document.querySelector('.artdeco-modal__confirm-dialog-btn.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view')
            acceptBtn.click()
        } else {
            fakeClick(withdrawBtn)
            let intervalCounter = 0
            let acceptInterval = setInterval(() => {
                let acceptBtn = document.querySelector('.artdeco-modal__confirm-dialog-btn.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view')
                if (acceptBtn) {
                    acceptBtn.click()
                    withdrawFromPeopleInPage(indexToWithdraw, i)
                    clearInterval(acceptInterval)
                } else if (intervalCounter > 4) {
                    withdrawFromPeopleInPage(indexToWithdraw, i)
                    clearInterval(acceptInterval)
                }
                intervalCounter++
            }, 500)
        }

    }, randomTimeToWithdraw)
}

function setValuesToNextPage() {
    toTheNextPageWithdraw()
    btnIndex = 0
    lastScrollBtnIndex = 0
    setTimeout(() => {
        createIndexToWithdraw()
    }, 2000)
}

chrome.runtime.onMessage.addListener(function (request) {
    if (request.text === 'withdraw_start') {
        REArray = request.chosenPhraseArray
        if (request.exeMode === 'trial'){
            trialMode = true
        }else if(request.exeMode === 'example'){
            example = true
        }
        createIndexToWithdraw()
    }
})





