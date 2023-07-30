import React from 'react';


function Card({ card, currentUser, onCardClick, onCardLike, onCardDelete }) {

  function handleClick() {

    onCardClick(card);
  }

  function handleLikeClick() {   
    onCardLike(card) 
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((data) => data === currentUser._id);
  // const isLiked = console.log('card isLiked ');

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = (card.owner._id || card.owner) === currentUser._id;

  return (
    <li className="element" key={card._id}>
      {/* Далее в разметке используем переменную для условного рендеринга */}
      {isOwn && <button className="element__trash"
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      />}
      <div className="element__image"
        onClick={handleClick}
        style={{ backgroundImage: `url(${card.link})`, }}>
      </div>

      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button className={cardLikeButtonClassName}
            type="button"
            aria-label="нравится/не нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;