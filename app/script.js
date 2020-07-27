'use strict';

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

function boot () {
    
}

document.addEventListener('load', boot);
