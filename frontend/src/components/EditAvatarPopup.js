
import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useForm } from '../hooks/useForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm(currentUser)
  const { avatar } = values;

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  React.useEffect(() => {
    setValues('');
  }, [isOpen]);

  function resetInput(event) {
    onUpdateAvatar.ok && setValues(event.target.reset())
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({ avatar });
    resetInput(event)
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      btnAriaLabel="Изменить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input">
        <input
          className="form__item"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required
          value={avatar ?? ''}
          onChange={handleChange} />
        <span className="form__item-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;