const openPopupEdit = document.querySelector('.person-card__edit-button');
const overlay = document.querySelector('.overlay');
const popUpEditButton = document.querySelector('.popup-edit__close-button');
const formSubmitButton = document.querySelector('.form-edit__save-button');
const formName = document.querySelector('.form-edit__name');
const formJob = document.querySelector('.form-edit__job'); 
const cardName = document.querySelector('.person-card__name');
const cardJob = document.querySelector('.person-card__job');
const sendButton = document.querySelector('.form-edit__save-button');


function formSubmitHandler (evn) {
    evn.preventDefault();
    cardName.textContent = formName.value;
    cardJob.textContent = formJob.value;
    overlay.classList.toggle('overlay_is-opened');
}



function togglePopUp(evn) {
    evn.preventDefault();
    overlay.classList.toggle('overlay_is-opened');
    formName.value = cardName.textContent;
    formJob.value = cardJob.textContent;          
}

openPopupEdit.addEventListener('click', togglePopUp);
popUpEditButton.addEventListener("click", togglePopUp);   
sendButton.addEventListener('click', formSubmitHandler);