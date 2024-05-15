const themeButton = document.getElementById('theme-button');

export function darkThemeSetup(){
    const data = localStorage.getItem('theme');
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(data == null){
        if(prefersDarkTheme.matches){
            themeButton.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeButton.textContent = '🌞';
            document.body.classList.add('dark-mode');
        } else{
            themeButton.classList.add('light');
            localStorage.setItem('theme', 'light');
            themeButton.textContent = '🌝';
        }
    } else{
        if(data === 'dark'){
            themeButton.classList.add('dark');
            themeButton.textContent = '🌞';
            document.body.classList.add('dark-mode');
        } else{
            themeButton.classList.add('light');
            themeButton.textContent = '🌝';
        }
    }
    
    themeButton.addEventListener('click', function() {
        if( themeButton.classList.contains('dark')){
            themeButton.classList.remove('dark');
            themeButton.classList.add('light');
            themeButton.textContent = '🌝';
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else{
            themeButton.classList.remove('light');
            themeButton.classList.add('dark');
            themeButton.textContent = '🌞';
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }              
    });    
}