const burgerButton = document.getElementById('burger-button');
const burgerMenu = document.getElementById('burger-menu');
const burgerShadow = document.querySelector('.burger-shadow');
const burgerMenuButtons = document.querySelectorAll('header #burger-menu button');

const themeButton = document.getElementById('theme-button');

function burgerSetup(){
    function closeBurger(){
        burgerButton.className = 'hide';
        burgerMenu.className = 'hide';
        burgerShadow.style.display = 'none';
        document.body.style.overflowY = 'auto';
    }

    burgerButton.addEventListener('click', function() {
        burgerButton.className = 'show';
        burgerMenu.className = 'show';
        burgerShadow.style.display = 'block';
        document.body.style.overflowY = 'hidden';     
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    burgerShadow.addEventListener('click', function() {
        closeBurger();
    }) 
    for (let i = 0; i < burgerMenuButtons.length; i++) {
        burgerMenuButtons[i].addEventListener('click', function() {
            closeBurger();                
        });
    }
}
function darkThemeSetup(){
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(prefersDarkTheme.matches){
        themeButton.classList.add('dark');
        themeButton.textContent = '🌞';
        document.body.classList.add('dark-mode');
    } else{
        themeButton.classList.add('light');
        themeButton.textContent = '🌝';
    }
    themeButton.addEventListener('click', function() {
        if( themeButton.classList.contains('dark')){
            themeButton.classList.remove('dark');
            themeButton.classList.add('light');
            themeButton.textContent = '🌝';
            document.body.classList.remove('dark-mode');
        } else{
            themeButton.classList.remove('light');
            themeButton.classList.add('dark');
            themeButton.textContent = '🌞';
            document.body.classList.add('dark-mode');
        }              
    });    
}


function main(){
    burgerSetup();
    darkThemeSetup();
}

main();
