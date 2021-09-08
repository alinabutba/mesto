// импорт главного файла стилей
import "../pages/index.css";
import PopupConfirm from "../components/PopupConfirm";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  validationSetting,
  popupEditData,
  userInfoData,
  popupCardData,
  popupImageData,
  popupAvatarData,
  popupConfirmData,
} from "../Utils/settings.js";
import Api from "../components/Api.js";
import { token, cohort } from "../Utils/settingsApi.js";

const formName = document.querySelector("#name-form");
const formJob = document.querySelector("#job-form");
const cardAvatar = document.querySelector(".person-card__edit-avatar");

// Инстанс класса с API(он же instance, он же инстанс, и он же экземпляр класса)
const api = new Api("https://mesto.nomoreparties.co/v1/", token, cohort);

//////IIFE Edit PROFILE
(() => {
  api
    .getUser()
    .then((res) => {
      console.log(
        `user id:${res._id}\nuser name:${res.name}\nabout:${res.about}\nuser avatar:${res.avatar}`
      );
      userInfo.setUserInfo(res);
      userInfo.setUserAvatar({ link: res.avatar });
    })
    .catch((err) => console.log(err));

  // Инстанс профиля
  const userInfo = new UserInfo({
    name: userInfoData.cardName,
    about: userInfoData.cardJob,
    avatar: userInfoData.avatar,
  });

  // Инстанс форма
  const validateFormUser = new FormValidator(
    popupEditData.popupEdit,
    validationSetting
  );
  validateFormUser.enableValidation();

  // Попап редактирования профиля
  const popupProfile = new PopupWithForm(
    popupEditData.popupEdit,
    validateFormUser,
    (dataForm) => {
      api
        .setUserInfo({ name: dataForm.name, about: dataForm.job })
        .then((response) => {
          userInfo.setUserInfo(response);
          popupProfile.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
  popupProfile.setEventListeners();

  // Слушатель редактирования профиля
  popupEditData.openButtonPopupEdit.addEventListener("click", () => {
    validateFormUser.resetValidation();
    formName.value = userInfo.getUserInfo().name;
    formJob.value = userInfo.getUserInfo().about;
    popupProfile.open();
  });

  ///////Avatar
  // Инстанс форма
  const validateFormAvatar = new FormValidator(
    popupAvatarData.popupAvatar,
    validationSetting
  );
  validateFormAvatar.enableValidation();

  // Попап редактирования профиля
  const popupAvatar = new PopupWithForm(
    popupAvatarData.popupAvatar,
    validateFormAvatar,
    (dataForm) => {
      api
        .setUserAvatar({ avatar: dataForm.link })
        .then((responce) => {
          userInfo.setUserAvatar({ link: responce.avatar });
          popupAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
  popupAvatar.setEventListeners();

  // Слушатель редактирования профиля
  cardAvatar.addEventListener("click", () => {
    validateFormAvatar.resetValidation();
    popupAvatar.open();
  });
})();

//////IIFE Card
(() => {
  // Инстанс валидации формы
  const validateFormCard = new FormValidator(
    popupCardData.popupCard,
    validationSetting
  );
  validateFormCard.enableValidation();

  // Инстанс popup с картинкой
  const popupOpenedImage = new PopupWithImage(popupImageData.popupImage);
  popupOpenedImage.setEventListeners();

  // Функция получения карточки
  function createCard(owner, data, templateCard) {
    const card = new Card(owner, data, templateCard, {
      handleCardClick: (data) => {
        popupOpenedImage.open(data);
      },
      handleCardClickDelete: () => {
        const popupDeleteConfirm = new PopupConfirm(
          popupConfirmData.popupConfirm,
          () => {
            api
              .deleteCard(data)
              .then((res) => {
                card.deleteCard();
                popupDeleteConfirm.close();
              })
              .catch((err) => {
                console.log("delete error: " + err);
              });
          }
        );
        popupDeleteConfirm.setEventListeners();
        popupDeleteConfirm.open();
      },
      handleSetLike: () => {
        api
          .setLike(data)
          .then((res) => {
            card.setCountLike(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleDeletLike: () => {
        api
          .deleteLike(data)
          .then((res) => {
            card.setCountLike(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
    return card; // end CARD
  }

  Promise.all([api.getUser(), api.getCards()])
    .then(([userData, cardsData]) => {
      const cardList = new Section(
        {
          renderer: (data) => {
            cardList.addItem(
              createCard(userData._id, data, popupCardData).getCard(),
              true
            );
          },
        },
        popupCardData.cardsContainerTemplate
      );
      cardList.renderItems(cardsData);

      const popupAddCard = new PopupWithForm(
        popupCardData.popupCard,
        validateFormCard,
        (data) => {
          api
            .setNewCard(data)
            .then((res) => {
              cardList.addItem(
                createCard(userData._id, res, popupCardData).getCard(),
                false
              );
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(popupAddCard.close());
        }
      );
      popupAddCard.setEventListeners();

      popupEditData.buttonAddPopupEdit.addEventListener("click", () => {
        popupAddCard.open();
      });
    })
    .catch((err) => {
      console.log(err);
    });
})();
