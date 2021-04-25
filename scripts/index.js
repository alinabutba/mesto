const openPopupEdit = document.querySelector('.person-card__edit-button');
const overlay = document.querySelector('.overlay');
const popUpEditButton = document.querySelector('.popup-edit__close-button');
const formSubmit = document.querySelector('.form-edit');
const formName = document.querySelector('#form1-name');
const formJob = document.querySelector('#form1-job'); 
const cardName = document.querySelector('.person-card__name');
const cardJob = document.querySelector('.person-card__job');
const formEdit = document.querySelector('.form-edit')


function formSubmitHandler (evn) {
    evn.preventDefault();
    cardName.textContent = formName.value;
    cardJob.textContent = formJob.value;
    overlay.classList.toggle('overlay_opened');
    console.log('overlay_opened');
}



function togglePopUp(evn) {
    evn.preventDefault();
    overlay.classList.toggle('overlay_opened');
    formName.value = cardName.textContent;
    formJob.value = cardJob.textContent;
    console.log('overlay_opened');
}

openPopupEdit.addEventListener('click', togglePopUp);
popUpEditButton.addEventListener('click', togglePopUp);   
formSubmit.addEventListener('submit', formSubmitHandler);