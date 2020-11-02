
function ticker(secToPlay){
    console.log('secToPlay',secToPlay/1000)
    let secCounter = 0
    let interval = setInterval(()=>{
        secCounter++
        console.log(secCounter)
        if(secCounter >= secToPlay/1000){
            clearInterval(interval)
            SetNewIntervalRandomly()
        }
    },1000)
    setTimeout(()=>console.log('finish'),secToPlay)
}

ticker(3000)

function SetNewIntervalRandomly(){
    let randomNumberBetween1to10 = Math.random() * 10
    let randomSecToPlay = 1000 * randomNumberBetween1to10
    ticker(randomSecToPlay)
}