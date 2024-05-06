const themeButton = document.getElementById('theme-button');
const themeButtonP = document.getElementById('theme-button-p');

export function darkThemeSetup(){
    const data = localStorage.getItem('theme');
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(data == null){
        if(prefersDarkTheme.matches){
            themeButton.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeButtonP.textContent = '🌞';
            document.body.classList.add('dark-mode');
        } else{
            themeButton.classList.add('light');
            localStorage.setItem('theme', 'light');
            themeButtonP.textContent = '🌝';
        }
    } else{
        if(data === 'dark'){
            themeButton.classList.add('dark');
            themeButtonP.textContent = '🌞';
            document.body.classList.add('dark-mode');
        } else{
            themeButton.classList.add('light');
            themeButtonP.textContent = '🌝';
        }
    }
    
    themeButton.addEventListener('click', function() {
        if( themeButton.classList.contains('dark')){
            themeButton.classList.remove('dark');
            themeButton.classList.add('light');
            themeButtonP.textContent = '🌝';
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else{
            themeButton.classList.remove('light');
            themeButton.classList.add('dark');
            themeButtonP.textContent = '🌞';
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }              
    });    
}