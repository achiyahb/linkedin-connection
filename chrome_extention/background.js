// content connection
let stop  = false
let start = false
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === 'from_content_script') {
        sendResponse(stop);
    } else if (message.type === 'from_popup') {
        stop = !message.connect;
        start = message.connect;
    } else{
        sendResponse(start);
    }
});


// popup connection

alert('background is here')
