import React from 'react';
import PopupWithForm from './PopupWithForm';
import { ReactComponent as RegError } from '../images/regError.svg';
import { ReactComponent as RegSuccess } from '../images/regSuccess.svg';


function InfoTooltip({ isOpen, onClose, infoTooltipData }) {
  return (
    <PopupWithForm
      name="infoTooltip"
      title=""
      buttonText=""
      btnAriaLabel=""
      isOpen={isOpen}
      onClose={onClose}
    >

      {infoTooltipData.email ? (
        <div className="form__infoTooltip-container">
          <RegSuccess className="form__image" />
          <h2 className="form__title form__title_tooltip">Вы успешно зарегистрировались!</h2>
        </div>
      ) : (
        <div className="form__infoTooltip-container">
          <RegError className="form__image" />
          <h2 className="form__title form__title_tooltip">Что-то пошло не так! Попробуйте ещё раз.</h2>
        </div>
      )}
    </PopupWithForm>
  )
}

export default InfoTooltip;