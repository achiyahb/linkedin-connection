let timesArrayToWithdraw = []
let chosenPhraseArray = []
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#checkButton').addEventListener('click', startTimeCheck, false)
    document.querySelector('#withdrawBtn').addEventListener('click', startToWithdraw, false)
}, false)

function startToWithdraw(){
    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            let trialMode = document.querySelector('#modes').value === 'trial'
            let agreement = document.querySelector('#termAgreement').checked
            if (!agreement) {
                console.log('need to agree the terms')
                document.querySelector('#condition').style = "color: red;"
                setTimeout(() => {
                    document.querySelector('#condition').style = "color: black;"
                }, 1000)
            } else {
                for (let i = 0; i < timesArrayToWithdraw.length; i++){
                    let checked = document.querySelector(`#phrase-${i}`).checked === true
                    if (checked){
                        chosenPhraseArray.push(timesArrayToWithdraw[i])
                    }
                }
               chrome.tabs.sendMessage(tabs[0].id, {
                   text:'withdraw_start',
                   chosenPhraseArray: chosenPhraseArray,
                   trialMode: trialMode,
               })
                }
        })
}

function startTimeCheck() {
    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            getTimeArray()
            if(!timesArrayToWithdraw.length){
                chrome.tabs.sendMessage(tabs[0].id, {text:'check'})
                let getArray = setInterval(()=>{
                    getTimeArray()
                    if(timesArrayToWithdraw.length){
                        clearInterval(getArray)
                        createOptions()
                    }
                },1000)
            } else {
              createOptions()  
            }
        })
}

function  createOptions(){
 console.log(timesArrayToWithdraw)
    let listDiv = document.querySelector('#timesList')
    let innerHtml = ''
    timesArrayToWithdraw.forEach((phrase,key)=>{
        let htmlString = `<div><input type="checkbox" id="phrase-${key}">${phrase}</input></div>`
        innerHtml = innerHtml + htmlString
    })
    listDiv.innerHTML = innerHtml
    document.getElementById("withdrawBtn").disabled = false;
}

function getTimeArray(){
     chrome.runtime.sendMessage({type: 'withdraw_Popup'}, async (response) => {
        timesArrayToWithdraw =  response
        return timesArrayToWithdraw
    });
}