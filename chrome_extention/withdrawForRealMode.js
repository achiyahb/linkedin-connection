let jIncreaseCounter = 0
let firstScroll = true
function withdrawForRealAlgorithm() {
    let timesOnPage = document.querySelectorAll('.time-badge.time-ago')
    let allWithdrawBtns = document.querySelectorAll('.invitation-card__action-btn')
    let withdrawBtn = allWithdrawBtns[j]
    if (!withdrawBtn) {
        prepareToNextPageWithdraw()
        return
    }
    let phraseText = timesOnPage[j].innerText
    let phraseToClickOn
    REArray.forEach(RExp => {
        let check = RegExp(RExp).test(phraseText)
        if (check) phraseToClickOn = true
    })
    if (phraseToClickOn) {
        theNextBtn = allWithdrawBtns[j + 1]
        if (!scrolledInThisPage) {
            scrollToTheButton(withdrawBtn);
            firstScroll = true
            scrolledInThisPage = true;
        } else {
            hitTheRealWithdrawBtn(withdrawBtn)
        }
    } else {
        j++
        withdrawForRealAlgorithm()
    }
}

function hitTheRealWithdrawBtn(withdrawBtn) {
    fakeClick(withdrawBtn)
    let intervalCounter = 0
    let acceptInterval = setInterval(() => {
        let acceptBtn = document.querySelector('.artdeco-modal__confirm-dialog-btn.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view')
        if (acceptBtn) {
            fakeClick(acceptBtn)
            checkTheNextBtn(withdrawBtn)
            clearInterval(acceptInterval)
        } else if (intervalCounter > 4) {
            clearInterval(acceptInterval)
            console.log("can't detect the acceptBtn")
        }
        intervalCounter++
    }, 500)
}

function checkTheNextBtn(withdrawBtn) {
    let ifWithdrawBtnExist = setInterval(() => {
        let allWithdrawBtns = document.querySelectorAll('.invitation-card__action-btn')
        let btnInJIndex = allWithdrawBtns[j]

        if (btnInJIndex !== withdrawBtn) {
            clearInterval(ifWithdrawBtnExist)
            if (!btnInJIndex) {
                prepareToNextPageWithdraw()
                return
            } else if (theNextBtn !== btnInJIndex) {
                j++
                if(scrolledInThisPage) {
                    jIncreaseCounter++
                    console.log('jIncreaseCounter:',jIncreaseCounter)
                    if (jIncreaseCounter > 4) {
                        scrollToTheButton(withdrawBtn, 'dontHit')
                        jIncreaseCounter = 0
                        setTimeout(()=>{
                            withdrawForRealAlgorithm()
                        },3000)
                    }
                }
            }
            withdrawForRealAlgorithm()
        }
    }, 1000)
}

function prepareToNextPageWithdraw() {
    toTheNextPageWithdraw()
    j = 0
    let checkIfThePageLoaded = setInterval(() => {
        let allWithdrawBtns = document.querySelectorAll('.invitation-card__action-btn')
        let lengthEqualTo100 = allWithdrawBtns.length > 50
        if (lengthEqualTo100) {
            clearInterval(checkIfThePageLoaded)
            withdrawForRealAlgorithm()
        }
    }, 1000)

}