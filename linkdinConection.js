let clicksCounter = 0
let goThrowCards = 0
let buttons
let REConnect = /Connect/

window.scroll(1,3000)
setTimeout(()=>{
    buttons = document.querySelectorAll('.search-result__action-button')
},500)
setTimeout(()=>{
    connectTheSearchResults()
},500)



function connectTheSearchResults(){
    let btn = buttons[goThrowCards]
    if (REConnect.test(btn.outerHTML)) {
        btn.click()
        document.querySelector('.ml1.artdeco-button--3').click()
        clicksCounter++
    }
    goThrowCards++
    if (goThrowCards < buttons.length){
       setTimeout(()=>{
           connectTheSearchResults()
       },500)
    } else {
        console.log('done')
    }
}


window.scroll(1,3000)
setTimeout(()=>{
    buttons = document.querySelectorAll('.search-result__action-button')
},500)
setTimeout(()=>{
    connectTheSearchResults()
},500)



function connectTheSearchResults(){
    let btn = buttons[goThrowCards]
    if (REConnect.test(btn.outerHTML)) {
        btn.click()
        document.querySelector('.ml1.artdeco-button--3').click()
        clicksCounter++
    }
    goThrowCards++
    if (goThrowCards < buttons.length){
        setTimeout(()=>{
            connectTheSearchResults()
        },500)
    } else {
        console.log('done')
    }
}