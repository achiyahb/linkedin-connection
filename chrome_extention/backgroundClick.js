//
//
let attachedTabs = {};
let version = "1.3";
let debugIdGlobal;

let debuggerEnabled = true;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if(message.type === 'StartDebug'){
    startDebug()
  }
});

var xC, yC;
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.id :
            "from the extension");
        if (request.eventPlease === "trusted")
            if (debuggerEnabled){
                sendResponse({ yourEvent: "dispatching event, one moment" });


                console.log(request.x, request.y);
                xC = request.x; yC = request.y;
                if (request.mouse == "D") {
                    console.log("down");
                    chrome.debugger.sendCommand({ tabId: sender.tab.id }, "Input.dispatchMouseEvent", { type: "mousePressed", x: xC, y: yC, button: "left", clickCount: 1 }, function (e) { console.log('clickDown', e) });


                } else if (request.mouse == "U") {
                    console.log("up");

                    chrome.debugger.sendCommand({ tabId: sender.tab.id }, "Input.dispatchMouseEvent", { type: "mouseReleased", x: xC, y: yC, button: "left", clickCount: 1 }, function (e) { console.log('clickUp', e) });

                }

            } else {
                sendResponse({ yourEvent: "please click the extension icon to enable debugger" });
            }


    });


chrome.debugger.onEvent.addListener(onEvent);
chrome.debugger.onDetach.addListener(onDetach);
function startDebug(){
  chrome.tabs.query({currentWindow: true, active: true},
      function (tabs) {
        let tabId = tabs[0].id;
          var debuggeeId = { tabId: tabId };
          debugIdGlobal = debuggeeId;

          if (!attachedTabs[tabId]){
              chrome.debugger.attach(debuggeeId, version, onAttach.bind(null, debuggeeId));
          }
          else {
              chrome.debugger.detach(debuggeeId, onDetach.bind(null, debuggeeId));
          }

      });
}


function onAttach(debuggeeId) {
    if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
    }

    tabId = debuggeeId.tabId;
    chrome.browserAction.setIcon({ tabId: tabId, path: "debuggerPause.png" });
    chrome.browserAction.setTitle({ tabId: tabId, title: "pause debugger" });
    attachedTabs[tabId] = "working";
    chrome.debugger.sendCommand(
        debuggeeId, "Debugger.enable", {},
        onDebuggerEnabled.bind(null, debuggeeId));
}


function onDebuggerEnabled(debuggeeId) {
    debuggerEnabled = true
}

function onDebuggerDisabled(debuggeeId) {
    debuggerEnabled = false
}

function onEvent(debuggeeId, method, frameId, resourceType) {

    tabId = debuggeeId.tabId;
    if (method == "Debugger.paused") {
        attachedTabs[tabId] = "paused";
        chrome.browserAction.setIcon({ tabId: tabId, path: "debuggerStart.png" });
        chrome.browserAction.setTitle({ tabId: tabId, title: "Resume debugging" });
    }
}

function onDetach(debuggeeId) {
    var tabId = debuggeeId.tabId;
    chrome.debugger.sendCommand(
        debuggeeId, "Debugger.disable", {},
        onDebuggerDisabled.bind(null, debuggeeId));
    delete attachedTabs[tabId];
    chrome.browserAction.setIcon({ tabId: tabId, path: "debuggerStart.png" });
    chrome.browserAction.setTitle({ tabId: tabId, title: "Resume debugging" });
    debuggerEnabled = false
}




