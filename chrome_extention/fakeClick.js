
var pressed = false;

var nowDownEvent, nowUpEvent;


function fakeClick(btn){
    var clientRect = btn.getBoundingClientRect();
    var clientX = clientRect.left + (clientRect.right - clientRect.left) - 60;
    var clientY = clientRect.top + (clientRect.bottom - clientRect.top) -20;
    nowDownEvent = performance.now()
    pressed = true;
    chrome.runtime.sendMessage({ eventPlease: "trusted", x: clientX, y: clientY, mouse: "D" }, function (response) {
        console.log(response.yourEvent);
    });
    nowUpEvent = performance.now()
    pressed = false;
    chrome.runtime.sendMessage({ eventPlease: "trusted", x: clientX, y: clientY, mouse: "U" }, function (response) {
        console.log(response.yourEvent);
    });
}