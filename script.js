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
        burgerMenuButtons[i].addEventListener('click', function(event) {
            closeBurger();                
        });
    }
}
function darkThemeSetup(){
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const darkmode = new Darkmode({
        label: '🌞',
    });
    darkmode.showWidget();

    if(prefersDarkTheme.matches){
        themeButton.className = "dark";
        darkmode.toggle();
    }
}


function main(){
    burgerSetup();
    darkThemeSetup();
}

main();
