const filterTermArray = []
let idCounter = 0

document.addEventListener('DOMContentLoaded', function () {


    document.querySelector('#submit').addEventListener('click', startToConnect, false)

    function startToConnect() {
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
                        connect: needToConnect,
                        filterTermArray:filterTermArray
                    }, result)
                }
            })
    }

    function result(res) {
        // document.querySelector('#resMassage').innerHTML = res
    }
    document.querySelector('#addButton').addEventListener('click', addFilterTerm, false)
    document.querySelector('.terms').addEventListener('click', deleteTerm, false)

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

function backgroundConnection(needToConnect) {
    chrome.runtime.sendMessage({type: 'from_popup', connect: needToConnect});
}

chrome.runtime.sendMessage({type: 'popup_open'}, (res) => {
    if (res) changeButton()
});

function addFilterTerm() {
    let filterTerm = document.querySelector('#filterInput').value.toLowerCase().split(' ').join('').split('-').join()
    let detect = document.querySelector('#filters').value === 'detect'
    filterTermArray.push({text: filterTerm, detect: detect, id: 'id' + idCounter})
    idCounter++
    addTermsOnUi()
}

function  addTermsOnUi(){
    let divInner = ''
    let bigDiv = document.querySelector('#termsDiv')
    for (let obj of filterTermArray){
let termDiv = `<span id="${obj.id}" class="terms ${obj.detect? 'positive' : 'negative'}" onClick="deleteTerm(id)"> "${obj.text}"</span>`
        divInner = divInner + termDiv
    }
    bigDiv.innerHTML = divInner
}

function deleteTerm(id){
    let keyToRemove
    let obj = filterTermArray.filter((obj,key)=> {
        if (obj.id === id) keyToRemove = key
    })
    filterTermArray.splice(keyToRemove,1)
    addTermsOnUi()
}