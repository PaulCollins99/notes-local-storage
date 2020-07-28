import {Note} from './notes.js'

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

function input () {
    let listOfNotes = JSON.parse(localStorage.getItem("notes"))

    let newNote = new Note(document.getElementById("title").value, document.getElementById("summary").value, document.getElementById("full").value)
    listOfNotes.push(newNote);

    localStorage.setItem("notes", JSON.stringify(listOfNotes))

    window.location.href = "index.html"
}

function boot () {
    window.inputButton.addEventListener("click", input)
}

window.addEventListener("load", boot)
boot()