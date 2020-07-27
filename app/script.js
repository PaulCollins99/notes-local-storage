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

//document.querySelectorAll('[data-toggle-navbar]').forEach(toggle => {
//    toggle.addEventListener('click', e => {
//      const navID = toggle.dataset.toggleNavbar;
//      const navElement = navID ? document.getElementById(navID) : undefined;
//      console.log(navElement)
//      if (navElement) {
//         let navState = navElement.getAttribute('aria-hidden');
//         navElement.setAttribute('aria-hidden', navState == 'true' ? false : true); 
//      }
//    });
// });

function toggle () {
    const navElement = document.getElementById("navbar")
    let navState = navElement.getAttribute('aria-hidden');
    navElement.setAttribute('aria-hidden', navState == 'true' ? false : true); 
}

function boot () {
    window.openNav.addEventListener('click', toggle);
    window.closeNav.addEventListener('click', toggle);
}

document.addEventListener('load', boot);
boot();
