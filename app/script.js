'use strict';

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

function gotoNewNote () {
    localStorage.setItem("load", "*new")
    window.location.href = "note.html"
}


function newNote (note, count) {
    let section = document.createElement('section');
    section.className = "note"

    let section2 = document.createElement('section');
    section2.className = "noteDetails"

    let header = document.createElement('h4');
    header.className = "noteHeader"
    header.textContent = note.title

    let button = document.createElement('button');
    button.className = "noteButton"
    button.textContent = "..."
    button.id = count
    button.addEventListener("click",editNote)

    let para = document.createElement('p');
    para.className = "noteText"
    para.textContent = note.summary

    let para2 = document.createElement('p');
    para2.className = "noteDate"
    para2.textContent = note.creationDate

    section2.appendChild(header)
    section2.appendChild(button)
    section2.appendChild(para)
    section2.appendChild(para2)
    section.appendChild(section2)
    document.getElementById("holder").appendChild(section)
    localStorage.setItem("load", "*new")
}

function editNote (e) {
    localStorage.setItem("load", e.target.id)
    window.location.href = "note.html"
}

//######################################## Boot ########################################\\

function quit () {
    localStorage.setItem("notes", JSON.stringify([]))
}

function boot () {
    window.openNav.addEventListener('click', toggle);
    window.closeNav.addEventListener('click', toggle);
    window.quitButton.addEventListener('click', quit)
    window.addNote.addEventListener('click', gotoNewNote)

    let count = 0


    if (localStorage.getItem("notes") == null) {
        localStorage.setItem("notes", JSON.stringify([]))
    } else {
        let notesArray = JSON.parse(localStorage.getItem("notes"))
        notesArray.forEach(note => {
            newNote(note, count);
            count ++;
        });
    }
}

document.addEventListener('load', boot);
boot();