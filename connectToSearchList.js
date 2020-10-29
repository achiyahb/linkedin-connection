let clicksCounter = 0
let goThrowCards = 0
let buttons
let REConnect = /Connect/
let REDisabled = /disabled/
let pageButtons
let pageCounter=0
newPageSetUPAndStart()

function toTheNextPage(){
    pageButtons = document.querySelectorAll('.artdeco-pagination__indicator.artdeco-pagination__indicator--number.ember-view')
    console.log(pageButtons[pageCounter].querySelector('span').innerHTML)
    if(pageCounter === 8){
        pageCounter=5
    } else {
        pageCounter++
    }
    pageButtons[pageCounter].querySelector('button').click()
    setTimeout(()=>{newPageSetUPAndStart()},1000)
}



function newPageSetUPAndStart(){

    goThrowCards = 0
    window.scroll(1,3000)
    setTimeout(()=>{
        buttons = document.querySelectorAll('.search-result__action-button')
    },500)
    setTimeout(()=>{
        connectTheSearchResults()
    },500)
}




function connectTheSearchResults(){
    let btn = buttons[goThrowCards]
    if (REConnect.test(btn.outerHTML)) {
        btn.click()
        if (REDisabled.test(document.querySelector('.ml1.artdeco-button--3').outerHTML)){
            console.log('dis')

        }else{
            document.querySelector('.ml1.artdeco-button--3').click()
            clicksCounter++
        }
    }
    goThrowCards++
    if (goThrowCards < buttons.length){
        setTimeout(()=>{
            connectTheSearchResults()
        },500)
    } else {
        console.log('done')
        toTheNextPage()
    }
}