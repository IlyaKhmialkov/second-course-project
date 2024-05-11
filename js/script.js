
const signUpButton = document.getElementById('sign-up');
signUpButton.addEventListener('click', function() {
    window.location.href = "registration.html";
});


import { sliderSetup } from '/js/components/slider.js';
import { burgerSetup } from '/js/components/burger-menu.js';
import { darkThemeSetup } from '/js/components/dark-theme.js';
import { changeLanguageSetup } from '/js/components/changeLanguage.js';

async function main(){
    burgerSetup();
    darkThemeSetup();
    await sliderSetup();
    changeLanguageSetup();
}

main();
