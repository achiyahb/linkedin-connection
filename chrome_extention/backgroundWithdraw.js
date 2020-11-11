let timesArray = []
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type === 'withdraw_Popup'){
        sendResponse(timesArray);
    } else if (message.type === 'withdraw_Content') {
        timesArray = message.timesArray
        console.log(timesArray)
    }
});
