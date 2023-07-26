import React from 'react';
import { ReactComponent as EditProfileImage } from '../images/__edit_profile_image.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardContext);


  return (
    <main className="content">

      <section className="profile">
        <div className="profile__info">
          <div className="avatar">
            <div className="avatar__image"
              style={{
                backgroundImage: `url(${currentUser.avatar})`,
              }}></div>
            <div className="avatar__overlay"></div>
            <button className="avatar__edit-button" arial-label="изменить аватар" type="button"
              onClick={onEditAvatar}>
              {/* <img src={editProfileImage} /> */}
              <EditProfileImage />
            </button>
          </div>
          <div className="profile__rotor">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="редактировать профиль"
              onClick={onEditProfile}>
            </button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>

        <button className="profile__add-button" aria-label="добавить" type="button"
          onClick={onAddPlace}

        ></button>

      </section>


      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            < Card card={card}
              currentUser={currentUser}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

    </main>
  );
}

export default Main;