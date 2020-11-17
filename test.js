
let j =0
let specificWindow = document.querySelector('.artdeco-modal__content.discover-cohort-recommendations-modal__content.ember-view')
let interval = setInterval(()=>{
    j++
    if (j < 20){
        specificWindow.scroll(0,50000)
    } else {
        clearInterval(interval)
        hitTheConnectButton()
    }
},500)


function hitTheConnectButton(){
    let devButton = specificWindow.querySelectorAll('.full-width.artdeco-button.artdeco-button--2.artdeco-button--full.artdeco-button--secondary.ember-view')

    devButton.forEach((btn,key) =>{
        if (key>80){
            return
        } else {
            // btn.click()
            console.log(btn)
        }
    })
}
