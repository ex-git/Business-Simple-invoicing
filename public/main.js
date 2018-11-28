'use strict'

function catchLogin () {
    $('.mainPageLogin').on('click', event=>{
        event.preventDefault();
        console.log("ok")
    })
}

$(catchLogin)