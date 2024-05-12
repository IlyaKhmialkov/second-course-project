import { translate } from "../../assets/translate.js";
const languageButton = document.getElementById("change-language");

function changeLanguage(language){
    const translation = translate[language];

    languageButton.textContent = language;

    const elements = document.querySelectorAll('[data-i18]');

    elements.forEach((element) => {
        const key = element.getAttribute('data-i18');
        const translatedText = translation[key];

        element.textContent = translatedText;
    });
}

export function changeLanguageSetup(){
    const defalutLanguage = localStorage.getItem('language') ?? 'en';

    if(defalutLanguage === 'ja'){
        changeLanguage('ja');
        document.body.classList.add('ja');
    } else {
        changeLanguage('en');
    }

    languageButton.addEventListener('click', function(){
        if(languageButton.textContent === 'en'){
            changeLanguage('ja');
            localStorage.setItem('language', 'ja');
            document.body.classList.add('ja');
        } else {
            changeLanguage('en');
            localStorage.setItem('language', 'en');
            document.body.classList.remove('ja');
        }
    })
}