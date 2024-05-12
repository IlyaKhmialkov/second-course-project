const clearLocalStorage = document.getElementById('clear-local-storage');
clearLocalStorage.addEventListener('click', function(event){
    event.preventDefault();
    localStorage.clear(); 
})

import { sliderSetup } from '/js/components/slider.js';
import { burgerSetup } from '/js/components/burger-menu.js';
import { darkThemeSetup } from '/js/components/dark-theme.js';
import { changeLanguageSetup } from '/js/components/changeLanguage.js';
import { dropdownSetup } from '/js/components/dropdown.js';

async function main(){
    burgerSetup();
    darkThemeSetup();
    await sliderSetup();
    changeLanguageSetup();
    dropdownSetup();
}

main();
