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

function newNote () {
    let section = document.createElement('section');
    section.className = "note"

    let section2 = document.createElement('section');
    section2.className = "noteDetails"

    let header = document.createElement('h4');
    header.className = "noteHeader"
    header.textContent = "This is a note header"

    let button = document.createElement('button');
    button.className = "noteButton"
    button.textContent = "..."

    let para = document.createElement('p');
    para.className = "noteText"
    para.textContent = "This is a note body blah blah blah blah ..."

    section2.appendChild(header)
    section2.appendChild(button)
    section2.appendChild(para)
    section.appendChild(section2)
    document.getElementById("holder").appendChild(section)
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
    window.addNote.addEventListener('click', newNote)
}

document.addEventListener('load', boot);
boot();
