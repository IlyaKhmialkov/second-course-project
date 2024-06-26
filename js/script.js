const blogArticlesButton = document.getElementById('blog-articles');
blogArticlesButton.addEventListener('click', function() {
    modalWindowShow('you must sign up first');
});

const productsButton = document.getElementById('products-button');
productsButton.addEventListener('click', function() {
    modalWindowShow('you must sign up first');
});

const signUpButton = document.getElementById('sign-up');
signUpButton.addEventListener('click', function() {
    window.location.href = "registration.html";
});

const clearLocalStorage = document.getElementById('clear-local-storage');
clearLocalStorage.addEventListener('click', function(event){
    event.preventDefault();
    localStorage.clear(); 
})

import { sliderSetup } from './components/slider.js';
import { burgerSetup } from './components/burger-menu.js';
import { darkThemeSetup } from './components/dark-theme.js';
import { changeLanguageSetup } from './components/changeLanguage.js';
import { dropdownSetup } from './components/dropdown.js';
import { modalWindowShow } from './components/modal.js';

async function main(){
    burgerSetup();
    darkThemeSetup();
    await sliderSetup();
    changeLanguageSetup();
    dropdownSetup();
}

main();
