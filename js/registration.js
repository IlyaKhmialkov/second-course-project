import { darkThemeSetup } from '/js/components/dark-theme.js';
import { changeLanguageSetup } from '/js/components/changeLanguage.js'
import { modalWindowShow } from '/js/components/modal.js';

const sendUpFormButton = document.getElementById('sign-up-send');
const signUpButton = document.getElementById('sign-up-button');
const signInButton = document.getElementById('sign-in-button');
const signUp = document.querySelector('.sign-up')
const signIn = document.querySelector('.sign-in')
const signUpForm = document.querySelector('.sign-up form')
const signInForm = document.querySelector('.sign-in form')

const visiblePasswordButton = document.getElementById('visible-password-button');
const generatePasswordButton = document.getElementById('generate-password-button');
const passwordInput = document.getElementById('create-password');
const passwordConfirm = document.getElementById('confirm-password');

const generateLoginButton = document.getElementById('generate-login-button');
const loginInput = document.getElementById('create-login');
let ammountOfGeneratedLigins = 0;

const sendInFormButton = document.getElementById('sign-in-send');
const loginInLabel = document.getElementById('login-in-label');
const passwordInLabel = document.getElementById('password-in-label');

const phoneLabel = document.getElementById('phone-label');
const emailLabel = document.getElementById('email-label');
const birthdayLabel = document.getElementById('birthday-label');
const nameLabel = document.getElementById('name-label');
const surnameLabel = document.getElementById('surname-label');
const loginUpLabel = document.getElementById('login-up-label');
const passwordUpLabel = document.getElementById('password-up-label');
const confirmPasswordLabel = document.getElementById('confirm-password-label');
const termsOfUseLabel = document.getElementById('terms-of-use-label');

const changeLanguage = document.getElementById('change-language');

const goBackButton = document.getElementById('go-back');
goBackButton.addEventListener('click', function() {
    window.location.href = "index.html";
});

signUpButton.addEventListener('click', function(){
    signIn.classList.add('hidden');
    signUp.classList.remove('hidden');
});
signInButton.addEventListener('click', function(){
    signUp.classList.add('hidden');
    signIn.classList.remove('hidden');
});
async function getUsersData(){
    const data = localStorage.getItem('usersData');
    if(data){
        return JSON.parse(data);
    }
    return null;    
}
function checkMatches(item, items){
    for(let i = 0; i < items.length; i++ ){
        if(items[i] === item){
            return true;
        }
    }
    return false;
}
async function setDefaultRolesInLocalStorage(){
    let usersData = await getUsersData();
    if(usersData != null && usersData != undefined){
        return;
    }
    const admin = {
        role: "admin",
        login: "ilya",
        password: 1111,
        name: "ilya"      
    }
    const user = {
        role: "user",
        login: "1",
        password: 1,
        name: "1"   
    }
    usersData = [admin, user];
    const jsonData = JSON.stringify(usersData);
    localStorage.setItem('usersData', jsonData);
}
signInForm.addEventListener('input', async function() {

    const signInData = new FormData(signInForm);
    const login = signInData.get('login');
    const password = signInData.get('password');

    if(login == ''){
        loginInLabel.className = 'msg-empty';
        sendInFormButton.className = 'hidden';
        sendInFormButton.type = 'button';
        return;
    } else{
        loginInLabel.classList.remove('msg-empty');
    }
    if(password == ''){
        passwordInLabel.className = 'msg-empty';
        sendInFormButton.className = 'hidden';
        sendInFormButton.type = 'button';
        return;
    } else{
        passwordInLabel.classList.remove('msg-empty');
    }
    sendInFormButton.classList.remove('hidden');
    sendInFormButton.type = 'submit';
});
signInForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const signInData = new FormData(signInForm);
    const login = signInData.get('login');
    const password = signInData.get('password');

    const usersData = await getUsersData();
    let roles = [];
    let logins = [];
    let passwords = [];

    usersData.forEach(item => {
        roles.push(item.role);
        logins.push(item.login);
        passwords.push(item.password);
    });    
    let numberOfUser = -1;

    for(let i = 0; i < logins.length; i++ ){
        if((logins[i] === login) && (passwords[i].toString() === password.toString())){
            numberOfUser = i;
            break;
        }
    }   
    if(numberOfUser != -1){
        if(roles[numberOfUser] === "user"){
            window.location.href = "user.html";
        } else{
            window.location.href = "admin.html";
        }
        signInForm.reset();
    } else {
        modalWindowShow('Invalid login or password');
    }
});
signUpForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const signUpData = new FormData(signUpForm);
    const usersData = await getUsersData();

    const newUser = {
        role: "user",
        login: signUpData.get('create-login'),
        password: signUpData.get('create-password'),
        name: signUpData.get('name'),
        surname: signUpData.get('surname'),
        patronymic: signUpData.get('patronymic') ?? "*",
        phone: signUpData.get('phone'),
        eMail: signUpData.get('email'),
        birthDay: signUpData.get('birth-date')
    }

    usersData.push(newUser);
    const jsonData = JSON.stringify(usersData);
    localStorage.setItem('usersData', jsonData);
    signUpForm.reset();

    signInButton.click();
});
generatePasswordButton.addEventListener('click', function(){
    let password = '!';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz!?$%#@*()&+-=_';
    let ammountOfSmth = Math.floor(Math.random() * 4);
    for(let j = 0; (password == undefined) || (password.length < 12); j++){
        for(let i = 0; i < ammountOfSmth; i++){
            if(j % 2 === 0){
                const randomIndex = Math.floor(Math.random() * alphabet.length);
                const randomLetter = alphabet[randomIndex];
                const randomCase = Math.random() < 0.5 ? 0 : 1;
                
                if (randomCase === 1) {
                    password += randomLetter.toUpperCase();
                } else{
                    password += randomLetter;
                }          
            } else{
                const randomNumber = Math.floor(Math.random() * 10);
                password += randomNumber;
            }
        }
        ammountOfSmth = Math.floor(Math.random() * 4);
    }
    passwordInput.value = password;
    passwordConfirm.value = password;
    checkValidUpForm();
});
visiblePasswordButton.addEventListener('click', function(){
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordConfirm.type = 'text';
      } else {
        passwordInput.type = 'password';
        passwordConfirm.type = 'password';
      }
});
generateLoginButton.addEventListener('click', function(){
    if (ammountOfGeneratedLigins < 5) {
        const adjectives = ['Cool', 'Crazy', 'Awesome', 'Fantastic', 'Epic'];
        const nouns = ['Gamer', 'Ninja', 'Master', 'Champion', 'Wizard', 'Creator'];
    
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

        loginInput.value = randomAdjective + randomNoun;
        ammountOfGeneratedLigins++;
        checkValidUpForm();
    } else {
        modalWindowShow('Error: you generate too much logins, try by yourself');
    }
});
function setSubmitActive(){
    sendUpFormButton.classList.remove('hidden');
    sendUpFormButton.type = 'submit';
}
function disableSubmit(){
    sendUpFormButton.className = 'hidden';
    sendUpFormButton.type = 'button';
}
async function checkValidUpForm() {

    const signUpData = new FormData(signUpForm);
    const phone = signUpData.get('phone');
    const eMail = signUpData.get('email');
    const name = signUpData.get('name');
    const surname = signUpData.get('surname');
    const login = signUpData.get('create-login');
    const birthDay = signUpData.get('birth-date');   
    const password = signUpData.get('create-password');
    const confirmPassword = signUpData.get('confirm-password');
    const termsOfUse = signUpData.get('terms-of-use');
    
    const usersData = await getUsersData();

    if(phone.toString().length != 12){
        phoneLabel.className = 'msg-phone';
        disableSubmit();
        return;
    } else{
        phoneLabel.classList.remove('msg-phone');
    }
    if(!phone.startsWith("375")){
        phoneLabel.className = 'msg-phone-bel';
        disableSubmit();
        return;
    } else{
        phoneLabel.classList.remove('msg-phone-bel');
    }
    if(eMail == ''){
        emailLabel.className = 'msg-empty';
        disableSubmit();
        return;
    } else{
        emailLabel.classList.remove('msg-empty');
    }
    if(birthDay == ''){
        birthdayLabel.className = 'msg-empty';
        disableSubmit();
        return;
    } else{
        birthdayLabel.classList.remove('msg-empty');
    }
    let today = new Date();
    today.setFullYear(today.getFullYear() - 16)
    const birthDayDate = new Date(birthDay);
    if(birthDayDate > today){
        birthdayLabel.className = 'msg-less16';
        disableSubmit();
        return;
    } else{
        birthdayLabel.classList.remove('msg-less16');
    }
    if(name == ''){
        nameLabel.className = 'msg-empty';
        disableSubmit();
        return;
    } else{
        nameLabel.classList.remove('msg-empty');
    }
    if(surname == ''){
        surnameLabel.className = 'msg-empty';
        disableSubmit();
        return;
    } else{
        surnameLabel.classList.remove('msg-empty');
    }
    if(login == ''){
        loginUpLabel.className = 'msg-empty';
        disableSubmit();
        return;
    } else{
        loginUpLabel.classList.remove('msg-empty');
    }
    let logins = [];
    usersData.forEach(item => {
        logins.push(item.login);
    }); 
    if(checkMatches(login, logins)){
        loginUpLabel.className = 'msg-login-exist';
        disableSubmit();
        return;
    } else{
        loginUpLabel.classList.remove('msg-login-exist');
    }
    if(password.length < 8){
        passwordUpLabel.className = 'msg-small-password';
        disableSubmit();
        return;
    } else{
        passwordUpLabel.classList.remove('msg-small-password');
    }
    if(password.length > 20){
        passwordUpLabel.className = 'msg-big-password';
        disableSubmit();
        return;
    } else{
        passwordUpLabel.classList.remove('msg-big-password');
    }
    const letterRegex = /[a-zA-Z]/;
    if(!letterRegex.test(password)){
        passwordUpLabel.className = 'msg-letter-password';
        disableSubmit();
        return;
    } else{
        passwordUpLabel.classList.remove('msg-letter-password');
    }
    const digitRegex = /\d/;
    if(!digitRegex.test(password)){
        passwordUpLabel.className = 'msg-digit-password';
        disableSubmit();
        return;
    } else{
        passwordUpLabel.classList.remove('msg-digit-password');
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if(!specialCharRegex.test(password)){
        passwordUpLabel.className = 'msg-speshal-symbol-password';
        disableSubmit();
        return;
    } else{
        passwordUpLabel.classList.remove('msg-speshal-symbol-password');
    }  
    if(password != confirmPassword){
        confirmPasswordLabel.className = 'msg-match-password';
        disableSubmit();
        return;
    } else{
        confirmPasswordLabel.classList.remove('msg-match-password');
    }  
    if(termsOfUse == '' || termsOfUse == null){
        termsOfUseLabel.className = 'msg-empty';
        disableSubmit();
        return;
    } else{
        termsOfUseLabel.classList.remove('msg-empty');
    }
    setSubmitActive();
}
signUpForm.addEventListener('input', function(){
    checkValidUpForm();
});
async function main(){
    darkThemeSetup();
    setDefaultRolesInLocalStorage();
    changeLanguageSetup();

    changeLanguage.addEventListener('click', async function(){
        const termsLink = document.createElement('a');
        termsLink.href = '#';
        termsLink.setAttribute('data-i18', 71)
        if(document.body.classList.contains('ja')){
            termsLink.textContent = '利用規約';
        } else {
            termsLink.textContent = ' terms of use';
        }

        termsOfUseLabel.appendChild(termsLink);
    });
    changeLanguage.click();
    changeLanguage.click();
}

main();