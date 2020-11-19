function startListen(){
    window.addEventListener('mouseenter',()=>{console.log('enter')},false)
    window.addEventListener('mousedown',()=>{console.log('down')},false)
    window.addEventListener('mouseup',()=>{console.log('up')},false)
    window.onmouseover = ()=>{console.log('over')}
    window.addEventListener('click',(e)=>{console.log('click')
        console.log(e)
    },false)
    window.addEventListener('contextmenu',(e)=>{console.log('contextmenu')
        fakeClick(e)
    },false)
}


chrome.runtime.onMessage.addListener((message) => {
    if(message.type === 'executeContentFunc'){
      startListen()
    }
});


function fakeClick(e){
    chrome.debugger.attach(e.path[0], "1.2", function() {
        chrome.debugger.sendCommand(e.path[0], "Input.dispatchMouseEvent", arguments)
    })
}
