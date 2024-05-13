import { darkThemeSetup } from '/js/components/dark-theme.js';
import { changeLanguageSetup } from '/js/components/changeLanguage.js'
const usersDiv = document.querySelector('.users');
const languageButton = document.getElementById('change-language');

const goBackButton = document.getElementById('go-back');
goBackButton.addEventListener('click', function() {
    window.location.href = "admin.html";
});

async function getUsersData(){
    const data = localStorage.getItem('usersData');
    if(data){
        return JSON.parse(data);
    }
    return null;    
}
async function setDefaultRolesInLocalStorage(usersData){
    if(usersData != null && usersData != undefined){
        return usersData;
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
    const user2 = {
        role: "user",
        login: "2",
        password: 2,
        name: "2"   
    }
    const user3 = {
        role: "user",
        login: "3",
        password: 3,
        name: "3"   
    }
    usersData = [admin, user, user2, user3];
    const jsonData = JSON.stringify(usersData);
    localStorage.setItem('usersData', jsonData);
    return usersData;
}
async function createTableOfUsersData(usersData){
    let logins = [];
    let roles = [];
    let names = [];
    let passwords = [];

    let phones = [];
    let emails = [];
    let birthdays = [];
    let surnames = [];

    usersData.forEach(item => {
        logins.push(item.login);
        roles.push(item.role);
        names.push(item.name);
        passwords.push(item.password);

        phones.push(item.phone);
        emails.push(item.email);
        birthdays.push(item.birthday);
        surnames.push(item.surname);
    });    

    for (let i = 0; i < logins.length; i++){
        const userDiv = document.createElement('div');
        userDiv.className = 'user';

        const login = document.createElement('p');
        const role = document.createElement('p');
        const name = document.createElement('p');

        login.textContent = logins[i];
        role.textContent = roles[i];
        name.textContent = names[i];

        const button1Div = document.createElement('div');
        button1Div.className = 'button-div';
        const button1 = document.createElement('button');
        if(languageButton.textContent == 'en'){
            button1.textContent = 'Ban user';
        } else {
            button1.textContent = 'ユーザーをブロック';
        }
  
        button1.addEventListener('click', function(){

            usersData = [];
            for(let j = 0; j < logins.length; j++){
                const user = {
                    login: logins[j],
                    role: roles[j],
                    name: names[j],
                    password: passwords[j],                
                    phone: phones[j],
                    email: emails[j],
                    birthday: birthdays[j],
                    surname: surnames[j] 
                }
                if(j != i){
                    usersData.push(user);
                }
            }
            const jsonData = JSON.stringify(usersData);
            localStorage.setItem('usersData', jsonData);
            clearTableOfUsersData();
            createTableOfUsersData(usersData);
        })

        const button2Div = document.createElement('div');
        button2Div.className = 'button-div';
        const button2 = document.createElement('button');
        if(languageButton.textContent == 'en'){
            button2.textContent = 'Set admin';
        } else {
            button2.textContent = '管理者を作る';
        }
        button2.addEventListener('click', function(){

            usersData = [];
            for(let j = 0; j < logins.length; j++){
                let user = {
                    login: logins[j],
                    role: roles[j],
                    name: names[j],
                    password: passwords[j],                
                    phone: phones[j],
                    email: emails[j],
                    birthday: birthdays[j],
                    surname: surnames[j] 
                }
                if(j === i){
                    user.role = 'admin';
                }
                usersData.push(user);
            }
            const jsonData = JSON.stringify(usersData);
            localStorage.setItem('usersData', jsonData);
            clearTableOfUsersData();
            createTableOfUsersData(usersData);
        })


        button1Div.appendChild(button1);
        button2Div.appendChild(button2);

        userDiv.appendChild(login);
        userDiv.appendChild(role);
        userDiv.appendChild(name);
        userDiv.appendChild(button1Div);
        userDiv.appendChild(button2Div);

        usersDiv.appendChild(userDiv);
    }
}
function clearTableOfUsersData(){
    const children = usersDiv.children;

    for (let i = children.length - 1; i > 0; i--) {
        usersDiv.removeChild(children[i]);
    }
}
async function main(){
    darkThemeSetup();
    changeLanguageSetup();
    let usersData = await getUsersData();
    usersData = await setDefaultRolesInLocalStorage(usersData);
    await createTableOfUsersData(usersData);

    languageButton.addEventListener('click', function(){
        const buttons = document.querySelectorAll('.button-div button');
        buttons.forEach(button =>{
            if(button.textContent === 'Ban user'){                
                button.textContent = 'ユーザーをブロック';                
            } else if(button.textContent === 'ユーザーをブロック'){                
                button.textContent = 'Ban user';                
            } else if(button.textContent === 'Set admin'){
                button.textContent = '管理者を作る';
            } else if(button.textContent === '管理者を作る'){
                button.textContent = 'Set admin';
            }
        })
    })
}
main();