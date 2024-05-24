const goBackButton = document.getElementById('go-back');
goBackButton.addEventListener('click', function() {
    window.location.href = "user.html";
});

const clearLocalStorage = document.getElementById('clear-local-storage');
clearLocalStorage.addEventListener('click', function(event){
    event.preventDefault();
    localStorage.clear(); 
})

import { burgerSetup } from './components/burger-menu.js';
import { darkThemeSetup } from './components/dark-theme.js';
import { changeLanguageSetup } from './components/changeLanguage.js';

async function main(){
    burgerSetup();
    darkThemeSetup();
    changeLanguageSetup();
}

main();
