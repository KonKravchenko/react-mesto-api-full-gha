import React from 'react';


function PopupWithForm({ isOpen, name, title, buttonText, btnAriaLabel, children, onClose, onSubmit }) {
  const popupOpened = isOpen ? (`popup popup_${name} popup_opened`) : (`popup popup_${name}`)


  return (
    <section className={popupOpened}>
      <div className="popup__container">
        <form className={`form form__${name}`} name={`popup_form_${name}`} onSubmit={onSubmit} validate="true">
          {title.length > 0 && <h2 className="form__title">{`${title}`}</h2>}
          {children}
          {buttonText.length > 0 &&<button className="form__button " type="submit" name="button" value={`${buttonText}`}
            aria-label={`${btnAriaLabel}`} disabled={false}>{`${buttonText}`}</button>}
        </form>
        <button className="popup__close" type="button" aria-label={`${btnAriaLabel}`} onClick={onClose}></button>
      </div>
    </section>
  );
}


export default PopupWithForm;
