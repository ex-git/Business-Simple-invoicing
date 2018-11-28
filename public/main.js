'use strict'

function catchLogin () {
    $('.mainPageLogin').on('click', event=>{
        event.preventDefault();
        $('.mainPageGreeting').prop('hidden', true);
        $('.mainHeader').addClass('hiden')
        $('.logInForm').prop('hidden', false)
    })
    $('.logInAuth').on('click', event=>{
        event.preventDefault();
        console.log("ok")
    })
}

$(catchLogin)