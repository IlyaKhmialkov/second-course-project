const blogArticlesButton = document.getElementById('blog-articles');
blogArticlesButton.addEventListener('click', function() {
    window.location.href = "blogArticles.html";
});

const productsButton = document.getElementById('products-button');
productsButton.addEventListener('click', function() {
    window.location.href = "products.html";
});

const LogOutButton = document.getElementById('log-out');
LogOutButton.addEventListener('click', function() {
    window.location.href = "index.html";
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

async function main(){
    burgerSetup();
    darkThemeSetup();
    await sliderSetup();
    changeLanguageSetup();
    dropdownSetup();
}

main();
