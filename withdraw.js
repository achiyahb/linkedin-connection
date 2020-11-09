for (let j =0; j<document.querySelectorAll('.invitation-card').length; j++){
    if (document.querySelectorAll('.invitation-card')[j].innerHTML.includes('1 month ago')){
        document.querySelectorAll('.invitation-card__action-btn')[j].click()
        document.querySelectorAll('.artdeco-modal__confirm-dialog-btn')[1].click()
        console.log(j)
    }
}
let btns = document.querySelectorAll('.artdeco-toast-item')
for (let i = 0; i < btns.length; i++){
    btns[i].querySelector('button').click()
}
