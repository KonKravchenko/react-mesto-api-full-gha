import React from 'react';

function ImagePopup({ cardData, onClose }) {

  
  const popupOpened = cardData._id ? (`popup popup_big-image popup_opened`) : (`popup popup_big-image `)


  return (

    <section className={popupOpened} >
      <div className="popup__big-image-container">
        <img className="popup__big-image-image" src={cardData.link} alt={cardData.name} />
        <h2 className="popup__big-image-title">{cardData.name}</h2>
        <button className="popup__close"
          type="button"
          aria-label="закрыть большую картинку"
          onClick={onClose}>
        </button>
      </div>
    </section>
  );
}

export default ImagePopup;