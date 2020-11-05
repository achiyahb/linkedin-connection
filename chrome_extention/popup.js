
document.addEventListener('DOMContentLoaded', function () {


    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick () {
      chrome.tabs.query({currentWindow: true, active: true},
          function (tabs) {
              let memberNumberToConnect = document.querySelector('#membersNumber').value
              let trailMode = document.querySelector('#modes').value === 'trail'
              let agreement = document.querySelector('#termAgreement').checked
          if (!agreement){
              console.log('need to agree the terms')
              document.querySelector('#condition').style = "color: red;"
              setTimeout(()=>{
                  document.querySelector('#condition').style = "color: black;"
              },1000)
          } else {
              chrome.tabs.sendMessage(tabs[0].id, {memberNum : memberNumberToConnect, trailMode : trailMode})
          }
      })
    }
}, false)


