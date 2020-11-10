let moreThenDayParse = []
let REArray = ['day','second','hour','minute']

function checkThePagesTimePhrase(){
    console.log('function')
    let timesOnPage = document.querySelectorAll('.time-badge.time-ago')
    timesOnPage.forEach((phrase) => {
        let phraseText = phrase.innerText
        let avoidPhrase = REArray.some( RExp => {
            RegExp(RExp).test(phraseText)
        })
        if(!avoidPhrase && !moreThenDayParse.includes(phraseText)){
            moreThenDayParse.push(phraseText)
        }
    })
}


function toTheNextPage(){
    let allPageButton = document.querySelectorAll('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.ember-view')
    let thisPageButton = document.querySelector('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.active.ember-view')
    let pageKey
    allPageButton.forEach((btn,key)=>{
        if (btn === thisPageButton){
            pageKey = key
        }
    })
    if (pageKey >= 9){
        console.log('finish')
        return 'finish'
    } else {
        allPageButton[pageKey + 1].querySelector('button').click()
    }
}

checkAllMyInvention()

function checkAllMyInvention(){
    checkThePagesTimePhrase()
    let finish = toTheNextPage()
    if(!finish){
        setTimeout(()=>{
            console.log(moreThenDayParse)
            checkAllMyInvention()
        },1000)
    }
}