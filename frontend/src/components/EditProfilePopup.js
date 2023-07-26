import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm(currentUser)
  const {name, about} = values;
  

  React.useEffect(() => {
    setValues(currentUser)
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({name, about});
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      btnAriaLabel="Cохранить данные профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input">
        <input
          className="form__item"
          type="text"
          name="name"
          placeholder="Имя"
          autoComplete="off"
          required
          minLength="2"
          maxLength="40"

          value={name ?? ''} onChange={handleChange} />

        <span className="form__item-error"></span>
      </div>

      <div className="form__input">
        <input
          className="form__item form__item_bottom"
          type="text" name="about"
          placeholder="О себе"
          autoComplete="off"
          required minLength="2"
          maxLength="200"

          value={about ?? ''} onChange={handleChange} />

        <span className="form__item-error"></span>
      </div>
    </PopupWithForm>

  )

}

export default EditProfilePopup;