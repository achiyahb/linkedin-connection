document.addEventListener('DOMContentLoaded', function () {


    document.querySelector('button').addEventListener('click', onclick, false)

    function onclick() {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                let needToConnect = changeButton()
                backgroundConnection(needToConnect)
                let memberNumberToConnect = document.querySelector('#membersNumber').value
                let trailMode = document.querySelector('#modes').value === 'trail'
                let agreement = document.querySelector('#termAgreement').checked
                if (!agreement) {
                    console.log('need to agree the terms')
                    document.querySelector('#condition').style = "color: red;"
                    setTimeout(() => {
                        document.querySelector('#condition').style = "color: black;"
                    }, 1000)
                } else {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        memberNum: memberNumberToConnect,
                        trailMode: trailMode,
                        connect: needToConnect
                    }, result)
                }
            })
    }

    function result(res) {
        // document.querySelector('#resMassage').innerHTML = res
    }
}, false)


function changeButton() {
    let btn = document.querySelector('#submit')
    if (btn.innerHTML === 'connect members now') {
        if (document.querySelector('#termAgreement').checked) {
            btn.innerHTML = 'stop connecting now'
            btn.style = 'background-color: red;'
            return true
        }
    } else {
        btn.innerHTML = 'connect members now'
        btn.style = 'background-color: #85bf31;'
        document.querySelector('#termAgreement').checked = false
        return false
    }
}

function backgroundConnection(needToConnect){
    chrome.runtime.sendMessage({type: 'from_popup',connect:needToConnect});
}
chrome.runtime.sendMessage({type: 'popup_open'},(res)=>{
    if (res) changeButton()
});