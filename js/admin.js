const goAsUserButton = document.getElementById('go-as-user');
goAsUserButton.addEventListener('click', function() {
    window.location.href = "user.html";
});

const usersButton = document.getElementById('users-button');
usersButton.addEventListener('click', function() {
    window.location.href = "users-view.html";
});

const clearLocalStorage = document.getElementById('clear-local-storage');
clearLocalStorage.addEventListener('click', function(event){
    event.preventDefault();
    localStorage.clear(); 
})

import { sliderSetup } from '/js/components/slider.js';
import { darkThemeSetup } from '/js/components/dark-theme.js';
import { changeLanguageSetup } from '/js/components/changeLanguage.js';

async function main(){
    darkThemeSetup();
    await sliderSetup();
    changeLanguageSetup();
}

main();
