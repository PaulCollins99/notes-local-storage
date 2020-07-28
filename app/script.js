'use strict';

import {Note} from './notes.js'

//######################################## Service Worker ########################################\\

if (navigator.serviceWorker) {
    async function registerServiceWorker() {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (e) {
            console.error("Service Worker failed.  Falling back to 'online only'.", e);
        }
    }
    window.addEventListener('load', registerServiceWorker);
}

//######################################## Nav ########################################\\

function toggle () {
    const navElement = document.getElementById("navbar")
    let navState = navElement.getAttribute('aria-hidden');
    navElement.setAttribute('aria-hidden', navState == 'true' ? false : true); 
}

//######################################## Note Script ########################################\\

function test () {
    alert("this is a note");
}

//######################################## Boot ########################################\\

function quit () {
    window.close();
}

function boot () {
    window.openNav.addEventListener('click', toggle);
    window.closeNav.addEventListener('click', toggle);
    window.note1Button.addEventListener('click', test)
    window.quitButton.addEventListener('click', quit)

}

document.addEventListener('load', boot);
boot();
