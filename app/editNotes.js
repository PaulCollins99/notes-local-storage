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
    let summary;

    if (document.getElementById("full").value.length > 24) {
        summary = document.getElementById("full").value.substring(0,24) + "..."
    } else {
        summary = document.getElementById("full").value
    }
    const today = new Date();
    let newNote = new Note(document.getElementById("title").value, summary, document.getElementById("full").value, today.getDate() + ":" + (today.getMonth() +1 ) + ":" + today.getFullYear() );
    listOfNotes.push(newNote);

    localStorage.setItem("notes", JSON.stringify(listOfNotes))

    window.location.href = "index.html"
}

function boot () {
    window.inputButton.addEventListener("click", input)
    const today = new Date();
    const options = {weekday : 'long'}
    const date = new Intl.DateTimeFormat('en-US', options).format(today) + " " + today.getDate() + ":" + (today.getMonth() +1 ) + ":" + today.getFullYear() ;
    document.getElementById("currentDate").textContent = date
}

window.addEventListener("load", boot)
boot()