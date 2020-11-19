for (let j =0; j<document.querySelectorAll('.invitation-card').length; j++){
    if (document.querySelectorAll('.invitation-card')[j].innerHTML.includes('1 month ago')){
        document.querySelectorAll('.invitation-card__action-btn')[j].click()
        document.querySelectorAll('.artdeco-modal__confirm-dialog-btn')[1].click()
        console.log(j)
    }
}
// let btns = document.querySelectorAll('.artdeco-toast-item')
for (let i = 0; i < btns.length; i++){
    btns[i].querySelector('button').click()
}


function setTest1(i){
    setTimeout(()=>{
        let withdrawBtn = document.querySelectorAll('.invitation-card__action-btn')[i]
        withdrawBtn.addEventListener('mouseenter',()=>{console.log('enter')},false)
        withdrawBtn.addEventListener('mousedown',()=>{console.log('down')},false)
        withdrawBtn.addEventListener('mouseup',()=>{console.log('up')},false)
        withdrawBtn.onmouseover = ()=>{console.log('over')}
        withdrawBtn.addEventListener('click',()=>{console.log('click')},false)
    },1000)
}

function setFlag(i) {
    // allSquares[i].innerHTML = flag
    let element = btns[i]
    let box = element.getBoundingClientRect()
    let coordX = box.left + (box.right - box.left) / 2
    let coordY= box.top + (box.bottom - box.top) / 2;
    console.log(i)
    let j = 0
    let mouseEventArray = ['mouseenter','mouseover','mousedown','mouseup','click']
    let interval = setInterval(()=>{

        let event = mouseEventArray[j]
        var x = coordX, y = coordY; //In case the x and y coordinates of an element are
        //significant, set it here.
        var rightClick = document.createEvent('MouseEvents');
        rightClick.initMouseEvent(
            event, true, true, window, 1, x+83, y+131, x, y, false, false, false, false, 0, null
        );
        element.dispatchEvent(rightClick);
        j++
        if (j>=mouseEventArray.length) clearInterval(interval)
    },20)

}

let btns = document.querySelectorAll('.invitation-card__action-btn.artdeco-button')
for (let i = 0 ; i<btns.length; i++){
    setTest1(i)
}
window.addEventListener('click',(e)=>{
    console.log(e)

},false)