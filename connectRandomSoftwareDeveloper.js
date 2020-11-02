
function ticker(secToPlay){
    console.log('secToPlay',secToPlay/1000)
    setTimeout(()=> {

        SetNewIntervalRandomly()
    },secToPlay)
}

ticker(3000)

function SetNewIntervalRandomly(){
    let randomNumberBetween1to10 = Math.random() * 10
    let randomSecToPlay = 1000 * randomNumberBetween1to10
    ticker(randomSecToPlay)
}
