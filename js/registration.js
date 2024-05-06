
const signUpButton = document.getElementById('sign-up-button');
const signInButton = document.getElementById('sign-in-button');
const signUp = document.querySelector('.sign-up')
const signIn = document.querySelector('.sign-in')

signUpButton.addEventListener('click', function(){
    signIn.classList.add('hidden');
    signUp.classList.remove('hidden');
});

signInButton.addEventListener('click', function(){
    signUp.classList.add('hidden');
    signIn.classList.remove('hidden');
});

import { darkThemeSetup } from '/js/components/dark-theme.js';

async function main(){
    darkThemeSetup();
}

main();