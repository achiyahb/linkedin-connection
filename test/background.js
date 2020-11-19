

chrome.browserAction.onClicked.addListener(executeContentFunc);


function executeContentFunc(){
    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'executeContentFunc'})
        })
}