const modalWindow = document.getElementById('modal-window');
const modalButton = document.getElementById('modal-button');
const modalText = document.querySelector('#modal-window p');

const modalStyle = document.createElement('link');
modalStyle.rel = 'stylesheet';
modalStyle.href = '../css/modal.css'; 

document.head.appendChild(modalStyle);

export function modalWindowShow(text){
    modalText.textContent = text;
    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';

    modalButton.addEventListener('click', function(){
        modalText.textContent = '';
        modalWindow.style.display = 'none';
        document.body.style.overflow = 'auto';
    })
}